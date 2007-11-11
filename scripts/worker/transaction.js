
	function Transaction(r) {
		
		this.executeSql = function(sqlStatement, args, callback, errorCallback) {
			r.exec(this, sqlStatement, args, callback, errorCallback);
		}
	}
