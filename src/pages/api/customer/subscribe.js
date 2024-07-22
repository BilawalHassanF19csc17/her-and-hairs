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

    if(req.method === 'POST'){
        const {name,email} = req.body;

        const existingUser = await Subscriber.findOne({email});
        if(existingUser){
            res.status(400).json({message: "Already Exist"});
        }

        const subscriber = new Subscriber({
            name,
            email
        });

        await subscriber.save();
        res.status(200).json('Successfull Subscribed');
    } else{
        res.status(500).end();
    }
  }