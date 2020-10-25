require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;
const redirectUri = process.env.REDIRECT_URI;
// const axios = require('axios');
// const tArr = require('./public/return-string')({grade : 2});

app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId, redirectUri });
});

app.get('/a', function(req, res){
    console.log('req');
    res.json({abc: '123'});
});

// app.get('/courseList', function(req, res){
//     console.log('reqCourse');
//     var txt_index = 3;
//     res.json({list: require('./public/return-string')({grade : txt_index})});
// });
app.get('/requireCourseList', function(req, res){
    console.log('reqCourse');
    // var txt_index = 3;
    res.json({list: require('./public/return-string')({grade : grd})});
});
app.get('/optimalCourseList', function(req, res){
    console.log('reqCourse');
    // var txt_index = 3;
    res.json({list: require('./public/return-string')({grade : 3})});
});

if (process.env.NODE_ENV === 'development') {
    const devCert = fs.readFileSync(
        path.resolve(__dirname, 'cert/localhost.pem')
    );
    const devKey = fs.readFileSync(
        path.resolve(__dirname, 'cert/localhost-key.pem')
    );
    const server = https.createServer({
        key: devKey,
        cert: devCert
    }, app);
    server.listen(8000, function() {
        console.log(`https listening on port 8000!`);
    });
    //console.log(tArr);
}
app.listen(port, () => console.log(`http listening on port ${port}!`));