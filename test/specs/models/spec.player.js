Player = require('../../../client/models/player');

describe('Player model', function () {
    it('should be defined', function () {
        expect(Player).toBeDefined();
    });
    
    beforeEach(function () {
        this.player = new Player();
    });

    describe('when instatiated', function () {
        it('has default values', function () {
            expect(this.player.username).toBeDefined();
            expect(this.player.wins).toEqual(0);
            expect(this.player.draws).toEqual(0);
            expect(this.player.losses).toEqual(0);
        });

        describe('using a username has input', function () {
            beforeEach(function () {
                this.username = 'John';
                this.playerWithUsername = new Player({
                    username: this.username
                });
            });

            it('should be valorized', function () {
                expect(this.playerWithUsername.username).toBeDefined();
                expect(this.playerWithUsername.username)
                    .toEqual(this.username);
            });

            it('should have default values on the rest', function () {
                expect(this.playerWithUsername.wins).toEqual(0);
                expect(this.playerWithUsername.draws).toEqual(0);
                expect(this.playerWithUsername.losses).toEqual(0);
            });
        });
    });

    describe('has derived value', function () {
        it('should be calculated based on wins draws and losses', function () {
            expect(this.player.total).toEqual(0);
            
            this.player.wins += 1;
            expect(this.player.total).toEqual(1);
            
            this.player.draws += 1;
            expect(this.player.total).toEqual(2);
            
            this.player.losses += 1;
            expect(this.player.total).toEqual(3);
        });

    });
});