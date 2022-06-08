const express = require("express");
const data = require("fs"); //import libreria metodi lavoro su file
const dataReader = data.readFileSync("percorso.json"); //creo puntatore al mio database tramite nome file
const app = express();

app.use(express.json()); //serve per parcing di un file json o per duale (rimandare risposta indietro)
app.use(express.urlencoded({ extended: true }));

//view engine setup
app.engine("html", require("ejs").renderFile); // ejs ha bisogno dell'installazione
app.set("view engine", "html");
app.set("views", __dirname);

let parser = JSON.parse(dataReader); // contiene il parsing del contenuto del mio database

app.post("/aggiungiPercorso", (req, res) => {
  // aggiungo un percorso al file
  const percorso = req.body;
  console.log(percorso); // stampa della richiesta inviata
  parser.push(percorso); // aggiorna la lista dei percorsi
  data.writeFileSync("percorso.json", JSON.stringify(parser)); // salvo il json in formaro stringa nel database
  console.log(parser.length); // stampa della lunghezza della lista
  res.status(200).type("text/plain").send("Percorso salvato"); // messaggio allo user che il percorso e stato aggiornato
});

app.delete("/rimuoviPercorso", (req, res) => {
  // rimuovo percorso da file
  const nc = req.body.nc;
  var l = parser.length; // lunghezza del file contenente i percorsi
  if (parser.length == 0) {
    res.status(404).type("text/plain").send("File dei percorsi vuoto"); // messaggio allo user che indica che il file dei percorsi è vuoto
  } else {
    for (var i = 0; i < parser.length; i++) {
      // scorro la lista di percorsi
      if (parser[i]["Nome codificato della tratta"] == nc) {
        // se trovo percorso corretto lo restituisco
        parser.splice(i, 1); // rimozione parser[position-1];
        data.writeFileSync("percorso.json", JSON.stringify(parser)); // riscrivo file senza percorso eliminato
        console.log(parser.length); // stampo lunghezza della lista
      }
    }
    if (parser.length == l) {
      res.status(404).type("text/plain").send("Percorso inesistente"); // messaggio allo user che il percorso da rimuovere non è presente nel file
    } else {
      res.status(200).type("text/plain").send("Percorso rimosso con successo"); // messaggio di rimozione riuscita allo user
    }
  }
});

app.put("/modificaPercorso", (req, res) => {
  // modifica della lunghezza di un percorso ricercato con nome codificato
  const nc = req.body.nc;
  var l = req.body.l;
  var p = 0; // variabile di controllo esistenza percorso
  if (parser.length == 0) {
    res.status(404).type("text/plain").send("File dei percorsi vuoto"); // messaggio allo user che indica che il file dei percorsi è vuoto
  } else {
    for (var i = 0; i < parser.length; i++) {
      // scorro la lista di percorsi
      if (parser[i]["Nome codificato della tratta"] == nc) {
        // ricerca percorso corretto
        parser[i]["Lunghezza"] = l; // modifico contenuto lista
        p++;
      }
    }
    if (p != 0) {
      // controllo se l è stata modificare per restituire status di errore o no
      res
        .status(200)
        .type("text/plain")
        .send("Percorso modificato con successo");
    } else {
      res.status(404).type("text/plain").send("Percorso inesistente"); // messaggio allo user che il percorso da modificare non è presente nel file
    }
  }
});

app.get("/percorsi", (req, res) => {
  // stampo la lista di tutti i percorsi
  if (parser.length == 0) {
    // controllo se file è vuoto
    res.status(404).type("application/json").json({}); // messaggio allo user che non ci sono percorsi
  } else {
    res.status(200).type("application/json").json(parser); // restituisce il file percorso completo
  }
});

