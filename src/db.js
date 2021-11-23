import Sequelize from 'sequelize'
export async function setDbModel() {
    const sequelize = new Sequelize(
        `postgres://${process.env.POSTGRES_HOST}/heroes`,
        { logging: false }
    );
    
    await sequelize.authenticate();
    console.log("postgres is running");

    const Hero = sequelize.define("hero", {
        name: Sequelize.STRING,
        power: Sequelize.STRING,
    });

    await Hero.sync({ force: true });

    return Hero
}