// handles multipart/form-data, primarily used for uploading files.
const multer = require('multer');

// saves uploaded images to the uploads folder in backend
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  }, 

  //use date and time to save to avoid naming conflicts
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// control which files are allowed to be uploaded.
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
  }
};

// creates an upload middleware that can be used in routes to handle file uploads.
const upload = multer({ storage, fileFilter });

module.exports = upload;
