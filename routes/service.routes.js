const router = require("express").Router();
const Service = require("../models/Service.model");
const isAuthenticated = require("../middlewares/auth.middlewares");

//GET "/api/service"=> envia todos los servicios registrados en la DB

router.get("/",isAuthenticated, async (req, res, next) => {
  try {
    const response = await Service.find()
    console.log("servicios creados en bd")
       
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//POST "/api/service"=>recibe los detalles del nuevo servicio y lo creo en la DB

router.post("/", isAuthenticated,async (req, res, next) => {
  console.log(req.body);

  const {
    title,
    typeService,
    description,
    city,
    offeredServices
    } = req.body;

  const newService = {
    title,
    typeService,
    description,
    city,
    offeredServices: req.payload._id,
       
  };

  try {
    const response = await Service.create(newService)
       
    console.log(response)
    
    res.status(201).json("El servicio se ha creado correctamente");
  } catch (error) {
    next(error);
  }
});

//GET "/api/service/:id" => envía los detalles del servicio identificado con ese ID

router.get("/:serviceId", isAuthenticated,async(req,res,next)=>{

    try{
        
        const response = await Service.findById(req.params.serviceId)
        .populate("offeredServices")
        .populate("acceptedServices")
        res.status(200).json(response)
        

    }catch(error){
        next(error)
    }

})

//PATCH "/api/service/:id"=> actualiza los datos del servicio identificado con ese ID cuando es edita por el oferente 

router.patch("/:serviceId", isAuthenticated,async(req,res,next)=>{

    const{title,typeService,description,city} =req.body
    const serviceToUpdate = {
        title,
        typeService,
        description,
        city,
        
        }
    
    try{

        await Service.findByIdAndUpdate(req.params.serviceId , serviceToUpdate)
        res.status(200).json("Servicio actualizado.")

    }catch(error){
        next(error)
    }
})

//PATCH "/api/service/:id/accepted" => actualiza los datos del servicio identificado con ese ID cuando es aceptado 

router.patch("/:serviceId/accepted", isAuthenticated, async(req,res,next)=>{

    const{acceptedServices} =req.body
    const serviceToUpdate = {
        
      acceptedServices: req.payload._id,    
    }
    
    try{

             
        await Service.findByIdAndUpdate(req.params.serviceId , serviceToUpdate)
        .populate("acceptedServices")
        console.log(serviceToUpdate) 
        res.status(200).json("El servicio ha sido aceptado.")

    }catch(error){
        next(error)
    }
})





module.exports = router;
