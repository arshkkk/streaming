var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res,next)=>{

	res.sendFile(path.join(__dirname,'video.mp4'))
})

app.get('/download',(req,res,next)=>{
  const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

async function downloadImage () {  
  const url ='https://r1---sn-ci5gup-qxaee.googlevideo.com/videoplayback?expire=1588740201&ei=CeyxXr7SC53IyQWel6m4Dg&ip=77.65.13.85&id=o-AEkqw7QS3zIegHFLloQFyi7T78vXn9gP5e7uyi01mAvN&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=39081439&ratebypass=yes&dur=856.816&lmt=1575012543500748&fvip=1&fexp=23882513&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJpPlLswRgIhAO_a4HwfF_BA1oR5WtYuoPu9SdCYd08FvzANugDkfFHJAiEAtGBhsfcGewNGJinXLJXsi0V6jEil42uwYTzlQSCwLV4%3D&video_id=LWVszQoVnGY&title=Hindi+Touching+Short+Film+-+Baalak+-+An+emotional+drama+filled+with+sentiments+%26+emotions&rm=sn-pj2-2v1s7e,sn-f5fr7e&req_id=52ba9018c872a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=wQ&mip=223.185.138.155&mm=29&mn=sn-ci5gup-qxaee&ms=rdu&mt=1588718491&mv=m&mvi=0&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAKDrFFvRJkXqM3Ot0j4RLc3ZDwmp2SWrIqIhV0gRRStVAiBlGQ3aBh5Bu4qDBc9YmtV2_PxnIK2Z3aSb-JEoVSZwSg%3D%3D'
  const path = Path.resolve(__dirname, 'videos', 'technical.mp4')
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadImage().then(()=>res.json({success:true})).catch(()=>res.json({success:true}))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
