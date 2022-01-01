const Order = require("../models/order.model");

module.exports.getAllOrder = (req, res) => {
    Order.find({}, (err, order) => {
        return res.json(order);
    });
};

module.exports.createOrder = (req, res) => {
    const order = new Order(req.body);
    order.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            messages: 'Create successfully!'
        });
    });
};

module.exports.editOrder = (req, res) => {
    Order.findByIdAndUpdate(
        { _id : req.query.id },
        { $set : req.body },
        (err,data) => {
            if (err) return res.send(err);
            res.status(200).json({
                success: true,
                messages: 'Edit successfully!'
            });
        }
    );
};

module.exports.deleteOrder = (req, res) => {
    Order.findByIdAndUpdate(
        { _id : req.query.id },
        { active : false },
        (err,data) =>{
            if (err) return res.send(err);
            res.status(200).send({
                success: true,
                messages: 'Delete successfully!'
            });
        }
    );
};

module.exports.deleteAllOrder = (req, res) => {
    Order.updateMany({},
        { $set: { active: false } },
        (err, order) => {
        return res.json({
            success: true,
            messages: 'Delete All successfully!'
        });
    });
};