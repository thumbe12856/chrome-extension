
(() => {
	// Debounce Limitation for lodash
	const DebounceLimit = 50;
	const ScrollDebounceLimit = 0;

	function ScrollHandler (event) {
		function ScrollStep (val) {
			if (val >= 0) return -1;
			else return 1;
		}
		const wDelta = isFirefox ? ScrollStep(event.deltaY) * -1 : ScrollStep(event.wheelDelta);
		if (wDelta !== 0) {
			chrome.runtime.sendMessage({
				action: "scrolling",
				direction: wDelta
			}, response => {});
			// clearTimeout(mouseUpTimeOutId);
			// mouseUpTimeOutId = setTimeout(mouseUp, 500);
		}
		console.log(wDelta);
	}

	function MouseDownHandler (event) {
		if (event.button === 2) {
			chrome.runtime.sendMessage({
				action: "rightClickDown"
			}, response => {});
		}
	}

	function MouseUpHandler (event) {
		chrome.runtime.sendMessage({
			action: "ClickUp"
		}, response => removeDisableEventContextmenu());
	}

	function disable (event) {
		event.preventDefault();
	};

	// after user scrolls tab, and mouses up, disable the contextmenu.
	// when tab on focus, disable the contextmenu.
	function FocusHandler (event) {
		window.addEventListener("contextmenu", disable, false);
		setTimeout(removeDisableEventContextmenu, 1000);
	}

	// when tab not on focus, enable the contextmenu.
	function BlurHandler (event) {
		window.removeEventListener("contextmenu", disable, false);
	}

	const scrollEventDetectionString = isFirefox ? "wheel" : "mousewheel";
	window.addEventListener(scrollEventDetectionString, _.debounce(ScrollHandler, ScrollDebounceLimit));
	window.addEventListener("mousedown", _.debounce(MouseDownHandler, DebounceLimit));
	window.addEventListener("mouseup", _.debounce(MouseUpHandler, DebounceLimit));
	window.addEventListener("focus", _.debounce(FocusHandler, DebounceLimit));
	window.addEventListener("blur", _.debounce(BlurHandler, DebounceLimit));

	function removeDisableEventContextmenu () {
		window.removeEventListener("contextmenu", disable, false);
	}
})();
