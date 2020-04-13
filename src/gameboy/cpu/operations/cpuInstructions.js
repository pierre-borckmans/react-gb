import miscControlOperations from './miscControlOperations';
import loadStoreMoveOperations from './loadStoreMoveOperations';
import rotationShiftBitOperations from './rotationShiftBitOperations';
import arithmeticLogicalOperations from './arithmeticLogicalOperations';
import jumpCallOperations from './jumpCallOperations';

const instructions = {
  ...miscControlOperations,
  ...jumpCallOperations,
  ...loadStoreMoveOperations,
  ...rotationShiftBitOperations,
  ...arithmeticLogicalOperations,
};

export default instructions;
