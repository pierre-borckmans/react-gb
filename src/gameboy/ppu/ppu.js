import mmu from '../mmu/mmu';
import interrupts from '../interrupts/interrupts';

import { format, readBit, getSignedByte } from '../../utils/utils';
import config from '../config';

const LCD_CTRL_ADDR = 0xff40;
const LCDC_STATUS_ADDR = 0xff41;
const SCROLLY_ADDR = 0xff42;
const SCROLLX_ADDR = 0xff43;
const LCDC_YCOORD_ADDR = 0xff44;
const LCDC_YCOORD_COMPARE_ADDR = 0xff45;
const DMA_TRANSFER_AND_START_ADDR = 0xff46;
const BG_PALETTE_ADDR = 0xff47;
const OBJ_PALETTE0_ADDR = 0xff48;
const OBJ_PALETTE1_ADDR = 0xff49;
const WINY_ADDR = 0xff4a;
const WINX_ADDR = 0xff4b;

// VRAM ranges
//  8000-87FF	Tile set #1: tiles 0-127
//  8800-8FFF	Tile set #1: tiles 128-255
//             OR
//             Tile set #0: tiles -1 to -128
//  9000-97FF	Tile set #0: tiles 0-127
//  9800-9BFF	Tile map #0
//  9C00-9FFF	Tile map #1
const START_TILESET1_ADDR = 0x8000;
const END_TILESET0_ADDR = 0x97ff;

const START_TILEMAP0_ADDR = 0x9800;
const START_TILEMAP1_ADDR = 0x9c00;

// LCD CONTROL
const LCD_CTRL_BACKGROUND_ENABLE_BIT = 0;
const LCD_CTRL_OBJ_ENABLE_BIT = 1;
const LCD_CTRL_OBJ_SIZE_BIT = 2;
const LCD_CTRL_BG_TILEMAP_BIT = 3;
const LCD_CTRL_BG_AND_WINDOW_TILESET_BIT = 4;
const LCD_CTRL_WINDOW_ENABLE_BIT = 5;
const LCD_CTRL_WINDOW_TILEMAP_BIT = 6;
const LCD_CTRL_LCD_ENABLE_BIT = 7;

// LCD STATUS
const LCD_STATUS_MODE_BITS = [0, 1];
const LCD_STATUS_YCOORD_COINCIDENCE_FLAG_BIT = 2;
const LCD_STATUS_MODE_0_HBLANK_INTERRUPT_BIT = 3;
const LCD_STATUS_MODE_1_VBLANK_INTERRUPT_BIT = 4;
const LCD_STATUS_MODE_2_OAM_INTERRUPT_BIT = 5;
const LCD_STATUS_YCOORD_COINCIDENCE_INTERRUPT_BIT = 6;

let registers = {};
let data = {};

const getLCDCBackgroundEnable = () => registers.BACKGROUND_ENABLED;
const getLCDCObjectEnable = () => registers.SPRITES_ENABLED;
const getLCDCObjectSize = () => registers.SPRITES_SIZE;
const getLCDCBackgroundTilemap = () => registers.BACKGROUND_TILEMAP;
const getLCDCBackgroundAndWindowTileset = () =>
  registers.BACKGROUND_AND_WINDOW_TILESET;
const getLCDCWindowEnable = () => registers.WINDOW_ENABLED;
const getLCDCWindowTilemap = () => registers.WINDOW_TILEMAP;
const getLCDCLCDEnable = () => registers.LCD_ENABLED;

const SCREEN_WIDTH = 160;
const SCREEN_HEIGHT = 144;
const BUFFER_WIDTH = 256;
const BUFFER_HEIGHT = 256;

const CYCLES_OAM_SEARCH = 20;
const CYCLES_PIXEL_TRANSFER = 43;
const CYCLES_HBLANK = 51;
const CYCLES_PER_LINE =
  CYCLES_OAM_SEARCH + CYCLES_PIXEL_TRANSFER + CYCLES_HBLANK; // 114
