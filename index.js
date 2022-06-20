var express = require('express');
var fileUpload = require('express-fileupload');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use("/api/fileanalyse", fileUpload());

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.route('/api/fileanalyse')
    .post((req, res) => {
      const file = req.files.upfile;
      if (file) {
        res.json({
          name: file.name,
          type: file.mimetype,
          size: file.size
        })
      }
      else {
        res.json({
          body: 'No request body'
        })
      }
    });

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
