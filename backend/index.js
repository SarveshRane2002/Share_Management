const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')

const app = express();

app.use(cors());
app.use(bodyparser.json());


// connect my sql database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'share_manager',
    port:3306
});

// check database


db.connect(err => {
    if(err){console.log('err')}
    console.log('Database connection succesful !!!')
})


// get all data 

app.get('/users',(req,res)=>{
    // console.log("get all users");
    let qrr= `SELECT * FROM users`;
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,"errors");
        }
        if(results.length>0){
            res.send({
                message: 'All users data',
                data:results
            });
        };
    });
});


// get single data by id/users

app.get('/users/:id',(req,res)=>{
    // console.log(req.params.id);
    let qrID = req.params.id;
    let qr = `SELECT * FROM users where id = ${qrID}`
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"Get Data By ID",
                data:results
            })
        }else{
            res.send({
                message:"Data Not Found bhaii"
            });
        }
    });
});

//post data 

app.post('/user',(req,res)=>{
    // console.log(req.body,"post data succcess")
    let fullName = req.body.fullname;
    let Sharename = req.body.sharename;
    let Quantity = req.body.quantity;
    // let Profit = req.body.profit;
    let Profit = (req.body.sellprice - req.body.buyprice)*(req.body.quantity);
    let Broker = req.body.broker;
    let BuyPrice = req.body.buyprice;
    let SellPrice = req.body.sellprice;
    let Date = req.body.date;
    

    let qr = `insert into users(fullname,sharename,quantity,profit,broker,buyprice,sellprice,date)value('${fullName}','${Sharename}','${Quantity}','${Profit}','${Broker}','${BuyPrice}','${SellPrice}','${Date}')`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"Data Added sucessfully!!!",
                data:results
            });
        }
    });

});

// update data 


app.put('/user/:id',(req,res)=>{
    // console.log(req.body,"updated data")
    let uID = req.params.id;
    let fullName = req.body.fullname;
    let Sharename = req.body.sharename;
    let Quantity = req.body.quantity;
    let Profit = (req.body.sellprice - req.body.buyprice)*(req.body.quantity);
    let Broker = req.body.broker;
    let BuyPrice = req.body.buyprice;
    let SellPrice = req.body.sellprice;
    let Date = req.body.date;
    let qr = `UPDATE users set fullname = '${fullName}', sharename = '${Sharename}', quantity = '${Quantity}', profit = '${Profit}' , broker = '${Broker}', buyprice = '${BuyPrice}', sellprice = '${SellPrice}', date = '${Date}' where id = ${uID}`;
    db.query(qr,(err, results)=>{
        if(err){
            console.log(err)
        }
        res.send({
            message:"data updated successfully",
            data:results
        });
    });

});

// delete data

app.delete('/user/:id',(req,res)=>{
    let uID = req.params.id;
    let qr = `delete from users where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err)
        }
        res.send({
            message:"Data deleted successfully",
            data:results
        })
    })
})

app.listen(3000, ()=>{
    console.log("server is running on 3000 PORT, SR ");
})
