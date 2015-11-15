var GameView = require('../../../client/pages/game');
var Game = require('../../../client/models/game');
var templates = require('../../../client/templates');


describe('Game View', function () {
    beforeEach(function () {
        this.game = new Game();

        this.gameView = new GameView({
            model: this.game
        });

        this.gameView.render();
        this.el = this.gameView.el;
        document.body.appendChild(this.gameView.el);
        window.app = jasmine.createSpyObj('app', ['router']);
        window.app.router = jasmine.createSpyObj('router', ['navigate']);
    });

    afterEach(function () {
        document.body.removeChild(this.gameView.el);
        this.el = null;
        this.gameView.remove();
    });

    it('should be defined', function () {
        expect(this.gameView).toBeDefined();
    });

    it('should throw an exception id model is not defined',
       function () {
        expect(function () {
            var gViewWithoutModel = new GameView();
        }).toThrowError('Model is required');
    });

    it('should navigate to the if model is not defined ',function (){
        var gViewWithoutModel;
        try {
            gViewWithoutModel = new GameView();
        } catch (e) {
            ;
        }
        
        expect(window.app.router.navigate).toHaveBeenCalled();
    });

    describe('when view is initialized', function () {
        it('should have a title', function () {
            expect(this.gameView.pageTitle)
                .toEqual('TicTacToe: Game');
        });

        it('should have a template', function () {
            expect(this.gameView.template)
                .toEqual(templates.pages.game);
        });

        it('should have count turn property', function () {
            expect(this.gameView.countTurn)
                .toEqual(0);
        });

        it('should have defined board property', function () {
            expect(this.gameView.board)
                .toBeDefined();
        });

        it('should have initialised board property', function () {
            var i;
            var j;

            for (i = 0; i < 3; i += 1){
                expect(this.gameView.board[i])
                    .toBeDefined();
                for (j = 0; j < 3; j += 1){
                    expect(this.gameView.board[i][j])
                        .toBeDefined();
                }
            }
        });
    });

    describe('when view is rendered', function () {

        it('should intialize values', function () {
            expect(this.game.turn).toEqual('player0');
            expect(this.game.isCompleted).toEqual(false);
            expect(this.game.winner).toEqual('');
            expect(this.gameView.countTurn).toEqual(0);

            var i;
            var j;
            for (i = 0; i < 3; i += 1){
                for (j = 0; j < 3; j += 1){
                    expect(this.gameView.board[i][j])
                        .toEqual('');
                }
            }
            this.game.isCompleted = true;
            this.game.winner = 'player0';
            this.gameView.countTurn = 9;
            this.game.player0.wins += 1;

            this.gameView.render();

            expect(this.game.turn).toEqual('player1');
            expect(this.game.isCompleted).toEqual(false);
            expect(this.game.winner).toEqual('');
            expect(this.gameView.countTurn).toEqual(0);

            for (i = 0; i < 3; i += 1) {
                for (j = 0; j < 3; j += 1) {
                    expect(this.gameView.board[i][j])
                        .toEqual('');
                }
            }
        });

        describe('binding', function () {
            it('should switch between game board and leaderboard on complete', 
               function () {
                var gameBoard = 
                    this.el.querySelector('#game');
                var leaderboard = 
                    this.el.querySelector('#leaderboard');

                this.game.isCompleted = false;
                expect(gameBoard.style.display).not.toEqual('none');
                expect(leaderboard.style.display).toEqual('none');

                this.game.isCompleted = true;
                expect(gameBoard.style.display).toEqual('none');
                expect(leaderboard.style.display).not.toEqual('none');
            });

            describe('game section', function () {
                it('should show username players in the game view', 
                   function () {
                    var playerUsername0 = 
                        this.el.querySelector('[data-hook="player0"]');
                    var playerUsername1 = 
                        this.el.querySelector('[data-hook="player1"]');

                    expect(playerUsername0.innerHTML)
                        .toEqual(this.game.player0.username);
                    expect(playerUsername1.innerHTML)
                        .toEqual(this.game.player1.username);
                });

                it('should switch turn between players', function () {
                    var turn = 
                        this.el.querySelector('.turn');

                    expect(turn.getAttribute('data-hook'))
                        .toEqual(this.game.turn);

                    this.gameView.model.toggle('turn');

                    turn = 
                        this.el.querySelector('.turn');

                    expect(turn.getAttribute('data-hook'))
                        .toEqual(this.game.turn);
                });
            });

            describe('leaderboard section', function () {
                it('should show draw in the leaderboard when winner is empty', 
                   function () {
                    var draw = 
                        this.el.querySelector('#draw');

                    this.game.winner = '';
                    expect(draw.style.display).not.toEqual('none');

                    this.game.winner = 'player0';
                    expect(draw.style.display).toEqual('none');
                });

                it('should show winner in the leaderboard when winner is not empty', 
                   function () {
                    var winner = 
                        this.el.querySelector('#winner');

                    this.game.winner = '';
                    expect(winner.style.display).toEqual('none');

                    this.game.winner = 'player0';
                    expect(winner.style.display).not.toEqual('none');
                });

                it('should show the winner\'s username in the leaderboard when it is not empty', 
                   function () {
                    var winner = 
                        this.el.querySelector('#winner span');

                    this.game.winner = '';
                    expect(winner.innerHTML).toEqual(this.game.winner);

                    this.game.winner = 'player0';
                    expect(winner.innerHTML).toEqual(this.game.winner);
                });

                it('should show the scores of the player0', 
                   function () {
                    var wins = this.el.querySelector('#player0 .wins');
                    var draws =  this.el.querySelector('#player0 .draws');
                    var losses =  this.el.querySelector('#player0 .losses');

                    expect(wins.innerHTML).toEqual('' + this.game.player0.wins);
                    expect(draws.innerHTML).toEqual('' + this.game.player0.draws);
                    expect(losses.innerHTML).toEqual('' + this.game.player0.losses);
                });

                it('should show the scores of the player1', 
                   function () {
                    var wins = this.el.querySelector('#player1 .wins');
                    var draws = this.el.querySelector('#player1 .draws');
                    var losses = this.el.querySelector('#player1 .losses');

                    expect(wins.innerHTML).toEqual('' + this.game.player1.wins);
                    expect(draws.innerHTML).toEqual('' + this.game.player1.draws);
                    expect(losses.innerHTML).toEqual('' + this.game.player1.losses);
                });
            });
        });
    });

    describe('event on the page', function () {
        beforeEach(function () {
            this.event = document.createEvent('Event');
            this.event.initEvent('click', true, true);
        });

        it('should call render page when new game button is clicked', 
           function () {
            var button = this.el.querySelector('#newGame');
            spyOn(this.gameView, 'newGame').and.callThrough();
            spyOn(this.gameView, 'render').and.callThrough();

            button.dispatchEvent(this.event);
            expect(this.gameView.newGame).toHaveBeenCalled();
            expect(this.gameView.render).toHaveBeenCalled();
        });

        describe('click on a tile', function () {
            beforeEach(function () {
                this.tile00 = this.el.querySelector('.tile-0-0');
            });

            afterEach(function () {
                this.tile00.setAttribute('data-marked-by','');
                this.tile00.innerHTML = ' ';
            });

            it('should call addMark', function () {
                spyOn(this.gameView, 'addMark').and.callThrough();

                this.tile00.dispatchEvent(this.event);
                expect(this.gameView.addMark).toHaveBeenCalled();
            });

            it('should call checkWinner if the tile is not marked', 
               function () {
                spyOn(this.gameView, 'checkWinner').and.callThrough();

                this.tile00.dispatchEvent(this.event);
                expect(this.gameView.checkWinner).toHaveBeenCalled();
            });

            it('shouldn\'t call checkWinner if the tile is already marked', 
               function () {
                spyOn(this.gameView, 'checkWinner').and.callThrough();
                this.tile00.dispatchEvent(this.event);
                this.tile00.dispatchEvent(this.event);
                expect(this.gameView.checkWinner.calls.count())
                    .toEqual(1);
            });

            it('should call manageWinnerOrDraw if the tile is not marked', 
               function () {
                spyOn(this.gameView, 'manageWinnerOrDraw').and.callThrough();

                this.tile00.dispatchEvent(this.event);
                expect(this.gameView.manageWinnerOrDraw).toHaveBeenCalled();
            });

            it('shouldn\'t call manageWinnerOrDraw if the tile is already marked', 
               function () {
                spyOn(this.gameView, 'manageWinnerOrDraw').and.callThrough();
                this.tile00.dispatchEvent(this.event);
                this.tile00.dispatchEvent(this.event);
                expect(this.gameView.manageWinnerOrDraw.calls.count())
                    .toEqual(1);
            });

            it('should mark it', function () {
                var mark = {
                    'player0': 'X',
                    'player1': 'O'
                };

                var currentTurn = this.game.turn;
                this.tile00.dispatchEvent(this.event);
                expect(this.tile00.innerHTML).toEqual(mark[currentTurn]);
                expect(this.tile00.getAttribute('data-marked-by'))
                    .toEqual(currentTurn);

                currentTurn = this.game.turn;
                var tile10 = this.el.querySelector('.tile-1-0');
                tile10.dispatchEvent(this.event);
                expect(tile10.innerHTML).toEqual(mark[currentTurn]);
                expect(tile10.getAttribute('data-marked-by'))
                    .toEqual(currentTurn);
            });
        });
    });

    describe('control method', function () {
        describe('checkWinner', function () {
            beforeEach(function () {
                this.winner = 'player0';
                this.looser = 'player1';
                this.game.turn = this.winner;
            });

            it('should return true on row solution', function () {  
                this.gameView.board[0][0] = this.winner;
                this.gameView.board[0][1] = this.winner;
                this.gameView.board[0][2] = this.winner;
                this.gameView.board[1][2] = this.looser;
                this.gameView.board[1][1] = this.looser;

                expect(this.gameView.checkWinner()).toEqual(true);
            });

            it('should return true on col solution', function () {  
                this.gameView.board[1][0] = this.winner;
                this.gameView.board[2][0] = this.winner;
                this.gameView.board[0][0] = this.winner;
                this.gameView.board[0][2] = this.looser;
                this.gameView.board[0][1] = this.looser;

                expect(this.gameView.checkWinner()).toEqual(true);
            });

            it('should return true on diagonal solution', function () {  
                this.gameView.board[0][0] = this.winner;
                this.gameView.board[1][1] = this.winner;
                this.gameView.board[2][2] = this.winner;
                this.gameView.board[0][2] = this.looser;
                this.gameView.board[0][2] = this.looser;

                expect(this.gameView.checkWinner()).toEqual(true);
            });

            it('should return true on reverse diagonal solution', 
               function () {  
                this.gameView.board[2][0] = this.winner;
                this.gameView.board[1][1] = this.winner;
                this.gameView.board[0][2] = this.winner;
                this.gameView.board[1][2] = this.looser;
                this.gameView.board[2][1] = this.looser;

                expect(this.gameView.checkWinner()).toEqual(true);
            });

            it('should return false if there is no solution on full board', 
               function () {  
                this.gameView.board[0][0] = this.winner;
                this.gameView.board[0][1] = this.winner;
                this.gameView.board[1][1] = this.winner;
                this.gameView.board[1][2] = this.winner;
                this.gameView.board[2][0] = this.winner;
                this.gameView.board[0][2] = this.looser;
                this.gameView.board[1][0] = this.looser;
                this.gameView.board[2][1] = this.looser;
                this.gameView.board[2][2] = this.looser;
                expect(this.gameView.checkWinner()).toEqual(false);
            });

            it('should return false if there is no solution on not full board', 
               function () {  
                this.gameView.board[0][0] = this.winner;
                this.gameView.board[0][1] = this.winner;
                this.gameView.board[1][1] = this.winner;
                this.gameView.board[0][2] = this.looser;
                this.gameView.board[1][0] = this.looser;
                this.gameView.board[2][1] = this.looser;
                expect(this.gameView.checkWinner()).toEqual(false);
            });
        });

        describe('manageWinnerOrDraw', function () { 
            it('should set the winner if one is found', 
               function () {  
                spyOn(this.gameView, "checkWinner").and.callFake(function() {
                    return true;
                });

                this.game.turn = 'player0';
                this.gameView.manageWinnerOrDraw();
                expect(this.game.winner).toEqual(this.game.player0.username);
            });

            it('shouldn\'t set the winner if no one is found', 
               function () {  
                spyOn(this.gameView, "checkWinner").and.callFake(function() {
                    return false;
                });

                this.game.turn = 'player0';
                this.gameView.manageWinnerOrDraw();
                expect(this.game.winner).toEqual('');
            });

            it('shouldn\'t set the isCompleted if the game is not finished yet', 
               function () {  
                spyOn(this.gameView, "checkWinner").and.callFake(function() {
                    return false;
                });

                this.game.turn = 'player0';
                this.gameView.countTurn = 5;
                this.gameView.manageWinnerOrDraw();
                expect(this.game.isCompleted).toEqual(false);
            });

            it('should set the isCompleted if the game is finished', 
               function () {
                spyOn(this.gameView, "checkWinner").and.callFake(function() {
                    return false;
                });
                this.game.turn = 'player0';
                this.gameView.countTurn = 9;
                this.gameView.manageWinnerOrDraw();
                expect(this.game.isCompleted).toEqual(true);
            });

            it('should update players\' score when the game is finished with a draw', 
               function () {  
                spyOn(this.gameView, "checkWinner").and.callFake(function() {
                    return false;
                });
                this.game.turn = 'player0';
                this.gameView.countTurn = 9;
                this.game.player0.draws = 0;
                this.game.player1.draws = 0;
                this.gameView.manageWinnerOrDraw();

                expect(this.game.player0.draws).toEqual(1);
                expect(this.game.player1.draws).toEqual(1);
            });

            it('should update players\' score when the game is finished with a winner', 
               function () {  

                spyOn(this.gameView, "checkWinner").and.callFake(function() {
                    return true;
                });
                this.game.turn = 'player0';
                this.gameView.countTurn = 9;
                this.game.player0.wins = 0;
                this.game.player1.losses = 0;
                this.gameView.manageWinnerOrDraw();

                expect(this.game.player0.wins).toEqual(1);
                expect(this.game.player1.losses).toEqual(1);
            });
        });
    });
});