const LINES_VBLANK = 10;
// const CYCLES_COMPLETE_FRAME = (SCREEN_HEIGHT + LINES_VBLANK) * CYCLES_PER_LINE; // 17556

const MODES = {
  OAM_SEARCH: 2,
  PIXEL_TRANSFER: 3,
  HBLANK: 0,
  VBLANK: 1,
};

// 17556 cycles/frames * 60 fps = 1053360 cycles / s
// 1mbHz (1024*1024) / 17556 cycles/frames = 59.7275 fps

const getPalette = addr => {
  const paletteByte = mmu.read(addr);
  const palette = [
    (paletteByte & 0x03) >> 0,
    (paletteByte & 0x0c) >> 2,
    (paletteByte & 0x30) >> 4,
    (paletteByte & 0xc0) >> 6,
  ];
  return palette;
};

const updateTile = tileIdx => {
  // 384 tiles
  // 8x8 pixels
  // each pixel = 2 bits
  // each row = 8 pixels * 2 bits = 2 bytes
  // each tile = 8 rows = 16 bytes

  // 2 maps of 32x32 tiles
  // one map can be used at a time
  // each map can only use max 256 different tiles

  data.tileSet[tileIdx] = [];
  data.tileSetWithBackgroundPalette[tileIdx] = [];
  for (let row = 0; row < 8; row++) {
    data.tileSet[tileIdx][row] = [];
    data.tileSetWithBackgroundPalette[tileIdx][row] = [];
    const offset = 0x8000 + tileIdx * 16 + row * 2;
    const byte1 = mmu.read(offset);
    const byte2 = mmu.read(offset + 1);
    for (let col = 7; col >= 0; col--) {
      const bit1 = (byte1 & (0x01 << col)) >> col;
      const bit2 = (byte2 & (0x01 << col)) >> col;
      const pixel = (bit2 << 1) + bit1;
      data.tileSet[tileIdx][row][7 - col] = pixel;
      data.tileSetWithBackgroundPalette[tileIdx][row][7 - col] = pixel;
    }
  }
};

const getSpritesTable = () => {
  const sprites = [];
  for (let i = 0; i < 40; i++) {
    const y = mmu.read(mmu.START_OAM + i * 4 + 0);
    const x = mmu.read(mmu.START_OAM + i * 4 + 1);
    const tileIdx = mmu.read(mmu.START_OAM + i * 4 + 2);
    const flags = mmu.read(mmu.START_OAM + i * 4 + 3);
    const priority = readBit(flags, 7);
    const flipY = readBit(flags, 6);
    const flipX = readBit(flags, 5);
    const palette = readBit(flags, 4);
    sprites.push({
      x,
      y,
      tileIdx,
      priority,
      flipX,
      flipY,
      palette,
    });
  }
  return sprites;
};

const getSprite = spriteIdx => {
  const sprites = getSpritesTable();
  const sprite = sprites[spriteIdx];
  const spritePalette =
    sprite.palette === 0 ? ppu.getObjectPalette0() : ppu.getObjectPalette1();
  const spriteHeight = registers.SPRITES_SIZE === 0 ? 8 : 16;
  const tile =
    registers.SPRITES_SIZE === 0
      ? data.tileSet[sprite.tileIdx]
      : [
          ...data.tileSet[sprite.tileIdx & 0xfe],
          ...data.tileSet[sprite.tileIdx | 0x01],
        ];

  const flippedTile = sprite.flipY
    ? tile
        .map(row => (sprite.flipX ? row.slice().reverse() : row))
        .slice()
        .reverse()
    : tile.map(row => (sprite.flipX ? row.slice().reverse() : row));

  const spritePixels = [];
  for (let row = 0; row < spriteHeight; row++) {
    spritePixels[row] = [];
    for (let col = 0; col < 8; col++) {
      spritePixels[row][col] = spritePalette[flippedTile[row][col]];
    }
  }

  return spritePixels;
};

