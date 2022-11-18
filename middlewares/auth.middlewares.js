const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    if (req.headers === undefined || req.headers.authorization === undefined) {
      return null;
    }

    // si el token existe, lo extraemos del string y lo devolvemos a la función
    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];

    if (tokenType !== "Bearer") {
      return null;
    }

    // ya hemos recibido el token
    // para validarlo se devuelve a la función

    return token;
  },
});

module.exports = isAuthenticated;
