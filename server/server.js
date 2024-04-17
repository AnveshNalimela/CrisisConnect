

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const Disaster = require('./models/Disasters')
const Volunteer = require("./models/volunteers")



const connectionString = "mongodb://localhost:27017/CrisisConnect";

const app = express()
app.use(cors())
app.use(express.json())


async function connectToMongoDB() {
    try {
        const server = await mongoose.connect(connectionString);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToMongoDB();

app.post("/addDisaster", (req, res) => {
    Disaster.create(req.body)
        .then(disaster => res.json(disaster))
        .catch(err => res.json(err))
});


app.post("/addVolunteer", (req, res) => {
    Volunteer.create(req.body)
        .then(volunteer => res.json(volunteer))
        .catch(err => res.json(err))
});

app.get("/getDisaster", (req, res) => {
    Disaster.find({}).then(disaters => res.json(disaters)).catch(err => res.json(error));
});





const port = 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})




