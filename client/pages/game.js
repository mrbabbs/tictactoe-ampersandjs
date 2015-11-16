var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'TicTacToe: Game',
    template: templates.pages.game,
    autoRender: true,

    props: {
        board: {
            type: 'object',
            default: function () {
                var b = {};

                for (var i = 0; i < 3; i += 1){
                    b[i] = {};
                    for (var j = 0; j < 3; j += 1){
                        b[i][j] = '';
                    }
                }

                return b;
            }
        },
        countTurn: {
            type: 'number',
            default: 0
        }
    },
    initialize: function (options) {
        if (!this.model) {
            app.router.navigate('tictactoe');
            throw new Error('Model is required');
        }
    },
    bindings: {

        // player 0
        'model.player0.username': [
            {
                type: 'text',
                hook: 'player0'
            },
            {
                type: 'text',
                selector: '#player0 .username'
            }
        ],
        'model.player0.wins': {
            type: 'text',
            selector: '#player0 .wins'
        },
        'model.player0.draws': {
            type: 'text',
            selector: '#player0 .draws'
        },
        'model.player0.losses': {
            type: 'text',
            selector: '#player0 .losses'
        },

        // player 1
        'model.player1.username': [
            {
                type: 'text',
                hook: 'player1'
            },
            {
                type: 'text',
                selector: '#leaderboard #player1 .username'
            }
        ],
        'model.player1.wins': {
            type: 'text',
            selector: '#leaderboard #player1 .wins'
        },
        'model.player1.draws': {
            type: 'text',
            selector: '#leaderboard #player1 .draws'
        },
        'model.player1.losses': {
            type: 'text',
            selector: '#leaderboard #player1 .losses'
        },

        // others
        'model.turn': {
            type: 'switchClass',
            name: 'turn',
            cases: {
                'player0': '[data-hook="player0"]',
                'player1': '[data-hook="player1"]'
            }
        },
        'model.isCompleted': {
            type: 'toggle',
            yes: 'section#leaderboard',
            no: 'section#game'
        },
        'model.winner': [
            {
                type: 'toggle',
                yes: '#winner',
                no: '#draw'
            },
            {
                type: 'text',
                selector: '#winner span'
            }
        ]
    },
    events: {
        'click .tile': 'addMark',
        'click #newGame': 'newGame'
    },
    render: function () {
        this.model.unset('turn');

        if (this.model.player0.total % 2) {
            this.model.turn = 'player1';
        }

        this.model.unset('isCompleted');
        this.model.unset('winner');
        this.unset('board');
        this.unset('countTurn');
        this.renderWithTemplate(this);

        return this;
    },

    addMark: function (e) {
        var tile = e.target;
        if (tile.getAttribute('data-marked-by')) {
            return;
        }
        
        var rowIdx = tile.getAttribute('data-row-index');
        var colIdx = tile.getAttribute('data-col-index');

        tile.innerHTML = this.model.turn === 'player0'? 'X' : 'O';
        tile.setAttribute('data-marked-by', this.model.turn);

        this.board[rowIdx][colIdx] = this.model.turn;
        this.countTurn += 1;

        this.manageWinnerOrDraw();

        this.model.toggle('turn');
    },
    
    manageWinnerOrDraw: function () {
        if (this.checkWinner()) {
            var losser = this.model.turn === 'player0'?
                'player1' :
            'player0';

            this.model.winner = 
                this.model[this.model.turn].username; 
            this.model[this.model.turn].wins += 1;
            this.model[losser].losses += 1;
            this.model.isCompleted = true;

        } else if (this.countTurn === 9) {
            this.model.player0.draws += 1;
            this.model.player1.draws += 1;
            this.model.isCompleted = true;
        } 
    },
    checkWinner: function () {
        var count = 0;
        var i;
        var j;

        for (i = 0; i < 3; i += 1) {
            count = 0;
            for (j = 0; j < 3; j += 1) { 
                if (this.board[i][j] === this.model.turn) {
                    // count how many time find the same player on the row
                    count += 1;
                }
            }

            if (count === 3) {
                return true;
            }
        }

        for (i = 0; i < 3; i += 1) {
            count = 0;
            for (j = 0; j < 3; j += 1) { 
                if (this.board[j][i] === this.model.turn) {
                    // count how many time find the same player on the row
                    count += 1;
                }
            }

            if (count === 3) {
                return true;
            }
        }

        count = 0;

        for (i = 0; i < 3; i += 1) { 
            if (this.board[i][i] === this.model.turn) {
                // count how many time find the same player on the row
                count += 1;
            }
        }

        if (count === 3) {
            return true;
        }

        count = 0;
        for (i = 0, j = 2; i < 3; i += 1) { 
            if (this.board[i][j-i] === this.model.turn) {
                // count how many time find the same player on the row
                count += 1;
            }
        }

        if (count === 3) {
            return true;
        }
        
        return false;
    },
    
    newGame: function () {
        this.render();
    }
});
