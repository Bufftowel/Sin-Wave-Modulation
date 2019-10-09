let canvas = document.querySelector("canvas");
let div = document.querySelector("#container");
canvas.width = div.offsetWidth;
canvas.height = div.offsetHeight;
let ctx = canvas.getContext("2d");
let c = 0, z = 0, base, amplitude, wavelength, slider1 = document.querySelector("#amp");
let slider2 =  document.querySelector("#wavelength"), slider3 = document.querySelector("#base");
let slider4 = document.querySelector("#lineWidth");
slider1.value = 100;
slider1.min= 0;
slider1.max = canvas.height / 2;
slider2.value = canvas.width / 12;
slider2.min= 1;
slider2.max = 500;
slider3.value = canvas.height / 2;
slider3.min = 0	;
slider3.max = canvas.height;
let exit = false;
let effect = 1;
let radio = document.querySelectorAll(".effects input");
let lineWidth = 1;
let period1 = Math.random() * Math.PI * 2;
let period2 = Math.random() * Math.PI * 2;
function animate()
{
	if(radio[0].checked == true) effect = 1;
	else if(radio[1].checked == true) effect = Math.sin(c);
	else if(radio[2].checked == true) effect = Math.tan(z);
	else effect = 1 / Math.sin(c);
	amplitude = Number(slider1.value) * effect;
	wavelength = Number(slider2.value);
	base = Number(slider3.value);
	ctx.lineWidth = Number(slider4.value);
	let r = Math.floor((Math.sin(period1) + 1)* 128);
	let b = Math.floor((Math.cos(period1 + Math.PI / 2) + 1) * 128);
	let g = Math.floor((Math.sin(period2) + 1) * 128);
	ctx.strokeStyle = "rgb(" + r + "," + b + "," + g + ")";
	ctx.fillStyle = "rgba(0,0,0,0.05)"
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.beginPath();
	ctx.moveTo(0, base + Math.sin(c) * amplitude);
	for(let i = 0; i < canvas.width; i++)
	{
		ctx.lineTo(i, base + Math.sin(i / wavelength + c) * amplitude);
	}
	ctx.stroke();
	ctx.closePath();
	c += 0.05;
	z += 0.03;
	period2 += 0.05;
	period1 += 0.03;
	if(c > 2 * Math.PI) c -= 2 * Math.PI;
	if(exit) return;
	requestAnimationFrame(animate);
}
animate();
document.querySelector("button.play-btn").addEventListener("click", () => {exit = !exit; if(!exit) animate();});
window.addEventListener("resize", () => {
	canvas.width = div.offsetWidth;
	canvas.height = div.offsetHeight;
	slider1.max = canvas.height / 2;
	slider3.value = canvas.height / 2;
	slider3.max = canvas.height;
})
let play_btn = document.querySelector("button.play-btn");
let play_btn_span = document.querySelector("button.play-btn span.play-btn");
play_btn.addEventListener("click", function() {
	play_btn_span.classList.toggle("selected-play-btn");
})