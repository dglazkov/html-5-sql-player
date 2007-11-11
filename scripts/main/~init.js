
	function init() {
		var workerUrl; 
		var player;
		if (workerUrl = readWorkerUrl()) {
			window.console || (window.console = { log: function() {} });
			player = new Player(workerUrl);
			assert() && setup();
		}
		
		function assert() {
			console.log('assert requirements');
			return window.google && window.google.gears;
		}
		
		function setup() {
			var dirty;
			var listHtml = '<ul id="result-list"></ul>';
			
			bef('div', 'results').innerHTML = listHtml;
			bef('form', 'player').innerHTML = '<fieldset><label for="input">Type the code to be executed</label><textarea id="input">console.log("works?");</textarea><button type="button" id="play">Play</button></fieldset>';
			gel('play').onclick = function() {
				player.play(gel('input').value);
			}

			player.onmessage = function(type, text) {
				var list = gel('result-list');
				if (!dirty) {
					var button = list.parentNode.insertBefore(document.createElement('button'), list);
					button.innerHTML = 'Clear Results';
					button.onclick = function() {
						gel('results').innerHTML = listHtml;
						dirty = false;
					}
				}
				var item = list.appendChild(document.createElement('li'));
				item.className = type;
				dirty = true;
				item.innerHTML = '<span class="type">' + type + '</span><span class="message">' + unescape(text) + '</span>';
			}
			return true;
		}
		
		function bef(tag, id) {
			var n;
			return n = document.body.insertBefore(document.createElement(tag), gel('credits')), n.id = id, n;
		}
		
		function gel(id) {
			return document.getElementById(id);
		}
		
		function readWorkerUrl() {
			var links = document.getElementsByTagName('link');
			for(var i = 0; i < links.length; i++) {
				var link = links[i];
				if (link.rel == 'worker') {
					return link.href;
				}
			}
		}
	}
	
