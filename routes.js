const post = require('./routes/post');

module.exports = (app)=>{
    app
    .get('/',(req,res,next)=>{
        res.render('index',{title:'测试首页'});
    })
    .get('/admin',(req,res,next)=>{
        res.render('admin/index')
    })
    .get('/login',(req,res,next)=>{
        res.render('admin/login');
    })



//api
    .use('*',(req,res,next)=>{
        res.locals.statu = 0;
        next()
    })

    .post('/post',post.add)
    .get('/post',post.list)
    .get('/post/:id',post.single)
    .put('/post/:id',post.edit)

    .use('*',(req,res,next)=>{
        res.json(res.locals)
    })
}
