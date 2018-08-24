"use strict";

let canvas;

let widthImageInput;
let heightImageInput;

let widthCanvasInput;
let heightCanvasInput;
let reinitiateCanvasSizeButton;
let canvasSizeMultiplicator;

let xGridInput;
let yGridInput;

let xScaleInput;
let yScaleInput;

let xSeparatorInput;
let ySeparatorInput;

let inputImage;
let loadButton;

let currentImg = undefined;

window.onload = init;

function init() {
	initElements();
	declareListeners();
	background(52);
	inputImage.addEventListener("change", loadImage);
}

function initElements() {
	initCanvas();
	
	widthImageInput = document.querySelector("#imageWidth");
	heightImageInput = document.querySelector("#imageHeight");

	widthCanvasInput = document.querySelector("#canvasWidth");
	heightCanvasInput = document.querySelector("#canvasHeight");
	reinitiateCanvasSizeButton = document.querySelector("#reinitiateCanvasSizeButton");
	canvasSizeMultiplicator = document.querySelector("#canvasSizeMultiplicator");
	
	xGridInput = document.querySelector("#xGrid");
	yGridInput = document.querySelector("#yGrid");

	xScaleInput = document.querySelector("#xScale");
	yScaleInput = document.querySelector("#yScale");
	
	xSeparatorInput = document.querySelector("#xSeparator");
	ySeparatorInput = document.querySelector("#ySeparator");
	
	inputImage = document.querySelector("#imageLoader");
	loadButton = document.querySelector("#loadButton");
}

function declareListeners() {
	widthCanvasInput.addEventListener("change", draw);
	heightCanvasInput.addEventListener("change", draw);
	reinitiateCanvasSizeButton.addEventListener("click", function() {
		widthCanvasInput.value = widthImageInput.value;
		heightCanvasInput.value = heightImageInput.value;
		canvasSizeMultiplicator.value = 1;
		draw();
	});
	canvasSizeMultiplicator.addEventListener("change", draw);

	xGridInput.addEventListener("change", draw);
	yGridInput.addEventListener("change", draw);

	xScaleInput.addEventListener("change", draw);
	yScaleInput.addEventListener("change", draw);
	
	xSeparatorInput.addEventListener("change", draw);
	ySeparatorInput.addEventListener("change", draw);
	xSeparatorInput.addEventListener("change", draw);
	loadButton.addEventListener("click", loadImage);
}

function initCanvas() {
	canvas = document.querySelector("#myCanvas");
	setTargetContext(canvas.getContext("2d"));

	canvas.width = canvas.height*1.618;
}

function loadImage() {
	let blobURL = URL.createObjectURL(inputImage.files[0]);

	currentImg = new Image();
	currentImg.onload = function() {
		URL.revokeObjectURL(blobURL);
		widthImageInput.value = currentImg.width;
		heightImageInput.value = currentImg.height;
		widthCanvasInput.value = currentImg.width;
		heightCanvasInput.value = currentImg.height;
		draw();
	};
	currentImg.src = blobURL;


}

function draw() {
	if(currentImg != undefined) {
		let gridX = (xGridInput.value !== "")? parseInt(xGridInput.value) : 0;
		let gridY = (yGridInput.value !== "")? parseInt(yGridInput.value) : 0;
	
		let scaleX = (xScaleInput.value !== "" && parseInt(xScaleInput.value) > 0)? parseInt(xScaleInput.value) : 10;
		let scaleY = (yScaleInput.value !== "" && parseInt(yScaleInput.value) > 0)? parseInt(yScaleInput.value) : 10;
	
		let separatorX = (xSeparatorInput.value !== "" && parseInt(xSeparatorInput.value) >= 0)? parseInt(xSeparatorInput.value) : 0;
		let separatorY = (ySeparatorInput.value !== "" && parseInt(ySeparatorInput.value) >= 0)? parseInt(ySeparatorInput.value) : 0;
	
		if(canvasSizeMultiplicator.value !== "") {
			canvas.width = parseInt(canvasSizeMultiplicator.value)*currentImg.width;
			canvas.height = parseInt(canvasSizeMultiplicator.value)*currentImg.height;
		
			widthCanvasInput.value = canvas.width;
			heightCanvasInput.value = canvas.height;
		}
	
		canvas.width = (widthCanvasInput.value !== "" && parseInt(widthCanvasInput.value) > 0)? parseInt(widthCanvasInput.value): 700;
		canvas.height = (heightCanvasInput.value !== "" && parseInt(heightCanvasInput.value) > 0)? parseInt(heightCanvasInput.value): 350;
		
		drawImage(currentImg, 0, 0, currentImg.width, currentImg.height, 0, 0, canvas.width, canvas.height);
	
		stroke(0);
		strokeWeight(1);
	
		grid(new Vector(gridX, gridY),
		     new Vector(scaleX, scaleY),
		     new Vector(separatorX, separatorY),
		     new Vector(canvas.width, canvas.height));
	} else {
		background(52);
	}
}


