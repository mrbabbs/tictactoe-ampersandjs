var app = require('ampersand-app');
var Router = require('ampersand-router');
var NewGamePage = require('./pages/new-game');



module.exports = Router.extend({
    routes: {
        '': 'home',
        'collections': 'collectionDemo',
        'info': 'info',
        'person/add': 'personAdd',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new NewGamePage());
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
