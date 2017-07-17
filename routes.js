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
}
