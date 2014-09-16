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


Flipbox.prototype.destroy = function() {
	this.$el.removeData();
	this.$el.off();	
};

Flipbox.prototype.updateChoice = function(n, t) {
	var thisChoice = this.choices[n], self = this;
	if (thisChoice) {
		this.currentChoice = n;
	  	this.display.fadeOut(t, function() {
	  		self.display.html(thisChoice).fadeIn(t);
	  	});
	  	this.settings.onChange(n);
	}
	return this.currentChoice;
}

Flipbox.prototype.settings = {
  	onChange: function(value) {}
};

$.fn.flipbox = function() {

	var $allModules = $(this),
	$window     = $(window),
	$document   = $(document),
	$body       = $('body'),

	query           = arguments[0],
	methodInvoked   = (typeof query == 'string'),
	queryArguments  = [].slice.call(arguments, 1),
	moduleNamespace = 'flipbox',

	returnedValue;

	$allModules.each( function() {

		var $module = $(this),
			element = this,
			instance = $module.data(moduleNamespace),
			returnValue;

		module = {

			initialize: function() {
				return new Flipbox($module);
			},
			destroy: function() {
				return instance && instance.destroy();
			},
			invoke: function(query, passedArguments, context) {
				var object = instance,
					maxDepth,
					found = module[query],
					response;

				passedArguments = passedArguments || queryArguments;
				context         = element         || context;

				if ( $.isFunction( found ) ) {
					response = found.apply(context, passedArguments);
				}
				else if(found !== undefined) {
					response = found;
				}
				if($.isArray(returnedValue)) {
					returnedValue.push(response);
				}
				else if(returnedValue !== undefined) {
					returnedValue = [returnedValue, response];
				}
				else if(response !== undefined) {
					returnedValue = response;
				}
				return found;
			},
			'get choice': function() {
				return instance ? instance.currentChoice : null;
			},
			'set choice': function(arguments) {
				return instance ? instance.updateChoice(queryArguments[0], queryArguments[1] || 0) : null;
			}
		};

		if(methodInvoked) {
			if(instance === undefined) {
				module.initialize();
			}
			module.invoke(query);
		}
		else {
			if(instance !== undefined) {
				module.destroy();
			}
			module.initialize();
		}

		if ($.isPlainObject(query)) {
			_.extend(instance.settings, query);
		}

	});


  	return (returnedValue !== undefined)
    	? returnedValue
    	: this;

/*
	if (arguments[0] === 'get choice') {
		return this.each(function() {
			console.log("Should return", ($(this).data('flipbox') ? $(this).data('flipbox').currentChoice : null))
			return ($(this).data('flipbox') ? $(this).data('flipbox').currentChoice : null);
		});
	}
	else if (arguments[0] === 'set choice') {
		return this.each(function() {
			return ($(this).data('flipbox') ? $(this).data('flipbox').updateChoice(arguments[1], arguments[2] || 0) : null);
		});
	}
	else if (!arguments[0]) {
		return this.each(function() {
			new Flipbox(this);
		});
}*/
};
