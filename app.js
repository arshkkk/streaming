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
  const url = 'https://r6---sn-ci5gup-pmjd.googlevideo.com/videoplayback?expire=1588739503&ei=T-mxXtOkAcyPkwbnj5noAQ&ip=64.145.94.137&id=o-ACeGyl9ErhTdaX8xQ8JOfxtJtjVDLCrm8_mt1NrEaMoC&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=462097498&ratebypass=yes&dur=8892.963&lmt=1586975654091121&fvip=6&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJpPlLswRQIhAJaevP-R6BXQMSfUawkrGOc0s2fh737wX_CfFc2yb0UqAiApwnLAYGtyT6U2RvlPf5stP1xk1Y9K7aNaclxJeGb1Ug%3D%3D&video_id=kSep4hMsE1A&title=Shahrukh+%26+Alia+Bhatt+Superhit+Movie&redirect_counter=1&rm=sn-a5mk67d&req_id=d21452ed9fa4a3ee&cms_redirect=yes&ipbypass=yes&mh=jZ&mip=223.185.138.155&mm=31&mn=sn-ci5gup-pmjd&ms=au&mt=1588717751&mv=u&mvi=5&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=ALrAebAwRQIhAJ-OWpBVDsk2Y8Zb5zVxWBioNb7zd-ARuL80OreQav0wAiBKJS2BtIamD7JP5J54TimkIs_0eD99LIBTRzZNhawBlA%3D%3D'
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
