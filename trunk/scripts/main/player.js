
	function Player(url) {
		var wp;
		var id;
		
		try {
			wp = google.gears.factory.create("beta.workerpool", "1.0");
		}
		catch(e) {
			// TODO: Handle errors better
			return;
		}
		
		var me = this;
		
		wp.onmessage = function(a, b, msg) {
			me.onmessage && me.onmessage.apply(me, msg.text.split(':'));
		}
		
		try {
			id = wp.createWorkerFromUrl(url);
		}
		catch(e) {
			// TODO: Handle errors better than this
			return;
		}
				
		this.play = function(code) {
			wp.sendMessage(code, id);
		}
	}