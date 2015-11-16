var Moonboots = require('moonboots-static');
var templatizer = require('templatizer');

var moonboots = new Moonboots({
    moonboots: {
        main: __dirname + '/client/app.js',
        jsFileName: 'tictactoe',
        cssFileName: 'tictactoe',
        stylesheets: [
            __dirname + '/stylesheets/bootstrap.css',
            __dirname + '/stylesheets/app.css'
        ],
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested. Which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
        },
        resourcePrefix: './'
    },
    // Contents from the public directory
    // will be copied to the target directory 
    public: __dirname + '/public',
    // Directory to build files into
    directory: __dirname + '/_build',
    // Log build items
    verbose: true,
    htmlSource: function (ctx) {
        var rp = ctx.resourcePrefix;
        return [
            '<!DOCTYPE html>',
            '<link href="' + rp + ctx.cssFileName + '" rel="stylesheet" type="text/css">',
            '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">',
            '<meta name="apple-mobile-web-app-capable" content="yes">',
            '<script src="' + rp + ctx.jsFileName + '"></script>'
        ].join('\n');
    }
});

moonboots.on('ready', function (err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log('it works')
    }
});