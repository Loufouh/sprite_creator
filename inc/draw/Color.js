"use strict";

class Color {
	constructor(r, g=r, b=g, a=1) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toString() {
		return "rgba(" + this.r + "," + this.g + "," + this.b + ", " + this.a + ")";
	}
}
