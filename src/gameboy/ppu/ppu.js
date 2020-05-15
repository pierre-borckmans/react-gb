import mmu from '../mmu/mmu';
import interrupts from '../interrupts/interrupts';

import { format, readBit } from '../../utils/utils';

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
const END_TILESET1_ADDR = 0x8fff;
const START_TILESET0_ADDR = 0x8800;
const END_TILESET0_ADDR = 0x97ff;
const START_TILEMAP0_ADDR = 0x9800;
const END_TILEMAP0_ADDR = 0x9bff;
const START_TILEMAP1_ADDR = 0x9c00;
const END_TILEMAP1_ADDR = 0x9fff;

// LCD CONTROL
const LCD_CTRL_BACKGROUND_ENABLE_BIT = 0;
const LCD_CTRL_OBJ_ENABLE_BIT = 1;
const LCD_CTRL_OBJ_SIZE_BIT = 2;
const LCD_CTRL_BG_TILEMAP_BIT = 3;
const LCD_CTRL_BG_AND_WINDOW_TILESET_BIT = 4;
const LCD_CTRL_WINDOW_ENABLE_BIT = 5;
const LCD_CTRL_WINDOW_TILEMAP_BIT = 6;
const LCD_CTRL_LCD_ENABLE_BIT = 7;

let registers = {};
let data = {};

const getLCDCBackgroundEnable = () =>
  readBit(registers.LCD_CTRL, LCD_CTRL_BACKGROUND_ENABLE_BIT);
const getLCDCObjectEnable = () =>
  readBit(registers.LCD_CTRL, LCD_CTRL_OBJ_ENABLE_BIT);
const getLCDCObjectSize = () =>
  readBit(registers.LCD_CTRL, LCD_CTRL_OBJ_SIZE_BIT);
const getLCDCBackgroundTilemapAdress = () =>
  readBit(registers.LCD_CTRL, LCD_CTRL_BG_TILEMAP_BIT);
const getLCDCBackgroundAndWindowTilemapAdress = () =>
  readBit(registers.LCD_CTRL, LCD_CTRL_BG_AND_WINDOW_TILESET_BIT);
const getLCDCWindowEnable = () =>
  readBit(registers.LCD_CTRL, LCD_CTRL_WINDOW_ENABLE_BIT);
const getLCDCWindowTilemapAdress = () =>
  readBit(registers.LCD_CTRL, LCD_CTRL_WINDOW_TILEMAP_BIT);
const getLCDCLCDEnable = () =>
  readBit(registers.LCD_CTRL, LCD_CTRL_LCD_ENABLE_BIT);

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
const CYCLES_COMPLETE_FRAME = (SCREEN_HEIGHT + LINES_VBLANK) * CYCLES_PER_LINE; // 17556

const MODES = {
  OAM_SEARCH: 2,
  PIXEL_TRANSFER: 3,
  HBLANK: 0,
  VBLANK: 1,
};

// 17556 cycles/frames * 60 fps = 1053360 cycles / s
// 1mbHz (1024*1024) / 17556 cycles/frames = 59.7275 fps

const getPalette = (addr) => {
  const paletteByte = mmu.read(addr);
  const palette = [
    (paletteByte & 0x03) >> 0,
    (paletteByte & 0x0c) >> 2,
    (paletteByte & 0x30) >> 4,
    (paletteByte & 0xc0) >> 6,
  ];
  return palette;
};

const getTileSet = () => {
  // 384 tiles
  // 8x8 pixels
  // each pixel = 2 bits
  // each row = 8 pixels * 2 bits = 2 bytes
  // each tile = 8 rows = 16 bytes

  // 2 maps of 32x32 tiles
  // one map can be used at a time
  // each map can only use max 256 different tiles

  const tileSet = [];
  for (let tile = 0; tile < 384; tile++) {
    tileSet[tile] = [];
    for (let row = 0; row < 8; row++) {
      tileSet[tile][row] = [];
      const offset = 0x8000 + tile * 16 + row * 2;
      const byte1 = mmu.read(offset);
      const byte2 = mmu.read(offset + 1);
      for (let col = 7; col >= 0; col--) {
        const bit1 = (byte1 & (0x01 << col)) >> col;
        const bit2 = (byte2 & (0x01 << col)) >> col;
        const pixel = (bit2 << 1) + bit1;
        tileSet[tile][row][7 - col] = pixel;
      }
    }
  }
  return tileSet;
};

const getBackgroundPalette = () => getPalette(BG_PALETTE_ADDR);
const getObjectPalette0 = () => getPalette(OBJ_PALETTE0_ADDR);
const getObjectPalette1 = () => getPalette(OBJ_PALETTE1_ADDR);

const getScrollX = () => mmu.read(SCROLLX_ADDR);
const getScrollY = () => mmu.read(SCROLLY_ADDR);

const getWindowX = () => mmu.read(WINX_ADDR);
const getWindowY = () => mmu.read(WINY_ADDR);

