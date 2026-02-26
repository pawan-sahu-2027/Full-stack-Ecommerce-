import multer from "multer";

const storage = multer.memoryStorage();

// single file upload
export const singleUpload = multer({ storage}).single('file')


// Multiple upload upto 5 image files
export const multipleUpload = multer({ storage}).array('files', 5)
