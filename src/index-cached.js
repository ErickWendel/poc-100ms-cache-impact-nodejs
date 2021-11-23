import { createServer } from 'http'
import NodeCache from "node-cache";
import { setDbModel } from './db.js';
import Sequelize from 'sequelize'

const CACHE_LIMIT = 0.1 // 100ms
const dbCache = new NodeCache({ stdTTL: CACHE_LIMIT, checkperiod: 0.2 });
const Hero = await setDbModel()

// coloquei essa query só para exemplificar o que poderia ser a chave do cache
const mySqlQuery = 'SELECT power as repeatedTimes, COUNT(power) FROM HERO GROUP BY power'
async function handler(request, response) {
    if (dbCache.has(mySqlQuery)) {
        response.end(JSON.stringify(dbCache.get(mySqlQuery)))
        return;
    }

    try {
        const all = await Hero.findAll({
            group: ['power'],
            attributes: ['power', [Sequelize.fn('COUNT', 'power'), 'repeatedTimes']],
        })


        const success = dbCache.set(mySqlQuery, all, CACHE_LIMIT);
        if (success) {
            response.writeHead(200)
            response.end(JSON.stringify(all))
            return;
        }

        response.writeHead(500)
        response.end()
    } catch (error) {
        console.log('error!!', error)
        response.writeHead(500)
        response.end()
    }

}

createServer(handler)
    .listen(3000, () => console.log('cached: listening to 3000'))