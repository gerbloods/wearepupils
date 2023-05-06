require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const PORT = process.env.PORT

const app = express()

app.use(cors())

app.use(express.json())

const start = async () => {
    try {
        sequelize.authenticate()
        sequelize.sync()
        app.listen(PORT, () => {
            console.log(`жоска воркаем на ${PORT} порте`)
        })
    } catch(e) {
        console.log(`Все плохо, ошибка ${e}`)
    }
}


start()

app.get('/', (req, res) => {
    res.status(200).json({message: 'Я жоска поворкал соло и у меня получилось ежжи'})
})

app.get('/login/:login', async (req, res) => {
    const user = req.params.login !== undefined ? req.params.login : null;
    console.log(user)
    if (user) {
        const currentUser = await sequelize.query(
            `select * from users where login = '${user}';`
        );
        return res.send(200)
    } else {
        return res.send(400)
    }
})
app.post('/reg/user', async (req, res) => {
    console.log(req.body)
    //const curUser = req.params.user !== undefined ? req.params.user : null;
    try {
        const regForm = await sequelize.query(
            `insert into users (login, fio, mail, password) values (
               '${req.body.login}',
               ' ${req.body.fio}',
               '${req.body.mail}',
               '${req.body.password}'
            );`
        )
        res.send(200)
    } catch(e) {
        res.send(400)
    }
})