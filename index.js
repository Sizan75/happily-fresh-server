const express=require('express')
const cors=require('cors')
const jwt= require('jsonwebtoken')
const app= express()
const port= process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER} :${process.env.DB_PASSWORD}@cluster0.bahxlpw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function run() {
try{
    const foodCollection= client.db('happilyfreshdb').collection('foodservice')
    const reviewCollection= client.db('happilyfreshdb').collection('review')
}
finally{

}
}
run().catch(error=>console.error(error))



app.get('/',(req,res)=>{
    res.send('happily fresh server running')
})

app.listen(port, ()=>{
    console.log(`happily Fresh server running in port ${port}` )

})