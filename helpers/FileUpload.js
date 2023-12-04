const multer = require("multer");

let options = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + "" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
    }
  }
  const upload = multer({ storage, fileFilter });

  return upload;
};

exports.uploadSingleFile = (fileName, folderName) => {
  return options(folderName).single(fileName);
};

exports.uploadMixOfFiles = (arrayOfFiles, folderName) => {
  return options(folderName).fields(arrayOfFiles);
};
