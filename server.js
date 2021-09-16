const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        timeStamp: Date.now(),
        description: 'Test description'
    }]
    res.render('index', {articles: articles})
})

app.listen(5000)