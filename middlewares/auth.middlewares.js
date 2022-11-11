const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    
    if (req.headers === undefined || req.headers.authorization === undefined) {
      console.log("NO HAY TOKEN");
      return null;
    }

    // si el token existe, lo extraemos del string y lo devolvemos a la función
    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];

    if (tokenType !== "Bearer") {
      console.log("TIPO DE TOKEN INCORRECTO")
      return null;
    }

    // ya hemos recibido el token
    // para validarlo se devuelve a la función
    console.log("EL TOKEN HA SIDO ENTREGADO")
    return token;
  },
});

module.exports = isAuthenticated