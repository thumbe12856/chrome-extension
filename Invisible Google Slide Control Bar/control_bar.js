var has_create = false;

(() => {

	function MouseDownHandler (event) {
		// Because the elements will load from internet, so just wait a second.
		setTimeout(GetDiv, 300);
	}

	function GetDiv() {
		var iframe = document.getElementsByClassName("punch-present-iframe");
		var is_fail = false;
		console.log("iframe", iframe);

		if(!has_create) {
			if(iframe.length > 0) {
				var body = iframe[0].contentWindow.document.body;
				console.log("body", body);

				if(body) {
					div = body.getElementsByClassName("punch-viewer-nav-rounded-container")[0];
					has_create = true;
					
					var bar = control_element("bar");
					div.appendChild(bar);

					var arrow = control_element("arrow");
					div.appendChild(arrow);

					console.log("body: ", div);

				} else {
					is_fail = true;
				}
			} else {
				is_fail = true;
			}
		}

		if(is_fail) {
			setTimeout(GetDiv, 1000);
		}
		return;
	}

	function control_element(item) {
		var element = "";
		
		if(item === "bar") {
			//var bar = '<div class="goog-toolbar-separator goog-toolbar-separator-disabled goog-inline-block" aria-disabled="true" role="separator" style="user-select: none;">&nbsp;</div>';
			var node = document.createElement("div");
			node.setAttribute("id", "my_sperator");
			node.setAttribute("class", "goog-toolbar-separator goog-toolbar-separator-disabled goog-inline-block");
			node.setAttribute("aria-disabled", "true");
			node.setAttribute("role", "separator");
			node.setAttribute("style", "user-select: none;");
			node.innerHTML += '&nbsp;';
			element = node;
			console.log("node", node);
		} else if(item == "arrow") {
			//var control_arrow = '<div class="goog-inline-block goog-flat-button" role="button" 
			//aria-expanded="false" aria-haspopup="false" aria-disabled="false" style="user-select: none;" 
			//tabindex="0">
			//<div class="punch-viewer-icon-large punch-viewer-options goog-inline-block" 
			//style="width: 14px;height: 50px;background: url(//i.imgur.com/EgMwR1u.png);"></div></div>'
			var node1 = document.createElement("div");
			node1.setAttribute("class", "goog-inline-block goog-flat-button");
			node1.setAttribute("role", "button");
			node1.setAttribute("aria-expanded", "false");
			node1.setAttribute("aria-haspopup", "false");
			node1.setAttribute("aria-disabled", "false");
			node1.setAttribute("style", "user-select: none;");
			node1.setAttribute("tabindex", "0");
			
			var node2 = document.createElement("div");
			node2.setAttribute("class", "punch-viewer-icon-large punch-viewer-options goog-inline-block");
			node2.setAttribute("style", "width: 14px;height: 50px;background: url(//i.imgur.com/EgMwR1u.png); transform: rotate(180deg);");

			node1.appendChild(node2);
			element = node1;
		}

		return element;
	}

	// Debounce Limitation for lodash
	const DebounceLimit = 1000;
	//document.getElementById("punch-start-presentation-left").addEventListener("mousedown", _.debounce(MouseDownHandler, DebounceLimit));
	document.getElementById("punch-start-presentation-left").addEventListener("click", MouseDownHandler, true);
})();
