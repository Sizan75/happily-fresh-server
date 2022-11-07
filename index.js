const express=require('express')
const cors=require('cors')
const jwt= require('jsonwebtoken')
const app= express()
const port= process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.send('happily fresh server running')
})

app.listen(port, ()=>{
    console.log(`happily Fresh server running in port ${port}` )

})