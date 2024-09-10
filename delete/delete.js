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
router.post("/", (req, res) => {
    let obj = {
        "p_id": req.body.p_id
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('Patients').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log('Data deleted')
                        res.json({ 'delete': 'success' })
                    }
                    else {
                        console.log('Data Not deleted')
                        res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})
/*
//Delete product from cart
router.post("/deleteCart", (req, res) => {
    let obj = {
        "p_id": req.body.p_id,
        "uname": req.body.uname
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniprj')
            db.collection('cart').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'cartDelete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                        console.log(`Cart data fro ${obj.uname} deleted`)
                        res.json({ 'cartDelete': 'success' })
                    }
                    else {
                        console.log('Cart Data Not deleted')
                        res.json({ 'cartDelete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})
*/
//Delete user
//to be done by participants
//export router
module.exports = router