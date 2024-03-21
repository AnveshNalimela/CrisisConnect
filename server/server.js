
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
// const Crisis = require("./models/crisis");
// const Volunteers = require("./models/volunteer");
// const Donations = require("./models/donations");


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
const port = 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})


app.close()