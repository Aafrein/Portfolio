const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { fullname, email, messages } = req.body;

    // Create a Nodemailer transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'googooaafgmail.com', // Your email address
            pass: 'aafrein@rumi11', // Your email password
        },
    });

    // Email content
    const mailOptions = {
        from: 'googooaaf@gmail.com', // Your email address
        to: 'aafreinrafiq11@example.com', // Recipient's email address
        subject: 'New Contact Form Submission',
        text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${messages}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
