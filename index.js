const express = require('express')
const mongoose = require('mongoose')
const Gallery = require('./models/gallery')
const app = express()

const dbUri = "USe YOUR URI"

mongoose.connect(dbUri, () => {
    console.log('Database is connected')
    app.listen(3000, () => {
        console.log('listening at localhost:3000');
    })
})

app.set('view engine', 'ejs')
// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', function (req, res) {
    Gallery.find()
        .then(results => {
            console.log(results)
            res.render('index', { results })
        })
        .catch(err => console.log(err))
})

app.post('/new', (req, res) => {
    // let art1 = new Gallery({
    //     artwork_name: 'The Weeping Woman',
    //     artwork_url: 'https://www.tate.org.uk/art/images/work/T/T05/T05010_10.jpg',
    //     artwork_rating: 8
    // })
    // art1.save()
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err))
    console.log(req.body)
    let artwork = new Gallery(req.body)
    artwork.save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))
})

app.get('/details/:id', (req, res) => {
    // Quering:Native MongoDb
    console.log(req.params.id)
    // Gallery.findOne({ '_id': req.params.id })
    //     .then(result => res.json(result))
    //     .catch(err => console.log(err))

    //  Quering:mongoose
    Gallery.findById(req.params.id)
        .then(result => res.render('details', { result: result }))
        .catch(err => console.log(err))
})


//delete
app.get('/delete/:id', (req, res) => {
    console.log(req.params.id)
    // res.send(req.params.id)
    Gallery.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log('deleted:', result)
            res.redirect('/')
        }).catch(err => console.log(err))
})

//Update
app.get('/update/:id', (req, res) => {
    // Quering:Native MongoDb
    console.log(req.params.id)
    // Gallery.findOne({ '_id': req.params.id })
    //     .then(result => res.json(result))
    //     .catch(err => console.log(err))

    //  Quering:mongoose
    Gallery.findById(req.params.id)
        .then(result => res.render('update', { result: result }))
        .catch(err => console.log(err))
})

app.post('/update', (req, res) => {
    console.log(req.body)
    Gallery.findByIdAndUpdate(req.body._id, req.body)
        .then(result => res.redirect(`/details/${req.body._id}`))
        .catch(err => console.log(err))
})