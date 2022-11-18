const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.middlewares");
//comentario para subir foto
router.post("/", uploader.single("avatar"), (req, res, next) => {
  if (req.file === undefined) {
    res.status(401).json("problemas subiendo la imagen");
    return;
  }

  res.status(200).json({ avatar: req.file.path });
});

module.exports = router;
