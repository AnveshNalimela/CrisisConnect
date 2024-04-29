

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const Disaster = require('./models/Disasters')
const Volunteer = require("./models/volunteers")
const Donation = require("./models/donations")



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


app.post("/addDisaster", async (req, res) => {
    const body = req.body;
    try {
        const newDisaster = await Disaster.create(body)
        newDisaster.save();
        res.status(201).json({ msg: "New Disaster uploaded...!" })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})
app.post("/addDonation", async (req, res) => {
    const body = req.body;
    try {
        const newDonation = await Donation.create(body)
        newDonation.save();
        res.status(201).json({ msg: "New Donation Succesfully...!" })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})


app.post("/addVolunteer", (req, res) => {
    Volunteer.create(req.body)
        .then(volunteer => res.json(volunteer))
        .catch(err => res.json(err))
});

app.get("/getDisasters", (req, res) => {
    Disaster.find({}).then(disasters => res.json(disasters)).catch(err => res.json(error));
});

app.get("/getVolunteer", (req, res) => {
    Volunteer.find({}).then(volunteers => res.json(volunteers)).catch(err => res.json(error));
});

app.get("/getVolunteer/:id", async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        res.json(volunteer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.get("/countVolunteer", async (req, res) => {
    try {
        const count = await Volunteer.countDocuments();
        console.log(`Total count of documents in the collection: ${count}`);
        res.json(count)

    } catch (err) {
        console.log("Errror while finding the no of volunteers")
    }

})
app.get("/totalDonations", async (req, res) => {
    try {
        const totalDonations = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        if (totalDonations.length > 0) {
            res.json({ totalDonations: totalDonations[0].totalAmount });
        } else {
            res.json({ totalDonations: 0 }); // Return 0 if there are no donations
        }
    } catch (error) {
        console.error("Error while calculating total donations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






const port = 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})




