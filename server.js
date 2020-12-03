var express = require("express");

var app = express();

app.use(express.static('./dist/pizza-bot-ng'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/pizza-bot-ng/' }
    );
});

app.listen(process.env.PORT || 8080);