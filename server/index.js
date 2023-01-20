const express = require('express')
const app = express()
const mySQL = require('mysql')
 
const db = mySQL.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'crud'
    }
)
 
const BodyParser = require('body-parser')
const cors = require('cors')
 
app.use(cors())
app.use(express.json())
app.use(BodyParser.urlencoded({ extended: true }))
 
app.post("/api/NonQuery", (req, res) => {
   let mySQL = req.body.mySQL
   db.query(mySQL, (err, result) => {
    console.log(err)
    if (err == null)
        res.send('Done')
    else 
        res.send('Error')
  })
});
 
app.get ("/api/DataQuery", (req,res) => {
    const mySQL = req.query.sql
    db.query(mySQL, (err, result) => {
        console.log(result)
        res.send(result)
    })
}
);
 
app.listen(3009, () => {
    console.log('Hello iHi MySQL Server')
});
