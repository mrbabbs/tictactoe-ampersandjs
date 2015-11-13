var AmpersandModel = require('ampersand-model');

var totalScore = function () {
    return this.wins + this.draws + this.losses;
};

var defaultUsername = function () {
    var username = username = 'user_' + Date.now();
    return username;
};

module.exports = AmpersandModel.extend({
    idAttribute: 'username',
    
    props: {
        username: {
            type: 'string', 
            required: true, 
            default: defaultUsername,
            allowNull: false,
            setOnce: true
        },
        wins: ['number', 'true', 0],
        draws: ['number', 'true', 0],
        losses: ['number', 'true', 0],
    },
    derived: {
        total: {
            deps: ['wins', 'draws', 'losses'],
            fn: totalScore
        }
    }
});