const getBackgroundPalette = () => getPalette(BG_PALETTE_ADDR);
const getObjectPalette0 = () => getPalette(OBJ_PALETTE0_ADDR);
const getObjectPalette1 = () => getPalette(OBJ_PALETTE1_ADDR);

const getScrollX = () => registers.SCROLLX;
const getScrollY = () => registers.SCROLLY;

const getWindowX = () => registers.WINX;
const getWindowY = () => registers.WINY;

const readLCDCtrl = () => {
  return (
    ((registers.LCD_ENABLED ? 1 : 0) << LCD_CTRL_LCD_ENABLE_BIT) |
    (registers.WINDOW_TILEMAP << LCD_CTRL_WINDOW_TILEMAP_BIT) |
    ((registers.WINDOW_ENABLED ? 1 : 0) << LCD_CTRL_WINDOW_ENABLE_BIT) |
    (registers.BACKGROUND_AND_WINDOW_TILESET <<
      LCD_CTRL_BG_AND_WINDOW_TILESET_BIT) |
    (registers.BACKGROUND_TILEMAP << LCD_CTRL_BG_TILEMAP_BIT) |
    (registers.SPRITES_SIZE << LCD_CTRL_OBJ_SIZE_BIT) |
    ((registers.SPRITES_ENABLED ? 1 : 0) << LCD_CTRL_OBJ_ENABLE_BIT) |
    ((registers.BACKGROUND_ENABLED ? 1 : 0) << LCD_CTRL_BACKGROUND_ENABLE_BIT)
  );
};

const writeLCDCtrl = value => {
  registers.LCD_ENABLED = value & (1 << LCD_CTRL_LCD_ENABLE_BIT) ? true : false;
  registers.WINDOW_TILEMAP = value & (1 << LCD_CTRL_WINDOW_TILEMAP_BIT) ? 1 : 0;
  registers.WINDOW_ENABLED =
    value & (1 << LCD_CTRL_WINDOW_ENABLE_BIT) ? true : false;
  registers.BACKGROUND_AND_WINDOW_TILESET =
    value & (1 << LCD_CTRL_BG_AND_WINDOW_TILESET_BIT) ? 1 : 0;
  registers.BACKGROUND_TILEMAP = value & (1 << LCD_CTRL_BG_TILEMAP_BIT) ? 1 : 0;
  registers.SPRITES_SIZE = value & (1 << LCD_CTRL_OBJ_SIZE_BIT) ? 1 : 0;
  registers.SPRITES_ENABLED =
    value & (1 << LCD_CTRL_OBJ_ENABLE_BIT) ? true : false;
  registers.BACKGROUND_ENABLED =
    value & (1 << LCD_CTRL_BACKGROUND_ENABLE_BIT) ? true : false;

  if (!registers.LCD_ENABLED) {
    enableLCD();
  } else {
    disableLCD();
  }
};

const enableLCD = () => {
  data.cyclesUntilLCDEnable = 61;
};

const disableLCD = () => {
  // data.cycles = 0;
  // data.modeCycles = 0;
  // data.windowLineCounter = 0;
  data.cyclesUntilLCDEnable = 61;
  // registers.MODE = MODES.HBLANK;
  // registers.LCDC_YCOORD = 0x00;
};

const readLCDStatus = () => {
  return (
    ((registers.MODE & (1 << LCD_STATUS_MODE_BITS[0]) ? 1 : 0) <<
      LCD_STATUS_MODE_BITS[0]) |
    ((registers.MODE & (1 << LCD_STATUS_MODE_BITS[1]) ? 1 : 0) <<
      LCD_STATUS_MODE_BITS[1]) |
    ((registers.YCOORD_COINCIDENCE_FLAG ? 1 : 0) <<
      LCD_STATUS_YCOORD_COINCIDENCE_FLAG_BIT) |
    ((registers.HBLANK_INTERRUPT ? 1 : 0) <<
      LCD_STATUS_MODE_0_HBLANK_INTERRUPT_BIT) |
    ((registers.VBLANK_INTERRUPT ? 1 : 0) <<
      LCD_STATUS_MODE_1_VBLANK_INTERRUPT_BIT) |
    ((registers.OAM_INTERRUPT ? 1 : 0) << LCD_STATUS_MODE_2_OAM_INTERRUPT_BIT) |
    ((registers.YCOORD_COINCIDENCE_INTERRUPT ? 1 : 0) <<
      LCD_STATUS_YCOORD_COINCIDENCE_INTERRUPT_BIT)
  );
};

