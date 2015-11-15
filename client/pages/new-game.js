var PageView = require('./base');
var templates = require('../templates');
var NewGameForm = require('../forms/new-game-form');

module.exports = PageView.extend({
  pageTitle: 'TicTacToe: New Game',
  template: templates.pages['new-game'],

  props: {
    duplicate: {
      type: 'boolean',
      default: false
    } 
  },

  render: function () {
    this.renderWithTemplate();
    this.form = new NewGameForm({
      el: this.query('form'),
      data: {
        player0: '',
        player1: ''
      }
    });

    this.form.usernameDuplicated = false;
    this.registerSubview(this.form);
  },

  bindings: {
    'duplicate': {
      type: 'toggle',
      selector: '.alert-danger'
    },
  },

  events: {
    'click [type="submit"]': 'checkDuplicate',
    'click [type="text"]': 'removeAlert'
  },

  checkDuplicate: function () {
    var inputs = this.el.querySelectorAll('input.form-control');
    
    if (inputs[0].value ===
        inputs[1].value) {
      this.duplicate = true;
    }
  },

  removeAlert: function () {
    this.duplicate = false;
  }
});