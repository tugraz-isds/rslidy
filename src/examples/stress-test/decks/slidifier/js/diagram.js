var gridSize = 10;
var lineDistance = 2.0;

var scale = function(coord) {
	if (coord[0] == undefined) { // Single argument, not array
		return coord * gridSize;
	}

	return [coord[0] * gridSize, coord[1] * gridSize * lineDistance];
}

var drawLine = function(from, to) {
	if (!from || !to) {
		console.log("ERROR while drawing line");
		return;
	}

	from[0] += 0.5;
	from[1] += 0.5;
	to[0] += 0.5;
	to[1] += 0.5;

	from = scale(from); to = scale(to);

	window.paper.line(from[0], from[1], to[0], to[1]).attr({"strokeWidth": 1.5, stroke: "#222"});
}

var drawBox = function(from, to) {
	// We pad the box a little so that the text fits all the time
	from = [from[0] + 0.5, from[1] - 0.1];
	to = [to[0] + 0.5, to[1] + 1.0 + 0.1];
	
	from = scale(from); to = scale(to);
	window.paper.rect(from[0], from[1], to[0]-from[0], to[1]-from[1], 3).attr({"fill": "#FFFFFF", strokeWidth: 1.5, stroke: "#222"});
}

var drawText = function(start, content) {
	start = [start[0], start[1] + 0.5 + 0.25];
	start = scale(start);
	var label = window.paper.text(start[0], start[1], content).attr({
	 	"font-size": scale(1.8), 
	 	"font-family": "consolas, monospace", 
	 	'text-anchor': 'start'
	 });
}

var addPadding = function(input) {
	for (var i in input) {
		input[i] = " " + input[i] + " ";
	}
	input.push(" ");
	input.unshift(" ");
}

var calculateCanvasSize = function(input) {
	var longestLine = 0;
	for (var i in input) {
		var length = input[i].length;
		longestLine = length > longestLine ? length : longestLine;
	}

	var canvasSize = [longestLine, input.length];
	canvasSize = scale(canvasSize);
	return canvasSize;
}

var trim = function(list) {
	if (list[0] && list[0].trim().length == 0) list.shift();
	if (list.length > 0 && list[list.length-1].trim().length == 0) list.pop();
}

