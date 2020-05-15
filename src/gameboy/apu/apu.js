import { format } from '../../utils/utils';

const CHANNEL1_SWEEP_REGISTER_ADDR = 0xff10;
const CHANNEL1_SOUND_LENGTH_WAVE_PATTERN_DUTY_ADDR = 0xff11;
const CHANNEL1_VOLUME_ENVELOPE_ADDR = 0xff12;
const CHANNEL1_FREQUENCY_LOW_ADDR = 0xff13;
const CHANNEL1_FREQUENCY_HIGHADDR = 0xff14;
const CHANNEL2_SOUND_LENGTH_WAVE_PATTERN_DUTY_ADDR = 0xff16;
const CHANNEL2_VOLUME_ENVELOPE_ADDR = 0xff17;
const CHANNEL2_FREQUENCY_LOW_ADDR = 0xff18;
const CHANNEL2_FREQUENCY_HIGHADDR = 0xff19;
const CHANNEL3_SOUND_ON_OFF__ADDR = 0xff1a;
const CHANNEL3_SOUND_LENGTH_ADDR = 0xff1b;
const CHANNEL3_SELECT_OUTPUT_LEVEL_ADDR = 0xff1c;
const CHANNEL3_FREQUENCY_LOW_ADDR = 0xff1d;
const CHANNEL3_FREQUENCY_HIGHADDR = 0xff1e;
const CHANNEL4_SOUND_LENGTH_ADDR = 0xff20;
const CHANNEL4_VOLUME_ENVELOPE_ADDR = 0xff21;
const CHANNEL4_POLYNOMIAL_COUNTER_ADDR = 0xff22;
const CHANNEL4_COUNTER_CONSECUTIVE_INITIAL_ADDR = 0xff23;
const CHANNEL_CONTROL_ON_OFF_VOLUME_ADDR = 0xff24;
const SELECT_SOUNT_OUTPUT_TERMINAL_ADDR = 0xff25;
const SOUND_ON_OFF_ADDR = 0xff26;

let registers = {};

const reset = () => {
  registers = {
    CHANNEL1_SWEEP_REGISTER: 0x00,
    CHANNEL1_SOUND_LENGTH_WAVE_PATTERN_DUTY: 0x00,
    CHANNEL1_VOLUME_ENVELOPE: 0x00,
    CHANNEL1_FREQUENCY_LOW: 0x00,
    CHANNEL1_FREQUENCY_HIG: 0x00,
    CHANNEL2_SOUND_LENGTH_WAVE_PATTERN_DUTY: 0x00,
    CHANNEL2_VOLUME_ENVELOPE: 0x00,
    CHANNEL2_FREQUENCY_LOW: 0x00,
    CHANNEL2_FREQUENCY_HIG: 0x00,
    CHANNEL3_SOUND_ON_OFF_: 0x00,
    CHANNEL3_SOUND_LENGTH: 0x00,
    CHANNEL3_SELECT_OUTPUT_LEVEL: 0x00,
    CHANNEL3_FREQUENCY_LOW: 0x00,
    CHANNEL3_FREQUENCY_HIG: 0x00,
    CHANNEL4_SOUND_LENGTH: 0x00,
    CHANNEL4_VOLUME_ENVELOPE: 0x00,
    CHANNEL4_POLYNOMIAL_COUNTER: 0x00,
    CHANNEL4_COUNTER_CONSECUTIVE_INITIAL: 0x00,
    CHANNEL_CONTROL_ON_OFF_VOLUME: 0x00,
    SELECT_SOUNT_OUTPUT_TERMINAL: 0x00,
    SOUND_ON_OFF: 0x00,
  };
};

reset();

