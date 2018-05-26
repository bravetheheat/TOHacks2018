const Twitter = require("twitter");
const sentiment = require("./sentiment.js");

const GEOCODE_API_KEY = "AIzaSyCQ6ZDOw1lkkHz0Alz2v2cpKSEaG0CkUEQ";

var client = new Twitter({
    consumer_key: 'Lg8pHAw9XrlMtug3DljT0CfJ3',
    consumer_secret: 'fJovMSDH5NIlgT9H7xnny4dfeoFymhInAvPdKURfMxM5FkYgW3',
    access_token_key: '101358966-OhXIqJ5Ry1koLg6AW2t28S1OKxa9ezh9pcmX7cMG',
    access_token_secret: 'qveeRwVWSQWG3Gf3Klq4vRBi9jMWn1i6xtlLjnw7Sj5fx'
});

module.exports = {
    scrape: function (keywords, token) {
        var stream = client.stream('statuses/filter', { track: keywords });
        stream.on('data', function (event) {
            var data = {
                name: event.user.screen_name,
                time: event.created_at,
                text: event.text,
                location: event.user.location
            };
            console.log('Name ' + event.user.screen_name);
            console.log("Time " + event.created_at);
            console.log('Text ' + event.text);
            console.log("Location " + event.user.location);
            geocode(event.user.location, data, sentiment.analysis);

        });

        function log(text) {
            console.log(text);
        }

        stream.on('error', function (error) {
            console.log(error);
        });

        var googleMapsClient = require('@google/maps').createClient({
            key: GEOCODE_API_KEY
        });

        function geocode(address, tweet, callback) {
            googleMapsClient.geocode({
                address: address
            }, function (err, response) {
                if (!err) {
                    var location = response.json.results[0].geometry.location;
                    tweet.location = location;
                    callback(tweet, frontend.emit);
                }
                else {
                    tweet.location = '';
                    callback(tweet, frontend.emit);

                }
            });
        }


    }
}
