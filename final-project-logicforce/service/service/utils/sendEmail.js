import nodemailer from 'nodemailer';

const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Replace with your email provider (e.g., 'gmail', 'yahoo')
        auth: {
            user: process.env.EMAIL, // Your email address
            pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
};

export default sendEmail;
