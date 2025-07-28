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