const writeLCDStatus = value => {
  registers.HBLANK_INTERRUPT =
    value & (1 << LCD_STATUS_MODE_0_HBLANK_INTERRUPT_BIT) ? 1 : 0;
  registers.VBLANK_INTERRUPT =
    value & (1 << LCD_STATUS_MODE_1_VBLANK_INTERRUPT_BIT) ? 1 : 0;
  registers.OAM_INTERRUPT =
    value & (1 << LCD_STATUS_MODE_2_OAM_INTERRUPT_BIT) ? 1 : 0;
  registers.YCOORD_COINCIDENCE_INTERRUPT =
    value & (1 << LCD_STATUS_YCOORD_COINCIDENCE_INTERRUPT_BIT) ? 1 : 0;
};

const read = address => {
  switch (address) {
    case LCD_CTRL_ADDR:
      return readLCDCtrl();
    case LCDC_STATUS_ADDR:
      return readLCDStatus();
    case SCROLLY_ADDR:
      return registers.SCROLLY;
    case SCROLLX_ADDR:
      return registers.SCROLLX;
    case LCDC_YCOORD_ADDR:
      return registers.LCDC_YCOORD;
    case LCDC_YCOORD_COMPARE_ADDR:
      return registers.LCDC_YCOORD_COMPARE;
    case DMA_TRANSFER_AND_START_ADDR:
      return registers.DMA_TRANSFER_AND_START;
    case BG_PALETTE_ADDR:
      return registers.BG_PALETTE;
    case OBJ_PALETTE0_ADDR:
      return registers.OBJ_PALETTE0;
    case OBJ_PALETTE1_ADDR:
      return registers.OBJ_PALETTE1;
    case WINY_ADDR:
      return registers.WINY;
    case WINX_ADDR:
      return registers.WINX;
    default:
      // console.error(
      //   `Trying to read from invalid ppu address ${format('hex', address, 16)}`
      // );
      return '--';
  }
};

const write = (address, value) => {
  switch (address) {
    case LCD_CTRL_ADDR:
      writeLCDCtrl(value);
      break;
    case LCDC_STATUS_ADDR:
      writeLCDStatus(value);
      break;
    case SCROLLY_ADDR:
      registers.SCROLLY = value;
      break;
    case SCROLLX_ADDR:
      registers.SCROLLX = value;
      break;
    case LCDC_YCOORD_ADDR:
      registers.LCDC_YCOORD = value;
      break;
    case LCDC_YCOORD_COMPARE_ADDR:
      registers.LCDC_YCOORD_COMPARE = value;
      break;
    case DMA_TRANSFER_AND_START_ADDR:
      registers.DMA_TRANSFER_AND_START = value;
      startDMATransfer();
      break;
    case BG_PALETTE_ADDR:
      registers.BG_PALETTE = value;
      break;
    case OBJ_PALETTE0_ADDR:
      registers.OBJ_PALETTE0 = value;
      break;
    case OBJ_PALETTE1_ADDR:
      registers.OBJ_PALETTE1 = value;
      break;
    case WINY_ADDR:
      registers.WINY = value;
      break;
    case WINX_ADDR:
      registers.WINX = value;
      break;
    default:
      throw new Error(
        `Trying to write to invalid ppu address ${format('hex', address, 16)}`,
      );
  }
};

