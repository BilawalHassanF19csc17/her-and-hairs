import Cors from 'cors';

// Initialize the CORS middleware with specific settings
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: 'https://herandhair.com',
});

// Helper function to run middleware
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
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const body = await req.body;
    console.log("Received data:", body);  // Log the received data
    res.status(200).json(body);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
