var Game = require('../../../client/models/game.js');
var Player = require('../../../client/models/player.js');

describe('Game model', function () {
    it('should be defined', function () {
        expect(Game).toBeDefined();
    });

    beforeEach(function () {
        this.game = new Game();
    });

    describe('when instatiated', function () {
        describe('should have default value', function () {
            it('should have a default player0', function () {
                expect(this.game.player0).toBeDefined();
                expect(this.game.player0.username).not.toBe('');
            });

            it('should have a default player1', function () {
                expect(this.game.player1).toBeDefined();
                expect(this.game.player1.username).not.toBe('');
            });

            it('should have a default value turn', function () {
                expect(this.game.turn).toEqual('player0');
            });

            it('should have default value for isCompleted', function () {
                expect(this.game.isCompleted).toEqual(false);
            });

            it('should have default value for winner', function () {
                expect(this.game.winner).toEqual('');
            });
        });

        describe('could have player as input', function () {
            it('should be created ', function () {
                var p0 = new Player();
                var p1 = new Player();
                var game = new Game({
                    player0: p0,
                    player1: p1
                });

                expect(game.player0).toEqual(p0);
                expect(game.player1).toEqual(p1);

                expect(game.turn).toEqual('player0');
                expect(game.isCompleted).toEqual(false);
                expect(game.winner).toEqual('');
            });


            it('shouldn\'t throw expection if it is null', function () {
                var p0 = new Player();
                var p1 = new Player();
                var game;

                expect(function () {
                    game = new Game({
                        player0: null,
                        player1: p0
                    });
                }).toThrow();
                expect(game).not.toBeDefined();

                expect(function () {
                    game = new Game({
                        player0: p1,
                        player1: null
                    });
                }).toThrow();
                expect(game).not.toBeDefined();

                expect(function () {
                    game = new Game({
                        player0: null,
                        player1: null
                    });
                }).toThrow();
                expect(game).not.toBeDefined();
            });
        });
    });
    
    describe('after initialization', function () {
        it('should throw exception if try to set player0', function () {
            expect(function () {
                this.game.player0 = new Player();
            }).toThrow();
        });
        
        it('should throw exception if try to set player1', function () {
            expect(function () {
                this.game.player1 = new Player();
            }).toThrow();
        });
    });

    describe('turn should be toggable', function () {
        it('should toggle from player0 to player1', function () {
            this.game.toggle('turn');
            expect(this.game.turn).toEqual('player1');
        });
        
        it('should toggle from player1 to player0', function () {
            this.game.toggle('turn');
            this.game.toggle('turn');
            expect(this.game.turn).toEqual('player0');
        });
    })
});
