window.addEventListener('mousewheel', function(e) {
	//console.log('mouse wheel');
    wDelta = e.wheelDelta < 0 ? 'down' : 'up';

    //console.log('Send message to scroll js.');
	chrome.runtime.sendMessage({
			action: 'scrolling',
			direction: wDelta
		}, function(response) {
			//console.log(response);
		}
	);
});

//detect mouse down
var timeoutId = 0;
window.addEventListener("mousedown", function(e){
	console.log('mouse down');
	if (e.button === 2) {
		timeoutId = setTimeout(rightClicking, 50);
	}
});
function rightClicking() {
	//console.log('right clicking.........');
	chrome.runtime.sendMessage({
			action: 'rightClickDown'
		}, function(response) {
			//console.log(response);
		}
	);
}

window.addEventListener("mouseup", function(){
	clearTimeout(timeoutId);
	//console.log('mouse up');
	chrome.runtime.sendMessage({
			action: 'clickUp'
		}, function(response) {
			//console.log(response);
		}
	);
});
