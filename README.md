# homee agent dashboard (HAD)

Diese Anwendung sammelt Daten vom hom.ee die per webhook übermittelt wurde. Des weiteren wird eine Webanwendung zur Verfügung gestellt, die diese Daten visuell entsprechend aufbereitet.

## Einrichtung

Mit *npm install* werden alle benötigten Module installiert. Zum starten des Servers *npm start* eingeben.
Die Anwendung ist nun unter http://localhost:4080 erreichbar.

## Homeegramme einrichten

Das Homeegramm sollte an die Richtige URL geschickt werden. Die folgenden Requests sind verfügbar

### Fenster status
http://<url>:<port>/window/<name>/<status>

<status> kann 1 für offen oder 0 für geschlossen sein

### Steckdose status
http://<url>:<port>/plug/<name>/<status>

<status> kann 1 für verbraucht strom oder 0 für verbraucht keinen strom sein

## Verwendete Resourcen

* Hintergrundbild von https://unsplash.com


## Ideen

* Haustüre überwachen. Wenn länger als 30 sekunden offen, dann Meldung "Dein Heim ist nicht geschützt"
* Wasser: Bildschirm bekommt blaues Overlay
* Button für Abwesend machen (dann wird Haus unbeleuchtet)
    * im abwesenheitsstatus könnte einiges überwacht werden
