const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
    FK_Plate: {
        type: String, 
        required: true,
        // Valida que la FK_Plate exista en la colección de Plane
        validate: {
            validator: async function(value) {
                const plane = await mongoose.model("Plane").findOne({ Plate: value });
                return plane !== null;
            },
            message: "La 'FK_Plate' proporcionada no existe en la colección de Plane."
        }
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    altitude: {
        type: Number,
        required: true,
    },
    Fuel_percentage: {
        type: Number,
        required: true,
    },
    // Definir una referencia al modelo Plane
    plane: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plane", // Nombre del modelo relacionado
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Flight", FlightSchema);