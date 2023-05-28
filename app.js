const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cartRouter = require('./routes/cart')
const productRouter = require('./routes/product')

const app = express();

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

dotenv.config();
const MONGODB_PW = process.env.MONGODB_PW;

const database = (module.exports = () => {
    try {
        mongoose.connect(`mongodb+srv://${MONGODB_PW}:nr8pWepZb6d0G2QJ@cluster0.d08vkqb.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('Connexion à MongoDB réussie !')
    } catch (error) {
        console.log(error);
        console.log('Connexion à MongoDB échouée !')
    }
});

database();

app.use('', cartRouter)
app.use('', productRouter)
app.get('/', (req, res) => {
    res.send('Cart')
})

module.exports = app; 
