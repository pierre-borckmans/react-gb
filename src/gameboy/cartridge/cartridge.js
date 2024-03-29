import mmu from '../mmu/mmu';

import rom from '../../assets/roms/rom10.gb';
// import rom from '../../assets/roms/lsdj.gb';

// -------- Mooneye GB: ACCEPTANCE -------------------------------------------
// import rom from "../../assets/roms/tests/mooneye/acceptance/add_sp_e_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_div-S.gb";
// import rom from '../../assets/roms/tests/mooneye/acceptance/boot_div-dmg0.gb';
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_div-dmgABCmgb.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_div2-S.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_hwio-S.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_hwio-dmg0.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_hwio-dmgABCmgb.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_regs-dmg0.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_regs-dmgABC.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_regs-mgb.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_regs-sgb.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/boot_regs-sgb2.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/call_cc_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/call_cc_timing2.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/call_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/call_timing2.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/di_timing-GS.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/div_timing.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/acceptance/ei_sequence.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/ei_timing.gb";
// import rom from '../../assets/roms/tests/mooneye/acceptance/halt_ime0_ei.gb'; // PASS
// import rom from '../../assets/roms/tests/mooneye/acceptance/halt_ime0_nointr_timing.gb';
// import rom from "../../assets/roms/tests/mooneye/acceptance/halt_ime1_timing.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/acceptance/halt_ime1_timing2-GS.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/if_ie_registers.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/intr_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/jp_cc_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/jp_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/ld_hl_sp_e_timing.gb";
// import rom from '../../assets/roms/tests/mooneye/acceptance/oam_dma_restart.gb'; // PASS
// import rom from '../../assets/roms/tests/mooneye/acceptance/oam_dma_start.gb';
// import rom from '../../assets/roms/tests/mooneye/acceptance/oam_dma_timing.gb'; // PASS
// import rom from "../../assets/roms/tests/mooneye/acceptance/pop_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/push_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/rapid_di_ei.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/ret_cc_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/ret_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/reti_intr_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/reti_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/acceptance/rst_timing.gb";
// --------------------------------------------------------------------

// -------- Mooneye GB: BITS -------------------------------------------
// import rom from "../../assets/roms/tests/mooneye/bits/mem_oam.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/bits/reg_f.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/bits/unused_hwio-GS.gb";
// --------------------------------------------------------------------

// -------- Mooneye GB: TIMER -------------------------------------------
// import rom from '../../assets/roms/tests/mooneye/timer/tim00.gb';
// import rom from "../../assets/roms/tests/mooneye/timer/tim01.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tim10.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tim11.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tim00_div_trigger.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tim01_div_trigger.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tim10_div_trigger.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tim11_div_trigger.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/div_write.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/timer/rapid_toggle.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tima_reload.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tima_write_reloading.gb";
// import rom from "../../assets/roms/tests/mooneye/timer/tma_write_reloading.gb";
// --------------------------------------------------------------------

// -------- Mooneye GB: OAM DMA -------------------------------------------
// import rom from "../../assets/roms/tests/mooneye/oam_dma/basic.gb"; // PASS
// import rom from '../../assets/roms/tests/mooneye/oam_dma/reg_read.gb'; // PASS
// import rom from '../../assets/roms/tests/mooneye/oam_dma/sources-GS.gb';
// --------------------------------------------------------------------

// import rom from "../../assets/roms/tests/mooneye/serial/boot_sclk_align-dmgABCmgb.gb";
// import rom from '../../assets/roms/tests/mooneye/instr/daa.gb'; // PASS

// -------- Mooneye GB: PPU -------------------------------------------
// All fail for now
// import rom from '../../assets/roms/tests/mooneye/ppu/hblank_ly_scx_timing-GS.gb';
// import rom from '../../assets/roms/tests/mooneye/ppu/intr_1_2_timing-GS.gb';
// import rom from '../../assets/roms/tests/mooneye/ppu/intr_2_0_timing.gb';
// import rom from "../../assets/roms/tests/mooneye/ppu/intr_2_mode0_timing_sprites.gb";
// import rom from "../../assets/roms/tests/mooneye/ppu/intr_2_mode0_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/ppu/intr_2_mode3_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/ppu/intr_2_oam_ok_timing.gb";
// import rom from "../../assets/roms/tests/mooneye/ppu/lcdon_timing-GS.gb";
// import rom from "../../assets/roms/tests/mooneye/ppu/lcdon_write_timing-GS.gb";
// import rom from '../../assets/roms/tests/mooneye/ppu/stat_irq_blocking.gb';
// import rom from '../../assets/roms/tests/mooneye/ppu/stat_lyc_onoff.gb';
// import rom from "../../assets/roms/tests/mooneye/ppu/vblank_stat_intr-GS.gb";
// --------------------------------------------------------------------

