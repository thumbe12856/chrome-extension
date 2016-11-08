/*chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	console.log('123');
	if (changeInfo.status == 'complete') {
		alert('here');
	}
})*/

//chrome.tabs.executeScript(null, {file: "inject.js"});

/*chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});*/

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	//console.log(456);
	//alert(changeInfo.status);
	if (changeInfo.status == 'complete') {
		chrome.tabs.executeScript(null, {file: "inject.js"});
	}
})