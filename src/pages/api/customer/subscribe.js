import Cors from 'cors';
import connectToDatabase from '../../../../lib/mongodb';
import Subscriber from '../../../../models/Subscriber';

const cors = Cors({
  methods: ['POST', 'GET', 'OPTIONS'], // Add OPTIONS for preflight requests
  origin: 'https://herandhair.com', // Allow herandhair.com
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await connectToDatabase();
  await runMiddleware(req, res, cors);

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://herandhair.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end(); // End the OPTIONS request
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    const { name, email } = req.body; // Make sure you're sending the right fields

    const existingUser = await Subscriber.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const subscriber = new Subscriber({
      name,
      email
    });

    await subscriber.save();
    return res.status(200).json({ message: 'Successfully Subscribed' });
  } else {
    // If any other method is used, return 405 Method Not Allowed
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