// -------- Mooneye GB: MBC1 -------------------------------------------
// import rom from "../../assets/roms/tests/mooneye/mbc1/bits_bank1.gb";  // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/bits_bank2.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/bits_mode.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/bits_ramg.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/ram_64kb.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/ram_256kb.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/rom_512kb.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/rom_1Mb.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/rom_2Mb.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/rom_4Mb.gb"; // PASS
// import rom from "../../assets/roms/tests/mooneye/mbc1/rom_8Mb.gb"; // PASS
// import rom from '../../assets/roms/tests/mooneye/mbc1/rom_16Mb.gb'; // PASS
// --------------------------------------------------------------------

import testRomCpu1 from '../../assets/roms/tests/cpu_instrs/01-special.gb';
import testRomCpu2 from '../../assets/roms/tests/cpu_instrs/02-interrupts.gb';
import testRomCpu3 from '../../assets/roms/tests/cpu_instrs/03-op sp,hl.gb';
import testRomCpu4 from '../../assets/roms/tests/cpu_instrs/04-op r,imm.gb';
import testRomCpu5 from '../../assets/roms/tests/cpu_instrs/05-op rp.gb';
import testRomCpu6 from '../../assets/roms/tests/cpu_instrs/06-ld r,r.gb';
import testRomCpu7 from '../../assets/roms/tests/cpu_instrs/07-jr,jp,call,ret,rst.gb';
import testRomCpu8 from '../../assets/roms/tests/cpu_instrs/08-misc instrs.gb';
import testRomCpu9 from '../../assets/roms/tests/cpu_instrs/09-op r,r.gb';
import testRomCpu10 from '../../assets/roms/tests/cpu_instrs/10-bit ops.gb';
import testRomCpu11 from '../../assets/roms/tests/cpu_instrs/11-op a,(hl).gb';
import testRomCpuAll from '../../assets/roms/tests/cpu_instrs.gb';
import testRomInstrTimingAll from '../../assets/roms/tests/instr_timing.gb';
import testRomMemTiming1 from '../../assets/roms/tests/mem_timing/01-read_timing.gb';
import testRomMemTiming2 from '../../assets/roms/tests/mem_timing/02-write_timing.gb';
import testRomMemTiming3 from '../../assets/roms/tests/mem_timing/03-modify_timing.gb';
import testRomMemTimingAll from '../../assets/roms/tests/mem_timing.gb';
import testRomMemTiming2All from '../../assets/roms/tests/mem_timing2.gb';
import testRomInterruptTiming from '../../assets/roms/tests/interrupt_time.gb';
import testRomHaltBug from '../../assets/roms/tests/halt_bug.gb';
import testRomPpuDmgAcid2 from '../../assets/roms/tests/ppu/dmg-acid2.gb';

import { range } from 'lodash';
import externalRam from '../mmu/externalRam/externalRam';

const testRoms = {
  'test cpu: 1 special': testRomCpu1,
  'test cpu: 2 interrupts': testRomCpu2,
  'test cpu: 3 op sp,hl': testRomCpu3,
  'test cpu: 4 op r,imm': testRomCpu4,
  'test cpu: 5 op rp': testRomCpu5,
  'test cpu: 6 ld r,r': testRomCpu6,
  'test cpu: 7 jr,jp,call,ret,rst': testRomCpu7,
  'test cpu: 8 misc': testRomCpu8,
  'test cpu: 9 op r,r': testRomCpu9,
  'test cpu: 10 bit ops': testRomCpu10,
  'test cpu: 11 op a,(hl)': testRomCpu11,
  'test cpu: all': testRomCpuAll,
  'test timing: instr': testRomInstrTimingAll,
  'test timing: mem: 1 read': testRomMemTiming1,
  'test timing: mem: 2 write': testRomMemTiming2,
  'test timing: mem: 3 modify': testRomMemTiming3,
  'test timing: mem: all': testRomMemTimingAll,
  'test timing: mem2: all': testRomMemTiming2All,
  'test timing: interrupt': testRomInterruptTiming,
  'test bug: halt': testRomHaltBug,
  'test ppu: dmg acid2': testRomPpuDmgAcid2,
};

