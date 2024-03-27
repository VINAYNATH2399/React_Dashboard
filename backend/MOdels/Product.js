const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        min: 0,
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    userID: {
        type: String,
    },
    company: {
        type: String,
        trim: true,
    }

});

let Product = mongoose.model('products', productSchema);

module.exports = Product;