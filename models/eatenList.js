const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eatenListSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    name_en: String,
    category: String,
    image: String,
    location: String,
    phone: String,
    google_map: String,
    rating: String,
    description: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
})

module.exports = mongoose.model('EatenList', eatenListSchema);