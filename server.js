/**
 * homee agent dashboard -> HAD
 * simple application running on a raspberry pi collecting data from hom.ee smarthome controller
 */

var express = require('express');
var app = express();

var $data = {window: {}};

app.use(express.static('webapp'));

/**
 * helper routine to convert 1, "1" or "open"
 * @param val
 * @returns {boolean}
 */
function translate(val) {
  if (val === undefined ||val == null) {
    return false;
  }
  if (val === '1' || val === '1' ||val === 'open') {
    return true;
  }
  return false;
}

app.get('/', function (req, res) {
  res.send('hom.ee agent!');
  console.info("root access");
  // todo document possible http callbacks
});

app.post('/window/:name/:status', function(req) {
  console.log("params ", req.params);
  $data.window[req.params.name] = translate(req.params.status);
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
