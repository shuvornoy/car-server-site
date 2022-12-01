const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.izvrctz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    const productCollection = client.db("carProject").collection("service");
    const bookingsCollection = client.db("carProject").collection("bookings");

    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const services = await cursor.toArray();
      res.send(services.reverse());
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await productCollection.findOne(query);
      res.send(service);
    });

    app.get("/bookings", async (req, res) => {
     const query = {};
     const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });


    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const query = {
        email: booking.email,
        treatment: booking.treatment,
      };
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

   
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("", (req, res) => {
  res.send("car the car raning server");
});

app.listen(port, () => {
  console.log(`car tha car port ${port}`);
});
