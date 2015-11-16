var app = require('ampersand-app');
var Router = require('ampersand-router');
var NewGamePage = require('./pages/new-game');
var Game = require('./pages/game');



module.exports = Router.extend({
    routes: {
        'tictactoe': 'home',
        'game': 'game',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new NewGamePage());
    },
    
    game: function () {
        app.trigger('page', new Game({
            model: app.game
        }));
    },

    catchAll: function () {
        this.redirectTo('tictactoe');
    }
});
