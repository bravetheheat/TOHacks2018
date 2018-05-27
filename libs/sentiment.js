require('dotenv').config()
const frontend = require("./front-end.js");
const WATSONUSER = "382ac5bd-bfb6-4f46-a111-51d2fa14105c";
const PASSWORD = "kIF6D3Vv2Iha";

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')

var toneAnalyzer = new ToneAnalyzerV3({
    "version": '2017-09-21',
    "url": "https://gateway.watsonplatform.net/tone-analyzer/api",
    "username": WATSONUSER,
    "password": PASSWORD
})

function analysisBreakdown(tweet, analysis) {
    var documentTone = analysis["document_tone"]['tones']
    var tones = ['anger', 'fear', 'joy', 'sadness']
    let emotions = documentTone.filter(tone => tones.includes(tone["tone_id"]));
    tweet.sentiment = emotions
    return tweet
}

module.exports.analysis = analysis = function (tweetObject, token) {

    var toneParams = {
        'tone_input': { 'text': tweetObject.text },
        'content_type': 'application/json'
    };

    toneAnalyzer.tone(toneParams, function (error, analysis) {
        if (error) {
            console.log(error);
        } else {
            console.log(analysis);

            frontend.emit(analysisBreakdown(tweetObject, analysis),token);
        }
    })
}