const resetData = () => {
  data = {
    cycles: 0,
    modeCycles: 0,
    windowLineCounter: 0,
    LCDWasDisabled: false,
    cyclesUntilLCDEnable: 0,

    tileSet: Array(384)
      .fill()
      .map(() =>
        Array(8)
          .fill()
          .map(() => Array(8).fill(0)),
      ),
    tileSetWithBackgroundPalette: Array(384)
      .fill()
      .map(() =>
        Array(8)
          .fill()
          .map(() => Array(8).fill(0)),
      ),
    scanLines: Array(SCREEN_HEIGHT)
      .fill()
      .map(() => Array(SCREEN_WIDTH).fill(0)),
    backgroundScanLines: Array(SCREEN_HEIGHT)
      .fill()
      .map(() => Array(SCREEN_WIDTH).fill(0)),
    windowScanLines: Array(SCREEN_HEIGHT)
      .fill()
      .map(() => Array(SCREEN_WIDTH).fill(0)),
    spritesScanLines: Array(SCREEN_HEIGHT)
      .fill()
      .map(() => Array(SCREEN_WIDTH).fill(0)),
  };
};

const reset = () => {
  resetData();

  registers = {
    SCROLLY: 0x00,
    SCROLLX: 0x00,
    LCDC_YCOORD: 0x00,
    LCDC_YCOORD_COMPARE: 0x00,
    DMA_TRANSFER_AND_START: 0x00,
    BG_PALETTE: 0x00,
    OBJ_PALETTE0: 0x00,
    OBJ_PALETTE1: 0x00,
    WINY: 0x00,
    WINX: 0x00,

    // LCD_CTRL
    LCD_ENABLED: true,
    WINDOW_TILEMAP: 0,
    WINDOW_ENABLED: false,
    BACKGROUND_AND_WINDOW_TILESET: 0,
    BACKGROUND_TILEMAP: 0,
    SPRITES_SIZE: 0,
    SPRITES_ENABLED: false,
    BACKGROUND_ENABLED: false,

    // LCD STATUS
    MODE: MODES.HBLANK,
    YCOORD_COINCIDENCE_FLAG: 0,
    HBLANK_INTERRUPT: 0,
    VBLANK_INTERRUPT: 0,
    OAM_INTERRUPT: 0,
    YCOORD_COINCIDENCE_INTERRUPT: 0,
  };
};
reset();

const step = stepMachineCycles => {
  if (registers.LCD_ENABLED) {
    if (data.cyclesUntilLCDEnable) {
      data.cyclesUntilLCDEnable--;
      return;
    }
  } else {
    return;
  }

  data.cycles += stepMachineCycles;
  data.modeCycles += stepMachineCycles;

  switch (registers.MODE) {
    case MODES.OAM_SEARCH:
      if (data.modeCycles >= CYCLES_OAM_SEARCH) {
        registers.MODE = MODES.PIXEL_TRANSFER;
        data.modeCycles -= CYCLES_OAM_SEARCH;
      }
      break;

    case MODES.PIXEL_TRANSFER:
      if (data.modeCycles >= CYCLES_PIXEL_TRANSFER) {
        registers.MODE = MODES.HBLANK;
        data.modeCycles -= CYCLES_PIXEL_TRANSFER;

        if (registers.HBLANK_INTERRUPT === 1) {
          interrupts.setLCDStatInterruptFlag();
        }

        renderScanLine();
      }
      break;

    case MODES.HBLANK:
      if (data.modeCycles >= CYCLES_HBLANK) {
        data.modeCycles -= CYCLES_HBLANK;
        registers.LCDC_YCOORD++;

        if (registers.LCDC_YCOORD === registers.LCDC_YCOORD_COMPARE) {
          registers.YCOORD_COINCIDENCE_FLAG = 1;
          if (registers.YCOORD_COINCIDENCE_INTERRUPT === 1) {
            interrupts.setLCDStatInterruptFlag();
          }
        } else {
          registers.YCOORD_COINCIDENCE_FLAG = 0;
        }

        if (registers.LCDC_YCOORD < SCREEN_HEIGHT) {
          registers.MODE = MODES.OAM_SEARCH;

          if (registers.OAM_INTERRUPT === 1) {
            interrupts.setLCDStatInterruptFlag();
          }
        } else {
          registers.MODE = MODES.VBLANK;

          if (registers.VBLANK_INTERRUPT === 1) {
            interrupts.setLCDStatInterruptFlag();
          }
          interrupts.setVBlankInterruptFlag();
        }
      }
      break;

    case MODES.VBLANK:
      if (data.modeCycles >= CYCLES_PER_LINE) {
        data.modeCycles -= CYCLES_PER_LINE;
        registers.LCDC_YCOORD++;

        if (registers.LCDC_YCOORD > SCREEN_HEIGHT + LINES_VBLANK - 1) {
          // Back to new frame
          registers.LCDC_YCOORD = 0;
          registers.MODE = MODES.OAM_SEARCH;
          data.cycles = 0;
          data.windowLineCounter = 0;

          if (
            registers.YCOORD_COINCIDENCE_INTERRUPT === 1 &&
            registers.LCDC_YCOORD === registers.LCDC_YCOORD_COMPARE
          ) {
            registers.YCOORD_COINCIDENCE_FLAG = 1;
            interrupts.setLCDStatInterruptFlag();
          } else {
            registers.YCOORD_COINCIDENCE_FLAG = 0;
          }
        }
      }
      break;

    default:
  }
};

