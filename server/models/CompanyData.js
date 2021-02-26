const mongoose = require('mongoose')
const companySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {type:String,require:true},
    date:{type:String,require:true},
    phone: {type:String,require:true},
    org:{type:String,require:true}
});
module.exports = mongoose.model('Company',companySchema);