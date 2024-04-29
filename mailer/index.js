// const http=require('http');
// const nodemailer = require('nodemailer');

// // Create a transporter
// const server=http.createServer((request,response)=>{
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         secure:true,
//         port:465,// Replace with your email provider
//         auth: {
//             user: 'nalimelaayan@gmail.com', // Replace with your email
//             pass: "ISRODRDO" // Replace with your email password
//         }
//     });

// })


// // Send email function
// const sendEmail = async (to, subject, text) => {
//     let mailOptions = {
//         from: 'nalimelaayan@gmail.com', // Replace with your email
//         to: to,
//         subject: subject,
//         text: text
//     };

//     try {
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//     } catch (error) {
//         console.error('Error sending email: ' + error);
//     }
// };

// // Example usage
// sendEmail('nalimelaanvesh@gmail.com', 'Hello', 'This is a test email from my MERN app.');

const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "nalimelaayan@gmail.com",
            pass: "bptn pyzy liqg lsta"

        }
    });

    const receiver = {
        from: "nalimelaayan@gmail.com",
        to: "nalimelaanvesh@gmail.com",
        subject: "Node Js Mail Testing!",
        text: "Hello this is a text mail!"
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if (error)
            throw error;
        console.log("success!");
        response.end();
    });

});

server.listen(8080);