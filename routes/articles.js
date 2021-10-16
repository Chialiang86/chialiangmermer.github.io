const express = require('express')
const router = express.Router()
const Article = require('../models/article')

function formatDate(raw) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[raw.getDay()];

    var date = raw.getDate();
    var month = months[raw.getMonth()];
    var year = raw.getFullYear();

    return `${date} ${month}, ${year} ${day}`;
}

router.get('/new', (req, res) => {
    res.render('articles/new-article', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit-article', { article: article})
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if (article == null)
        res.redirect('/')
    res.render('articles/show-article', { article: article })
})

const Math = {
    PI: 3.1415926,
    square: (x) => x * x
}

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title,
        article.tags = req.body.tags,
        article.description = req.body.description,
        article.content = req.body.content
        article.timeStamp = formatDate(new Date())
        // article.time = Date.now
        // article.slug = req.body.slug
        // article.sanitizedHtml = req.body.sanitizedHtml
        // good
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
            console.log(Math.square(3.0))
        } catch (e) {
            console.log(e)
            res.render(`articles/${path}`, {article: article})
        }
    }
}

module.exports = router