const getCycles = () => data.cycles;

const startDMATransfer = () => {
  const startAddress = registers.DMA_TRANSFER_AND_START * 0x100;
  for (let i = 0; i < 0x9f; i++) {
    mmu.write(mmu.START_OAM + i, mmu.read(startAddress + i));
  }
};

const renderBackgroundScanLine = () => {
  // Tilemap = 32*32
  const tileMapStartAddr =
    registers.BACKGROUND_TILEMAP === 0
      ? START_TILEMAP0_ADDR
      : START_TILEMAP1_ADDR;

  const tileMapRow =
    (registers.LCDC_YCOORD + registers.SCROLLY) % BUFFER_HEIGHT >> 3;
  let tileMapCol = registers.SCROLLX >> 3;

  let tileMapOffset = tileMapStartAddr + tileMapRow * 32 + tileMapCol;
  let tileIdx = getTileIndex(tileMapOffset);

  const tileRow = (registers.LCDC_YCOORD + registers.SCROLLY) % 8;
  const tileStartCol = registers.SCROLLX % 8;

  const backgroundScanLine = new Array(SCREEN_WIDTH).fill(0);

  const backgroundPalette = getBackgroundPalette();

  for (let i = 0; i < SCREEN_WIDTH; i++) {
    if (registers.BACKGROUND_ENABLED) {
      const colorBeforePalette =
        data.tileSet[tileIdx][tileRow][(tileStartCol + i) % 8];

      const color = backgroundPalette[colorBeforePalette];
      backgroundScanLine[i] = color;
    }
    if ((tileStartCol + i + 1) % 8 === 0) {
      tileMapCol = (tileMapCol + 1) % 32;
      tileMapOffset = tileMapStartAddr + tileMapRow * 32 + tileMapCol;
      tileIdx = getTileIndex(tileMapOffset);
    }
  }
  data.backgroundScanLines[registers.LCDC_YCOORD] = backgroundScanLine;
};

