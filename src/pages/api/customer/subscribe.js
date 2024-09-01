import Cors from 'cors';
import connectToDatabase from '../../../../lib/mongodb';
import Subscriber from '../../../../models/Subscriber';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: 'https://herandhair.com',
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

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.setHeader('Access-Control-Allow-Origin', 'https://herandhair.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, email } = await req.body;

    const existingUser = await Subscriber.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Already Exist" });
    }

    const subscriber = new Subscriber({
      name,
      email
    });

    await subscriber.save();
    res.status(200).json('Successfull Subscribed');
  } else if (req.method === 'GET') {

    const subscribers = await Subscriber.find();
    if (subscribers.length === 0) {
      res.status(400).end();
    }
    res.status(200).json(subscribers);
  }
}