const read = (address) => {
  switch (address) {
    case LCD_CTRL_ADDR:
      return registers.LCD_CTRL;
    case LCDC_STATUS_ADDR:
      return registers.LCDC_STATUS;
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
      registers.LCD_CTRL = value;
      break;
    case LCDC_STATUS_ADDR:
      registers.LCDC_STATUS = value;
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
        `Trying to write to invalid ppu address ${format('hex', address, 16)}`
      );
  }
};

const reset = () => {
  data = {
    cycles: 0,
    mode: MODES.HBLANK,
    modeCycles: 0,
    scanLines: new Array(SCREEN_HEIGHT).fill(
      new Int8Array(SCREEN_HEIGHT).fill(0)
    ),
  };

  registers = {
    LCD_CTRL: 0x00,
    LCDC_STATUS: 0x00,
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

    BG_MAP: 0,
  };
};
reset();

const step = (stepMachineCycles) => {
  data.cycles += stepMachineCycles;
  data.modeCycles += stepMachineCycles;

  switch (data.mode) {
    case MODES.OAM_SEARCH:
      if (data.modeCycles >= CYCLES_OAM_SEARCH) {
        data.mode = MODES.PIXEL_TRANSFER;
        data.modeCycles = 0;
      }
      break;

    case MODES.PIXEL_TRANSFER:
      if (data.modeCycles >= CYCLES_PIXEL_TRANSFER) {
        data.mode = MODES.HBLANK;
        data.modeCycles = 0;

        // renderScanLine();
      }
      break;

    case MODES.HBLANK:
      if (data.modeCycles >= CYCLES_HBLANK) {
        data.modeCycles = 0;
        registers.LCDC_YCOORD++;

        if (registers.LCDC_YCOORD < SCREEN_HEIGHT - 1) {
          data.mode = MODES.OAM_SEARCH;
        } else {
          data.mode = MODES.VBLANK;
          // renderCanvas();
        }
      }
      break;

    case MODES.VBLANK:
      if (data.modeCycles >= CYCLES_PER_LINE) {
        data.modeCycles = 0;
        registers.LCDC_YCOORD++;

        if (registers.LCDC_YCOORD > SCREEN_HEIGHT + LINES_VBLANK - 1) {
          // Back to new frame
          registers.LCDC_YCOORD = 0;
          data.mode = MODES.OAM_SEARCH;
          interrupts.setVBlankInterruptFlag();
        }
      }
      break;
  }
};

const renderScanLine = () => {
  const tileSet = getTileSet();

  // Tilemap = 32*32
  const tileMapStartAddr =
    registers.BG_MAP === 0 ? START_TILEMAP0_ADDR : START_TILEMAP1_ADDR;

  const tileMapRow = ((registers.LCDC_YCOORD + registers.SCROLLY) & 255) >> 5;
  let tileMapCol = registers.SCROLLX >> 5;

  let tileMapOffset = tileMapStartAddr + tileMapRow * 32 + tileMapCol;
  let tileIdx = mmu.read(tileMapOffset);

  const tileRow = (registers.LCDC_YCOORD + registers.SCROLLY) % 8;
  const tileStartCol = registers.SCROLLY % 8;

  const scanLine = new Uint8Array(SCREEN_WIDTH);

  for (let i = 0; i < SCREEN_WIDTH; i++) {
    scanLine[i] = tileSet[tileIdx][tileRow][(tileStartCol + i) % 8];
    if ((tileStartCol + i + 1) % 8 === 0) {
      tileMapCol = (tileMapCol + 1) % 32;
      tileMapOffset = tileMapStartAddr + tileMapRow * 32 + tileMapCol;
      tileIdx = mmu.read(tileMapOffset);
    }
  }

  data.scanLines[registers.LCDC_YCOORD] = scanLine;
};

const getScanLines = () => data.scanLines;

const getBackground = () => {
  const tileSet = getTileSet();
  const background = Array(256)
    .fill()
    .map(() => Array(256).fill(0));

  // Tilemap = 32*32
  const tileMapStartAddr =
    registers.BG_MAP === 0 ? START_TILEMAP0_ADDR : START_TILEMAP1_ADDR;

  for (let row = 0; row < 256; row++) {
    for (let col = 0; col < 256; col++) {
      const tileMapAddress = tileMapStartAddr + (col >> 3) + (row >> 3) * 32;
      const tileIdx = mmu.read(tileMapAddress);
      const tile = tileSet[tileIdx];
      background[row][col] = tile[row % 8][col % 8];
    }
  }

  return background;
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
  getBackground,
  getScanLines,

  getLCDCBackgroundEnable,
  getLCDCObjectEnable,
  getLCDCObjectSize,
  getLCDCBackgroundTilemapAdress,
  getLCDCBackgroundAndWindowTilemapAdress,
  getLCDCWindowEnable,
  getLCDCWindowTilemapAdress,
  getLCDCLCDEnable,

  read,
  write,
  reset,

  step,
};

export default ppu;
