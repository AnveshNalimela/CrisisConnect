const http = require("http");
const nodemailer = require("nodemailer");
const cors = require('cors');
const axios = require("axios");
const express = require('express');



// Create a new Express app
const app = express();

// Use the CORS middleware
app.use(cors());
app.use(express.json())

// Define the route for sending emails
app.post("/sendEmail", async (req, res) => {
    try {
        // Fetch volunteer emails
        const emailList = await fetchVolunteerEmails();
        const body = req.body;

        const message = `
        Emergency Alert:
        Type: ${req.body.crisisType}
        Location: ${req.body.location}
        Severity: ${req.body.severity}
        Date and Time: ${req.body.dateTime}
        
        Description:${req.body.description}
        
        Additional Notes:
        ${req.body.additionalNotes}
        
        Affected Population: ${req.body.affectedPopulation}
        Casualties: ${req.body.casualties}
        
        Emergency Response:
        ${req.body.emergencyResponse}
        
        Uploader's Name: ${req.body.uploaderName}
        Uploader's Email: ${req.body.uploaderEmail}

        If you are able to contribute in any capacity, please don't hesitate to reach out to us at [crisisConnect@support]. Every donation, no matter how small, will go a long way in rebuilding lives and restoring hope in our community.

        Thank you for considering our appeal and for your unwavering support during this challenging time.

        Warm regards,
        [By Crisis Connect team]
        [Crsis connect org]


        `;
        // Create email receiver object
        const receiver = {
            from: "nalimelaayan@gmail.com",
            to: emailList.join(', '), // Join the emails into a comma-separated string
            subject: "Alert regarding the " + req.body.crisisType + ": " + req.body.location,

            text: message,
        };

        // Send email
        const mail = {
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "nalimelaayan@gmail.com",
                pass: "bptn pyzy liqg lsta"
            }
        };
        const auth = nodemailer.createTransport(mail);
        auth.sendMail(receiver, (error, emailResponse) => {
            if (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            } else {
                console.log("Email sent successfully!");
                res.status(200).send("Email sent successfully!");
            }
        });
    } catch (error) {
        console.error('Error in sending email:', error);
        res.status(500).send("Internal Server Error");
    }
});

// Fetch volunteer emails function
const fetchVolunteerEmails = async () => {
    try {
        // Make a GET request to the API endpoint
        const response = await axios.get('http://localhost:3001/volunteers/emails');

        // Extract the list of emails from the response data
        const emailList = response.data;

        // Return the list of emails
        return emailList;
    } catch (error) {
        // Handle errors
        console.error('Error fetching volunteer emails:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

// Set the server to listen on port 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Mailer is running on port ${port}`);
});
