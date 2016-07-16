/**
 * homee agent dashboard -> HAD
 * simple application running on a raspberry pi collecting data from hom.ee smarthome controller
 */

var express = require('express');
var app = express();

var $data = {window: {}};

app.use(express.static('webapp'));


app.get('/info', function (req, res) {
  res.json($data);
});

app.post('/window/:name/:status', function(req) {
  $data.window[req.params.name] = req.params.status == "1" ? true : false;
});
app.post('/plug/:name/:status', function(req) {
  $data.plug[req.params.name] = req.params.status == "1" ? true : false
});



app.listen(4080, function () {

  console.info(" _                                                            _   ");
  console.info("| |                                                          | |  ");
  console.info("| |__   ___  _ __ ___   ___  ___ ______ __ _  __ _  ___ _ __ | |_ ");
  console.info("| '_ \\ / _ \\| '_ ` _ \\ / _ \\/ _ \\______/ _` |/ _` |/ _ \\ '_ \\| __|");
  console.info("| | | | (_) | | | | | |  __/  __/     | (_| | (_| |  __/ | | | |_ ");
  console.info("|_| |_|\\___/|_| |_| |_|\\___|\\___|      \\__,_|\\__, |\\___|_| |_|\\__|");
  console.info("                                              __/ |               ");
  console.info("                                             |___/                ");
  console.info("...listening on port 4080");
});