var drawDiagram = function(sourceCode, canvasId) {
	sourceCode = sourceCode.replace(/\t/g, "    ");
	var input = sourceCode.split("\n");
	trim(input);

	addPadding(input); // For boxes at edge of canvas

	var canvasSize = calculateCanvasSize(input);

    window.paper = Snap(canvasId).attr({
		width: canvasSize[0],
		height: canvasSize[1]
	});

	var boxes = [];
	var texts = [];
	var lines = {}

	var getCharacter = function(coord) {
		var line = input[coord[1]];
		if (input[coord[1]] == undefined) return "";
		var character = input[coord[1]][coord[0]];
		if (character == undefined) return "";

		return input[coord[1]][coord[0]];
	}

	var getSubstring = function(line, start, endRegex) {
		var rest = line.substring(start);
		var end = rest.search(endRegex);
		if (end == -1) {
			return line.substring(start);
		} else {
			return line.substring(start, start + end);	
		}
	}

	var addLineEnd = function(coord) {
		var char0 = getCharacter([coord[0], coord[1]]);
		var charA = getCharacter([coord[0]+1, coord[1]]);
		var charB = getCharacter([coord[0]+2, coord[1]]);

		var lineEnd = [coord[0], coord[1]];

		if (char0 == "*") {
			var lineIndex = charA;
			if (charB.match(/[0-9]/)) lineIndex += charB;
		} else {
			lineEnd[0] += 1;
			var lineIndex = char0;
			if (charA.match(/[0-9]/)) {
				lineIndex += charA;
				lineEnd[0] += 1;
			}
		}

		lines[lineIndex] = lines[lineIndex] || [];
		lines[lineIndex].push(lineEnd);

		return lineIndex.length + 1;
	}

	var addText = function(coord) {
		var text = getSubstring(input[coord[1]], coord[0], /  |\]|\[|\*[0-9]+|[0-9]+\*/);
		texts.push({coord: coord, content: text});
		return text.length;
	}

	var addBox = function(coord) {
		var text = getSubstring(input[coord[1]], coord[0], /]/);
		var endX = coord[0] + text.length;
		var endY = coord[1];
		for (var y = coord[1]; y < input.length; y++) {
			endY = y
			if (getCharacter([coord[0], y+1]) != "[") {
				break;
			}
		}

		boxes.push([coord, [endX, endY]]);
	}

	/*
	// Tests
	console.log(getSubstring("      my text here     other here", 6, "  "));
	console.log(getSubstring("      my text here     other here", 23, "  "));
	console.log(getSubstring("      [  my text here  ]", 6, "]"));
	console.log(getSubstring("      *42    ", 6, " "));
	console.log(getSubstring("      *14", 6, " "));
	*/

	var isBoxTopLeft = function(coord) {
		var char0 = getCharacter(coord);
		var char1 = getCharacter([coord[0], coord[1]-1]);
		return char0 == "[" && char1 != "[";
	}

	var isTextStart = function(coord) {
		var char0 = getCharacter(coord);

		return !char0.match(/[ \[\]]/);
	}

	///*
	function testIsTextStart(string) {
		var getCharacterOld = getCharacter;
		getCharacter = function(coord) {
			return string[coord[0]];
		}
		var result = isTextStart([2, 0]);
		getCharacter = getCharacterOld;
		return result;
	}

	console.log(testIsTextStart("* ser") == true);
	console.log(testIsTextStart("2 ser") == true);
	console.log(testIsTextStart("  * a") == true);
	console.log(testIsTextStart("] * a") == true);
	console.log(testIsTextStart("2*a  ") == true); 
	console.log(testIsTextStart(" ]a  ") == true);
	console.log(testIsTextStart("] a  ") == true);
	console.log(testIsTextStart("a]a  ") == true);
	console.log(testIsTextStart("1*aaa") == true);
	console.log(testIsTextStart("] ser") == true);
	console.log(testIsTextStart("1*ser") == true);
	console.log("--");
	console.log(testIsTextStart("  *2 ") == false);
	console.log(testIsTextStart("  *31") == false);
	console.log(testIsTextStart("21*  ") == false);
	console.log(testIsTextStart("a * a") == false);
	console.log(testIsTextStart(" *2  ") == false);
	console.log(testIsTextStart("a   a") == false);
	console.log(testIsTextStart("a a a") == false);
	console.log(testIsTextStart("aaaaa") == false);
	console.log(testIsTextStart("21*aa") == false);
	console.log(testIsTextStart("  31*") == false);
	//*/

	var isLineEnd = function(coord) {
		var char0 = getCharacter([coord[0], coord[1]]);
		var charA = getCharacter([coord[0]+1, coord[1]]);
		var charB = getCharacter([coord[0]+2, coord[1]]);

		var char0Num = !!char0.match(/[0-9]/);
		var charANum = !!charA.match(/[0-9]/);

		if (char0 == "*") return charANum;

		if (char0Num) {
			if (charA == "*") return true;
			else if (charANum && charB == "*") return true;
		}

		return false;
	}

	for (var y = 0; y < input.length; y++) {
		var line = input[y];
			var lastX = -1;
		for (var x = 0; x < line.length; x++) {
			var coord = [x, y];

				if (lastX == x) break;
				lastX = x;

			if (isLineEnd(coord)) {
				x += addLineEnd(coord) - 1;
			} else if (isBoxTopLeft(coord)) {
				addBox(coord);
			} else if (isTextStart(coord)) {
				x += addText(coord) - 1;
			}
		}
	}

	console.log("Boxes", boxes);
	console.log("Lines", lines);
	console.log("Texts", texts);

	for (var i in boxes) {
		drawBox(boxes[i][0], boxes[i][1]);
	}

	for (var i in lines) {
    	drawLine(lines[i][0], lines[i][1]);
	}

	for (var i in texts) {
		drawText(texts[i].coord, texts[i].content);
	}
}