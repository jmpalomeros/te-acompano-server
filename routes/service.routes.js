const router = require("express").Router();
const Service = require("../models/Service.model");
const isAuthenticated = require("../middlewares/auth.middlewares");

//GET "/api/service"=> envia todos los servicios registrados en la DB

router.get("/", async (req, res, next) => {
  try {
    const response = await Service.find()
    //.populate("offeredServices") //la ruta funciona sin el populate pq el servicio ya trae el id del usuario q lo crea
    //.populate("acceptedServices") //deberíamos quitarlo pq el listado muestra servicios disponibles, q no esten aceptados
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//POST "/api/service"=>recibe los detalles del nuevo servicio y lo creo en la DB

router.post("/", async (req, res, next) => {
  console.log(req.body);

  const {
    title,
    typeService,
    description,
    city,
    isAceppted,
    offeredServices,
    acceptedServices
    } = req.body;

  const newService = {
    title,
    typeService,
    description,
    city,
    isAceppted,
    offeredServices,
    acceptedServices //no crea en db esta propiedad
    
  };

  try {
    const response = await Service.create(newService, offeredServices.id, acceptedServices);
    res.status(201).json("El servicio se ha creado correctamente");
  } catch (error) {
    next(error);
  }
});

//GET "/api/service/:id" => envía los detalles del servicio identificado con ese ID

router.get("/:serviceId", async(req,res,next)=>{

    try{
        
        const response = await Service.findById(req.params.serviceId)
        res.status(200).json(response)
        //LA RESPUESTA INDICA EL ID DEL USUARIO QUE LO HA CREADO, DESPUÉS TENDREMOS QUE RENDERIZAR LOS DATOS QUE QUERAMOS MOSTRAR

    }catch(error){
        next(error)
    }

})

//PATCH "/api/service/:id"=> actualiza los datos del servicio identificado con ese ID cuando es edita por el oferente 

router.patch("/:serviceId", async(req,res,next)=>{

    const{title,typeService,description,city,isAceppted,offeredServices} =req.body
    const serviceToUpdate = {
        title,
        typeService,
        description,
        city,
        isAceppted,
        offeredServices,
        
    }
    
    try{

        await Service.findByIdAndUpdate(req.params.serviceId , serviceToUpdate)
        res.status(200).json("Servicio actualizado.")

    }catch(error){
        next(error)
    }
})

//PATCH "/api/service/:id/aceppted"=> actualiza los datos del servicio identificado con ese ID cuando es aceptado 

router.patch("/:serviceId/aceppted", async(req,res,next)=>{

    const{title,typeService,description,city,isAceppted,offeredServices, acepptedServices} =req.body
    const serviceToUpdate = {
        title,
        typeService,
        description,
        city,
        isAceppted,
        offeredServices,
        acepptedServices,    
    }
    
    try{

        await Service.findByIdAndUpdate(req.params.serviceId , acepptedServices.id)
        console.log(serviceToUpdate) //el servicio figura aceptado pero no se actualiza en la db
        res.status(200).json("El servicio ha sido aceptado.")

    }catch(error){
        next(error)
    }
})





module.exports = router;
