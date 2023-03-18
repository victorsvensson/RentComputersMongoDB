const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentComputerSchema = new mongoose.Schema({
    inventoryID: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    errandNumber: {
        type: Number,
        required: false,
    },
    status: {
        type: Boolean,
        required: false,
    },
});

const RentComputerModel = mongoose.model("RentComputer", RentComputerSchema);

module.exports = RentComputerModel;
