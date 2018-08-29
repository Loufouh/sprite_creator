"use strict";

let isFirstClicked = true;
let firstClickPos;

function canvasLeftClick(evt) {
	let rect = evt.target.getBoundingClientRect();
	let clickPos = new Vector(evt.clientX - rect.left, evt.clientY - rect.top);

	if(!isFirstClicked) {
		if(firstClickPos == undefined)
			return error("Enter in second click part but firstClickPos is undefined");

		xImageInput.value -= (firstClickPos.x < clickPos.x)? firstClickPos.x : clickPos.x;
		yImageInput.value -= (firstClickPos.y < clickPos.y)? firstClickPos.y : clickPos.y;

		widthCanvasInput.value = Math.abs(clickPos.x - firstClickPos.x);
		heightCanvasInput.value = Math.abs(clickPos.y - firstClickPos.y);
		updateCanvasDim(false);
		
	} else {
		firstClickPos = clickPos;
	}

	isFirstClicked = 1 - isFirstClicked;
}

function canvasRightClick() {
	isFirstClicked = false;
}

function canvasOnMouseMove(evt) {
	let rect = evt.target.getBoundingClientRect();
	let clickPos = new Vector(evt.clientX - rect.left, evt.clientY - rect.top);

	if(!isFirstClicked) {
		let rectPos = new Vector();
		let rectDim = new Vector(Math.abs(firstClickPos.x - clickPos.x), Math.abs(firstClickPos.y - clickPos.y));

		rectPos.x = (clickPos.x < firstClickPos.x)? clickPos.x : firstClickPos.x;
		rectPos.y = (clickPos.y < firstClickPos.y)? clickPos.y : firstClickPos.y;

		draw();
		noFill();
		stroke(new Color(255, 255, 150));

		targetContext.beginPath();
		targetContext.rect(rectPos.x, rectPos.y, rectDim.x, rectDim.y);
		targetContext.closePath();
		drawShape(targetContext);
		console.log(firstClickPos.x + " ; " + firstClickPos.y)

	}
}
