var NewGameView = require('../../../client/pages/new-game');
var templates = require('../../../client/templates');

describe('New Game view', function () {
    beforeEach(function () {
        this.newGameView = new NewGameView();

        this.newGameView.render();
        document.body.appendChild(this.newGameView.el);
        this.el = this.newGameView.el;
    });

    afterEach(function () {
        document.body.innerHTML = '';
    });

    it('should be defined', function() {
        expect(this.newGameView).toBeDefined();
    });

    describe('when the view is initialized', function () {
        it('should have a page title', function () {
            expect(this.newGameView.pageTitle).toEqual('TicTacToe: New Game');
        });

        it('should have a template', function () {
            expect(this.newGameView.template)
                .toEqual(templates.pages['new-game']);
        });
    });

    describe('when the view is rendered', function () {
        beforeEach(function () {
            spyOn(this.newGameView.form, 'submitCallback').and.callThrough();
        });

        describe('binding', function () { 
            it('should show alert message if form\'s username duplicated prop is true', 
               function () {
                var alert = this.el.querySelector('.alert-danger');
                this.newGameView.duplicate = true;

                expect(alert.style.display).not.toEqual('none');
            });

            it('shouldn\'t show alert message if form\'s username duplicated prop is false', 
               function () {
                var alert = this.el.querySelector('.alert-danger');
                this.newGameView.duplicate = false;

                expect(alert.style.display).toEqual('none');
            });
        });

        it('should be defined form with form view', function () {
            expect(this.newGameView.form).toBeDefined();
        });

        it('should contain the form gourps', function () {
            var fomrGroups = 
                this.newGameView.el.querySelectorAll('.form-group');
            expect(fomrGroups).toBeDefined();
            expect(fomrGroups.length).toEqual(2);
        });

        it('should have a reset button', function () {
            var button = this.newGameView.el.querySelector('button[type="reset"]');
            var inputs = this.newGameView.el.querySelectorAll('input.form-control');
            var event = document.createEvent('Event');
            event.initEvent('click', true, true);

            inputs[0].value = 'user1';
            inputs[1].value = 'user2';

            button.dispatchEvent(event);

            expect(inputs[0].value).toEqual('');
            expect(inputs[1].value).toEqual('');
        });
    });

    describe('event on', function () { 
        beforeEach(function () {
            this.event = document.createEvent('Event');
            this.event.initEvent('click', true, true);
        });
        
        afterEach(function () {
            this.event = null;
        });
        
        describe('click on submit', function () {
            it('should call checkDuplicate', function () {
                var buttonSubmit = document.querySelector('[type="submit"]');
                spyOn(this.newGameView, 'checkDuplicate'); 
                buttonSubmit.dispatchEvent(this.event);
                expect(this.newGameView.checkDuplicate).toHaveBeenCalled();
            });
        });

        describe('click on input text tag', function () { 
            it('should call removeAlert', function () {
                var inputs = document.querySelectorAll('input[type="text"]');
                spyOn(this.newGameView, 'removeAlert'); 
                inputs[0].dispatchEvent(this.event);
                inputs[1].dispatchEvent(this.event);

                expect(this.newGameView.removeAlert.calls.count()).toEqual(2);
            });
        });
    });

    describe('control methods', function () {
        describe('checkDuplicate', function () {
            it('should set duplicate to true only if the usernames are the same', 
               function () {
                this.newGameView.form.data = {
                    player0: 'user1',
                    player1: 'user1'
                };

                this.newGameView.duplicate = false;
                this.newGameView.checkDuplicate();

                expect(this.newGameView.duplicate).toEqual(true);
            });

            it('should not set duplicate to true if the usernames are different', 
               function () {
                this.newGameView.form.data = {
                    player0: 'user1',
                    player1: 'user2'
                };

                this.newGameView.duplicate = false;
                this.newGameView.checkDuplicate();

                expect(this.newGameView.duplicate).not.toEqual(true);
            });
        });

        describe('removeAlert', function () {
            it('should set duplicate to false', function () {
                this.newGameView.duplicate = true;
                this.newGameView.removeAlert();

                expect(this.newGameView.duplicate).not.toEqual(true);
            });
        });
    });
});