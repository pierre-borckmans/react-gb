import mmu from '../../mmu/mmu';

let data = {};

const reset = () => {
  data = {
    cycles: 0,
    sourceAddress: 0x00,
    inProgress: false,
    restarted: false,
  };
};
reset();

const startTransfer = sourceAddress => {
  data.sourceAddress = sourceAddress * 0x100;
  data.restarted = isOamBlocked();
  data.cycles = 0;
  data.inProgress = true;
};

const step = stepMachineCycles => {
  if (!data.inProgress) {
    return;
  }

  data.cycles += stepMachineCycles;

  if (data.cycles >= 162) {
    data.inProgress = false;
    data.restarted = false;
    data.cycles = 0;

    for (let i = 0; i < 0xa0; i++) {
      mmu.write(mmu.START_OAM + i, mmu.read(data.sourceAddress + i));
    }
  }
};

const isOamBlocked = () =>
  data.restarted || (data.inProgress && data.cycles >= 2);

const dma = {
  reset,
  startTransfer,
  step,
  isOamBlocked,
};

export default dma;
