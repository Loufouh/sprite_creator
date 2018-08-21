"use strict";

let isStroking = true;
let isFilling = true;

function fill(color, ctx=targetContext) {
	if( !(color instanceof Color) )
		color = new Color(color);

	ctx.fillStyle = color.toString();
	isFilling = true;
}

function stroke(color, ctx=targetContext) {
	if( !(color instanceof Color) )
		color = new Color(color);

	ctx.strokeStyle = color.toString();
	isStroking = true;
}

function background(color, ctx=targetContext) {
	fill(color, ctx);
	noStroke();
	rect(0, 0, ctx.canvas.width, ctx.canvas.height, ctx);
}

function noFill() {
	isFilling = false;
}

function noStroke() {
	isStroking = false;
}

function lineCap(type, ctx=targetContext) {
	ctx.lineCap = type;
}

function drawShape(ctx=targetContext) {
	if(isFilling)
		ctx.fill();
	if(isStroking)
		ctx.stroke();
}

