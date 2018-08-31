"use strict";

let sprites = [];

function addSprite() {
	let img = new Image();
	img.src = canvas.toDataURL("image/png");

	sprites.push(img);
	currentImg = undefined
	draw();
	updateSpritesPreview();
}

function updateSpritesPreview() {
	spriteList.innerHTML = "";

	for(let i = 0; i < sprites.length; i++) {
		spriteList.insertAdjacentHTML("beforeend", "<li><img src='" + sprites[i].src + "'></li>");
	}
}

function generateSpriteSheet() {
	if(sprites.length <= 0)
		return error("Aucun sprite n'a été ajouté", undefined, alert);
	currentImg = undefined;

	widthCanvasInput.value = 5 + sprites.length*(5 + sprites[0].width);
	heightCanvasInput.value = sprites[0].height;

	background(new Color(100, 100, 255));	

	for(let i = 5; i < sprites.length; i+= sprites[0] + 5 ) {
		drawImg(sprites[i], i, 5, sprites[i].width, sprites[i].height)
	}
}
