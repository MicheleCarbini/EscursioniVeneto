Michele Carbini, 309176
# EscursioniVeneto
Progetto per sessione estiva piattaforme digitali e per la gestione del territori (10/06/2022).

<h1>DESCRIZIONE</h1>
Il progetto è stato creato per gestire un file di escursioni in Veneto contenente:

  - Provincia
  
  - Denominazione estesa della tratta

  - Lunghezza

  - Longitudine

  - Latitudine

  - Tipo di percorso (Percorso principale, Deviazione, Navigazione)

  - Nome codificato della tratta

  - Partenza della tratta

  - Arrivo della tratta

  - Tappe intermedie della tratta

La getione consiste nella:

  - rimozione di escursioni, 
  - modifica della lunghezza delle escursioni in caso di errori ricercandole per nome codificato delle tratta
  - visualizzazione di tutte le escursioni potendoli filtrare per livello di difficoltà (facile se lunghezza minore di 15km intermedio se compresa tra 15 e 30km e difficile se maddiore di 30km)
  - ricerca di un escursione basandosi sul nome codificato della tratta visualizzando una mappa che indica il punto di arrivo dell'escursione scelta 
  - 
<h1>ARCHITETTURA E SCELTE IMPLEMENTATIVE</h1>
per l'implementazione ho utilizzato il sito glitch.com aggiungendo le seguenti interfacce grafiche:

  - aggiungiPercorso.html
  - cercaPercorso.html 
  - escursioniHome.html 
  - percDifficile.html 
  - percFacile.html 
  - percIntermedio.html 
  - tuttiPercorsi.html 
  
<h1>DATI SFRUTTATI</h1>
per il progetto ho utilizzato un datset chiamato percorsi.json reperito sul sito DatiOpen.it al seguente indirizzo: 

http://www.datiopen.it/en/opendata/Regione_Veneto_Escursioni_giornaliere 

<h1>API IMPLEMENTATA</h1>
Tutte le richieste vengono fatte tramite protocollo HTTP, le API implementate sono le seguenti:

- GET per visualizzazione di tutti i percorsi con URL:https://bronzed-angry-glasses.glitch.me/percorsi
- GET per visualizzazione singolo percorso con URL:https://bronzed-angry-glasses.glitch.me/specPerc
- GET per filto della difficoltà di un percorso con URL:https://bronzed-angry-glasses.glitch.me/diffPercorso/n
- POST per aggiungere escursioni con URL:https://bronzed-angry-glasses.glitch.me/aggiungiPercorso
- PUT per modificare lunghezza escursioni con URL:https://bronzed-angry-glasses.glitch.me/modificaPercorso
- DELETE per eliminare escursioni con URL:https://bronzed-angry-glasses.glitch.me/rimuoviPercorso

INPUT

OUTPUT
Nelle GET l'output sarà una lista di parametri richiesti o in caso di errore un messaggio di testo mentre nella POST nella PUT e nella DELETE sarà un messaggio di azione andata a buon fine o no 

<h1>MESSA ONLINE SERVIZIO</h1>
L'elaborazione dei dati verrà gestita dal server, mentre sono state create delle pagine html per la gestione più semplice dei dati.
Solo le ultime due funzionalità dovranno essere gestite tramite postman

<h1>ESEMPI DI UTILIZZO</h1>
1 - GET di tutte le escursioni richiedendo tutti i dati, la risposta del server sarà la seguente:<br>
    ![tuttiPercorsi](https://user-images.githubusercontent.com/101416939/172662802-deee61fd-2831-4605-bf51-d7170fce4ac0.png)

    
2 - GET delle escursioni facili cliccando il pulsante FACILE presente nella schermata precedente, la risposta del server sarà la seguente:<br>
![percorsiFacili](https://user-images.githubusercontent.com/101416939/172663034-66a6b91e-3efd-4373-8ebe-5c37cc0ce01d.png)

3 - GET di una specifica escursione

