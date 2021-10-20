const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//const {Schema}=mongoose

const gallerySchema = new Schema({
    artwork_name: {
        type: String,
        required: true,
    },
    artwork_url: {
        type: String,
        required: true,
    },
    artwork_rating: {
        type: Number,
        required: false,
    }
}, { timestamps: true })

// Model based on the Schema
//=> pluralize : GalleryDb => GalleryDbs
const Gallery = mongoose.model('GalleryDb', gallerySchema)

module.exports = Gallery