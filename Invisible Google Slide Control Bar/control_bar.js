var has_create = false;
var direction = -1;
var ori_position = "";

(() => {

	function MouseDownHandler (event) {
		// Because the elements will load from internet, so just wait a second.
		setTimeout(GetDiv, 300);
	}

	function GetDiv() {
		var iframe = document.getElementsByClassName("punch-present-iframe");
		var is_fail = false;
		var element = "";

		if(!has_create) {
			if(iframe.length > 0) {
				var body = iframe[0].contentWindow.document.body;

				if(body) {
					div = body.getElementsByClassName("punch-viewer-nav-rounded-container");
					if(div.length > 0) {
						div = div[0];
						div.setAttribute("style", "left: 0; padding-right: 15px;");
						//has_create = true;

						var my_sperator = iframe[0].contentWindow.document.getElementById("my_sperator");
						if(!my_sperator) {
							var bar = control_element("bar");
							div.appendChild(bar);

							var arrow = control_element("arrow");
							div.appendChild(arrow);
							arrow.addEventListener("click", function() {MoveHandler(div, arrow)}, true);
						}
					} else {
						is_fail = true;
					}
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

		return element;
	}

	// Build elements
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
		} else if(item == "arrow") {
			var node1 = document.createElement("div");
			node1.setAttribute("class", "goog-inline-block goog-flat-button");
			node1.setAttribute("role", "button");
			node1.setAttribute("aria-expanded", "false");
			node1.setAttribute("aria-haspopup", "false");
			node1.setAttribute("aria-disabled", "false");
			node1.setAttribute("style", "transform: rotate(180deg);");
			node1.setAttribute("tabindex", "0");
			
			var node2 = document.createElement("div");
			node2.setAttribute("class", "punch-viewer-icon-large punch-viewer-options goog-inline-block");
			node2.setAttribute("style", "width: 14px;height: 50px;background: url(//i.imgur.com/EgMwR1u.png);");

			node1.appendChild(node2);
			element = node1;
		}

		return element;
	}

	// Moving Animation
	function MoveHandler(element, arrow) {
		var pos = element.style.left;
		pos = parseInt(pos.replace("px", "").replace("%", ""));
		var id = setInterval(frame, 5);
		var target_position = 0;
		var target_angle = "transform: rotate(0deg);";;
		var unit = 1 * direction;
		if(direction < 0) {
			target_position = -98;
		} else {
			target_position = 0;
			target_angle = "transform: rotate(180deg);";
		}

		function frame() {
			if (pos == target_position) {
				clearInterval(id);
				arrow.setAttribute("style", target_angle);
				direction *= -1;
			} else {
				pos += unit;
				element.style.left = pos + "%"; 
			}
		}
	}

	var start_button = document.getElementById("punch-start-presentation-left");
	if(start_button) {
		start_button.addEventListener("click", MouseDownHandler, true);
	}
	
})();
