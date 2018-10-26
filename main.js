function linspace(a, b, n) {
	var x = new Array(n);
	for (var i = 0; i < n; i++) {
		x[i] = 1*a + (i * ((b - a)/(n - 1)));
	}
	return x;
}

function summation(u) {
	var y = 0;
	for (var i = 0; i < u.length; i++) {
		y = u[i] + y; 
	}
	return y;
}


function integrate(f, a, b, n) {
    x = linspace(a, b, n);
    y = new Array(n);
    for (var i = 0; i < n; i++) {
    	y[i] = f(x[i]);
    }
    integral = summation(y)*(b-a)/n;
    return integral;
}

function area(f, a, b, n) {
    x = linspace(a, b, n);
    y = new Array(n);
    for (var i = 0; i < n; i++) {
    	y[i] = Math.abs(f(x[i]));
    }
    region = summation(y)*(b-a)/n;
    return region;
}

function x_centroid(f, a, b, n) {
    x = linspace(a, b, n);
    x_coord = (1/(area(f, a, b, n)))*integrate(function (x) {return x*f(x)}, a, b, n);
    return x_coord;
}

function vertical_vol(f, l, a, b, n){
    x = linspace(a, b, n);
    volume = (Math.abs(area(f, a, b, n)))*Math.abs(l -(x_centroid(f, a, b, n)))*2*Math.PI;
    return volume;
}    


function horizontal_vol(f, l, a, b, n){
	x = linspace(a, b, n);
	volume = (integrate(function (x) {return Math.pow((f(x)), 2)}, a, b, n)*Math.PI);
	return volume
}


function horizontal_vol_1(f, l, a, b, n){
	x = linspace(a, b, n);
	volume = ((b - a) * Math.PI * Math.pow(Math.abs(l - f(a)), 2)) - (integrate(function (x) {return Math.pow(l - f(x),2)}, a, b, n)*Math.PI);
	return volume;
}

function horizontal_vol_2(f, l, a, b, n){
	volume = ((b - a) * Math.PI * Math.pow(Math.abs(l - f(b)), 2)) - (integrate(function (x) {return Math.pow(l - f(x),2)}, a, b, n)*Math.PI);
	return volume;
}



function final_step() {
	var f = function (x) {return eval(document.getElementById("function").value)};
	var a = document.getElementById("x_min").value;
	var b = document.getElementById("x_max").value;
	var l = document.getElementById("x_line").value;
	n = 100000
	var unrounded = vertical_vol(f, l, a, b, n);
	var not_rounded = horizontal_vol_1(f, l, a, b, n);
	var not_quite_rounded = horizontal_vol_2(f, l, a, b, n);
	var almost_right = horizontal_vol(f, l, a, b, n);

	if (document.getElementById("horizontal").checked && l == 0){
		document.getElementById('answer').innerHTML = Math.round(horizontal_vol(f, l, a, b, n) * 1000)/1000
	}else if (document.getElementById("horizontal").checked && Math.abs(l - f(a)) < Math.abs(l - f(b))){
		document.getElementById('answer').innerHTML = Math.round(not_quite_rounded * 1000)/1000
	}else if (document.getElementById("vertical").checked){
		document.getElementById('answer').innerHTML = Math.round(unrounded * 1000)/1000
	}else if (document.getElementById("horizontal").checked && Math.abs(l - f(a)) > Math.abs(l - f(b))){
		document.getElementById('answer').innerHTML = Math.round(not_rounded * 1000)/1000
	
	}

}

var danger_string = '3';
console.log(vertical_vol(function (x) {return eval(danger_string)}, 0, 4, 5, 1000000))

var angry_string = 'x';
console.log(horizontal_vol(function (x) {return eval(angry_string)}, 0, 4, 5, 1000000))

console.log(linspace(4,5, 10))