const renderWindowScanLine = () => {
  let windowScanLine = new Array(SCREEN_WIDTH).fill(null);

  const tileSet = getTileSet();

  // Tilemap = 32*32
  const tileMapStartAddr =
    registers.WINDOW_TILEMAP === 0 ? START_TILEMAP0_ADDR : START_TILEMAP1_ADDR;

  if (registers.WINDOW_ENABLED && registers.LCDC_YCOORD >= registers.WINY) {
    const tileMapRow = data.windowLineCounter >> 3;
    const tileRow = data.windowLineCounter % 8;
    const backgroundPalette = getBackgroundPalette();

    for (let i = 0; i < SCREEN_WIDTH; i++) {
      if (i >= registers.WINX - 7) {
        const x = i - registers.WINX + 7;

        let tileMapCol = x >> 3;

        let tileMapOffset = tileMapStartAddr + tileMapRow * 32 + tileMapCol;
        let tileIdx = getTileIndex(tileMapOffset);

        const tileCol = x % 8;

        const colorBeforePalette = tileSet[tileIdx][tileRow][tileCol];
        const color = backgroundPalette[colorBeforePalette];
        windowScanLine[i] = color;
      }
    }
    if (SCREEN_WIDTH - 1 >= registers.WINX - 7) {
      data.windowLineCounter++;
    }
  }

  data.windowScanLines[registers.LCDC_YCOORD] = windowScanLine;
};

const renderSpritesScanLine = () => {
  const spritesScanLine = new Array(SCREEN_WIDTH).fill(null);
  const spriteHeight = registers.SPRITES_SIZE === 0 ? 8 : 16;

  if (registers.SPRITES_ENABLED) {
    const visibleSpritesOnLine = getSpritesTable()
      .filter(
        sprite =>
          sprite.x !== 0 &&
          registers.LCDC_YCOORD >= sprite.y - 16 &&
          registers.LCDC_YCOORD < sprite.y - 16 + spriteHeight,
      )
      .slice(0, 10);

    const backgroundLine = data.backgroundScanLines[registers.LCDC_YCOORD];
    const windowLine = data.windowScanLines[registers.LCDC_YCOORD];

    for (let col = 0; col < SCREEN_WIDTH; col++) {
      const spritesForCol = visibleSpritesOnLine
        .filter(sprite => col >= sprite.x - 8 && col < sprite.x)
        .sort((sprite1, sprite2) => (sprite1.x >= sprite2.x ? 1 : -1));

      const spritePixelsForCol = spritesForCol
        .map(sprite => {
          const spriteRow = registers.LCDC_YCOORD - sprite.y + 16;
          const spriteCol = col - (sprite.x - 8);

          const tile =
            registers.SPRITES_SIZE === 0
              ? data.tileSet[sprite.tileIdx]
              : [
                  ...data.tileSet[sprite.tileIdx & 0xfe],
                  ...data.tileSet[sprite.tileIdx | 0x01],
                ];
          const flippedTile = sprite.flipY
            ? tile
                .map(row => (sprite.flipX ? row.slice().reverse() : row))
                .slice()
                .reverse()
            : tile.map(row => (sprite.flipX ? row.slice().reverse() : row));

          const spritePixelColor = flippedTile[spriteRow][spriteCol];

          return {
            color: spritePixelColor,
            priority: sprite.priority,
            palette: sprite.palette,
          };
        })
        .filter(pixel => pixel.color !== 0);

      if (spritePixelsForCol.length > 0) {
        const spritePixelForCol = spritePixelsForCol[0];

        const spritePalette =
          spritePixelForCol.palette === 0
            ? ppu.getObjectPalette0()
            : ppu.getObjectPalette1();

        const spritePriority = spritePixelForCol.priority;
        const spritePixelColor = spritePixelForCol.color;

        const backgroundPixelColor = backgroundLine[col];
        const windowPixelColor = windowLine[col];

        if (
          (spritePriority === 0 && spritePixelColor !== 0) ||
          (!backgroundPixelColor && !windowPixelColor)
        ) {
          spritesScanLine[col] = spritePalette[spritePixelColor];
        }
      }
    }
  }
  data.spritesScanLines[registers.LCDC_YCOORD] = spritesScanLine;
};

const renderScanLine = () => {
  renderBackgroundScanLine();
  renderWindowScanLine();
  renderSpritesScanLine();
};

