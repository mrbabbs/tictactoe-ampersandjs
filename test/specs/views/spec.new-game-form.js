var NewGameForm = require('../../../client/forms/new-game-form');

describe('New Game form', function () {
    beforeEach(function() {
        var form = '<form><fieldset><fieldset><input type="submit"</form>';
        document.body.innerHTML = form;
        var form = document.body.querySelector('form');

        this.newGameForm = new NewGameForm({
            el: form,
            data: {
                player0: '',
                player1: ''
            }
        });

        this.newGameForm.render();
        this.el = this.newGameForm.el; 
    });

    it('should be defined', function () {
        expect(this.newGameForm).toBeDefined();
    });

    describe('when is initialized', function () {        
        it('should have a submit callback function', function () {
            expect(typeof this.newGameForm.submitCallback).toEqual('function');
        });

        it('should have defined \'el\'', function () {
            expect(this.newGameForm.el).toBeDefined();
        });

        it('should have a data object', function () {
            expect(this.newGameForm.data.player0).toBeDefined();
            expect(this.newGameForm.data.player1).toBeDefined();
        });
    });

    describe('when is rendered', function () {
        it('should have DOM element created', function () {
            expect(this.el).toBeDefined();
        });

        it('should have two empty input form', function () {
            var inputs = this.el.querySelectorAll('input[type="text"]');

            expect(inputs.length).toEqual(2);
            expect(inputs[0].value).toEqual('');
            expect(inputs[1].value).toEqual('');
        });

        it('should have the right template', function () {
            var inputs = this.el.querySelectorAll('.form-group');

            expect(inputs.length).toEqual(2);
        });

        it('should have labels about inputs', function () {
            var labels = this.el.querySelectorAll('label');

            expect(labels[0].innerHTML).toContain('Player');
            expect(labels[1].innerHTML).toContain('Player');
        });
    });

    describe('when form is submitted', function () {
        describe('call submitCallback', function () {
            beforeEach(function () {
                var app = {};
                app.router = {};
                app.router.navigate = function (args) {
                    return args;
                };
                window.app = app;

                spyOn(app.router, 'navigate');

                this.newGameForm.render();
                this.el = this.newGameForm.el; 
            });

            it('should not call navigate if the fields are not filled', 
               function () {
                this.newGameForm.submitCallback({
                    player0: '',
                    player1: ''
                });
                expect(app.router.navigate).not.toHaveBeenCalled();
            });

            it('should not call navigate if the players uername are the same', 
               function () {
                this.newGameForm.submitCallback({
                    player0: 'user',
                    player1: 'user'
                });
                expect(app.router.navigate).not.toHaveBeenCalled();
            });

            it('should not call navigate if the field are valid', function () {
                this.newGameForm.submitCallback({
                    player0: 'user_1',
                    player1: 'user_2'
                });
                expect(app.router.navigate).toHaveBeenCalledWith('game');
            });

            it('should create a new game', function () {
                this.newGameForm.submitCallback({
                    player0: 'user_1',
                    player1: 'user_2'
                });
                expect(app.game).toBeDefined();
            });
        });
    });
});