const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError')


app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new AppError("password required", 401)
    // res.send("Password Needed!")
    // res.status(401)
    // throw new AppError(401, 'Pasdword required!')
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/error', (req, res) => {
    chicken.fly();
});

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.get('/admin', (req, res) => {
    throw new AppError("You're not an admin", 403)
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

// app.use((err, req, res, next) => {
//     console.log('****************************')
//     console.log('************ERROR***********')
//     console.log('****************************')
//     // throw the next error handling middleware
//     console.log(err)
//     next(err)
//     // next(); - throw the next non error handling middleware 
// })

app.use((err, req, res, next) => {
    const {status = 500} = err;
    const {message = "Something went wrong"} = err;
    res.status(status).send(message)
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})


