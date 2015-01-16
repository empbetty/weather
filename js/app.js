var dropplace;
var src;
var temperature;
var waiting=0;
var cloud;
var tested=0;

function begin() {
	// parcel["div1parcel"] = document.getElementById("parcel1");
	// parcel["div2parcel"] = document.getElementById("parcel2");
	// parcel["div3parcel"] = document.getElementById("parcel3");
	// parcel["div4parcel"] = document.getElementById("parcel4");
	// parcel["div5parcel"] = document.getElementById("parcel5");
	// parcel["div6parcel"] = document.getElementById("parcel6");
}

// functions for drag and drop
function allowDrop(ev) {
    ev.preventDefault();
    // atmotemp = document.getElementsByClassName("atmotemp");
    // for (i=0; i<atmotemp.length; i++) {
    // 	atmotemp[i].style.visibility='visible';
    // }
    // divider = document.getElementsByClassName("divider");
    // for (i=0; i<divider.length; i++) {
    // 	divider[i].style.visibility='visible';
    // }
}

function drag(ev) {

}

function drop(ev) {
    ev.preventDefault();
    var newimage = document.getElementById("parcel");
    if (ev.target.className == "div") {
        var id = (ev.target.id);
        dropplace = id;
        var imageToReplace = document.getElementById(id);
        newimage.style.position = "relative";
        newimage.style.left = "600px";
        newimage.style.top = "-99px";
        imageToReplace.appendChild(newimage);
        atmotemp = document.getElementsByClassName("atmotemp");
    }
    // for (i=0; i<atmotemp.length; i++) {
    //     atmotemp[i].style.visibility='hidden';
    // }
    // divider = document.getElementsByClassName("divider");
    // for (i=0; i<divider.length; i++) {
    //     divider[i].style.visibility='hidden';
    // }
}

function dragLeave(ev) {
	// for (i=0; i<atmotemp.length; i++) {
 //    	atmotemp[i].style.visibility='hidden';
 //    }
 //    divider = document.getElementsByClassName("divider");
 //    for (i=0; i<divider.length; i++) {
 //    	divider[i].style.visibility='hidden';
 //    }
}

function gen() {
    if (parcel.parentNode.id != "panel") {
        alert("Please reset then generate!")
    } else {
        var moisture = document.getElementById("moisture").value;
        var temp = document.getElementById("temp").value;
        var parcelpic = document.getElementById("parcelpic");
        if (moisture == 0) {
            src = "image/none.png";
        } else if (moisture == 1) {
            src = "image/low.png";
        } else if (moisture == 2) {
            src = "image/medium.png";
        } else {
            src = "image/high.png";
        }
        parcelpic.src = src;
        temperature = temp + "°C";
        document.getElementById("temptext").innerHTML = temperature;
        parcelpic.setAttribute('draggable', true);
        $("#moisture").slider("disable");
        $("#temp").slider("disable");
    }
}

function reset() {
    if (waiting == 1) {
        alert("Please wait for the test result!");
    } else {
        var parcel = document.getElementById("parcel");
        $("#moisture").val(0).slider("refresh");
        $("#temp").val(0).slider("refresh");
        parcel.childNodes[1].src = "image/parcel.png";
        parcel.childNodes[1].style.width = '90px';
        parcel.childNodes[1].style.height = '90px';
        parcel.childNodes[1].id = 'parcelpic';
        parcel.childNodes[1].setAttribute('draggable', false);
        parcel.childNodes[1].style.position='static';
        parcel.childNodes[1].style.top='auto';
        parcel.childNodes[1].style.left='auto';
        document.getElementById("temptext").innerHTML = null;
        if (parcel.parentNode.id != "panel") {
            parcel.style.position = 'relative';
            parcel.style.left = '59px';
            parcel.style.top = '-365px';
            document.getElementById("panel").appendChild(parcel);
        }
        tested = 0;
        $("#moisture").slider("enable");
        $("#temp").slider("enable");
    }
}

