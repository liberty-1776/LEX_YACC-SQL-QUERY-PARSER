//jshint esversion:6
const mysql = require('mysql2');
const express = require("express");
const ejs = require('ejs');
const bodyParser = require("body-parser");
const { execFile } = require('node:child_process');
var fs = require('fs');



const app = express();
app.use(bodyParser.urlencoded({extended:"true"}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"your_password",
    database:"name_of_database"
});

app.get("/" , function(req,res){
    res.render('home');
});

app.post("/",function(req,res){
    var content = req.body.command1;
    fs.writeFile('input.txt', content, err => {
        if (err) {
            console.error(err);
        } 
    })
   
    const child = execFile('a', (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        var data = fs.readFileSync('out.txt', 'utf8');
        
        connection.query(data, function (err, results, fields) {
            if (err) throw err;
            if(data.split(' ')[1]=='update' || data.split(' ')[1]=='delete'){
                const st = 'select * from student;'
                connection.query(st, function (err, results, fields) {
                    if (err) throw err;
                    
                    res.render("output", {results: results,data:data});
                });
            }else{
                res.render("output", {results: results,data:data});
            }
            
            
        });
    })
});

app.listen(3000,function(){
    console.log("server is running on http://localhost:3000");
});
