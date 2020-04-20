import mmu from '../mmu/mmu';

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
const LCD_CTRL_BG_TILEMAP_ADDRESS_BIT = 3;
const LCD_CTRL_BG_AND_WINDOW_TILEMAP_ADDRESS_BIT = 4;
const LCD_CTRL_WINDOW_ENABLE_BIT = 5;
const LCD_CTRL_WINDOW_TILEMAP_ADDRESS_BIT = 6;
const LCD_CTRL_LCD_ENABLE_BIT = 7;

const getLCDCBackgroundEnable = () =>
  mmu.readBit(LCD_CTRL_ADDR, LCD_CTRL_BACKGROUND_ENABLE_BIT);
const getLCDCObjectEnable = () =>
  mmu.readBit(LCD_CTRL_ADDR, LCD_CTRL_OBJ_ENABLE_BIT);
const getLCDCObjectSize = () =>
  mmu.readBit(LCD_CTRL_ADDR, LCD_CTRL_OBJ_SIZE_BIT);
const getLCDCBackgroundTilemapAdress = () =>
  mmu.readBit(LCD_CTRL_ADDR, LCD_CTRL_BG_TILEMAP_ADDRESS_BIT);
const getLCDCBackgroundAndWindowTilemapAdress = () =>
  mmu.readBit(LCD_CTRL_ADDR, LCD_CTRL_BG_AND_WINDOW_TILEMAP_ADDRESS_BIT);
const getLCDCWindowEnable = () =>
  mmu.readBit(LCD_CTRL_ADDR, LCD_CTRL_WINDOW_ENABLE_BIT);
const getLCDCWindowTilemapAdress = () =>
  mmu.readBit(LCD_CTRL_ADDR, LCD_CTRL_WINDOW_TILEMAP_ADDRESS_BIT);
const getLCDCLCDEnable = () =>
  mmu.readBit(LCD_CTRL_ADDR, LCD_CTRL_LCD_ENABLE_BIT);

const SCREEN_WIDTH = 160;
const SCREEN_HEIGHT = 144;
const BUFFER_WIDTH = 256; // TODO check
const BUFFER_HEIGHT = 256; // TODO check

const CYCLES_OAM_SEARCH = 20;
const CYCLES_PIXEL_TRANSFER = 43;
const CYCLES_HBLANK = 51;
const LINES_VBLANK = 10;
const CYCLES_COMPLETE_FRAME =
  (SCREEN_HEIGHT + LINES_VBLANK) *
  (CYCLES_OAM_SEARCH + CYCLES_PIXEL_TRANSFER + CYCLES_HBLANK); // 17556

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

const getBackgroundPalette = () => getPalette(BG_PALETTE_ADDR);
const getObjectPalette0 = () => getPalette(OBJ_PALETTE0_ADDR);
const getObjectPalette1 = () => getPalette(OBJ_PALETTE1_ADDR);

const getScrollX = () => mmu.read(SCROLLX_ADDR);
const getScrollY = () => mmu.read(SCROLLY_ADDR);

const getWindowX = () => mmu.read(WINX_ADDR);
const getWindowY = () => mmu.read(WINY_ADDR);

const ppu = {
  getBackgroundPalette,
  getObjectPalette0,
  getObjectPalette1,
  getScrollX,
  getScrollY,
  getWindowX,
  getWindowY,

  getLCDCBackgroundEnable,
  getLCDCObjectEnable,
  getLCDCObjectSize,
  getLCDCBackgroundTilemapAdress,
  getLCDCBackgroundAndWindowTilemapAdress,
  getLCDCWindowEnable,
  getLCDCWindowTilemapAdress,
  getLCDCLCDEnable,
};

export default ppu;