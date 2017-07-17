module.exports = {
    entry:{
        app:'./index.jsx'
    },
    output:{
        path:__dirname+'/public/javascripts/',
        filename:'admin.js'
    },
    module:{
        rules:[
            {
                test:/.jsx$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['es2015','react']
                    }
                }
            }
        ]
    }
}