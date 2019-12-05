const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const axios = require('axios')
const request = require('request')
const cheerio = require('cheerio')

/**************** FIREBASE CONFIGURATION ****************/
var firebase = require('firebase/app')
  require('firebase/firestore')

  var firebaseConfig = {
    apiKey: "AIzaSyAehe_HpVe19yx57VFOAEqtTwMUe5fl5jM",
    authDomain: "syncrawler-storage.firebaseapp.com",
    databaseURL: "https://syncrawler-storage.firebaseio.com",
    projectId: "syncrawler-storage",
    storageBucket: "syncrawler-storage.appspot.com",
    messagingSenderId: "886841567989",
    appId: "1:886841567989:web:edf6c6527aaf9d9ca073bc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var clientData = db.collection('clientData')
  /**************** FIREBASE CONFIGURATION ****************/


const app = express();

const port = process.env.PORT || 3030;

//middleware
app.use(bodyParser.json());
app.use(cors());

//initialize server
app.listen(port, function () {
    console.log("Server started on port: " + port);
});

//request from user for keyword search
app.post('/search/clientid/:clientid', async function(req, res) {
    const keyword = req.body.keyword
    const clientId = req.params.clientid
    let returnVal //can be an object or an empty string?
    console.log("got post request. word received is: " + keyword)
    console.log("The clientId(documentId) recieved to search is: " + clientId)

    //get data from document(clientId) from collection(clientData)
    var clientDoc = clientData.doc(clientId)

    clientDoc.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            var resultList = [] // list of page data to return
            var data = doc.data()
            var url = data.URL
            var pageNames = Object.keys(data.Pages)
            var pages = Object.values(data.Pages)
            var index = 0
            // if keyword is in page return url + pageName
            //res.send(url + pageNames[0])
            pages.forEach(page => {
                var $ = cheerio.load(page)
                var text = $('html > body').text()
                var keywordIndex = text.indexOf(keyword)
                if (keywordIndex != -1) {
                    resultList.push({ // push a new page onto the result list
                        url: `${url}${pageNames[index]}`,
                        snippet: `...${text.substr(keywordIndex - 50, 50)}${keyword.bold()}${text.substr(keywordIndex + keyword.length, 50)}...`
                    })
                }
                index++
            })

            const result = `
                <div id="result-display" style="margin-top: 20px; background-color:white; max-width: 1000px;">
                    ${resultList.map(page => 
                        `
                        <div id="result-item">
						<style>
						#search-results {} 
						#search-results > li {list-style-type: none; margin-bottom: 40px; max-width: 900px;} 
						h4.result  { display: block;} 
						h4.result a {margin: 0;font-size: 30px;font-weight: 500;} 
						.snippet {font-size: 22px}
						</style>
							<ol id="search-results">
							<li>
                            <h4 class="result"><a href="${page.url}" > ${page.url} </a></h4>
                            <p class="snippet">${page.snippet}</p>
							</li>
							</ol>
                        </div>
                        `
                    ).join('')}
                </div>
            `
            res.send(result)
        } else {
            // doc.data() will be undefined in this case
            console.log("ERR: There isn't a client with this clientId..");
            res.send('')
        }
    }).catch(function(error) {
        console.log("Error getting document for clientId:", clientId);
        res.send('')
    });
})

//request to initialize search box and run clientHandler
app.get('/search', async function (req, res) {
    var file = path.join(__dirname, 'routes/api/clientHandler.js')
    res.sendFile(file);
})