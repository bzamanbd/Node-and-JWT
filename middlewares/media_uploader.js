import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

// Define storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(path.resolve(), 'public/media');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer configuration with file type filter (allow both images and videos)
const mediaUploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only image and video files
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  }
});

// Custom middleware to process images
const processImages = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  const processedImages = await Promise.all(
    files.map(async (file) => {
      const outputFilePath = path.join(path.resolve(), 'public/media/images', `compressed-${file.filename}`);
      
      await sharp(file.path)
        .resize(300)
        .jpeg({quality:50}) // Resize the image to 800px width (adjust as needed)
        .toFile(outputFilePath);

      fs.unlinkSync(file.path); // Delete original file

      return { url: `/public/media/images/${path.basename(outputFilePath)}` };
    })
  );

  return processedImages;
};

// Custom middleware to process videos
const processVideos = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  const processedVideos = await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        const outputFilePath = path.join(path.resolve(), 'public/media/videos', `compressed-${file.filename}`);

        ffmpeg(file.path)
          .output(outputFilePath)
          .videoCodec('libx264')
          .size('360x?')
          .on('end', () => {
            fs.unlinkSync(file.path); // Delete original file
            resolve({ url: `/public/media/videos/${path.basename(outputFilePath)}` });
          })
          .on('error', (err) => {
            reject(err);
          })
          .run();
      });
    })
  );

  return processedVideos;
};

// Custom middleware to handle all media files
const mediaProcessor = async (req, res, next) => {
  try {
    const imageFiles = req.files.images || [];
    const videoFiles = req.files.videos || [];

    const [processedImages, processedVideos] = await Promise.all([
      processImages(imageFiles),
      processVideos(videoFiles)
    ]);

    req.processedFiles = {
      images: processedImages,
      videos: processedVideos
    };

    next();
  } catch (err) {
    next(err);
  }
};

export { mediaUploader, mediaProcessor};
