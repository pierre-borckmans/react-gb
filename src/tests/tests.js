import Tesseract from 'tesseract.js';
import Fuse from 'fuse.js';

let worker;

const check = async () => {
  if (!worker) {
    worker = Tesseract.createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      //   tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
      //   user_defined_dpi: '96',
    });
    await worker.setParameters({
      tessedit_char_whitelist:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,:0123456789 !',
      //   preserve_interword_spaces: '0',
    });
  }
  const canvas = document.querySelector('#main_canvas');
  const resizedCanvas = document.createElement('canvas');
  const resizedContext = resizedCanvas.getContext('2d');

  const scale = 1.5;
  const w = 160 * scale;
  const h = 144 * scale;

  resizedCanvas.height = w.toString();
  resizedCanvas.width = h.toString();
  resizedContext.drawImage(canvas, 0, 0, w, h);

  const {
    data: { text },
  } = await worker.recognize(resizedCanvas);

  var separators = [' ', '\\n'];
  const words = text.toLowerCase().split(new RegExp(separators.join('|'), 'g'));
  const fuse = new Fuse(words, { includeScore: true, threshold: 0.3 });
  const result = fuse.search('failed');
  console.log(words);
  console.log(result);
  if (result.length && result[0].item.length < 7) {
    alert('failed!');
  }
};

const tests = {
  check,
};

export default tests;
