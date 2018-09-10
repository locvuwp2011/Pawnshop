var mongoose = require('mongoose');

function generateOrderID() {
    var dt = new Date();
    return 'ORD-' + dt.getDate() + (dt.getMonth() + 1) + dt.getFullYear() + '-' + dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();
}

var OrderSchema = new mongoose.Schema({
    OrderID: { type: String, default: generateOrderID() },
    Fullname: { type: String },
    Identify: { type: String, default: '' },
    PhoneNumber: String,
    Address: String,
    ProductType: { type: String, enum: ['Phone', 'Tablet', 'Laptop', 'Camera', 'Bike', 'Car', 'Gold', 'Other'], default: 'Phone' },
    Description: String,
    Amount: Number,
    Rate1: Number,
    Rate2: Number,
    Rate3: Number,
    Rate4: Number,
    ExtraFee: { type: Number, default: 0 },
    Note: String,
    DongLai: {
        type: [{
            DateCreated: { type: Date, default: Date.now },
            Amount: Number,
            FromDate: Date,
            ToDate: Date            
        }],
        default: []
    },
    Status: { type: String, enum: ['Active', 'Expired', 'Liquidated', 'Closed'], default: 'Active' },
    DateCreated: { type: Date, default: Date.now },
    DateCompleted: { type: Date },
    Audit: {
        type: [{
            Type: { type: String, enum: ['Info', 'Error', 'Warning'], default: 'Info' },
            DateCreated: { type: Date, default: Date.now },
            Content: String
        }],
        default: []
    },
    UserID: String,
    Completed: {
        type: {
            Amount: Number,
            Note: String
        },
        default: {}
    }
});

module.exports = mongoose.model('Order', OrderSchema);