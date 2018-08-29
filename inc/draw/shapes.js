"use strict";

let targetContext;

function setTargetContext(ctx) {
	targetContext = ctx;
}

function strokeWeight(weight, ctx=targetContext) {
	ctx.lineWidth = weight;
}

function border(color, ctx=targetContext) {
	noFill();
	stroke(color, ctx);
	rect(0, 0, ctx.canvas.width, ctx.canvas.height, ctx);
}

function circle(xCenter, yCenter, radius, ctx=targetContext) {
	arc(xCenter, yCenter, radius, 0, 2*Math.PI, false, ctx);
}

function arc(xCenter, yCenter, radius, startAngle, stopAngle, counterClockwise=false, ctx=targetContext) {
	ctx.beginPath();
	ctx.arc(xCenter, yCenter, radius, startAngle, stopAngle);
	ctx.closePath();
	drawShape(ctx);
}

function rect(xLeft, yTop, width, height, ctx=targetContext) {
	ctx.beginPath();
	ctx.rect(xLeft, yTop, width, height);
	ctx.closePath();
	drawShape(ctx);
}

function grid(pos, scales, separators, dimensions) {
	for(let i = pos.x ; i <= (pos.x + dimensions.x); i += scales.x) {
		line(i, pos.y, i, (pos.y + dimensions.y));
		i += separators.x;
		line(i, pos.y, i, (pos.y + dimensions.y));
	}

	for(let j = pos.y ; j <= (pos.y + dimensions.y); j += scales.y) {
		line(pos.x, j, (pos.x + dimensions.x), j);
		j += separators.y;
		line(pos.x, j, (pos.x + dimensions.x), j);
	}
}

function line(x1, y1, x2, y2, ctx=targetContext) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	drawShape(ctx);
}


function drawImage(img, sx, sy, sWidth=img.width, sHeight=img.height, dx, dy, dWidth, dHeight, ctx=targetContext) {
	if(dx === undefined) {
		ctx.drawImage(img, sx, sy, sWidth, sHeight);
	} else {
		ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}
}

