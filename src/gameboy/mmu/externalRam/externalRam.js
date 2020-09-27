import cartridge from '../../cartridge/cartridge';

let data;

let saveInterval = null;

const save = () => {
  if (cartridge.isRAMBatteryBuffered()) {
    localStorage.setItem(`cartridge_${cartridge.getTitle()}`, data.join(','));
  }
};

const read = address => data[address];
const write = (address, value) => {
  data[address] = value;
};

const reset = () => {
  saveInterval && clearInterval(saveInterval);
  data = new Uint8Array(cartridge.getRAMSizeAndBanks()[0] * 0x400).fill(0);
  if (cartridge.isRAMBatteryBuffered()) {
    const savedRam = localStorage.getItem(`cartridge_${cartridge.getTitle()}`);
    const savedRamBytes = savedRam ? savedRam.split(',') : null;
    data = savedRamBytes ? savedRamBytes : data;
    saveInterval = setInterval(save, 2000);
  }
};

const externalRam = {
  read,
  write,

  save,
  reset,
};

export default externalRam;
