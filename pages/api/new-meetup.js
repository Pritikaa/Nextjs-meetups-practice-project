import { MongoClient } from 'mongodb';

//POST /api/new-meetup
//in this we dont write any react component

async function handler(req, res) {

  console.log(req);
  if (req.method === 'POST') {
    const data = req.body;
    
    //connect returns a promise thatsy we can convert our handler function to async function
    //"mongodb+srv://pritika:pritika16@cluster0.sqxlx.mongodb.net/meetupsUdemySection23?retryWrites=true&w=majority"
    const client = await MongoClient.connect(
      "mongodb+srv://pritika:pritika16@cluster0.sqxlx.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    //collections --> tables in sql database
    //documents --> entries in those tables in the database
    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data); // takes input as an object

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
