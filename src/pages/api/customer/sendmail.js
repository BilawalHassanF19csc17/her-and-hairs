import connectToDatabase from "../../../../lib/mongodb";
import Customer from "../../../../models/Customer";
import nodemailer from 'nodemailer';

let counter = 0;
const sendNotification = async (subject, text, name, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'medisyncalerthub@gmail.com',
            pass: 'tawt ifec atpf ezzp'
        }
    });

    //emails.join(',')
    const mailOptions = {
        from: 'medisyncalerthub@gmail.com',
        to: email,
        subject: `${subject}`,
        html: `<div style="font-family: Arial, sans-serif; color: #333;">
        <img src="https://herandhair.com/wp-content/uploads/2021/03/cropped-cropped-Her-83-x-500-px.png" alt="logo"/>
        <h3 style="color: #4CAF50;">Hi ${name},</h3>
        <p>${text}</p>
        <p style="font-style: italic;">Thank you</p>
    </div>`
    }

    try {
        await transporter.sendMail(mailOptions);
        counter++;
        console.log('number of Emails Sent', counter);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'POST') {
        const { subject, text } = req.body

        const customers = await Customer.find();

        for (let i = 0; i < customers.length; i++) {
            await sendNotification(subject, text, customers[i].name, customers[i].email);
        }
        res.status(200).json({ counter });
    } else {
        res.status(400).end();
    }
}