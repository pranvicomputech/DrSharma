//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let obj = require('../config')
let url = obj.url
let dbName = obj.db
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
//Insert Patient
router.post("/", (req, res) => {
    let obj = req.body
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('Patients').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'insert': 'Error ' + err })
                else {
                    console.log("Data inserted")
                    res.json({ 'insert': 'success' })
                    conn.close()
                }
            })
        }
    })
})

//Insert Appointment
router.post("/appointment", (req, res) => {
    let date = new Date()
    let obj = {
        name :req.body.name,
        date : date,
        medicines :req.body.medicines
    }    
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('Appointments').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'insert': 'Error ' + err })
                else {
                    console.log("Data inserted")
                    res.json({ 'insert': 'success' })
                    conn.close()
                }
            })
        }
    })
})


/*
//Insert User
router.post("/createUser", (req, res) => {
    let obj = {
        "userid": req.body.userid,
        "uname": req.body.uname,
        "upwd": req.body.upwd,
        "email": req.body.email,
        "address": req.body.address,
        "contact": req.body.contact
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('users').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'userInsert': 'Error ' + err })
                else {
                    console.log("User inserted")
                    res.json({ 'userInsert': 'success' })
                    conn.close()
                }
            })
        }
    })
})

//insert product into cart
router.post("/cartInsert",(req,res)=>{
    let obj = {
        "p_id" : req.body.p_id,
        "p_cost" : req.body.p_cost,
        qty : 1,
        "p_img":req.body.p_img,
        "uname" : req.body.uname
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('cart').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'cartInsert': 'Error ' + err })
                else {
                    console.log("Prouct in Cart inserted")
                    res.json({ 'cartInsert': 'success' })
                    conn.close()
                }
            })
        }
    })
})
*/
//export router
module.exports = router