const SIZE = 0x80000;

// const NINTENDO_LOGO_START_ADDR = 0x104;
// const NINTENDO_LOGO_END_ADDR = 0x133;
const TITLE_START_ADDR = 0x134;
const TITLE_END_ADDR = 0x142;
const GB_OR_CGB_ADDR = 0x143; // CGB if 0x80, CGB only if 0xC0
const NEW_LICENSEE_CODE_START_ADDR = 0x144;
const NEW_LICENSEE_CODE_END_ADDR = 0x145;
const OLD_LICENSEE_CODE_ADDR = 0x14b;
const GB_OR_SGB_ADDR = 0x146; // SGB if 0x80

const CARTRIDGE_TYPE_ADDR = 0x147;
// 00 ROM ONLY                              11 ROM + MB3
// 01 ROM + MBC1                            12 ROM + MBC3 + RAM
// 02 ROM + MBC1 + RAM                      13 ROM + MBC3 + RAM + BATTERY
// 03 ROM + MBC1 + RAM + BATTERY            19 ROM + MBC5
// 05 ROM + MBC2                            1A ROM + MBC5 + RAM
// 06 ROM + MBC2 + BATTERY                  1B ROM + MBC5 + RAM + BATTERY
// 08 ROM + RAM                             1C ROM + MBC5 + RUMBLE
// 09 ROM + RAM + BATTERY                   1D ROM + MBC5 + RUMBLE + SRAM
// 0B ROM + MMM01                           1E ROM + MBC5 + RUMBLE + SRAM + BATTERY
// 0C ROM + MMM01 + SRAM                    FE POCKET CAMERA
// 0D ROM + MMM01 + SRAM + BATTERY          FD BANDAI TAMA5
// 0F ROM + MBC3 + TIMER + BATTERY          FE HUDSON HUC3
// 10 ROM + MBC3 + TIMER + RAM + BATTERY    FF HUDSON HUC1 + RAM + BATTERY

const ROM_SIZE_ADDR = 0x148;
// 00   32 KByte -   2 banks
// 01   64 KByte -   4 banks
// 02  128 KByte -   8 banks
// 03  256 KByte -  16 banks
// 04  512 KByte -  32 banks
// 05 1024 KByte -  64 banks
// 06 2048 KByte - 128 banks
// 52 1152 KByte -  72 banks
// 53 1280 KByte -  80 banks
// 54 1536 KByte -  96 banks

const RAM_SIZE_ADDR = 0x149;
// 00 None
// 01    2 KByte -  1 bank
// 02    8 Kbyte -  1 bank
// 03   32 KByte -  4 banks
// 04  128 KByte - 16 banks

const DESTINATION_CODE_ADDR = 0x14a;
// 00 Japan
// != 0 NON Japan

// const COMPLEMENT_CHECK_ADDR = 0x14d;

let loadedROM = new Uint8Array(SIZE).fill(0);

