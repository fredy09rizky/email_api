const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'fredy09rizky@gmail.com',
        pass: 'acpnmxmndtgomnqi'
    }
});

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'fredy09rizky@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Email could not be sent' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Email has been sent' });
        }
    });
});

app.listen(port, () => {
    console.log("Server is running on port " +port);
});
