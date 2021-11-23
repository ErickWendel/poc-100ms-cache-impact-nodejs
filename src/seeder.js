import faker from 'faker'
import { setDbModel } from './db.js'

const MAX_ITEMS_PER_INTERVAL = 100
const INTERVAL = 500
const Hero = await setDbModel()

async function runInterval() {
    const promises = []
    for (let i = 0; i < MAX_ITEMS_PER_INTERVAL; i++) {
        const result = Hero.create({
            name: faker.name.title(),
            power: faker.lorem.word(2)
        })

        promises.push(result)
    }

    await Promise.all(promises)

}

setInterval(runInterval, INTERVAL);
console.log(`seeder is adding ${MAX_ITEMS_PER_INTERVAL} items per interval of ${INTERVAL}ms`)