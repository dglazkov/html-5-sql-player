
	function Database(name, version, displayName, estSize) {
		// TODO: should be read-only
		this.version = version;
		
		this.changeVersion = function(oldVersion, newVersion, callback, errorCallback) {
			// TODO: Implement changeVersion	
		}
		
		this.transaction = function(callback, errorCallback, successCallback) {
			// TODO: Complete conformance to processing model
			callback && SQLUtils.runAsync(function() {
				var r = new Runner(name);
				var t = new Transaction(r);
				try {
					r.begin();
					callback(t);
					r.commit();
				}
				catch(e) {
					r.rollback();
					// TODO: Implement error code translation
					errorCallback && errorCallback(new SQLError(0, e.message));
					return;
				}
				successCallback && successCallback(t);
			});
		}
	};
	