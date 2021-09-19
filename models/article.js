
function formatDate(raw) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[raw.getDay()];

    var date = raw.getDate();
    var month = months[raw.getMonth()];
    var year = raw.getFullYear();

    return `${date} ${month} ${year}, ${day}`;
}

const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    tags: {
        type: String
    },
    description: {
        type: String
    },
    content: {
        required: true,
        type: String
    },
    timeStamp: {
        type: String,
        default: formatDate(new Date())
    },
    time: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    next()
})

module.exports = mongoose.model('Article', articleSchema)