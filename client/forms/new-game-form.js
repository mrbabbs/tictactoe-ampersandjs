var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var Game = require('../models/game');
var Player = require('../models/player');

module.exports = FormView.extend({
    fields: function () {
        var marks = ['X', 'O'];
        var fields = [];
        var i;    
        for(i = 0; i < 2; i += 1) {
            fields.push(new InputView({
                validityClassSelector: '.form-group',
                template: templates.forms['input-view'],
                label: 'Player ' + marks[i],
                name: 'player' + i,
                type: 'text',
                required: false,
                value: '',
                validClass: 'has-success',
                invalidClass: 'has-error',
                placeholder: 'Username player ' + marks[i],
                parent: this,
                tests: [
                    function (val) {
                        var pattern = /^[0-9a-zA-z_]{3,}$/;
                        if (!val.match(pattern)) {
                            return 'Invalid input. Accept Only three or more [0-9a-zA-z_].';
                        }
                    }
                ]
            }));
        }

        return fields;
    },
    
    submitCallback: function (data) {
        if (data.player0 === data.player1) {
            return;
        }

        app.game = new Game({
            player0: new Player({
                username: data.player0
            }),
            player1: new Player({
                username: data.player1
            })
        });

        app.router.navigate('game');
    }
});