// prettier-ignore
const bootROM = [
  0x31, 0xFE, 0xFF, 0xAF, 0x21, 0xFF, 0x9F, 0x32, 0xCB, 0x7C, 0x20, 0xFB, 0x21, 0x26, 0xFF, 0x0E,
  0x11, 0x3E, 0x80, 0x32, 0xE2, 0x0C, 0x3E, 0xF3, 0xE2, 0x32, 0x3E, 0x77, 0x77, 0x3E, 0xFC, 0xE0,
  0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1A, 0xCD, 0x95, 0x00, 0xCD, 0x96, 0x00, 0x13, 0x7B,
  0xFE, 0x34, 0x20, 0xF3, 0x11, 0xD8, 0x00, 0x06, 0x08, 0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9,
  0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20,
  0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04,
  0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2,
  0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06,
  0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xE2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20,
  0x4F, 0x16, 0x20, 0x18, 0xCB, 0x4F, 0x06, 0x04, 0xC5, 0xCB, 0x11, 0x17, 0xC1, 0xCB, 0x11, 0x17,
  0x05, 0x20, 0xF5, 0x22, 0x23, 0x22, 0x23, 0xC9, 0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B,
  0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D, 0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E,
  0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99, 0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC,
  0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E, 0x3C, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x3C,
  0x21, 0x04, 0x01, 0x11, 0xA8, 0x00, 0x1A, 0x13, 0xBE, 0x20, 0xFE, 0x23, 0x7D, 0xFE, 0x34, 0x20,
  0xF5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xFB, 0x86, 0x20, 0xFE, 0x3E, 0x01, 0xE0, 0x50,
];

const loadROM = async romName => {
  await fetch(romName ? testRoms[romName] : rom)
    .then(raw => raw.arrayBuffer())
    .then(buffer => (loadedROM = [...new Uint8Array(buffer)]))
    .then(() => externalRam.reset());
};

const getTypeNumber = () => loadedROM[CARTRIDGE_TYPE_ADDR];

const read = address => {
  if (address <= 0xff && !mmu.isBootComplete()) {
    return bootROM[address];
  } else {
    return loadedROM[address];
  }
};

const write = (address, value) => {
  // throw new Error('Trying to write to the ROM');
  // TODO: this should not be allowed, right?
  loadedROM[address] = value;
};

const reset = () => {
  loadedROM = new Array(SIZE).fill(0);
};

const getTitle = () =>
  range(TITLE_START_ADDR, TITLE_END_ADDR)
    .map(addr => String.fromCharCode(loadedROM[addr]))
    .join('');

const getRegion = () =>
  loadedROM[DESTINATION_CODE_ADDR] ? 'Non-Japan' : 'Japan';

const getCGB = () => loadedROM[GB_OR_CGB_ADDR] === 0x80;

