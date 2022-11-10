const { Schema, model, default: mongoose } = require("mongoose");

const serviceSchema = new Schema( {


    title: String,
    typeService: {
        type: String,
        enum: ["Ocio", "Ayuda", "Compañía"],
        default: "Ayuda",
        required: true,
    },
    description: String,
    city: String,
    isAceppted: Boolean,
    offeredServices: [
    { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }, 
    ],
    acceptedServices: [
        { type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }, 
    ]
})


const Service = model("Service", serviceSchema);

module.exports = Service;