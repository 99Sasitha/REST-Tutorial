const express=require('express'); //import express 
const joi=require('joi'); //import joi
const app=express();//create express application in app variable
app.use(express.json()); //use in the json file


//give data to the server

const customers=[
{"name":"Sasitha","id":1},
{"name":"Shamal","id":2},
{"name":"Madusha","id":3}


];

//API call
app.get("/",(req,res)=>{
    res.send("Welcome Our First API");

});


app.get("/api/customers",(req,res)=>{
    res.send(customers);

});


app.get("/api/customers/:id",(req,res)=>{

    const customer=customers.find((c)=>c.id===parseInt(req.params.id));
    
    if(!customer){
        res.status(404).send("<h2> Customer not find "+req.params.id+"</h2>");
    }
    else{
        res.send(customer);
    }
    
});

app.post("/api/customers",(req,res)=>{
    const {error}=validateCustomer(req.body);

    if(error){
        res.status(400).send(error.details[0].messaage);
        return;
    }

    //add new customer
    const newCustomer={
        id:customers.length+1,
        name:req.body.name
    }
    customers.push(newCustomer);
    res.send(customers);
});

function validateCustomer(customer){
    const schema={
        name:joi.string().min(3).max(10).required()
     }

     return joi.validate(customer.schema);

}

const port=process.env.PORT || 3000; //creating a port
app.listen(port,()=>console.log(`Listening to port ${port}`));