const renderCanvas = (canvas, backgroundLayer, windowLayer, spritesLayer) => {
  const ctx = canvas.getContext('2d');
  const paletteColors = config.paletteColors.gb2;
  const emptyColor = config.emptyColor;

  const pixels = [];

  for (let row = 0; row < SCREEN_HEIGHT; row++) {
    for (let col = 0; col < SCREEN_WIDTH; col++) {
      const backgroundPixel = paletteColors[data.backgroundScanLines[row][col]];

      const windowPixel = paletteColors[data.windowScanLines[row][col]];

      const spritesPixel = paletteColors[data.spritesScanLines[row][col]];

      const pixel =
        (spritesLayer && spritesPixel !== null && spritesPixel) ||
        (windowLayer && windowPixel !== null && windowPixel) ||
        (backgroundLayer && backgroundPixel !== null && backgroundPixel) ||
        emptyColor;

      pixels[row * 160 * 3 + col * 3 + 0] = pixel[0];
      pixels[row * 160 * 3 + col * 3 + 1] = pixel[1];
      pixels[row * 160 * 3 + col * 3 + 2] = pixel[2];
    }
  }

  const imageData = ctx.createImageData(160, 144);
  for (let i = 0; i < pixels.length / 3; i++) {
    const x = i % 160;
    const y = Math.floor(i / 160);
    const offset = (y * 160 + x) * 4;
    imageData.data[offset] = pixels[3 * i];

    imageData.data[offset + 1] = pixels[3 * i + 1];
    imageData.data[offset + 2] = pixels[3 * i + 2];
    imageData.data[offset + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
};

const getTileIndex = tileMapAddress => {
  const tileIdx = mmu.read(tileMapAddress);
  const signedTileIdx = getSignedByte(tileIdx);
  const tileIdxCorrected =
    registers.BACKGROUND_AND_WINDOW_TILESET === 1
      ? tileIdx
      : 256 + signedTileIdx;
  return tileIdxCorrected;
};

const getTileSet = () => {
  return data.tileSetWithBackgroundPalette;
};

const getTileMaps = () => {
  const tileSet = getTileSet();

  const tileMaps = Array(2)
    .fill()
    .map(() =>
      Array(BUFFER_HEIGHT)
        .fill()
        .map(() => Array(BUFFER_WIDTH).fill(0)),
    );

  const backgroundPalette = getBackgroundPalette();

  for (let tileMapIdx = 0; tileMapIdx < 2; tileMapIdx++) {
    const tileMapStartAddr =
      tileMapIdx === 0 ? START_TILEMAP0_ADDR : START_TILEMAP1_ADDR;

    for (let row = 0; row < BUFFER_HEIGHT; row++) {
      for (let col = 0; col < BUFFER_WIDTH; col++) {
        const tileMapAddress = tileMapStartAddr + (row >> 3) * 32 + (col >> 3);
        const tile = tileSet[getTileIndex(tileMapAddress)];
        tileMaps[tileMapIdx][row][col] =
          backgroundPalette[tile[row % 8][col % 8]];
      }
    }
  }

  return tileMaps;
};

const getAllLayers = () => {};

const getBackgroundLayer = () => {
  return data.backgroundScanLines;
};

const getWindowLayer = () => {
  return data.windowScanLines;
};

const getSpritesLayer = () => {
  return data.spritesScanLines;
};

const ppu = {
  getBackgroundPalette,
  getObjectPalette0,
  getObjectPalette1,
  getScrollX,
  getScrollY,
  getWindowX,
  getWindowY,

  getTileSet,
  getTileMaps,
  getSpritesTable,
  getSprite,

  getAllLayers,
  getBackgroundLayer,
  getWindowLayer,
  getSpritesLayer,

  getLCDCBackgroundEnable,
  getLCDCObjectEnable,
  getLCDCObjectSize,
  getLCDCBackgroundTilemap,
  getLCDCBackgroundAndWindowTileset,
  getLCDCWindowEnable,
  getLCDCWindowTilemap,
  getLCDCLCDEnable,

  read,
  write,
  reset,

  step,
  getCycles,

  START_TILESET1_ADDR,
  END_TILESET0_ADDR,
  updateTile,

  renderCanvas,
};

export default ppu;
