var ui = (function() {
	var refreshed = true;
	var themeDom;
	
	function refresh() {
		refreshed = false;
		ui.slideCounter = Math.max(ui.slideCounter, 0);
		ui.slideCounter = Math.min(ui.slideCounter, ui.slides.length-1);
		
		$('#slidecounter').html(parseInt(ui.slideCounter+1) + "/" + (ui.slides.length-1));
		
		if (ui.slideCounter == ui.slides.length-1) {
			$('#slidecounter').hide();
			$('#slide').addClass('endofshow');
		} else {
			$('#slidecounter').show();
			$('#slide').removeClass('endofshow');
		}
		
		$('#slidecontent').fadeOut(10, function() {
			$('#slidecontent').html(ui.slides[ui.slideCounter]);
			prettyPrint();
			renderDiagrams();
			$('#slidecontent').fadeIn(300, function() {
				refreshed = true;
			});
		});
	}
	
	function renderDiagrams() {
		$(".diagramSource").each(function() {
			var svgLink = $(this).attr("x-svgLink");
			drawDiagram($(this).val(), "#" + svgLink);
		});
	}
	
	function updateClock() {
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		hours = (hours < 10 ? "0" : "") + hours;
		minutes = (minutes < 10 ? "0" : "") + minutes;
		$('#clock').html(hours + ":" + minutes);
	}
	
	function slideForward() {
		if (ui.slideCounter < ui.slides.length-1) {
			ui.slideCounter++;
			refresh();
		}
	}
	
	function slideBackward() {
		if (ui.slideCounter > 0) {
			ui.slideCounter--;
			refresh();
		}
	}
	
	function loadTheme() {
		themeName = $("input[@name='theme']:checked").val();	
		var head = document.getElementsByTagName('head')[0];
		
		if(themeDom !== undefined) {
			head.removeChild(themeDom);
		}
		
		themeDom = document.createElement('link');
		themeDom.setAttribute("rel", "stylesheet");
		themeDom.setAttribute("type", "text/css");
		themeDom.setAttribute("href", "css/themes/" + themeName + "/theme.css");
		head.appendChild(themeDom);
	}
	
	function init() {
		$(document).keydown(function(e) {
			if (refreshed && $("#slide").is(':visible')) {
				if (e.keyCode == 37) {
					slideBackward();
					return false;
				}
				if (e.keyCode == 39) {
					slideForward();
					return false;
				}
				if (e.keyCode == 27) {
					$("#slide").hide();
					$("#slideEdit").show();
				}
			}
		});
		
		$(document).mousedown(function(e) {
			if (e.target.tagName.toLowerCase() != "a" && e.which == 1 && $("#slide").is(':visible')) {
				if (e.pageX / window.innerWidth < 0.15) {
					slideBackward();
				} else {
					slideForward();
				}
				e.preventDefault();
			}
		});
		
		$(document).bind('touchstart', function(event) {
			if ($("#slide").is(':visible')) {
				if (event.originalEvent.targetTouches[0].pageX < window.innerWidth/2) {
					slideBackward();
					event.preventDefault();
				} else {
					slideForward();
					event.preventDefault();
				}
			}
		});
	};
	
	return {
		loadTheme: loadTheme,
		refresh: refresh,
		init: init,
		updateClock: updateClock,
		slideCounter: undefined,
		slides: undefined
	};
})();
