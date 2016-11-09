window.addEventListener('mousewheel', function(e){
    wDelta = e.wheelDelta < 0 ? 'down' : 'up';
    console.log(wDelta);

    console.log('Send message to scroll js.');
	chrome.runtime.sendMessage({
			action: 'scrolling',
			direction: wDelta
		}, function(response) {
			console.log(response);
		}
	);
});
