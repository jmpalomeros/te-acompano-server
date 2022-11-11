const { Schema, model, default: mongoose } = require("mongoose");

const serviceSchema = new Schema( {


    title: String,
    typeService: {
        type: String,
        enum: ["Ocio", "Ayuda"],
        default: "Ayuda",
        required: true,
    },
    description: String,
    city: String,
    offeredServices:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }, 
    
    acceptedServices: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    
})


const Service = model("Service", serviceSchema);

module.exports = Service;