const getLicensee = () => {
  // prettier-ignore
  const oldLicensees = {
     '0':'none',                '1':'nintendo',                '8': 'capcom',
    '09':'hot-b',              '0A':'jaleco',                 '0B': 'coconuts',
    '0C':'elite systems',      '13':'electronic arts',        '18': 'hudsonsoft',
    '19':'itc entertainment',  '1A':'yanoman',                '1D': 'clary',
    '1F':'virgin',             '24':'pcm complete',           '25': 'san-x',
    '28':'kotobuki systems',   '29':'seta',                   '30': 'infogrames',
    '31':'nintendo',           '32':'bandai',                 '33': '"see above"',
    '34':'konami',             '35':'hector',                 '38': 'capcom',
    '39':'banpresto',          '3C':'*entertainment i',       '3E': 'gremlin',
    '41':'ubi soft',           '42':'atlus',                  '44': 'malibu',
    '46':'angel',              '47':'spectrum holoby',        '49': 'irem',
    '4A':'virgin',             '4D':'malibu',                 '4F': 'u.s. gold',
    '50':'absolute',           '51':'acclaim',                '52': 'activision',
    '53':'american sammy',     '54':'gametek',                '55': 'park place',
    '56':'ljn',                '57':'matchbox',               '59': 'milton bradley',
    '5A':'mindscape',          '5B':'romstar',                '5C': 'naxat soft',
    '5D':'tradewest',          '60':'titus',                  '61': 'virgin',
    '67':'ocean',              '69':'electronic arts',        '6E': 'elite systems',
    '6F':'electro brain',      '70':'infogrames',             '71': 'interplay',
    '72':'broderbund',         '73':'sculptered soft',        '75': 'the sales curve',
    '78':'t*hq',               '79':'accolade',               '7A': 'triffix entertainment',
    '7C':'microprose',         '7F':'kemco',                  '80': 'misawa entertainment',
    '83':'lozc',               '86':'*tokuma shoten i',       '8B': 'bullet-proof software',
    '8C':'vic tokai',          '8E':'ape',                    '8F': 'i-max',
    '91':'chun soft',          '92':'video system',           '93': 'tsuburava',
    '95':'varie',              '96':'yonezawa/s pal',         '97': 'kaneko',
    '99':'arc',                '9A':'nihon bussan',           '9B': 'tecmo',
    '9C':'imagineer',          '9D':'banpresto',              '9F': 'nova',
    'A1':'hori electric',      'A2':'bandai',                 'A4': 'konami',
    'A6':'kawada',             'A7':'takara',                 'A9': 'technos japan',
    'AA':'broderbund',         'AC':'toei animation',         'AD': 'toho',
    'AF':'namco',              'B0':'acclaim',                'B1': 'ascii or nexoft',
    'B2':'bandai',             'B4':'enix',                   'B6': 'hal',
    'B7':'snk',                'B9':'pony canyon',            'BA': '*culture brain o',
    'BB':'sunsoft',            'BD':'sony imagesoft',         'BF': 'sammy',
    'C0':'taito',              'C2':'kemco',                  'C3': 'squaresoft',
    'C4':'*tokuma shoten i',   'C5':'data east',              'C6': 'tonkin house',
    'C8':'koei',               'C9':'ufl',                    'CA': 'ultra',
    'CB':'vap',                'CC':'use',                    'CD': 'meldac',
    'CE':'*pony canyon or',    'CF':'angel',                  'D0': 'taito',
    'D1':'sofel',              'D2':'quest',                  'D3': 'sigma enterprises',
    'D4':'ask kodansha',       'D6':'naxat soft',             'D7': 'copya systems',
    'D9':'banpresto',          'DA':'tomy',                   'DB': 'ljn',
    'DD':'ncs',                'DE':'human',                  'DF': 'altron',
    'E0':'jaleco',             'E1':'towachiki',              'E2': 'uutaka',
    'E3':'varie',              'E5':'epoch',                  'E7': 'athena',
    'E8':'asmik',              'E9':'natsume',                'EA': 'king records',
    'EB':'atlus',              'EC':'epic/sony records',      'EE': 'igs',
    'F0':'a wave',             'F3':'extreme entertainment',  'FF': 'ljn',
  };

  // prettier-ignore
  const newLicensees = {
    '00': 'none',             '01': 'nintendo',       '08': 'capcom',
    '13': 'electronic arts',  '18': 'hudsonsoft',     '19': 'b-ai',
    '20': 'kss',              '22': 'pow',            '24': 'pcm complete',
    '25': 'san-x',            '28': 'kemco japan',    '29': 'seta',
    '30': 'viacom',           '31': 'nintendo',       '32': 'bandia',
    '33': 'ocean/acclaim',    '34': 'konami',         '35': 'hector',
    '37': 'taito',            '38': 'hudson',         '39': 'banpresto',
    '41': 'ubi soft',         '42': 'atlus',          '44': 'malibu',
    '46': 'angel',            '47': 'pullet-proof',   '49': 'irem',
    '50': 'absolute',         '51': 'acclaim',        '52': 'activision',
    '53': 'american sammy',   '54': 'konami',         '55': 'hi tech entertainment',
    '56': 'ljn',              '57': 'matchbox',       '58': 'mattel',
    '59': 'milton bradley',   '60': 'titus',          '61': 'virgin',
    '64': 'lucasarts',        '67': 'ocean',          '69': 'electronic arts',
    '70': 'infogrames',       '71': 'interplay',      '72': 'broderbund',
    '73': 'sculptured',       '75': 'sci',            '78': 't*hq',
    '79': 'accolade',         '80': 'misawa',         '83': 'lozc',
    '86': 'tokuma shoten i*', '87': 'tsukuda ori*',   '91': 'chun soft',
    '92': 'video system',     '93': 'ocean/acclaim',  '95': 'varie',
    '96': 'yonezawa/spal',    '97': 'kaneko',         '99': 'pack in soft',
  };

  const oldCode = loadedROM[OLD_LICENSEE_CODE_ADDR];
  if (oldCode !== 0x33) {
    return oldLicensees[oldCode.toString(16).toUpperCase()] || 'unknown';
  } else {
    const newCode1 = loadedROM[NEW_LICENSEE_CODE_START_ADDR];
    const newCode2 = loadedROM[NEW_LICENSEE_CODE_END_ADDR];
    const newCode =
      String.fromCharCode(newCode1) + String.fromCharCode(newCode2);
    return newLicensees[newCode] || 'unknown';
  }
};

