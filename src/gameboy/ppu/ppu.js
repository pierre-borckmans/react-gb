import mmu from '../mmu/mmu';
import { readBit } from '../../utils/utils';

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

const reset = () => {
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
  };
};
reset();

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
const LINES_VBLANK = 10;
const CYCLES_COMPLETE_FRAME =
  (SCREEN_HEIGHT + LINES_VBLANK) *
  (CYCLES_OAM_SEARCH + CYCLES_PIXEL_TRANSFER + CYCLES_HBLANK); // 17556

// 17556 cycles/frames * 60 fps = 1053360 cycles / s
// 1mbHz (1024*1024) / 17556 cycles/frames = 59.7275 fps

// 8000-87FF	Tile set #1: tiles 0-127
// 8800-8FFF	Tile set #1: tiles 128-255
//            OR
//            Tile set #0: tiles -1 to -128
// 9000-97FF	Tile set #0: tiles 0-127
// 9800-9BFF	Tile map #0
// 9C00-9FFF	Tile map #1

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
      return registers.LCD_CTRL_ADDR;
    case LCDC_STATUS_ADDR:
      return registers.LCDC_STATUS_ADDR;
    case SCROLLY_ADDR:
      return registers.SCROLLY_ADDR;
    case SCROLLX_ADDR:
      return registers.SCROLLX_ADDR;
    case LCDC_YCOORD_ADDR:
      return registers.LCDC_YCOORD_ADDR;
    case LCDC_YCOORD_COMPARE_ADDR:
      return registers.LCDC_YCOORD_COMPARE_ADDR;
    case DMA_TRANSFER_AND_START_ADDR:
      return registers.DMA_TRANSFER_AND_START_ADDR;
    case BG_PALETTE_ADDR:
      return registers.BG_PALETTE_ADDR;
    case OBJ_PALETTE0_ADDR:
      return registers.OBJ_PALETTE0_ADDR;
    case OBJ_PALETTE1_ADDR:
      return registers.OBJ_PALETTE1_ADDR;
    case WINY_ADDR:
      return registers.WINY_ADDR;
    case WINX_ADDR:
      return registers.WINX_ADDR;
    default:
      throw new Error(`Trying to read from invalid ppu address ${address}`);
  }
};

const write = (address, value) => {
  switch (address) {
    case LCD_CTRL_ADDR:
      registers.LCD_CTRL_ADDR = value;
      break;
    case LCDC_STATUS_ADDR:
      registers.LCDC_STATUS_ADDR = value;
      break;
    case SCROLLY_ADDR:
      registers.SCROLLY_ADDR = value;
      break;
    case SCROLLX_ADDR:
      registers.SCROLLX_ADDR = value;
      break;
    case LCDC_YCOORD_ADDR:
      registers.LCDC_YCOORD_ADDR = value;
      break;
    case LCDC_YCOORD_COMPARE_ADDR:
      registers.LCDC_YCOORD_COMPARE_ADDR = value;
      break;
    case DMA_TRANSFER_AND_START_ADDR:
      registers.DMA_TRANSFER_AND_START_ADDR = value;
      break;
    case BG_PALETTE_ADDR:
      registers.BG_PALETTE_ADDR = value;
      break;
    case OBJ_PALETTE0_ADDR:
      registers.OBJ_PALETTE0_ADDR = value;
      break;
    case OBJ_PALETTE1_ADDR:
      registers.OBJ_PALETTE1_ADDR = value;
      break;
    case WINY_ADDR:
      registers.WINY_ADDR = value;
      break;
    case WINX_ADDR:
      registers.WINX_ADDR = value;
      break;
    default:
      throw new Error(`Trying to write to invalid ppu address ${address}`);
  }
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
};

export default ppu;
