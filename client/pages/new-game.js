var PageView = require('./base');
var templates = require('../templates');
var NewGameForm = require('../forms/new-game-form');

module.exports = PageView.extend({
    pageTitle: 'TicTacToe: New Game',
    template: templates.pages['new-game'],
    
    render: function () {
        this.renderWithTemplate();
        this.form = new NewGameForm({
            el: this.query('form'),
            data: {
                player0: '',
                player1: ''
            }
        });
      
        this.registerSubview(this.form);
    }
});