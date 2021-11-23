import path, { extname } from "path";
import express from "express";
import multer from "multer";

const router = express.Router();
//path.extname(file.originalname) pull out ext from filename
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "upload");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = function (file, cb) {
  const fileTypes = [".jpg", ".jpeg", ".png"];
  const extName = fileTypes.includes(
    path.extname(file.originalname).toLocaleLowerCase()
  ); //boolean
  const mimeType = file.mimetype.split("/")[0] === "image";

  if (extName && mimeType) return cb(null, true);
  else cb("Images only");
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
