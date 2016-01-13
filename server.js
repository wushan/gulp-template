// ---- 基本設定 ----
var express = require('express');
var app     = express();
var path = require('path');
var port    = process.env.PORT || 3700;

app.use(express.static( path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

// ---- 啟動伺服器 ----
app.listen(port);