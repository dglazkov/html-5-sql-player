
	function Runner(name) {
		var c = new Console(0);
		var db;
		
		this.begin = function() {
			db =  google.gears.factory.create('beta.database', '1.0');
			db.open(name);
			db.execute('BEGIN IMMEDIATE');
		}
		
		this.commit = function() {
			db.execute('COMMIT');
		}
		
		this.rollback = function() {
			db.execute('ROLLBACK');
		}
		
		this.exec = function(tx, sqlStatement, args, callback, errorCallback) {
			SQLUtils.runAsync(function() {
				var rows = [];
				try {
					var r = db.execute(sqlStatement, args);
					var lid = db.lastInsertRowId;
					if (r) {
						var names = [];
						for(var i = 0; i < r.fieldCount(); i++) {
							names.push(r.fieldName(i));
						}
						while(r.isValidRow()) {
							var row = {};
							for(var i = 0; i < names.length; i++) {
								row[names[i]] = r.field(i);
							}
							rows.push(row);
							r.next();
						}
						r.close();
					}
				}
				catch (e) {
					// TODO: Implement error translation
					errorCallback && errorCallback(new SQLError(0, e.message));
				}
				try {
					callback && callback(tx, new SQLResultSet(lid, rows));
				}
				catch(e) {
					// transaction error
				}
			})
		}
	}