function test() {
    if (tested == 0) {
        if (waiting == 1) {
            alert("Please wait for the test result!");
        } else {
            var parcel = document.getElementById("parcel");
            if (parcel.parentNode.id == "panel") {
                alert('Please generate an air parcel and drag it to the atmosphere!');
            } else {
                waiting=1;
                var weather = level();
                if (weather != 0) {
                    // make arrows
                    var arrow0=document.createElement("img");
                    arrow0.src = "image/arrow0.png";
                    arrow0.style.width = '143px';
                    arrow0.style.height = '76.7px';
                    arrow0.setAttribute('draggable', false);
                    arrow0.style.position = 'relative';
                    arrow0.style.left = '-27px';
                    arrow0.style.top = '-134px';
                    var arrow=document.createElement("img");
                    arrow.src = "image/arrow.png";
                    arrow.style.width = '165px';
                    arrow.style.height = '88.5px';
                    arrow.setAttribute('draggable', false);
                    arrow.style.position = 'relative';
                    arrow.style.left = '-41px';
                    arrow.style.top = '-143px';

                    // wiggling
                    parcel.appendChild(arrow0);
                    setTimeout(function()
                    {
                        parcel.replaceChild(arrow, arrow0);
                        setTimeout(function()
                        {
                            parcel.replaceChild(arrow0, arrow);
                            setTimeout(function()
                            {
                                parcel.replaceChild(arrow, arrow0);
                                setTimeout(function()
                                {
                                    parcel.replaceChild(arrow0, arrow);
                                    setTimeout(function()
                                    {
                                        parcel.replaceChild(arrow, arrow0);

                                        // cloud
                                        if (weather == 1) {
                                            var cloud=document.createElement("img");
                                            cloud.src = "image/cloud.png";
                                            cloud.style.width = '110px';
                                            cloud.style.height = '66px';
                                            cloud.setAttribute('draggable', false);
                                            cloud.style.position = 'relative';
                                            cloud.style.top = '10px';
                                            cloud.style.left = '-10px';
                                            setTimeout(function()
                                            {
                                                parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                document.getElementById("temptext").innerHTML = null;
                                                parcel.removeChild(parcel.childNodes[5]);
                                                waiting=0;
                                                tested=1;
                                            }, 600);
                                        // larger cloud
                                        } else if (weather == 2) {
                                            var cloud0=document.createElement("img");
                                            cloud0.src = "image/cloud0.png";
                                            cloud0.style.width = '110px';
                                            cloud0.style.height = '55px';
                                            cloud0.setAttribute('draggable', false);
                                            cloud0.style.position = 'relative';
                                            cloud0.style.top = '15px';
                                            cloud0.style.left = '-10px';
                                            setTimeout(function()
                                            {
                                                parcel.replaceChild(cloud0, parcel.childNodes[1]);
                                                document.getElementById("temptext").innerHTML = null;
                                                parcel.removeChild(parcel.childNodes[5]);
                                                waiting=0;
                                                tested=1;
                                            }, 600);
                                        } else if (weather == 3) {
                                            var cloud0=document.createElement("img");
                                            cloud0.src = "image/cloud0.png";
                                            cloud0.style.width = '110px';
                                            cloud0.style.height = '56.9px';
                                            cloud0.setAttribute('draggable', false);
                                            cloud0.style.position = 'relative';
                                            cloud0.style.top = '2px';
                                            cloud0.style.left = '-10px';
                                            var rain=document.createElement("img");
                                            rain.src = "image/rain.png";
                                            rain.style.width = '110px';
                                            rain.style.height = '83px';
                                            rain.setAttribute('draggable', false);
                                            rain.style.position = 'relative';
                                            rain.style.top = '2px';
                                            rain.style.left = '-10px';
                                            setTimeout(function()
                                            {
                                                parcel.replaceChild(cloud0, parcel.childNodes[1]);
                                                document.getElementById("temptext").innerHTML = null;
                                                parcel.removeChild(parcel.childNodes[5]);
                                                setTimeout(function()
                                                {
                                                    parcel.replaceChild(rain, cloud0);
                                                    setTimeout(function()
                                                    {
                                                        parcel.replaceChild(cloud0, rain);
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(rain, cloud0);
                                                            setTimeout(function()
                                                            {
                                                                parcel.replaceChild(cloud0, rain);
                                                                setTimeout(function()
                                                                {
                                                                    parcel.replaceChild(rain, cloud0);
                                                                    waiting=0;
                                                                    tested=1;
                                                                }, 600);
                                                            }, 600);
                                                        }, 600);
                                                    }, 600);
                                                }, 600);
                                            }, 600);
                                        } else if (weather == 4) {
                                            var cloud0=document.createElement("img");
                                            cloud0.src = "image/cloud0.png";
                                            cloud0.style.width = '110px';
                                            cloud0.style.height = '55px';
                                            cloud0.setAttribute('draggable', false);
                                            cloud0.style.position = 'relative';
                                            cloud0.style.top = '-1px';
                                            cloud0.style.left = '-10px';
                                            var rain0=document.createElement("img");
                                            rain0.src = "image/rain0.png";
                                            rain0.style.width = '110px';
                                            rain0.style.height = '90px';
                                            rain0.setAttribute('draggable', false);
                                            rain0.style.position = 'relative';
                                            rain0.style.top = '-1px';
                                            rain0.style.left = '-10px';
                                            setTimeout(function()
                                            {
                                                parcel.replaceChild(cloud0, parcel.childNodes[1]);
                                                document.getElementById("temptext").innerHTML = null;
                                                parcel.removeChild(parcel.childNodes[5]);
                                                setTimeout(function()
                                                {
                                                    parcel.replaceChild(rain0, cloud0);
                                                    setTimeout(function()
                                                    {
                                                        parcel.replaceChild(cloud0, rain0);
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(rain0, cloud0);
                                                            setTimeout(function()
                                                            {
                                                                parcel.replaceChild(cloud0, rain0);
                                                                setTimeout(function()
                                                                {
                                                                    parcel.replaceChild(rain0, cloud0);
                                                                    waiting=0;
                                                                    tested=1;
                                                                }, 600);
                                                            }, 600);
                                                        }, 600);
                                                    }, 600);
                                                }, 600);
                                            }, 600);
                                        } else if (weather == 5) {
                                            var cloud0=document.createElement("img");
                                            cloud0.src = "image/cloud0.png";
                                            cloud0.style.width = '109.5px';
                                            cloud0.style.height = '55px';
                                            cloud0.setAttribute('draggable', false);
                                            cloud0.style.position = 'relative';
                                            cloud0.style.top = '-1px';
                                            cloud0.style.left = '-9.7px';
                                            var storm=document.createElement("img");
                                            storm.src = "image/storm.png";
                                            storm.style.width = '110px';
                                            storm.style.height = '90px';
                                            storm.setAttribute('draggable', false);
                                            storm.style.position = 'relative';
                                            storm.style.top = '-1px';
                                            storm.style.left = '-10px';
                                            setTimeout(function()
                                            {
                                                parcel.replaceChild(cloud0, parcel.childNodes[1]);
                                                document.getElementById("temptext").innerHTML = null;
                                                parcel.removeChild(parcel.childNodes[5]);
                                                setTimeout(function()
                                                {
                                                    parcel.replaceChild(storm, cloud0);
                                                    setTimeout(function()
                                                    {
                                                        parcel.replaceChild(cloud0, storm);
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(storm, cloud0);
                                                            setTimeout(function()
                                                            {
                                                                parcel.replaceChild(cloud0, storm);
                                                                setTimeout(function()
                                                                {
                                                                    parcel.replaceChild(storm, cloud0);
                                                                    waiting=0;
                                                                    tested=1;
                                                                }, 600);
                                                            }, 600);
                                                        }, 600);
                                                    }, 600);
                                                }, 600);
                                            }, 600);
                                        }
                                    }, 600);
                                }, 600);
                            }, 600);
                        }, 600);
                    }, 600);
                } else {
                    parcel.childNodes[1].setAttribute('draggable', false);
                    waiting=0;
                    tested=1;
                }
            }
        }
    } else {
        alert("Please undo to test again!");
    }
}

