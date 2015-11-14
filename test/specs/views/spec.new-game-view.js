var NewGameView = require('../../../client/pages/new-game');
var templates = require('../../../client/templates');

describe('New Game view', function () {
    beforeEach(function () {
        this.newGameView = new NewGameView();
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
            this.newGameView.render();
            document.body.appendChild(this.newGameView.el);

            spyOn(this.newGameView.form, 'submitCallback').and.callThrough();
        });

        afterEach(function () {
            document.body.innerHTML = '';
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
});