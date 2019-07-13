(() => {
	// Debounce Limitation for lodash
	const DebounceLimit = 50;

	var ctrlKeydown = false;
	var shiftKeydown = false;

	function KeyDownHandler (event) {
		ctrlKeydown = event.ctrlKey;
		shiftKeydown = event.shiftKey;

		let direction = 0;
		let popup = false;
		let justpop = false;

		if (ctrlKeydown && shiftKeydown) {
			if (event.key === "PageUp") { // firefox cannot detect it, since it is shortcut
				direction = -1;
			} else if (event.key === "PageDown") { // firefox cannot detect it, since it is shortcut
				direction = 1;
			} else if (event.key === "*") { // keyboard '8'
				direction = -1;
			} else if (event.key === "(") { // keyboard '9'
				direction = 1;
			} else if (event.key === "{") {
				popup = true;
			} else if (event.key === "}") {
				justpop = true;
			}

			// moving window
			if (direction) {
				chrome.runtime.sendMessage({
					action: "moving",
					direction: direction
				}, () => {});
			}

			// popup window to temp.
			if (popup) {
				chrome.runtime.sendMessage({
					action: "popup"
				},  response => {});
			}

			// just to popup a window.
			if (justpop) {
				chrome.runtime.sendMessage({
					action: "justpop"
				}, response => {});
			}
		}
	}

	function KeyUpHandler (event) {
		if (!event.ctrlKey) {
			ctrlKeydown = false;
		}

		if (!event.shiftKey) {
			shiftKeydown = false;
		}
	}

	window.addEventListener("keydown", _.debounce(KeyDownHandler, DebounceLimit));
	window.addEventListener("keyup", _.debounce(KeyUpHandler, DebounceLimit));
})();
