const express=require('express')
const cors=require('cors')
const app= express()
const port= process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bahxlpw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
try{
    const foodCollection= client.db('happilyfreshdb').collection('foodservice')
    const reviewCollection= client.db('happilyfreshdb').collection('review')

    app.get('/foodservice',async(req,res)=>{
        const query={}
        sort = {'_id': -1}
        const cursor= foodCollection.find(query).sort(sort)
        const food= await cursor.limit(3).toArray();
        res.send(food)
    } )
    app.get('/foodservices',async(req,res)=>{
        const query={}
        sort = {'_id': -1}
        const cursor= foodCollection.find(query).sort(sort)
        const food= await cursor.toArray();
        res.send(food)
    } )
    app.get('/foodservices/:id',async(req,res)=>{
        const id= req.params.id;
        const query={_id:ObjectId(id)}
        const singleFood= await foodCollection.findOne(query)
        res.send(singleFood)
    })

    app.get('/reviews',async(req,res)=>{
        let query = {};

        if (req.query.foodId) {
            query = {
                foodId: req.query.foodId
            }
        }
        sort = {'_id': -1}
        const cursor = reviewCollection.find(query).sort(sort);
        const foodreview = await cursor.toArray();
        res.send(foodreview);
    })
    app.get('/myreviews',async(req,res)=>{
       
        let query = {};

        if (req.query.userEmail) {
            query = {
                userEmail: req.query.userEmail
            }
        }
        const cursor = reviewCollection.find(query);
        const myreview = await cursor.toArray();
        res.send(myreview);
    })

    app.post('/reviews', async(req,res)=>{
        const review=req.body        
        const result = await reviewCollection.insertOne(review)
        res.send(result)
    })

    app.post('/foodservices', async(req,res)=>{
        const food=req.body
        const result = await foodCollection.insertOne(food)
        res.send(result)
    })

    app.put('/reviews/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const newrev = req.body;
        const option = {upsert: true};
        const updatedreview = {
            $set: {
                review: newrev.review,
                
            }
        }
        const result = await reviewCollection.updateOne(filter, updatedreview, option);
        res.send(result);
    })

    app.delete('/reviews/:id',async(req,res)=>{
        const id=req.params.id
        const query={_id: ObjectId(id)}
        const result = await reviewCollection.deleteOne(query)
        res.send(result)
       }) 
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