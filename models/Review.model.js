const { Schema, model, default: mongoose } = require("mongoose");

const reviewSchema = new Schema( {

    reviewAuthor: 
        { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }, 
    
    reviewedService: 
        { type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        }, 
    
    ratedVolunteer: 
    { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }, 
    
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        enum:[ 1, 2, 3, 4, 5],
        required: true,
        min: 1,
        max: 5
    }
})


const Review = model("Review", reviewSchema);

module.exports = Review;