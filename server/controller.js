
const { Sequelize, INTEGER } = require("sequelize");

require("dotenv").config();
const {CONNECTION_STRING} = process.env;
//process.env.CONNECTION_STRING




const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl:{
            rejectUnauthorized: false
        }
    }
});
module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists competitors;

            create table competitors (
                competitor_id serial primary key, 
                name varchar
            );             
            
                       

            insert into competitors (name)
            values ('Godiva'),
            ('Lindt'),
            ('Mars'),
            ('Chocolove'),
            ('Ghirardelli'),
            ('Swiss Alps'),
            ('Toblerone'),
            ('Cadbury')            ;
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    getCompetitors: (req, res) => {
        sequelize.query(`SELECT * FROM competitors`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    createCompetitor: (req, res) => {
        let {name} = req.body;
        sequelize.query(`INSERT INTO COMPETITORS (name)
        values('${name}')
        RETURNING *;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    deleteCompetitor: (req, res) => {
        let id = req.params.id;
        sequelize.query(`DELETE from Competitors where competitor_id = ${id}`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}
