import mmu from '../../mmu/mmu';

let data = {};

const init = () => {
  data = {
    cycles: 0,
    sourceAddress: 0x00,
    inProgress: false,
    restarted: false,
  };
};

const startTransfer = sourceAddress => {
  data.cycles = 0;
  data.sourceAddress = sourceAddress * 0x100;
  data.inProgress = true;
  data.restarted = isInProgress();
};

const step = stepMachineCycles => {
  if (!data.inProgress) {
    return;
  }

  data.cycles += stepMachineCycles;

  if (data.cycles >= 162) {
    data.inProgress = false;
    data.cycles = 0;

    for (let i = 0; i < 0xa0; i++) {
      mmu.write(mmu.START_OAM + i, mmu.read(data.sourceAddress + i));
    }
  }
};

const isInProgress = () =>
  data.restarted || (data.inProgress && data.cycles > 1);

const dma = {
  init,
  startTransfer,
  step,
  isInProgress,
};

export default dma;
