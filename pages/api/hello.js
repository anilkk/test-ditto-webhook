export default function handler(req, res) {
    res.status(200).json({ message: 'Hello from Next.js!' })
  }

//   export default function handler(req, res) {
//     if (req.method === 'POST') {
//         res.status(200).json({ message: 'Hello from Next.js!' })
//     } else {
//       // Handle any other HTTP method
//     }
//   }