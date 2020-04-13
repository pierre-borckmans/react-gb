import miscControlOperations from './operations/miscControlOperations';
import loadStoreMoveOperations from './operations/loadStoreMoveOperations';
import rotationShiftBitOperations from './operations/rotationShiftBitOperations';
import arithmeticLogicalOperations from './operations/arithmeticLogicalOperations';
import jumpCallOperations from './operations/jumpCallOperations';

const instructions = {
  ...miscControlOperations,
  ...jumpCallOperations,
  ...loadStoreMoveOperations,
  ...rotationShiftBitOperations,
  ...arithmeticLogicalOperations,
};

export default instructions;
