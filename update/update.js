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
/*
router.post('/', (req, res) => {
    let p_id = req.body.p_id
    let obj = {
        "p_name": req.body.p_name,
        "p_cost": req.body.p_cost
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection("Patients").updateOne({ p_id }, { $set: obj }, (err, result) => {
                if (err)
                    res.json({ 'update': 'Error ' + err })
                else {
                    if (result.matchedCount != 0) {
                        console.log("Data updated ")
                        res.json({ 'update': 'success' })
                    }
                    else {
                        console.log("Data Not updated ")
                        res.json({ 'update': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})
*/
//Update Patient history
router.post("/updateHistory", (req, res) => {    
    let name = req.body.name
    let obj = {
        
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db(dbName)
            db.collection('Appointments').updateOne({ name }, { $set: obj },
                (err, result) => {
                    if (err)
                        res.json({ 'historyUpdate': 'Error ' + err })
                    else {
                        if (result.matchedCount != 0) {
                            console.log(`History data for ${name} updated`)
                            res.json({ 'historyUpdate': 'success' })
                        }
                        else {
                            console.log(`Record not updated`)
                            res.json({ 'historyUpdate': 'Record Not found' })
                        }
                        conn.close()
                    }
                })
        }
    })
})
//export router
module.exports = router