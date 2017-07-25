const db = require('../db');
const Archive = new db.Schema({
    title:String,
    date:{
        type:Date,
        default:Date.now()
    },
    content:String,
    statu:{
        type:Number,
        default:1
    },
    auther:String,
    keyWords:String,
    discription:String,
    createDate:{
        type:Date,
        default:Date.now()
    },
    pos:{
        type:Number,
        default:0
    },
    click:{
        type:Number,
        default:0
    },
    read:{
        type:Number,
        default:0
    }
});

module.exports = db.model('archive',Archive);
