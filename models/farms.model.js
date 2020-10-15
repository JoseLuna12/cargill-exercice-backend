const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pond = new Schema({
    farm: {type: Schema.Types.ObjectId, ref: 'Farm'},
    name: {type: String, required: true},
    size: {type: Number, required: true},
    createdAt: {type: Date, required: true, default: new Date()},
    createdBy: {type: String, required: true},
    shrimpLastTimeFeed: {type: Date, required: true, default: new Date()},
    active: {type: Boolean, required: true, default:true}, 
})

let farm = new Schema({
    name: {type: String, required: true},
    createdAt: {type: Date, required: true, default: new Date()},
    createdBy: {type: String, required: true},
    locationLat: {type: String, required: true},
    locationLon: {type: String, required: true},
    active: {type: Boolean, required: true, default:true},
    totalSize:{type: Number, required: true, default: 0},
    ponds: [{type: Schema.Types.ObjectId, ref: 'Pond'}]
})
// Export the model
let farmModel = mongoose.model('Farm', farm);
let pondModel = mongoose.model('Pond', pond)

exports.FARM = farmModel;
exports.POND = pondModel;