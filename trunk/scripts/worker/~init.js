
	var wp = google.gears.workerPool;
	
	wp.onmessage = function(a, b, message) {
		var console = new Console(message.sender);
		var code = message.text;
		var window = {};
		window.openDatabase = openDatabase;
		var openDatabase = function(name, version, displayName, estSize) {
			if (!SQLUtils.versionMatches(name, version)) {
				throw { message: SQLUtils.errors.versionMismatch };
			}
			return new Database(name, version, displayName, estSize);
		}
		try {
			(function(){
				var google;var gearsFactory;var gearsWorkerPool;var a;var b;var message;
				var wp;var Console;var SQLUtils;
				eval(code);
			}).apply({});
		}
		catch(e) {
			console.error(e.message);
		}
	}
	wp.onerror = function(error) {
		wp.sendMessage('error:' + error)
	}
