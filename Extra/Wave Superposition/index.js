let c11 = document.querySelector("#c1");
let c22 = document.querySelector("#c2");
let c33 = document.querySelector("#c3");
let div = document.querySelector("#container");
let c1 = c11.getContext('2d');
let c2 = c22.getContext('2d');
let c3 = c33.getContext('2d');
let c1radio = document.querySelectorAll('input[name="typec1"]');
let c2radio = document.querySelectorAll('input[name="typec2"]');
let wav = document.querySelectorAll(".wavelength");;
let amp = document.querySelectorAll(".amplitude");
let pixelDensity = 1;
c33.height = window.innerHeight / 3 * 2;
c11.height = window.innerHeight / 3;
c22.height = c11.height;
c33.style.height = c33.height + "px";
c11.style.height = c11.height + "px";
c22.style.height = c11.height + "px";
c33.height = c33.height * pixelDensity;
c22.height = c22.height * pixelDensity;
c11.height = c11.height * pixelDensity;
c33.width = c33.width * pixelDensity;
c22.width = c22.width * pixelDensity;
c11.width = c11.width * pixelDensity;
let p1 = 0, p2 = 0, z= 0, c = 0, tmp1, tmp2;
let func1 = function(){};
let func2 = function(){};
let amplitudec1, amplitudec2, wavelengthc1, wavelengthc2, exit = false;
function animate()
{
	amplitudec1 = amp[0].value;
	amplitudec2 = amp[1].value;
	wavelengthc1 = wav[0].value;
	wavelengthc2 = wav[1].value;
	base = c11.height / 2;
	let r = Math.floor((Math.sin(p1) + 1)* 128);
	let b = Math.floor((Math.cos(p1 + Math.PI / 2) + 1) * 128);
	let g = Math.floor((Math.sin(p2) + 1) * 128);
	if(c1radio[0].checked === true)
		func1 = Math.sin;
	else if(c1radio[1].checked == true)
		func1 = Math.cos;
	else func1 = Math.tan;
	if(c2radio[0].checked === true)
		func2 = Math.sin;
	else if(c2radio[1].checked == true)
		func2 = Math.cos;
	else func2 = Math.tan;
	c1.strokeStyle = "rgb(" + r + "," + b + "," + g + ")";
	c1.fillStyle = "rgba(0,0,0,0.05)"
	c1.fillRect(0,0,c11.width,c11.height);
	c1.beginPath();
	c1.moveTo(0, base + func1(c) * amplitudec1);
	c2.strokeStyle = "rgb(" + r + "," + b + "," + g + ")";
	c2.fillStyle = "rgba(0,0,0,0.05)"
	c2.fillRect(0,0,c22.width,c22.height);
	c2.beginPath();
	c2.moveTo(0, base + func2(c) * amplitudec2);
	c3.strokeStyle = "rgb(" + r + "," + b + "," + g + ")";
	c3.fillStyle = "rgba(0,0,0,0.05)"
	c3.fillRect(0,0,c33.width,c33.height);
	c3.beginPath();
	c3.moveTo(0, base + func1(c) * amplitudec1 + func2(c) * amplitudec2);
	for(let i = 0; i < c11.width; i++)
	{
		tmp1 = pixelDensity * func1(i / wavelengthc1 + c) * amplitudec1;
		tmp2 = pixelDensity * func2(i / wavelengthc2 + c) * amplitudec2;
		c1.lineTo(i, base + tmp1);
		c2.lineTo(i, base + tmp2);
		c3.lineTo(i, c33.height / 2 + tmp1 + tmp2);
	}
	let xx = 0;
	c1.stroke();
	c1.closePath();
	c2.stroke();
	c2.closePath();
	c3.stroke();
	c3.closePath();
	c += 0.05;
	z += 0.03;
	p2 += 0.05;
	p1 += 0.03;
	if(c > 2 * Math.PI) c -= 2 * Math.PI;
	if(exit) return;
	requestAnimationFrame(animate);
}

window.addEventListener("resize",function () {
	c33.height = window.innerHeight / 3 * 2;
	c11.height = window.innerHeight / 3;
	c22.height = c11.height;
	c33.style.height = c33.height + "px";
	c11.style.height = c11.height + "px";
	c22.style.height = c11.height + "px";
	c33.height = c33.height * pixelDensity;
	c22.height = c22.height * pixelDensity;
	c11.height = c11.height * pixelDensity;
	c33.width = c33.width * pixelDensity;
	c22.width = c22.width * pixelDensity;
	c11.width = c11.width * pixelDensity;
});

let canvas = document.querySelectorAll("canvas");
for(let i = 0; i < canvas.length; i++)
{
	canvas[i].addEventListener("click", function() {
		exit = !exit;
		if(exit === false) animate();	
	});
}
let infobox = document.querySelector("#info");
let clsbtn = document.querySelector("#info button");
let infobutton = document.querySelector("button.info");
infobutton.addEventListener("click", function(){
		infobox.style.height = "100vh";
		clsbtn.style.display = "block";
		infobutton.style.display = "none";
});	

clsbtn.addEventListener("click", function(){
		infobox.style.height = "0";
		infobutton.style.display = "block";
		clsbtn.style.display = "none";
});	

animate();


