const express= require('express')
const mongoose= require('mongoose')
require('dotenv').config();

const Todo= require('./models/Todo');


const app=express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, 

).then(()=>{
    console.log('Connected to Mongo')
}).catch((err)=>{
    console.error("MongoDb error", err)
});

app.get('/', (req,res)=>{
    res.send("Mongo is connected")
    console.log("Mongo rocks")
})

app.post('/life', async(req,res)=>{
    const { title } =req.body

    try {
        const todo =await Todo.create({title})
        res.status(201).json(todo)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})

mongoose.connection.once('open', async () => {
  const exists = await Todo.findOne({ title: 'My first todo' });
  if (!exists) {
    await Todo.create({ title: 'My first todo' });
    console.log(' Todo added.');
  }
});


const PORT= process.env.PORT||5000;
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT} `)
})