const getSGB = () => loadedROM[GB_OR_SGB_ADDR] === 0x80;

const getROMSizeAndBanks = () => {
  switch (loadedROM[ROM_SIZE_ADDR]) {
    case 0x00:
      return [32, 2];
    case 0x01:
      return [64, 4];
    case 0x02:
      return [128, 8];
    case 0x03:
      return [256, 16];
    case 0x04:
      return [512, 32];
    case 0x05:
      return [1024, 64];
    case 0x06:
      return [2048, 128];
    case 0x07:
      return [4096, 256];
    case 0x08:
      return [8192, 512];
    case 0x52:
      return [1152, 72];
    case 0x53:
      return [1280, 80];
    case 0x54:
      return [1536, 96];
    default:
      return [0, 0];
  }
};

const getRAMSizeAndBanks = () => {
  switch (loadedROM[RAM_SIZE_ADDR]) {
    case 0x00:
      return [0, 0];
    case 0x01:
      return [2, 1];
    case 0x02:
      return [8, 1];
    case 0x03:
      return [32, 4];
    case 0x04:
      return [128, 16];
    case 0x05:
      return [64, 8];
    default:
      return [0, 0];
  }
};

const getType = () => {
  switch (loadedROM[CARTRIDGE_TYPE_ADDR]) {
    case 0x00:
      return 'ROM ONLY';
    case 0x01:
      return 'ROM + MBC1';
    case 0x02:
      return 'ROM + MBC1 + RAM';
    case 0x03:
      return 'ROM + MBC1 + RAM + BATTERY';
    case 0x05:
      return 'ROM + MBC2';
    case 0x06:
      return 'ROM + MBC2 + BATTERY';
    case 0x08:
      return 'ROM + RAM';
    case 0x09:
      return 'ROM + RAM + BATTERY';
    case 0x0b:
      return 'ROM + MMM01';
    case 0x0c:
      return 'ROM + MMM01 + SRAM';
    case 0x0d:
      return 'ROM + MMM01 + SRAM + BATTERY';
    case 0x0f:
      return 'ROM + MBC3 + TIMER + BATTERY';
    case 0x10:
      return 'ROM + MBC3 + TIMER + RAM + BATTERY';
    case 0x11:
      return 'ROM + MB3';
    case 0x12:
      return 'ROM + MBC3 + RAM';
    case 0x13:
      return 'ROM + MBC3 + RAM + BATTERY';
    case 0x19:
      return 'ROM + MBC5';
    case 0x1a:
      return 'ROM + MBC5 + RAM';
    case 0x1b:
      return 'ROM + MBC5 + RAM + BATTERY';
    case 0x1c:
      return 'ROM + MBC5 + RUMBLE';
    case 0x1d:
      return 'ROM + MBC5 + RUMBLE + SRAM';
    case 0x1e:
      return 'ROM + MBC5 + RUMBLE + SRAM + BATTERY';
    case 0x20:
      return 'MBC6';
    case 0x22:
      return 'MBC7 + SENSOR + RUMBLE + RAM + BATTERY';
    case 0xfc:
      return 'POCKET CAMERA';
    case 0xfd:
      return 'BANDAI TAMA5';
    case 0xfe:
      return 'HUDSON HUC3';
    case 0xff:
      return 'HUDSON HUC1 + RAM + BATTERY';
    default:
      return 'UNKNOWN?';
  }
};

const isRAMBatteryBuffered = () => {
  return getType().includes('BATTERY');
};

const getTestRoms = () => {
  return Object.keys(testRoms);
};

const cartridge = {
  loadROM,
  read,
  write,
  reset,

  getTitle,
  getType,
  getTypeNumber,
  getRegion,
  getLicensee,
  getCGB,
  getSGB,
  getROMSizeAndBanks,
  getRAMSizeAndBanks,

  isRAMBatteryBuffered,

  getTestRoms,
};

export default cartridge;
