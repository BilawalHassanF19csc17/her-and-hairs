import connectToDatabase from "../../../../lib/mongodb";
import Customer from "../../../../models/Customer";
import Subscriber from "../../../../models/Subscriber";
import nodemailer from 'nodemailer';

let counter = 0;
const sendNotification = async (subject, alignedText, name, email) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587, // Secure port for STARTTLS
        secure: false, // Use STARTTLS (automatically upgrade to TLS)
        auth: {
            user: 'contact@herandhair.com',
            pass: 'Calmdown123@$!!'
        }
    });

    const mailOptions = {
        from: '"Her & Hair" <contact@herandhair.com>',
        to: email,
        subject: `${subject}`,
        html: `<h3>Dear ${name},</h3>
        <div>${alignedText}</div>
        <p style="font-style: italic;">Thank you</p>
        <p style="font-style: italic; margin: 0;">Regards,</p>
        <p style="font-style: italic; margin: 0;">Her & Hair</p>`
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
        const {selectedCustomers, audience, subject, alignedText } = req.body

        if(audience === 'Selected Audience'){
            for (let i = 0; i < selectedCustomers.length; i++ ){
                const customer = await Customer.findOne({email: selectedCustomers[i].email});
                await sendNotification(subject, alignedText, customer.name, customer.email);
            }
            res.status(200).json({ counter });
        }

        if(audience === 'customers'){
            const customers = await Customer.find();

        for (let i = 0; i < customers.length; i++) {
            await sendNotification(subject, alignedText, customers[i].name, customers[i].email);
        }
        res.status(200).json({ counter });

        } else if(audience === 'subscribers'){
            const subcribers = await Subscriber.find();

        for (let i = 0; i < subcribers.length; i++) {
            await sendNotification(subject, alignedText, subcribers[i].name, subcribers[i].email);
        }
        res.status(200).json({ counter });
        }
        
    } else {
        res.status(400).end();
    }
}