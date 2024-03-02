const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const fs = require("fs")
const path = require("path")
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ status: "Online" });
});
app.head("/on", (req, res) => {
  res.json({ status: "Online" });
});
app.get("/", (req, res) => {
  res.json({ status: "Online" });
});


// Endpoint untuk mengirim email

app.post("/api/send-email", (req, res) => {
  const { from, to, subject, text, user, password } = req.body;
  // Konfigurasi Nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: user,
      pass: password,
    },
  });
  // Replace Kode Verifikasi
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, './email.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = Handlebars.compile(source);
  const replacements = {
    txt: text
  };
  const htmlToSend = template(replacements);
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html:  htmlToSend,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Email could not be sent" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email has been sent" });
    }
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
