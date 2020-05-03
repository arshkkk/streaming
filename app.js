const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.get('/json',(req,res)=>{
res.json({success: true})
})
app.get('/',(req,res)=>{
    const stream = fs.createReadStream('video.mp4')
    // res.setHeader('Content-Type', 'video')
    res.header({'Content-Type':'video/mp4'})
   	res.sendFile(path.join(__dirname,'video.mp4'))
   	
})

app.listen(3000)
