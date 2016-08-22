# homee agent dashboard (HAD)

Diese Anwendung sammelt Daten vom hom.ee die per webhook übermittelt wurde. Des weiteren wird eine Webanwendung zur Verfügung gestellt, die diese Daten visuell entsprechend aufbereitet.
Die Anwendung kann durch Klick auf den Hintergrund in den Fullscreen Modus gesetzt werden.

## Einrichtung

Es wird ein Webserver mit PHP Unterstützung benötigt. Ich verwende auf dem Raspberry Pi nginx als Webserver. 
EIne gute Anleitung hierfür gibt es [hier](https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md)
Alle Dateien in das document root Verzeichnis kopieren. In meinem Setup liegen die Dateien unter */var/www/html*

Ein Verzeichnis *storage* anlegen und alle Rechte geben. 

* mkdir storage  
* chmod 0777 storage

## Homeegramme einrichten

Die Anwendung bietet die folgenden Requests an.

server.php?**q**=*bereich*&**name**=*displayname*&**status**=*0 oder 1*

Derzeit wrd für Bereich

* window
* plug
* info (dies wird vom UI verwendet um den Status zu erfragen)
 
unterstützt.

Damit man nicht immer eine lange URL im Homeegramm eingeben muss, kann man im Webserver eine Rewrite Regel definieren.

Beispiel für Fenster Homeegramm (wird geschlossen)
1. Neues Homegramm anlegen
2. Wenn Gerät *Sensor-vom-Fenster* Zustand: wird geschlossen
3. Aktion Webhook
   * url: http://**url-vom-raspberry-pi**/server.php?q=window&name=Badezimmer&status=0
   * Methode: POST

Anstelle von name=Badezimmer einfach entsprechend abändern.

## URL anpassen

Die URL ist recht lang und nicht schön und kann über rewrite Regeln geändert werden. Wie gesagt verwende ich nginx als Webserver.
Im Verzeichnis **/etc/nginx/sites-available** die Datei **default** bearbeiten.

Im Bereich server {} die Zeilen wie folgt einfügen:


	location /info {
    		try_files $uri $uri/ /server.php?q=info;
	}
	rewrite /window/([^\/]+)/([^\/]+) /server.php?q=window&name=$1&status=$2;
	rewrite /plug/([^\/]+)/([^\/]+) /server.php?q=plug&name=$1&status=$2;


Mit den obigen Regeln kann nun im Homeegramm die URL wie folgt geschrieben werden.

	http://*url-vom-raspberrypi*/window/badezimmer/1


## Verwendete Resourcen

* Hintergrundbild von https://unsplash.com


## Ideen

* Haustüre überwachen. Wenn länger als 30 sekunden offen, dann Meldung "Dein Heim ist nicht geschützt"
* Wasser: Bildschirm bekommt blaues Overlay
* Button für Abwesend machen (dann wird Haus unbeleuchtet)
    * im abwesenheitsstatus könnte einiges überwacht werden
* openweather api: http://openweathermap.org/appid
    * icons http://erikflowers.github.io/weather-icons/
    * example https://github.com/danielkagemann/daily

