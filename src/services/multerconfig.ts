import multer from "multer";
import path from "path";

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/"); // for production
    // cb(null, "/uploads/"); // for deploy in 190
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only images are allowed (jpg, jpeg, png)"));
  }
};

// Multer instance with storage, limits, and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

export default upload;
