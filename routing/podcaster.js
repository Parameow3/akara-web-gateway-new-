const express = require("express");
const route   = express.Router();
const db  = require('../db/mongoConfig');
const jsonwebtoken = require("jsonwebtoken");
const axios = require("axios");
const FormData = require('form-data');
const {TokenValidator} = require('../middleware/middlware');
const redis = require("redis");
const redisClient = redis.createClient({
    url : 'redis://cache.akarahub.tech:6379'
});
(async()=> await redisClient.connect())();
redisClient.on('ready',()=> console.log("connect to cache successfully"));
redisClient.on('error',(err)=>console.log("error during connecting to redis server ..."));
db();

//=======================================
// LIST ALL PODCASTER OF AKARA 
//======================================
route.get('/list/all/podcaster',TokenValidator,async(req,res)=>{
    const token = jsonwebtoken.sign({user:req.session.user,role:req.session.role,email:req.session.email},process.env.PROGRAM_TOKEN_SECRET,{expiresIn : '5min'});
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    try{
        const result = await axios.get("https://dev.akarahub.tech/server3/discover/podcaster/list/all/listallpodcaster",
        {
            headers : {
                "content-type" : "application/json"
            }
        }
        );
        return res.json(result.data);
    }catch(e){
        return res.json({
            error : true,
            message : e.message
        })
    }
   
})
//================================================
// LIST PODCAST OF PODCASTER
//=================================================
route.post('/list/podcaster/podcast',TokenValidator,async(req,res)=>{
    const podcaster_id = req.body.podcaster_id;
    console.log(podcaster_id);
    const token = jsonwebtoken.sign({user:req.session.user,role:req.session.role,email:req.session.email},process.env.PROGRAM_TOKEN_SECRET,{expiresIn : '5min'});
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    //make the axios request
    try{
        
        const result = await axios.post("https://dev.akarahub.tech/server3/discover/podcaster/list/podcaster/podcastofpodcaster",{
                id : podcaster_id  
        },{
            headers : {
                "content-type" : "application/json"
            }
        });
    // if data get success 
    return res.json(result.data)
    }catch(e){
        return res.json({
            error : true,
            message : e.message
    })
    }   
});
//=========================================
// BAN PODCASTER 
//=========================================
route.post('/ban/podcaster',TokenValidator,async(req,res)=>{
    const podcaster_id = req.body.podcaster_id;
    const token = jsonwebtoken.sign({user:req.session.user,role:req.session.role,email:req.session.email},process.env.PROGRAM_TOKEN_SECRET,{expiresIn : '5min'});
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    //make the axios request
    try{
        const result = await axios.post("https://dev.akarahub.tech/server3/discover/podcaster/ban/banpodcaster",{
                podcaster_id : podcaster_id  
        },{
            headers : {
                "content-type" : "application/json"
            }
        });
    // if data get success 
    return res.json(result.data)
    }catch(e){
        return res.json({
            error : true,
            message : e.message
        })
    } 
});

//============================================
// DISBAN PODCASTER 
//============================================
route.post('/disban/podcaster',TokenValidator,async(req,res)=>{
    const podcaster_id = req.body.podcaster_id;
    const token = jsonwebtoken.sign({user:req.session.user,role:req.session.role,email:req.session.email},process.env.PROGRAM_TOKEN_SECRET,{expiresIn : '5min'});
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    //make the axios request
    try{
        
        const result = await axios.post("https://dev.akarahub.tech/server3/discover/podcaster/ban/podcaster/unbanpodcaster",{
                podcaster_id : podcaster_id  
        },{
            headers : {
                "content-type" : "application/json"
            }
        });
    // if data get success 
    return res.json(result.data)
    }catch(e){
        return res.json({
            error : true,
            message : e.message
        })
    } 
});

//=========================================
// DELETE PODCASTER 
//=========================================
route.post('/delete/podcaster',TokenValidator,async(req,res)=>{
    const podcaster_id = req.body.podcaster_id;
    console.log(podcaster_id)
    const token = jsonwebtoken.sign({user:req.session.user,role:req.session.role,email:req.session.email},process.env.PROGRAM_TOKEN_SECRET,{expiresIn : '5min'});
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    //make the axios request
    try{
        
        const result = await axios.post("https://dev.akarahub.tech/server3/discover/podcaster/delete/deletepodcaster",{
             podcaster_id : podcaster_id  
        },{
            headers : {
                "content-type" : "application/json"
            }
        });
    // if data get success 
    return res.json(result.data);
    }catch(e){
        return res.json({
            error : true,
            message : e.message
        })
    };
});

module.exports = route;