const read = (address) => {
  switch (address) {
    case CHANNEL1_SWEEP_REGISTER_ADDR:
      return registers.CHANNEL1_SWEEP_REGISTER;
    case CHANNEL1_SOUND_LENGTH_WAVE_PATTERN_DUTY_ADDR:
      return registers.CHANNEL1_SOUND_LENGTH_WAVE_PATTERN_DUTY;
    case CHANNEL1_VOLUME_ENVELOPE_ADDR:
      return registers.CHANNEL1_VOLUME_ENVELOPE;
    case CHANNEL1_FREQUENCY_LOW_ADDR:
      return registers.CHANNEL1_FREQUENCY_LOW;
    case CHANNEL1_FREQUENCY_HIGHADDR:
      return registers.CHANNEL1_FREQUENCY_HIG;
    case CHANNEL2_SOUND_LENGTH_WAVE_PATTERN_DUTY_ADDR:
      return registers.CHANNEL2_SOUND_LENGTH_WAVE_PATTERN_DUTY;
    case CHANNEL2_VOLUME_ENVELOPE_ADDR:
      return registers.CHANNEL2_VOLUME_ENVELOPE;
    case CHANNEL2_FREQUENCY_LOW_ADDR:
      return registers.CHANNEL2_FREQUENCY_LOW;
    case CHANNEL2_FREQUENCY_HIGHADDR:
      return registers.CHANNEL2_FREQUENCY_HIG;
    case CHANNEL3_SOUND_ON_OFF__ADDR:
      return registers.CHANNEL3_SOUND_ON_OFF_;
    case CHANNEL3_SOUND_LENGTH_ADDR:
      return registers.CHANNEL3_SOUND_LENGTH;
    case CHANNEL3_SELECT_OUTPUT_LEVEL_ADDR:
      return registers.CHANNEL3_SELECT_OUTPUT_LEVEL;
    case CHANNEL3_FREQUENCY_LOW_ADDR:
      return registers.CHANNEL3_FREQUENCY_LOW;
    case CHANNEL3_FREQUENCY_HIGHADDR:
      return registers.CHANNEL3_FREQUENCY_HIG;
    case CHANNEL4_SOUND_LENGTH_ADDR:
      return registers.CHANNEL4_SOUND_LENGTH;
    case CHANNEL4_VOLUME_ENVELOPE_ADDR:
      return registers.CHANNEL4_VOLUME_ENVELOPE;
    case CHANNEL4_POLYNOMIAL_COUNTER_ADDR:
      return registers.CHANNEL4_POLYNOMIAL_COUNTER;
    case CHANNEL4_COUNTER_CONSECUTIVE_INITIAL_ADDR:
      return registers.CHANNEL4_COUNTER_CONSECUTIVE_INITIAL;
    case CHANNEL_CONTROL_ON_OFF_VOLUME_ADDR:
      return registers.CHANNEL_CONTROL_ON_OFF_VOLUME;
    case SELECT_SOUNT_OUTPUT_TERMINAL_ADDR:
      return registers.SELECT_SOUNT_OUTPUT_TERMINAL;
    case SOUND_ON_OFF_ADDR:
      return registers.SOUND_ON_OFF;
    default:
      // console.error(
      //   `Trying to read from invalid apu address ${format('hex', address, 16)}`
      // );
      return '--';
  }
};

const write = (address, value) => {
  switch (address) {
    case CHANNEL1_SWEEP_REGISTER_ADDR:
      registers.CHANNEL1_SWEEP_REGISTER = value;
      break;
    case CHANNEL1_SOUND_LENGTH_WAVE_PATTERN_DUTY_ADDR:
      registers.CHANNEL1_SOUND_LENGTH_WAVE_PATTERN_DUTY = value;
      break;
    case CHANNEL1_VOLUME_ENVELOPE_ADDR:
      registers.CHANNEL1_VOLUME_ENVELOPE = value;
      break;
    case CHANNEL1_FREQUENCY_LOW_ADDR:
      registers.CHANNEL1_FREQUENCY_LOW = value;
      break;
    case CHANNEL1_FREQUENCY_HIGHADDR:
      registers.CHANNEL1_FREQUENCY_HIG = value;
      break;
    case CHANNEL2_SOUND_LENGTH_WAVE_PATTERN_DUTY_ADDR:
      registers.CHANNEL2_SOUND_LENGTH_WAVE_PATTERN_DUTY = value;
      break;
    case CHANNEL2_VOLUME_ENVELOPE_ADDR:
      registers.CHANNEL2_VOLUME_ENVELOPE = value;
      break;
    case CHANNEL2_FREQUENCY_LOW_ADDR:
      registers.CHANNEL2_FREQUENCY_LOW = value;
      break;
    case CHANNEL2_FREQUENCY_HIGHADDR:
      registers.CHANNEL2_FREQUENCY_HIG = value;
      break;
    case CHANNEL3_SOUND_ON_OFF__ADDR:
      registers.CHANNEL3_SOUND_ON_OFF_ = value;
      break;
    case CHANNEL3_SOUND_LENGTH_ADDR:
      registers.CHANNEL3_SOUND_LENGTH = value;
      break;
    case CHANNEL3_SELECT_OUTPUT_LEVEL_ADDR:
      registers.CHANNEL3_SELECT_OUTPUT_LEVEL = value;
      break;
    case CHANNEL3_FREQUENCY_LOW_ADDR:
      registers.CHANNEL3_FREQUENCY_LOW = value;
      break;
    case CHANNEL3_FREQUENCY_HIGHADDR:
      registers.CHANNEL3_FREQUENCY_HIG = value;
      break;
    case CHANNEL4_SOUND_LENGTH_ADDR:
      registers.CHANNEL4_SOUND_LENGTH = value;
      break;
    case CHANNEL4_VOLUME_ENVELOPE_ADDR:
      registers.CHANNEL4_VOLUME_ENVELOPE = value;
      break;
    case CHANNEL4_POLYNOMIAL_COUNTER_ADDR:
      registers.CHANNEL4_POLYNOMIAL_COUNTER = value;
      break;
    case CHANNEL4_COUNTER_CONSECUTIVE_INITIAL_ADDR:
      registers.CHANNEL4_COUNTER_CONSECUTIVE_INITIAL = value;
      break;
    case CHANNEL_CONTROL_ON_OFF_VOLUME_ADDR:
      registers.CHANNEL_CONTROL_ON_OFF_VOLUME = value;
      break;
    case SELECT_SOUNT_OUTPUT_TERMINAL_ADDR:
      registers.SELECT_SOUNT_OUTPUT_TERMINAL = value;
      break;
    case SOUND_ON_OFF_ADDR:
      registers.SOUND_ON_OFF = value;
      break;
    default:
      console.error(
        `Trying to write to invalid apu address ${format('hex', address, 16)}`
      );
  }
};

const apu = {
  read,
  write,
  reset,
};

export default apu;
