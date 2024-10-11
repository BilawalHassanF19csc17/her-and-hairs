import Cors from 'cors';
import connectToDatabase from '../../../../lib/mongodb';
import Subscriber from '../../../../models/Subscriber';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['POST', 'GET', 'OPTIONS'], // Allow POST, GET, and OPTIONS requests
  origin: 'https://herandhair.com', // Allow requests only from herandhair.com
});

// Middleware to run CORS
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
  // Connect to the database
  await connectToDatabase();
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  // Handle preflight request for CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://herandhair.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // Allow GET requests as well
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end(); // End the OPTIONS request
    return;
  }

  // Handle POST request for subscribing
  if (req.method === 'POST') {

    console.log(req.body);
    const { name, email } = req.body; // Capture the request body

    // Check if the user already exists
    const existingUser = await Subscriber.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new subscriber
    const subscriber = new Subscriber({
      name,
      email,
    });

    await subscriber.save(); // Save the subscriber in the database
    return res.status(200).json({ message: 'Successfully Subscribed' });
  }

  // Handle GET request to retrieve all subscribers
  if (req.method === 'GET') {
    try {
      const subscribers = await Subscriber.find(); // Fetch all subscribers from the database

      if (subscribers.length === 0) {
        return res.status(404).json({ message: 'No subscribers found' });
      }

      return res.status(200).json(subscribers); // Return all subscribers
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving subscribers' });
    }
  }

  // If any other method is used, return 405 Method Not Allowed
  res.setHeader('Allow', ['POST', 'GET', 'OPTIONS']); // Allow POST, GET, and OPTIONS methods
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
