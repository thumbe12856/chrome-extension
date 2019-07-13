// Debounce Limitation for lodash
const DebounceLimit = 50;

// ref: https://jsfiddle.net/6spj1059/
const isFirefox = typeof InstallTrigger !== "undefined";
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Override window.chrome if is Firefox
chrome = isFirefox ? window.browser : window.chrome;

var ctrlKeydown = false;
var shiftKeydown = false;

function KeyDownHandler (event) {
	ctrlKeydown = event.ctrlKey;
	shiftKeydown = event.shiftKey;

	console.log(event.key)

	let direction = 0;
	let popup = false;
	let justpop = false;

	if (ctrlKeydown && shiftKeydown) {
		if (event.key === "PageUp") {
			direction = -1; // firefox cannot detect it, since it is shortcut
		} else if (event.key === "PageDown") {
			direction = 1; // firefox cannot detect it, since it is shortcut
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
