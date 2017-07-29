import shuffle from 'array-shuffle'
import { Observable } from 'rx'
import observer from './src/observer'
import { zip } from './src/lib'
import players from './data/players'
import teams from './data/teams'

const PLAYER_INTERVAL = 3000
const TEAM_INTERVAL = 2000

function logger({ team = 'Buscando Equipo...', player = 'Buscando DT...' }) {
  return `⚽️  ${team} 🙋‍♂️  ${player}`
}

const results = zip(shuffle(players), shuffle(teams))

const players$ = Observable
  .from(results)
  .concatMap(([player, team]) => {
    return Observable
      .of({ type: "START" }, { type: "SET" })
      .concat(
        Observable.of({ type: "SET", data: { team } }).delay(TEAM_INTERVAL),
        Observable.of({ type: "SET", data: { player } }).delay(PLAYER_INTERVAL),
        Observable.of({ type: "END" })
      )
  })

Observable.of({ type: 'START_RAFFLE' })
  .concat(players$)
  .concat(Observable.of({ type: 'END_RAFFLE' }))
  .subscribe(observer({ logger }))
