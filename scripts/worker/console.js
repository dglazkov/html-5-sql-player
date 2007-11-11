
	function Console(id) {
		var ms = [ 'log', 'info', 'warn', 'error', 'debug'];
		for(var i = 0; i < ms.length; i++) {
			var m = ms[i];
			this[m] = makeSend(m);
		}
		
		function makeSend(type) {
			return function() {
				var t = [];
				for(var i = 0; i < arguments.length; i++) {
					var arg = arguments[i];
					t.push(String(arg));
				}
				var r = [ type ];
				r.push(escape(t.join(' ')));
				wp.sendMessage(r.join(':'), id);
			}
		}
	}