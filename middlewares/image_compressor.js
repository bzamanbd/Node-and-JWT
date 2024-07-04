import multer from 'multer';
import sharp from 'sharp';
import path from 'path';

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const compressImage = (fieldName, options = {}) => {
  return async (req, res, next) => {
    if (!req.file || req.file.fieldname !== fieldName) {
        console.log('file not found');
      return next();
    }

    const { width, height, quality } = options;
    // const fileName = Date.now() + path.extname(req.file.originalname);
    const fileName = req.file.originalname
    const filePath = path.join(path.resolve(), "public/temp", fileName);

    try {
      await sharp(req.file.buffer)
        .resize(width, height)
        .jpeg({ quality })
        .toFile(filePath);

      req.file.path = `public/temp/${fileName}`;
      console.log('Image Compressed');
      next();
    } catch (error) {
        console.log('Got error');
      next(error);
    }
  };
};

export { upload, compressImage };
