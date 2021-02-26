// imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const bodyParser = require('body-parser')
const Company = require('./models/CompanyData')
const app = express()
//db connections
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/company')
mongoose.connection.on('connected',()=>{
    console.log('Database is connected');
})
mongoose.connection.on('error',()=>{
    console.log('error occured');
})
//middlewares
app.use(cors())
app.use(express.json())


//routes
app.get('/',(req,res)=>{
    Company.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
})
app.post('/company',(req,res)=>{
    console.log(req.body.name);
    console.log(req.body.date);
    console.log(req.body.phone);
    console.log(req.body.org);
    const company = new  Company({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        date : req.body.date,
        phone: req.body.phone,
        org:req.body.org
    });
    company.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"succesfully submitted"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error occured"});
    })
})
app.delete('/company/:id',(req,res)=>{
    const id = req.params.id;
    Company.remove({_id:id},(err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send('error occured');
        }
        else{
            res.status(200).json({msg:"successfully deleted"});
        }
    })
})
app.put('/company/:id',(req,res)=>{
    const name = req.body.name;
    const date = req.body.date;
    const phone = req.body.phone;
    const id = req.params.id;
    const org=req.body.org;
    Company.update({_id:id},{$set:{name:name,date:date,phone:phone,org:org}})
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"successfully updated"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred"});
    })
})


//server
app.listen(5000,()=>{
    console.log('server was connected on port:5000')
})