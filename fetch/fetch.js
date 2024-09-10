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

//Fetch All Patients
router.get("/", (req, res) => {
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('Patients').find().toArray((err, array) => {
                if (err)
                    console.log('Error :- ' + err)
                else {
                    console.log('Data sent')
                    res.json(array)
                    conn.close()
                }
            })
        }
    })
})

//Find a Patient
router.post("/find", (req, res) => {
    let name = req.body.name
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)            
            db.collection('Patients').find(
                {$or: [
                    { fname: name },
                    { lname: name},
                    { mname: name}
                  ]}
            ).toArray((err, array) => {
                if (err)
                    console.log(err)
                else
                    if (array.length > 0)
                        res.json({ 'patient': 'found', 'list': array })
                    else
                        res.json({ 'patient': 'not found' })
                console.log('patient response sent')
                conn.close()
            })
        }
    })
})

//Fetch Patient History
router.post("/history", (req, res) => {
    let name = req.body.name
    let obj = { name }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('Appointments').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    res.json(array)
                    console.log(`Appointments response for ${obj.name} sent`)
                    conn.close()
                }
            })
        }
    })
})

/*
//User login Authentication
router.post("/auth", (req, res) => {
    let u_name = req.body.uname
    let u_pwd = req.body.upwd
    let obj = { u_name, u_pwd }
    console.log(obj)
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('users').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    if (array.length > 0)
                        res.json({ 'auth': 'success', 'user': u_name })
                    else
                        res.json({ 'auth': 'failed' })
                    console.log('Auth response sent')
                    conn.close()
                }
            })
        }
    })
})
//Fetch cart data
router.post("/fetchCart", (req, res) => {
    let uname = req.body.uname
    let obj = { uname }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('cart').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    res.json(array)
                    console.log(`Cart response for ${obj.uname} sent`)
                    conn.close()
                }
            })
        }
    })
})

*/
//export router
module.exports = router
