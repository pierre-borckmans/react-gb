import cartridge from '../cartridge';

let registers = {};

const read = (address) => {
  // TODO
  return cartridge.read(address);
};

const write = (address, value) => {
  // TODO
  return cartridge.write(address, value);
};

const reset = () => {
  registers = {
    type: 0,
    romBank: 0,
  };
};

reset();

const setType = (type) => {
  registers.type = type;
};

const getRomBank = () => registers.romBank;

const mbc = {
  read,
  write,
  reset,

  setType,
  getRomBank,
};

export default mbc;
