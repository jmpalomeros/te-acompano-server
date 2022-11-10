const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/auth.middlewares")

//POST ("/api/auth/signup") => registrar a un usuario
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;

  // validaciones de BE
  //  que no estén los campos vacíos
  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Debe introducir un email y una contraseña" });
    return;
  }

  // fortaleza de contraseña: Al menos 1 Mayúscula, 1 número y 1 signo
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "La contraseña debe tener al menos una mayúscula, un número y un signo",
    });
    return;
  }

  // requisitos del email para una estructura correcta
  const mailRegex = /[\w|.|-]*@\w*\.[\w|.]*/g;
  if (mailRegex.test(email) === false) {
    res.status(400).json({ errorMessage: "El email no es válido" });
    return;
  }

  try {
    // validación para saber si el email ya está registrado
    const foundUser = await User.findOne({ email: email });
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "Ya existe este email" });
      return;
    }

    // encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    };

    // se crea el user
    await User.create(newUser);
    res.status(201).json("Usuario registrado correctamente");
  } catch (error) {
    next(error);
  }

  
});



//POST ("/api/auth/login") => validar las credenciales del usuario
router.post("/login", async (req, res, next) => {
    console.log("REQ.BODY", req.body);

    const { email, password } = req.body;

    // validaciones BE
    //  que no estén los campos vacíos
    if (!email || !password) {
      res
        .status(400)
        .json({ errorMessage: "Debe introducir un email y una contraseña" });
      return;
    }
    try {
      // validación que el usuario exista
      const foundUser = await User.findOne({ email: email });
      console.log("FOUNDUSER", foundUser);
      if (foundUser === null) {
        res.status(400).json({ errorMessage: "Credenciales no válidas" });
        return;
      }

      // validación que la password sea correcta
      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (isPasswordValid === false) {
        res.status(400).json({ errorMessage: "Credenciales no válidas" });
        return;
      }

      // implementar sistema Token
      const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
      };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "4h",
      });

      res.status(200).json({ authToken: authToken });
    } catch (error) {
      next(error);
    }
  });


  // GET ("/api/auth/verify") => ruta para que el BE le diga al FE si el usuario ha sido validado
  router.get("/verify", isAuthenticated, (req, res, next) => {
    console.log("PAYLOAD", req.payload);
    res.status(200).json( {user: req.payload} )
  })


module.exports = router;
