const Post = require('../models/archive');

function addPost(obj){
    return new Promise((resolve,reject)=>{
        new Post(obj).save((error,result)=>{
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        })
    })
}

module.exports = {
    add:(req,res,next)=>{
        const _post = {
            title:req.body.title,
            keyWords:req.body.keyWords,
            content:req.body.content
        };
        if(req.body.date){
            _post.date = req.body.date
        }

        addPost(_post)
        .then((result)=>{
            res.locals.datas = result;
            res.locals.statu = 1;
            next();
        })
        .catch((error)=>{
            res.locals.message = error;
            next();
        })
    },
    single:(req,res,next)=>{
        Post.findOne().where({_id:req.params.id}).exec((error,result)=>{
            if(error){
                res.locals.message = error;
                next();
            }else{
                res.locals.datas = result;
                res.locals.statu = 1;
                next();
            }
        })
    },
    edit:((req,res,next)=>{
        Post.update({_id:req.params.id},{$set:req.body},(error,result)=>{
            if(error){
                res.locals.message = error;
                next();
            }else{
                res.locals.datas = result;
                res.locals.statu = 1;
                next();
            }
        })
    }),
    list:(req,res,next)=>{
        const conditions = {};
        if(req.query._k){
            conditions.title = new RegExp(req.query._k);
        }
        Post.find().where(conditions).sort({date:-1})
        .then((list)=>{
            res.locals.datas = list;
            res.locals.statu = 1;
            next();
        })
        .catch((error)=>{
            res.locals.message = error;
            next();
        })
    }
}
