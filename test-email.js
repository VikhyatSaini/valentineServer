const nodemailer = require('nodemailer');
require('dotenv').config(); // Loads your EMAIL_USER and EMAIL_PASS

async function testConnection() {
    console.log("Starting email test...");

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // The 16-digit App Password
        }
    });

    try {
        // Verify the connection configuration
        await transporter.verify();
        console.log("✅ Success: Server is ready to take our messages");

        // Send a test mail
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, 
            subject: "MERN Stack Test Email",
            text: "If you are reading this, your Gmail App Password is working perfectly!"
        });

        console.log("✅ Message sent: %s", info.messageId);
    } catch (error) {
        console.error("❌ Error occurred:");
        console.error(error.message);
        console.log("\nTroubleshooting tips:");
        console.log("1. Ensure 'EMAIL_PASS' has no spaces.");
        console.log("2. Confirm 2-Step Verification is ON in Google Security.");
        console.log("3. Use a 16-character App Password, NOT your regular password.");
    }
}

testConnection();