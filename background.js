chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({}, function (tabs) {
		var needCreate = true;
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url == 'chrome://net-internals/#dns') {
				chrome.tabs.executeScript(tabs[i].id, {file: "flush.js"});
				needCreate = false;
				break;
			}
		}

		if (needCreate) {
			chrome.tabs.create({url: 'chrome://net-internals/#dns', active: false}, function(tab) {
				chrome.tabs.executeScript(tab.id, {file: "flush.js"});
			});
		}
	});
});
