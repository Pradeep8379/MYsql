const express = require('express');
const mysql = require('mysql2');
const app = express()
app.use(express.json());

require('dotenv').config();

const con = mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})

con.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        const sql = 'CREATE TABLE IF NOT EXISTS mytable (id int ,name varchar(10))';
        con.query(sql, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('connected to mysql');
            }
        })
    }
})

app.post('/createUser', (req, res) => {
    let data = req.body;
    let { id, name, password } = data;

    con.query('insert into mytable values(?,?,?)',[id, name, password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('success');
        }
    })
})

app.get('/getUsers', (req, res) => {
 

    con.query('select * from mytable',(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({data:result});
        }
    })
})

app.listen(3000, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Port running on server 3000');
    }
})