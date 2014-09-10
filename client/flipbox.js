;(function($, doc, win) {
  "use strict";

  function Flipbox(el, opts) {
    this.$el  = $(el);
    this.display = this.$el.children('.displayed.text');
    this.choices = this.$el.children('.choices').children('.item').map(function(i, el) {
		return el.innerHTML;
	});
	this.choices = this.choices.length ? this.choices : ['no choices'];
	this.numChoices = this.choices.length;
    this.opts = opts;
    this.$el.data('flipbox', this);

    this.init();
  }

  Flipbox.prototype.init = function() {
  	var self = this;
  	this.currentChoice = 0;
  	this.display.html(this.choices[this.currentChoice]);
  	this.$el.on('click', function() {
  		self.currentChoice = (self.currentChoice + 1) % self.numChoices;
  		self.updateChoice(self.currentChoice, 100);
  	})
  };

  Flipbox.prototype.updateChoice = function(n, t) {
  	var thisChoice = this.choices[n], self = this;
  	if (thisChoice) {
  		this.currentChoice = n;
	  	this.display.fadeOut(t, function() {
	  		self.display.html(thisChoice).fadeIn(t);
	  	});
	}
  	return this;
  }

  $.fn.flipbox = function() {
  	if (arguments[0] === 'get choice') {
  		return this.data('flipbox') ? this.data('flipbox').currentChoice : null;
  	}
  	else if (arguments[0] === 'set choice') {
  		return this.data('flipbox') ? this.data('flipbox').updateChoice(arguments[1], arguments[2] || 0) : null;
  	}
  	else {
	    return this.each(function() {
	      new Flipbox(this);
	    });
	}
  };


})(jQuery, document, window);