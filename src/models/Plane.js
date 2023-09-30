const mongoose = require("mongoose");

const PlaneSchema = new mongoose.Schema({
    Plate: {
        type: String,
        required: true,
    },
    Model: {
        type: String,
        required: true,
    },
    Availability: {
        type: Boolean,
        required: true,
    },
    Mechanic_state: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model("Plane", PlaneSchema);