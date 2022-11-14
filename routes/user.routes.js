const router = require("express").Router();
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/auth.middlewares");
const bcrypt = require("bcryptjs");

//GET "/api/user" => envia los datos del usuario logado

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH "/api/user/edit"=> actualiza los datos del usuario logado

router.patch("/edit", isAuthenticated, async (req, res, next) => {
  const { firstName, lastName, avatar, age, city } = req.body;

  const userToUpdate = {
    firstName,
    lastName,
    avatar,
    age,
    city,
  };

  try {
    await User.findByIdAndUpdate(req.payload._id, userToUpdate);
    res.status(200).json("Perfil actualizado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
