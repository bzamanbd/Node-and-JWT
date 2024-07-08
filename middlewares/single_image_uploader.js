import multer from 'multer';
import sharp from 'sharp';
import path from 'path';

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Please upload an image'), false);
  }
  cb(null, true);
};
const storage = multer.memoryStorage()
const singleUploader = multer({storage,fileFilter})

const singleCompressor = (fieldName, options = {}, location) => {
  return async (req, res, next) => {
    if (!req.file || req.file.fieldname !== fieldName) {
      console.log('file not found');
      return next();
    }
    const { width, height, quality } = options;
    const fileName = req.file.originalname
    const filePath = path.join(path.resolve(), location, fileName)
    try {
      await sharp(req.file.buffer)
      .resize(width, height)
      .jpeg({ quality })
      .toFile(filePath)
      req.file.path = `${location}/${fileName}`;
      console.log('Success: avatar is compressed');
      next();
    } catch (error) {
      console.log('Error: got error of avatar');
      next(error);
    }
  }
}

export { singleUploader, singleCompressor };
