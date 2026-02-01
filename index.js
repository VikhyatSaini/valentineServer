const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: '*' 
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/respond', async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Valentine Update! ❤️",
            text: `Mission Accomplished. Mahi clicked YES!`
        });
        res.status(200).json({ success: true });
    } catch (error) { res.status(500).json({ success: false }); }
});

app.listen(5000, () => console.log("Server active on port 5000"));
