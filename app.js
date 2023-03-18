const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const RentComputer = require("./models/rentcomputers");

//Connect to database
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1/rentcomputers");
    console.log("Database is now connected");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method")); //used to PUT, normally you can just get and post
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true })); //Need to be used to be able to POST

app.get("/", (req, res) => {
    res.redirect("/RentComputers");
});

app.get("/RentComputers", async (req, res) => {
    const rentComputer = await RentComputer.find({});
    res.render("RentComputers/index", { rentComputer });
});

app.put("/RentComputers/:id/", async (req, res) => {
    const { id } = req.params;
    const user = await RentComputer.findByIdAndUpdate(id, {
        ...req.body.rentcomputers,
    });
    res.redirect("/RentComputers");
});

//New computer
app.get("/RentComputers/new", (req, res) => {
    res.render("RentComputers/new");
});

app.post("/RentComputers/new", async (req, res) => {
    const newComputer = new RentComputer(req.body);
    await newComputer.save();
    res.redirect("/");
});

//Delete page
app.get("/RentComputers/remove", async (req, res) => {
    const rentComputer = await RentComputer.find({});
    res.render("RentComputers/remove", { rentComputer });
});

app.delete("/RentComputers/remove/:id", async (req, res) => {
    await RentComputer.findByIdAndDelete(req.params.id);
    res.redirect("/RentComputers/remove");
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
