const router = require("express").Router();
const User = require("../models/User.model")
const isAuthenticated = require("../middlewares/auth.middlewares");
const bcrypt = require("bcryptjs");

//GET "/api/user" => envia los datos del usuario logado

router.get("/", isAuthenticated, async(req, res, next)=>{

    try{

        const response = await User.findById(req.payload._id)
        res.status(200).json(response)

    }catch(error){
        next(error)
    }


})

//PATCH "/api/user/edit"=> actualiza los datos del usuario logado

router.patch("/edit", isAuthenticated, async(req, res, next)=>{

      
      
    const {firstName, lastName, email, password, avatar,age,city} = req.body

    // // validación para saber si el email ya está registrado
    // const foundUser = await User.findOne({ email: email });
    // if (foundUser !== null) {
    //   res.status(400).json({ errorMessage: "Ya existe este email" });
    //   return;
    // }

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
    
    //encriptar nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    
    const userToUpdate = {
        firstName, 
        lastName, 
        email, 
        password: hashPassword,
        avatar,
        age,
        city
    }

    try{

        await User.findByIdAndUpdate(req.payload._id, userToUpdate)
        res.status(200).json("Perfil actualizado")

    }catch(error){
        next(error)
    }

})




module.exports = router;
