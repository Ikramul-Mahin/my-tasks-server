const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
//MIDDLE
app.use(cors())
app.use(express.json())

//mongo setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtekdls.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//mongodb-related
async function run() {
    try {
        const usersCollection = client.db('my-tasks').collection('users')

        //post user
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            console.log(result);
            res.send(result)
        })
        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray()
            console.log(result);
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(err => console.log(err))


//basic
app.get('/', (req, res) => {
    res.send('Alhamdulillah server is running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})