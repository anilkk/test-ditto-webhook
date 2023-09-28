const crypto = require("crypto");

export default function handler(req, res) {
    const WEBHOOK_SIGNING_KEY = process.env.WEBHOOK_SIGNING_KEY || "xxxxxxx";
    
    console.log(`--------\nReceived event: '${req.body.event}'`);

    const {
      "x-ditto-request-id": requestId,
      "x-ditto-timestamp": timestamp, 
      "x-ditto-signature": signature
    } = req.headers;

    const threeMinutesAgo = new Date().getTime() - 1000 * 60 * 3;

        console.log(`--------\nReceived event: '${req.body.event}'`);

        // Get the input data by concatenating three things, with '.' separating them:
        // - the request id
        // - the timestamp
        // - the stringified request body
        const inputData = `${requestId}.${timestamp}.${JSON.stringify(req.body)}`;

        // Compute a signature using your webhook signing key and the
        // input data
        const computedSignature = crypto
          .createHmac("sha256", WEBHOOK_SIGNING_KEY)
          .update(inputData)
          .digest("hex");

        // Validate that the payload is from Ditto and hasn't been tampered
        // with by checking that the signature from the header matches your
        // computed signature
        if (signature !== computedSignature) {
          console.error("❌ Invalid signature");
          return res.status(400).send();
        } else {
          console.log(`✅ Ditto webhook signature is valid`);
        }

        console.log(`Payload: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).json({ message: 'Received successfully!' })
}

