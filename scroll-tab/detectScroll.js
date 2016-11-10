var isRightClick = false;

window.addEventListener('mousewheel', function(e) {
	if(isRightClick) {
	    wDelta = e.wheelDelta < 0 ? 'down' : 'up';
	    console.log(wDelta);

	    console.log('Send message to scroll js.');
		chrome.runtime.sendMessage({
				action: 'scrolling',
				direction: wDelta
			}, function(response) {
				console.log(response);
				isRightClick = false;
			}
		);
	}
});

//detect mouse down
var timeoutId = 0;
window.addEventListener("mousedown", function(e){
	if (e.button === 2) {
		timeoutId = setTimeout(rightClicking, 50);
	}
});
function rightClicking() {
	isRightClick = true;
	console.log('right clicking.........');
}

window.addEventListener("mouseup", function(){
	isRightClick = false;
	clearTimeout(timeoutId);
});
