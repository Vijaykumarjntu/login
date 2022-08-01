const express = require("express");
const getData = require("./mongo");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get("/",(req,res)=>{
    res.render("signup");
})
app.post("/signup",async (req,res)=>{
    let vj = await getData();
    let {name,password} = req.body;
    let data = await vj.insertOne({name:name,pw:password});
    res.send(data);
    res.end();
})
app.get("/login.ejs",(req,res)=>{
    res.render("login");
})
app.get("/login",async(req,res)=>{
    let dj = await getData();
    try{
        let name = req.query.name;
        let password = req.query.password;
        let data = await dj.findOne({name:name,pw:password});
        if(data === null){
            res.send(`please register before you sign in mr ${name}`);
        }else{
            res.send(`welcome mr ${name}`);
        }
        res.end();    
    }catch(e){
        res.send(e);
        res.end();
    }
})
app.listen(3000);