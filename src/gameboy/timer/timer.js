import mmu from '../mmu/mmu';

const DIVIDER_ADDR = 0xff04;
const TIMER_COUNTER_ADDR = 0xff05;
const TIMER_MODULO_ADDR = 0xff06;
const TIMER_CONTROL_ADDR = 0xff07;

const TIMER_CONTROL_START_BIT = 2;
const TIMER_CONTROL_INPUT_CLOCK_SELECT_BIT = 1; // 1 and 0
// Clock speeds:
// 01 - 262144Hz -   4
// 10 -  65536Hz -  16
// 11 -  16384Hz -  64
// 00 -   4096Hz - 128

const timer = {};

export default timer;
