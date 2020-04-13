const loadRom = async () => {
  return await fetch('../assets/roms/bootrom.gb')
    .then((raw) => raw.arrayBuffer())
    .then((buffer) => [...new Uint8Array(buffer)]);
};

const Rom = {
  loadRom,
};
export default Rom;
