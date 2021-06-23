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

let form = []
let game_ids = ["co2u3hdou2h3odh2iu"]

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
const server = _server.listen(port, function() {
    console.log("Web server listening on port: " + port)
})


_server.get('/', async function(req, res) {
    await refresh()
    res.render('home', {form: form})
})

async function refresh() {
    game_ids.forEach(async function(id) {
        await GameDB.findOne({match_id: id}, function(err, post){
            if (err) {
                console.log(err)
            }
            if (post !== null) {
                add(post)
            } else {
                console.log("no match found")
            }
        })
    })
}


async function add(post) {
    console.log(typeof post);
    console.log(post.team1)
    let yuh = JSON.stringify(post)
    console.log(yuh.team1)
    let team1 = post.team1
    let team2 = post.team2
    let team1_score = post.team1_score
    let team2_score = post.team2_score
    let ended = post.ended
    let status
    if (ended) {
        status = "FT"
    } else {
        status = "LIVE"
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
    console.log(match)
    form.push(match)
}