function undo() {
    if (waiting == 1) {
        alert("Please wait for the test result!");
    } else {
        var parcel = document.getElementById("parcel");
        if (parcel.parentNode.id == "panel") {
            alert('Please generate an air parcel, drag it to the atmosphere and test it!');
        } else {
            var parcel = document.getElementById("parcel");
            parcel.childNodes[1].src = src;
            parcel.childNodes[1].style.width = '90px';
            parcel.childNodes[1].style.height = '90px';
            parcel.childNodes[1].id = 'parcelpic';
            parcel.childNodes[1].setAttribute('draggable', true);
            parcel.childNodes[1].style.position='static';
            parcel.childNodes[1].style.top='auto';
            parcel.childNodes[1].style.left='auto';
            document.getElementById("temptext").innerHTML = temperature;
            tested = 0;
        }
    }
}



// helper functions
function level() {
    var placetemp;
    if (dropplace == 'div1') {
        placetemp = -50;
    } else if (dropplace == 'div2') {
        placetemp = -40;
    } else if (dropplace == 'div3') {
        placetemp = -30;
    } else if (dropplace == 'div4') {
        placetemp = -20;
    } else if (dropplace == 'div5') {
        placetemp = -10;
    } else if (dropplace == 'div6') {
        placetemp = 0;
    }
    var delta = placetemp - document.getElementById("temp").value;
    var moisture = document.getElementById("moisture").value;
    var level = 0;
    if (moisture == 1) {
        if (delta <= -40) {
            level = 2;
        } else if (delta <= -30) {
            level = 1;
        }
    } else if (moisture == 2) {
        if (delta <= -50) {
            level = 4;
        } else if (delta <= -40) {
            level = 3;
        } else if (delta <= -30) {
            level = 2;
        } else if (delta <= -20) {
            level = 1;
        }
    } else if (moisture == 3) {
        if (delta <= -50) {
            level = 5;
        } else if (delta <= -40) {
            level = 4;
        } else if (delta <= -30) {
            level = 3;
        } else if (delta <= -20) {
            level = 2;
        } else if (delta <= -10) {
            level = 1;
        }
    }
    return level;
}