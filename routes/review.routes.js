const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const Review = require("../models/Review.model");
const Service = require("../models/Review.model");


// GET "/api/review" => enviar todas las review (READ)
router.get("/", isAuthenticated, async (req, res, next) => {

  const { reviewId } = req.params

  try {
    const response = await Review.find()
      .populate("reviewAuthor")
      .populate("reviewedService")
      .populate("ratedVolunteer");

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/review/:serviceId" => recibe detalles de la review y la crea en la BD (CREATE)
router.post("/:serviceId", isAuthenticated, async (req, res, next) => {
  console.log("BODY",req.body);

  const { reviewAuthor, reviewedService, ratedVolunteer, review, rating } =
    req.body;

  const { serviceId } = req.params;

  try {
    const volunteerId = await Service.findById(serviceId)
    //.select("offeredServices");

    const newReview = {
      reviewAuthor: req.payload._id,
      reviewedService: serviceId,
      ratedVolunteer: volunteerId, //!NOS DEVUELVE NULL PQ NO LLEGA EL ID
      review,
      rating,
    };
    console.log("VOLUNTEER",volunteerId)
    const response = await Review.create(newReview);
    console.log(response);
    res.status(200).json("La review se ha creado correctamente");
  } catch (error) {
    next(error);
  }
});

// GET "/api/review/:reviewId" => envía los detalles de una review identificada con esa ID
router.get("/:reviewId", isAuthenticated, async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    const response = await Review.findById(reviewId)
      .populate("reviewAuthor")
      .populate("reviewedService")
      .populate("ratedVolunteer");
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/review/:reviewId" => actualiza los datos de la reseña identificada con esa ID
router.patch("/:reviewId", isAuthenticated, async (req, res, next) => {

    const { reviewId } = req.params;

    const { review, rating } =
    req.body;

    const reviewUpdate = {
        review,
        rating
    }

    try {
    
    await Review.findByIdAndUpdate(reviewId, reviewUpdate )
    res.status(200).json("Review actualizada")
    
        
    } catch (error) {
        next(error)
        
    }
})

// DELETE "/api/review/:reviewId/delete" => borra la review identificada con esa ID
router.delete("/:reviewId/delete", isAuthenticated, async (req, res, next) => {

    const { reviewId } = req.params;

    try {
        await Review.findByIdAndDelete(reviewId)
        res.status(200).json("Review borrada correctamente")

    } catch (error) {
        next(error)
        
    }

})





module.exports = router;
