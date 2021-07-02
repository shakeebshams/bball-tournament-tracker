import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import EventEmitter from 'events'
import ejs from 'ejs'
import dotenv from 'dotenv'
import axios from 'axios'
import Cookies from 'cookies'
import { nanoid } from 'nanoid'
import GameDB from './schemas/Game.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let games = {
    "co2u3hdou2h3odh2iu": {
        team1: "grillmasters",
        team2: "shawarma gang",
        team1_score: 27,
        team2_score: 35,
        ended:  false,
    },
    "co2u3hdoudsfa2h3odh2iu": {
        team1: "team pepsi",
        team2: "some random team name",
        team1_score: 22,
        team2_score: 3315,
        ended:  true,
    },
    "co2u3": {
        team1: "yuck",
        team2: "duck",
        team1_score: 19,
        team2_score: 3,
        ended:  false,
    }
};
let game_ids = ["co2u3hdou2h3odh2iu","co2u3hdoudsfa2h3odh2iu","co2u3"];

/*
game = 
{
    "3hgsd298h": 
    {
        team1: STRING
        team2: STRING
        team1_score: INT
        team2_score: INT
        ended: BOOLEAN
    }
    let team1 = post.team1;
    let team2 = post.team2;
    let team1_score = post.team1_score;
    let team2_score = post.team2_score;
    let ended = post.ended;
}
*/


/*
* Express server config
*/  
const port = process.env.PORT || 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const _server = express()
_server.set('view engine', 'ejs')
_server.use(express.urlencoded({extended: true}))
_server.use(cookieParser())
_server.use(express.json())
_server.use(express.static(path.join(__dirname ,'views/index.html')))

_server.get('/styles/home.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/home.css'))
})

_server.get('/styles/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles/style.css'))
})
const server = _server.listen(port, function() {
    console.log("Web server listening on port: " + port)
})



_server.get('/', function(req, res) {
    let date = get_date();
    let form = refresh();
    res.render('home', {form: form, date: date});
})

function get_date() {
    let d = new Date();
    let month = monthNames[d.getMonth()];
    let day = d.getDate();
    let date_string = month + ' ' + day;
    return date_string; 
}

function refresh() {
    let form = []
    console.log(game_ids)
    game_ids.forEach(async function(id) {
        console.log(id)
        let game = games[id];
        console.log(game)
        let rendering_agent = add(game);
        form.push(rendering_agent);
    })
    return form
}


function add(post) {
    let team1 = post.team1;
    let team2 = post.team2;
    let team1_score = post.team1_score;
    let team2_score = post.team2_score;
    let ended = post.ended;
    let status;
    if (ended) {
        status = "FT";
    } else {
        status = "LIVE";
    }
    let match = `
        <li ng-repeat="match in matches" ng-switch="hasScore(match)" class="ng-scope">
        
            <a ui-sref="live-scores-details.match-facts({league: match.league.id, matchId: match.id})" href="/livescores/47/1988976/match-facts/">
                
                <div class="row">
                    <div class="col-md-10 col-sm-10 col-xs-10 v-wrapper">
                        <span class="v-center team-name ng-binding">
                            ${team1}
                        </span>
                    </div>

                    <div class="col-md-2 col-sm-2 col-xs-2 v-wrapper team-score">
                        <!-- ngSwitchWhen: true --><span ng-switch-when="true" class="v-center ng-binding ng-scope">${team1_score}</span>
                        <!-- ngSwitchWhen: false -->
                    </div>
                </div>

                
                <div class="row">
                    <div class="col-md-10 col-sm-10 col-xs-10 v-wrapper">
                        <span class="v-center team-name ng-binding">
                            ${team2}
                        </span>
                    </div>

                    <div class="col-md-2 col-sm-2 col-xs-2 v-wrapper team-score">
                        <!-- ngSwitchWhen: true --><span ng-switch-when="true" class="v-center ng-binding ng-scope">${team2_score}</span>
                        <!-- ngSwitchWhen: false -->
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-10 col-sm-10 col-xs-10">
                        <!-- ngSwitchWhen: false -->
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-2 bruh">
                        <!-- ngSwitchWhen: false -->
                        <!-- ngSwitchWhen: true --><span ng-switch-when="true" class="match-time ng-binding ng-scope">${status}</span>
                    </div>
                </div>
            </a>
        </li>
        `
    return match;
}

_server.get('/sircut', function(req, res) {
    res.render('create');
})

_server.get('create', function(req, res) {

})




