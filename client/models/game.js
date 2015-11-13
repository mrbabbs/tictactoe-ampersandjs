var AmpersandModel = require('ampersand-model');
var Player = require('./player'); 

var newPlayer = function () {
    return new Player();
};

module.exports = AmpersandModel.extend({
    props: {
        player0: {
            type: 'state', 
            required: true, 
            default: newPlayer,
            allowNull: false,
            setOnce: true
        },
        player1: {
            type: 'state', 
            required: true, 
            default: newPlayer,
            allowNull: false,
            setOnce: true
        },
        turn: {
            type: 'string',
            default: 'player0',
            values: ['player0', 'player1']
        },
        winner: {
            type: 'string',
            default: ''
        },
        isCompleted: {
            type: 'boolean',
            default: false
        }
    }
});