app.get("/specPerc", (req, res) => {
  // ricerca di un'escursione specifica
  const nc = req.query.nc; // costante che deve inserire l'utente
  var p = null;
  if (parser.length == 0) {
    res.status(404).type("text/plain").send("File dei percorsi vuoto"); // messaggio allo user che indica che il file dei percorsi è vuoto
  } else {
    for (var i = 0; i < parser.length; i++) {
      // scorro la lista di percorsi
      if (parser[i]["Nome codificato della tratta"] == nc) {
        // ricerca del percorso corretto
        p = parser[i];
      }
    }
    if (p != null) {
      res.status(200).type("application/json").json(p); // restuituisce informazioni percorso specifico
    } else {
      res.status(404).type("application/json").json({}); // restituisce errore se nc non è presente nel file
    }
  }
});

app.get("/diffPercorso/:n", (req, res) => {
  // divido i percorsi per difficoltà
  const n = req.params.n; // costante utilizzata per dividere l'indirizzo delle difficoltà
  const p = []; // lista in cui inserisco i percorsi con lunghezza corretta
  if (n == 1) {
    // percorso facile
    for (var i = 0; i < parser.length; i++) {
      // scorro la lista di percorsi
      if (parser[i]["Lunghezza"] <= 15) {
        // controllo se il percorso ha lunghezza minore a 15km(percorso facile)
        p.push(parser[i]); // se trovo percorso con lunghezza corretta lo inserisco nella lista
      }
    }
    if (p.length != 0) {
      // controllo se la lista dei percorsi è vuota
      res.status(200).type("application/json").json(p); // restituisco il contenuto della lista
    } else {
      res.status(404).type("application/json").json({}); // restituisco errore
    }
  } else if (n == 2) {
    // percorso intermedio
    for (var i = 0; i < parser.length; i++) {
      // scorro la lista di percorsi
      if (parser[i]["Lunghezza"] > 15 && parser[i]["Lunghezza"] <= 30) {
        // controllo se il percorso ha lunghezza compresa tra 15km e 30km(percorso intermedio)
        p.push(parser[i]); // se trovo percorso con lughezza corretta lo inserisco nella lista
      }
    }
    if (p.length != 0) {
      // controllo se la lista dei percorsi è vuota
      res.status(200).type("application/json").json(p); // restituisco contenuto della lista
    } else {
      res.status(404).type("application/json").json({}); // restituisco errore
    }
  } else if (n == 3) {
    // percorso difficile
    for (var i = 0; i < parser.length; i++) {
      // scorro la lista di percorsi
      if (parser[i]["Lunghezza"] > 30) {
        // controllo se il percorso ha lunghezza maggiore di 30km(percorso intermedio)
        p.push(parser[i]); // se trovo un percorso con lunghezza corretta lo inserisco nella lista
      }
    }
    if (p.lenhth != 0) {
      // controllo se la lista dei percorsi è vuota
      res.status(200).type("application/json").json(p); // restituisco il contenuto della lista
    } else {
      res.status(404).type("application/json").json({}); // restituisco errore
    }
  } else {
    // indirizzo errato restitusce errore
    res.sendStatus(404);
  }
});

app.get("/views/home", (req, res) => {
  // visualizzo la home page
  res.sendFile(__dirname + "/views/escursioniHome.html");
});

app.get("/views/aggiungiPercorso", (req, res) => {
  // visualizzo la pagina per aggiungere percorsi
  res.sendFile(__dirname + "/views/aggiungiPercorso.html");
});

app.get("/views/cercaPercorso", (req, res) => {
  // visualizzo la pagina per cercare percorsi
  res.sendFile(__dirname + "/views/cercaPercorso.html");
});

app.get("/views/escursioni", (req, res) => {
  // visualizzo la pagina per cercare percorsi
  res.sendFile(__dirname + "/views/tuttiPercorsi.html");
});

app.get("/views/percFacile", (req, res) => {
  // visualizzo la pagina per cercare percorsi
  res.sendFile(__dirname + "/views/percFacile.html");
});

app.get("/views/percIntermedio", (req, res) => {
  // visualizzo la pagina per cercare percorsi
  res.sendFile(__dirname + "/views/percIntermedio.html");
});

app.get("/views/percDifficile", (req, res) => {
  // visualizzo la pagina per cercare percorsi
  res.sendFile(__dirname + "/views/percDifficile.html");
});

app.listen(process.env.PORT || 4000, () =>
  console.log("Server listen on" + process.env.PORT)
);
