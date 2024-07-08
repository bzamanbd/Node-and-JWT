import multer from 'multer';
import sharp from 'sharp';
import path from 'path';

// Multer configuration
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Please upload only images'), false);
  }
  cb(null, true);
};
const storage = multer.memoryStorage();

const imagesUpload = multer({ storage, fileFilter });

const imagesCompressor = (fieldName, options = {},location) => {
  return async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return next(new Error('No files uploaded'))
    }
    const { width, height, quality } = options;
    req.processedFiles = [];

    try {
      for (const file of req.files) {
        const fileName = file.originalname
        const filePath = path.join(path.resolve(), location, fileName)
        await sharp(file.buffer)
        .resize(width, height)
        .jpeg({ quality })
        .toFile(filePath)
        req.processedFiles.push(`${location}/${fileName}`)
      }
      next()
    } catch (error) {
      console.log('Error: got error of post photos');
      next(error)
    }
  }
}

export { imagesUpload, imagesCompressor };
