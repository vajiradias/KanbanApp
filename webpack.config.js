const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');


const PATHS = {
    app : path.join(__dirname, 'app'),
    build : path.join(__dirname, 'build')
};

const TARGET = process.env.npm_lifecycle_event;

const common = {
    entry : {
        app : PATHS.app
    },
    output : {
        path : PATHS.build,
        filename : 'bundle.js'
    }
}

if(TARGET === 'start' || !TARGET){
    module.exports = merge(common, {
        devServer:{
            contentBase: PATHS.build,

            //Enable history API fallback so HTML5 history API based routing works.
            //This is a good result that will come handy in more complicated setups.
            historyApiFallback : true,
            inline: true,
            hot: true,
            //progress : true,

            //Display only errors to control output content
            stats: 'errors-only',

            host: process.env.HOST,
            port: process.env.PORT || 3000
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(TARGET ===  'build'){
    module.exports = merge(common, {});
}