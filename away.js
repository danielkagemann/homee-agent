/**
 * module to check away status via WLAN connectivity.
 * note: was a good idea and works until phone is in lockscreen
 * @author Daniel Kagemann
 *
 */

// dependency
var ping = require("net-ping"),
    request = require("request");

/**
 * exporting module
 */
var away = module.exports = {

   /**
    * default options
    */
   options: {
      ip: "192.168.178.38",
      every:5, // every x seconds to check
      webhook: "https://000551083C40.hom.ee/api/v2/webhook_trigger?webhooks_key=UMHZSWVBBYYRAAYEPECBVSTQSRPTPJJZWBGIQXHAHAFCCEWVTZZKUFZAHJMWCGAV&event=exitHome",
      debug: true
   },
   isAway: false,
   running: null,

   /**
    * some debug output (only if debug is true)
    * @param txt the text to display
    */
   trace: function (txt) {
      if (away.options.debug) {
         console.log("[away]: ", txt);
      }
   },

   /**
    * stop
    */
   stop: function () {
      // already running ?
      if (away.running !== null) {
         clearInterval(away.running);
         away.running = null;
      }
   },

   /**
    * send webhook when used seems away
    */
   sendWebhook: function() {

      request(
         { method: 'POST', uri: away.options.webhook}
         , function (error, response, body) {
            away.trace("webhook error: " + error);
            away.trace("webhook response: " + response);

         }
      )
   },

   /**
    * start routine
    */
   start: function () {
      away.stop();

      away.trace("start monitoring");

      // starting timer
      away.running = setInterval(function () {
            var session = ping.createSession();
            session.pingHost(away.options.ip, function (error, target) {
               if (error) {
                  away.trace("ping was not successful");
                  away.isAway = true;
                  away.sendWebhook();
               } else {
                  away.isAway = false;
                  away.trace("ping was successful");
               }

               session.close();
            });

      }, away.options.every*1000);
   }
}
