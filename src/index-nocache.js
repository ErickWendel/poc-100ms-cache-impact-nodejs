import { createServer } from 'http'
import { setDbModel } from './db.js';
import Sequelize from 'sequelize'

const Hero = await setDbModel()
async function handler(request, response) {
    try {
        const all = await Hero.findAll({
            group: ['power'],
            attributes: ['power', [Sequelize.fn('COUNT', 'power'), 'repeatedTimes']],
        })

        response.writeHead(200)
        response.end(JSON.stringify(all))
        return;

    } catch (error) {
        console.log('error!!', error)
        response.writeHead(500)
        response.end()
    }

}

createServer(handler)
    .listen(4000, () => console.log('nocache: listening to 4000'))