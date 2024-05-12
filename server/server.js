

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const Disaster = require('./models/Disasters')
const Volunteer = require("./models/volunteers")
const Donation = require("./models/donations")
const Comment = require("./models/comment")

const connectionString = "mongodb://localhost:27017/CrisisConnect";
const app = express()
app.use(cors())
app.use(express.json())

//================================Connecting to dataBase======
async function connectToMongoDB() {
    try {
        const server = await mongoose.connect(connectionString);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToMongoDB();

//==================Endpoint related to  disasters===========
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



app.post("/addVolunteer", (req, res) => {
    Volunteer.create(req.body)
        .then(volunteer => res.json(volunteer))
        .catch(err => res.json(err))
});

app.get("/getDisasters", (req, res) => {
    Disaster.find({}).then(disasters => res.json(disasters)).catch(err => res.json(error));
});

app.get(`/getDisaster/:id`, async (req, res) => {
    try {
        // Extract the ID parameter from the request
        const { id } = req.params;

        // Query the database to find the disaster with the specified ID
        const disaster = await Disaster.findById(id);

        // If the disaster is found, send it as a response
        if (disaster) {
            res.status(200).json(disaster);
        } else {
            // If the disaster is not found, send a 404 Not Found error
            res.status(409).json({ error: 'Disaster not found' });
        }
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error('Error fetching disaster:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add an image to uploadedPhotos array
app.post('/addImage/:id', async (req, res) => {
    try {
        // Extract the Disaster ID and image URL from the request
        const { id } = req.params;
        const imageUrl = req.body;
        // Find the Disaster document by ID
        const disaster = await Disaster.findById(id);

        // If the Disaster document is not found, send a 404 Not Found error
        if (!disaster) {
            return res.status(404).json({ error: 'Disaster not found' });
        }

        // Add the image URL to the uploadedPhotos array
        disaster.uploadedPhotos.push(imageUrl.img);

        // Save the updated Disaster document
        await disaster.save();

        // Send a success response
        res.status(200).json({ message: 'Image added successfully', disaster });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error('Error adding image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/updateFields/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { casualties, affectedPopulation, severity } = req.body;
        console.log("api is called in backend")
        console.log(casualties, affectedPopulation, severity);
        const updateFields = {};
        if (casualties) updateFields.casualties = casualties;
        if (affectedPopulation) updateFields.affectedPopulation = affectedPopulation;
        if (severity) updateFields.severity = severity;

        const disaster = await Disaster.findByIdAndUpdate(id, updateFields, { new: true });
        console.log(disaster);
        if (!disaster) {
            return res.status(404).json({ error: 'Disaster not found' });
        }

        res.status(200).json({ message: 'Fields updated successfully', disaster });
    } catch (error) {
        console.error('Error updating fields:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//==========================endpoints realted to volunteers==============
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

        res.json(count)

    } catch (err) {
        console.log("Errror while finding the no of volunteers")
    }

})

app.get('/volunteers/emails', async (req, res) => {
    try {
        // Query the Volunteer collection to retrieve emails
        const emails = await Volunteer.find({}, 'email');

        // Extract the emails from the result and create an array
        const emailList = emails.map(volunteer => volunteer.email);

        // Send the list of emails as a response
        res.status(200).json(emailList);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving emails:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//=====================Endpoints realted to Donations=========
app.get("/getDonations", (req, res) => {
    Donation.find({}).then(Donations => res.json(Donations)).catch(err => res.json(error));
});
app.post("/addDonation", async (req, res) => {
    const body = req.body;
    try {
        const newDonation = await Donation.create(body)
        newDonation.save();
        res.status(201).json({ msg: "New Donation Succesfully...!" })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
});
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

//=============================routes realted to  comments end here==================================

app.post('/comments', async (req, res) => {
    try {
        // Extract data from the request body
        const { disasterId, name, comment } = req.body;

        // Create a new comment document
        const newComment = new Comment({
            disasterId,
            name,
            comment
        });
        // Save the new comment to the database
        await newComment.save();

        // Send a success response
        res.status(201).json(newComment);
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to get comments based on the disaster ID
app.get('/comments/:disasterId', async (req, res) => {
    try {
        // Extract the disaster ID from the request parameters
        const { disasterId } = req.params;

        // Find comments associated with the given disaster ID
        const comments = await Comment.find({ disasterId });

        // Send the comments as a response
        res.status(200).json(comments);
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//========================================
const port = 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});




