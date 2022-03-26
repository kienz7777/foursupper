const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        money: {
            type: Number,
            required: true
        },
        quality: {
            type: Number,
            required: true
        },
        description: {
            type: String
        },
        createDate: {
            type: String,
            require: true
        },
        represents: {
            type: Array,
            require: true
        },
        active: {
            type: Boolean,
            require: true
        }
    }
);

module.exports = mongoose.model('Order', orderSchema);