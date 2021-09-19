const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const app = express()
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')

function formatDate(raw) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[raw.getDay()];

    var date = raw.getDate();
    var month = months[raw.getMonth()];
    var year = raw.getFullYear();

    return `${date} ${month}, ${year} ${day}`;
}

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        time: 'desc'
    })
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(5000)