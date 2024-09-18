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
    let obj = req.body
    obj.date = date
    console.log("Body:- ",req.body,'object :- ',obj)
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


//Create Doctor
router.post("/createDoctor", (req, res) => {
    let obj = req.body
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection :- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('Doctors').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'doctorInsert': 'Error ' + err })
                else {
                    console.log("doctor inserted")
                    res.json({ 'doctorInsert': 'success' })
                    conn.close()
                }
            })
        }
    })
})
/*
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