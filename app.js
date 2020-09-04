require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const SpotifyWebApi = require('spotify-web-api-node');


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token



  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));


  //routes:

app.get('/', (req, res)=>{
    res.render('index')
})

//this has to be done: 
app.get('/artist-search', (req,res)=>{
 //console.log('This is the image', req.query.artist)

 spotifyApi
 .searchArtists(req.query.artist)
 .then(listOfArtists => {
   console.log('The received data from the API: ', listOfArtists.body.artists.items[0]);
   res.render('artist-search-results', { artistsList : listOfArtists.body.artists.items })
 })
 .catch(err => console.log('The error while searching artists occurred: ', err));
    
})


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
