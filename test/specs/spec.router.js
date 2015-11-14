var Router = require('../../client/router');

describe('Router', function () {
    beforeEach(function () {
        this.router = new Router();
    });

    it('should be defined', function () {
        expect(this.router).toBeDefined();
    });

    describe('when is initialized', function () {
        it('should have a function to go home page', function () {
            expect(this.router.home).toBeDefined();
        });
        
        it('should have a function to go to game page', function () {
            expect(this.router.game).toBeDefined();
        });
    });
});