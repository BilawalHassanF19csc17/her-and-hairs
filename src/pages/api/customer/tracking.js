import nodemailer from 'nodemailer';

const sendNotification = async (trackingID,customer,email) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587, 
        secure: false, 
        auth: {
            user: 'contact@herandhair.com',
            pass: 'Calmdown123@$!!'
        }
    });

    const mailOptions = {
        from: '"Her & Hair" <contact@herandhair.com>',
        to: email,
        subject: 'Your Order Has Been Shipped',
        html: `<h3>Dear ${customer},</h3>
        <p>Great news! Your order has been shipped and on its way to you.</p>
        <br>
        <p>You can track your order using the following tracking number <b>${trackingID}</b>. Simply visit this <a href="https://www.aramex.com/us/en/track/shipments">link</a> and enter your tracking number to check the status of your shipment.</p>
        <br>
        <p>If you have any query or need further assistance, feel free to reach out us at contact@herandhair.com. We are always happy to help!</p>
        <p><b>Note to Customers: </b>
        To ensure a smooth resolution for any claims regarding damaged or broken products, please make sure to record a video while unpacking your order. This will help us assist you promptly and effectively. Thank you for your understanding!</p>
        <br>
        <p style="font-style: italic;">Thank you for choosing Her & Hair</p>
        <p style="font-style: italic; margin: 0;">Best Regards,</p>
        <p style="font-style: italic; margin: 0;">Team Her & Hair</p>`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('number of Emails Sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default async function handler(req, res){
    if(req.method === 'POST'){
        const {trackingID,customer,email} = req.body;

        await sendNotification(trackingID, customer, email );
        res.status(200).json({message: "Sent"});
    }
}