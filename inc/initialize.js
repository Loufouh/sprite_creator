"use strict";

let canvas;

let displayImageDim = new Vector(0, 0);

let widthCanvasInput;
let heightCanvasInput;
let linkButtonCanvasDim;

let xImageInput;
let yImageInput;
let linkButtonImagePos;

let widthImageInput;
let heightImageInput;
let linkButtonImageDim;

let reinitDimImageButton;

let inputImage;

let currentImg = undefined;

window.onload = init;

function init() {
	initElements();
	declareListeners();
	draw();
}

function initElements() {
	initCanvas();
	initLinkButtons();
	
	widthCanvasInput = document.querySelector("#canvasWidth");
	heightCanvasInput = document.querySelector("#canvasHeight");
	linkButtonCanvasDim = document.querySelector("#linkCanvasDimensionsButton");

	xImageInput = document.querySelector("#imageX");
	yImageInput = document.querySelector("#imageY");
	linkButtonImagePos = document.querySelector("#linkImagePositionButton");

	widthImageInput = document.querySelector("#imageWidth");
	heightImageInput = document.querySelector("#imageHeight");
	linkButtonImageDim = document.querySelector("#linkImageDimensionsButton");
	reinitDimImageButton = document.querySelector("#imageReinitDimButton");

	inputImage = document.querySelector("#imageLoader");
}

function declareListeners() {
	inputImage.addEventListener("change", loadImage);

	widthCanvasInput.addEventListener("change", updateCanvasDim);
	heightCanvasInput.addEventListener("change", updateCanvasDim);

	xImageInput.addEventListener("change", updateDisplayImagePos);
	yImageInput.addEventListener("change", updateDisplayImagePos);

	widthImageInput.addEventListener("change", updateDisplayImageDim);
	heightImageInput.addEventListener("change", updateDisplayImageDim);

	reinitDimImageButton.addEventListener("click", () => {
		widthImageInput.value = currentImg.width;
		heightImageInput.value = currentImg.height;
		draw();
	});

	canvas.addEventListener("click", canvasLeftClick);
	canvas.addEventListener("contextmenu", canvasRightClick);
	canvas.addEventListener("mousemove", canvasOnMouseMove);
}

function initCanvas() {
	canvas = document.querySelector("#myCanvas");
	setTargetContext(canvas.getContext("2d"));

	canvas.width = canvas.height*1.618;
}

function initLinkButtons() {
	let linkButtons = document.querySelectorAll(".linkInputsButton");
	
	for(let button of linkButtons)
		button.addEventListener("click", function() {
			toggleClass(this, "off");
		});
}

function loadImage() {
	let blobURL = URL.createObjectURL(inputImage.files[0]);

	currentImg = new Image();
	currentImg.onload = function() {
		URL.revokeObjectURL(blobURL);
		xImageInput.value = 0;
		yImageInput.value = 0;
		widthImageInput.value = currentImg.width;
		heightImageInput.value = currentImg.height;
		widthCanvasInput.value = currentImg.width;
		heightCanvasInput.value = currentImg.height;
		updateCanvasDim(false);
		updateDisplayImagePos();
		updateDisplayImageDim(false);
	};
	currentImg.src = blobURL;
	inputImage.value = "";
}

function updateCanvasDim(respectLinkButton=true) {
	if(!linkButtonCanvasDim.classList.contains("off") && respectLinkButton) {
		let ratio = canvas.width/canvas.height;

		if(this === widthCanvasInput)
			heightCanvasInput.value = widthCanvasInput.value/ratio;
		else
			widthCanvasInput.value = heightCanvasInput.value*ratio;
	}
	canvas.width = (widthCanvasInput.value !== "" && parseInt(widthCanvasInput.value) > 0)? parseInt(widthCanvasInput.value): 700;
	canvas.height = (heightCanvasInput.value !== "" && parseInt(heightCanvasInput.value) > 0)? parseInt(heightCanvasInput.value): 350;
	draw();
}

function updateDisplayImagePos() {
	xImageInput.value = (xImageInput.value !== "")? parseInt(xImageInput.value): 0;
	yImageInput.value = (yImageInput.value !== "")? parseInt(yImageInput.value): 0;
	draw();
}

function updateDisplayImageDim(respectLinkButton=true) {
	if(linkButtonImageDim.classList.contains("off") && respectLinkButton) {
		let ratio = displayImageDim.x/displayImageDim.y;

		if(this === widthImageInput)
			heightImageInput.value = widthImageInput.value/ratio;
		else
			widthImageInput.value = heightImageInput.value*ratio;
	}
	displayImageDim.x = (widthImageInput.value !== "" && parseInt(widthImageInput.value) > 0)? parseInt(widthImageInput.value): displayImageDim.x;
	displayImageDim.y = (heightImageInput.value !== "" && parseInt(heightImageInput.value) > 0)? parseInt(heightImageInput.value): displayImageDim.y;
	draw();
}

function draw() {
	background(52);
	if(currentImg !== undefined)
		drawImage(currentImg, 0, 0, currentImg.width, currentImg.height, xImageInput.value, yImageInput.value, displayImageDim.x, displayImageDim.y);
}

