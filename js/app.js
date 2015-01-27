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
    if ((document.getElementById("waterinfo")) != undefined) {
        var water = document.getElementById("waterinfo");
        water.parentNode.removeChild(water);
    }
    if ((document.getElementById("vaporinfo")) != undefined) {
        var vapor = document.getElementById("vaporinfo");
        vapor.parentNode.removeChild(vapor);
    }
    if ((document.getElementById("raininfo")) != undefined) {
        var rain = document.getElementById("raininfo");
        rain.parentNode.removeChild(rain);
    }
    var newimage = document.getElementById("parcel");
    if (ev.target.className == "div") {
        var id = (ev.target.id);
        dropplace = id;
        var imageToReplace = document.getElementById(id);
        newimage.style.position = "relative";
        newimage.style.left = "600px";
        newimage.style.top = "-64px";
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
            src = "image/0n.png";
        } else if (temp == 0) {
            if (moisture == 1) {
                src = "image/0l.png";
            } else if (moisture == 2) {
                src = "image/0m.png";
            } else {
                src = "image/0h.png";
            }
        } else if (temp == 10) {
            if (moisture == 1) {
                src = "image/0m.png";
            } else if (moisture == 2) {
                src = "image/10m.png";
            } else {
                src = "image/10h.png";
            }
        } else if (temp == 20) {
            if (moisture == 1) {
                src = "image/10m.png";
            } else if (moisture == 2) {
                src = "image/20m.png";
            } else {
                src = "image/20h.png";
            }
        } else {
            if (moisture == 1) {
                src = "image/30l.png";
            } else if (moisture == 2) {
                src = "image/30m.png";
            } else {
                src = "image/30h.png";
            }
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
        if ((document.getElementById("waterinfo")) != undefined) {
            var water = document.getElementById("waterinfo");
            water.parentNode.removeChild(water);
        }
        if ((document.getElementById("vaporinfo")) != undefined) {
            var vapor = document.getElementById("vaporinfo");
            vapor.parentNode.removeChild(vapor);
        }
        if ((document.getElementById("raininfo")) != undefined) {
            var rain = document.getElementById("raininfo");
            rain.parentNode.removeChild(rain);
        }
        var parcel = document.getElementById("parcel");
        $("#moisture").val(0).slider("refresh");
        $("#temp").val(0).slider("refresh");
        parcel.childNodes[1].src = "image/0n.png";
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
            parcel.style.top = '-440px';
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
                var weather = level()[1];
                var delta = level()[0];
                if (delta != 0) {
                    // make arrows
                    var arrow0=document.createElement("img");
                    arrow0.src = "image/arrow" + (-delta/10) + "0.png";
                    arrow0.style.width = '139px';
                    arrow0.style.height = '142px';
                    arrow0.setAttribute('draggable', false);
                    arrow0.style.position = 'relative';
                    arrow0.style.left = '-23px';
                    arrow0.style.top = '-160px';
                    var arrow=document.createElement("img");
                    arrow.src = "image/arrow" + (-delta/10) + ".png";
                    arrow.style.width = '168px';
                    arrow.style.height = '171px';
                    arrow.setAttribute('draggable', false);
                    arrow.style.position = 'relative';
                    arrow.style.left = '-39px';
                    arrow.style.top = '-175px';

                    // wiggling
                    parcel.appendChild(arrow0);
                    setTimeout(function()
                    {
                        parcel.replaceChild(arrow, arrow0);
                        setTimeout(function()
                        {
                            parcel.removeChild(arrow);
                            setTimeout(function()
                            {
                                parcel.appendChild(arrow0);
                                setTimeout(function()
                                {
                                    parcel.replaceChild(arrow, arrow0);
                                    setTimeout(function()
                                    {
                                        parcel.removeChild(arrow);
                                        setTimeout(function()
                                        {
                                            parcel.appendChild(arrow0);
                                            setTimeout(function()
                                            {
                                                parcel.replaceChild(arrow, arrow0);
                                                setTimeout(function()
                                                {
                                                    parcel.removeChild(arrow);
                                                    // weather change
                                                    if (weather == 0) {
                                                        parcel.childNodes[1].setAttribute('draggable', false);
                                                        window.alert("Please try again!");
                                                        waiting=0;
                                                        tested=1;
                                                    } else if (weather == 1) {
                                                        var cloud=document.createElement("img");
                                                        cloud.src = "image/weather1.png";
                                                        cloud.style.width = '138px';
                                                        cloud.style.height = '60px';
                                                        cloud.setAttribute('draggable', false);
                                                        cloud.style.position = 'relative';
                                                        cloud.style.top = '15px';
                                                        cloud.style.left = '-25px';
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                            document.getElementById("temptext").innerHTML = null;
                                                            waiting=0;
                                                            tested=1;
                                                        }, 600);
                                                    } else if (weather == 2) {
                                                        var cloud=document.createElement("img");
                                                        cloud.src = "image/weather2.png";
                                                        cloud.style.width = '138px';
                                                        cloud.style.height = '62.6px';
                                                        cloud.setAttribute('draggable', false);
                                                        cloud.style.position = 'relative';
                                                        cloud.style.top = '15px';
                                                        cloud.style.left = '-25px';
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                            document.getElementById("temptext").innerHTML = null;
                                                            waiting=0;
                                                            tested=1;
                                                        }, 600);
                                                    } else if (weather == 3) {
                                                        var cloud=document.createElement("img");
                                                        cloud.src = "image/weather3.png";
                                                        cloud.style.width = '138px';
                                                        cloud.style.height = '85px';
                                                        cloud.setAttribute('draggable', false);
                                                        cloud.style.position = 'relative';
                                                        cloud.style.top = '2.5px';
                                                        cloud.style.left = '-25px';
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                            document.getElementById("temptext").innerHTML = null;
                                                            waiting=0;
                                                            tested=1;
                                                        }, 600);
                                                    } else if (weather == 4) {
                                                        var cloud=document.createElement("img");
                                                        cloud.src = "image/weather3.png";
                                                        cloud.style.width = '107.6px';
                                                        cloud.style.height = '66.4px';
                                                        cloud.setAttribute('draggable', false);
                                                        cloud.style.position = 'relative';
                                                        cloud.style.left = '-8px';
                                                        var rain=document.createElement("img");
                                                        rain.src = "image/weather4.png";
                                                        rain.style.width = '107.6px';
                                                        rain.style.height = '90px';
                                                        rain.setAttribute('draggable', false);
                                                        rain.style.position = 'relative';
                                                        rain.style.left = '-8px';
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                            document.getElementById("temptext").innerHTML = null;
                                                            setTimeout(function()
                                                            {
                                                                parcel.replaceChild(rain, cloud);
                                                                setTimeout(function()
                                                                {
                                                                    parcel.replaceChild(cloud, rain);
                                                                    setTimeout(function()
                                                                    {
                                                                        parcel.replaceChild(rain, cloud);
                                                                        setTimeout(function()
                                                                        {
                                                                            parcel.replaceChild(cloud, rain);
                                                                            setTimeout(function()
                                                                            {
                                                                                parcel.replaceChild(rain, cloud);
                                                                                waiting=0;
                                                                                tested=1;
                                                                            }, 600);
                                                                        }, 600);
                                                                    }, 600);
                                                                }, 600);
                                                            }, 600);
                                                        }, 600);
                                                    } else if (weather == 5) {
                                                        var cloud=document.createElement("img");
                                                        cloud.src = "image/weather3.png";
                                                        cloud.style.width = '107.6px';
                                                        cloud.style.height = '66.4px';
                                                        cloud.setAttribute('draggable', false);
                                                        cloud.style.position = 'relative';
                                                        cloud.style.left = '-8px';
                                                        var rain=document.createElement("img");
                                                        rain.src = "image/weather5.png";
                                                        rain.style.width = '107.6px';
                                                        rain.style.height = '90px';
                                                        rain.setAttribute('draggable', false);
                                                        rain.style.position = 'relative';
                                                        rain.style.left = '-8px';
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                            document.getElementById("temptext").innerHTML = null;
                                                            setTimeout(function()
                                                            {
                                                                parcel.replaceChild(rain, cloud);
                                                                setTimeout(function()
                                                                {
                                                                    parcel.replaceChild(cloud, rain);
                                                                    setTimeout(function()
                                                                    {
                                                                        parcel.replaceChild(rain, cloud);
                                                                        setTimeout(function()
                                                                        {
                                                                            parcel.replaceChild(cloud, rain);
                                                                            setTimeout(function()
                                                                            {
                                                                                parcel.replaceChild(rain, cloud);
                                                                                waiting=0;
                                                                                tested=1;
                                                                            }, 600);
                                                                        }, 600);
                                                                    }, 600);
                                                                }, 600);
                                                            }, 600);
                                                        }, 600);
                                                    } else if (weather == 6) {
                                                        var cloud=document.createElement("img");
                                                        cloud.src = "image/weather3.png";
                                                        cloud.style.width = '107.6px';
                                                        cloud.style.height = '66.4px';
                                                        cloud.setAttribute('draggable', false);
                                                        cloud.style.position = 'relative';
                                                        cloud.style.left = '-8px';
                                                        var rain=document.createElement("img");
                                                        rain.src = "image/weather6.png";
                                                        rain.style.width = '107.6px';
                                                        rain.style.height = '90px';
                                                        rain.setAttribute('draggable', false);
                                                        rain.style.position = 'relative';
                                                        rain.style.left = '-8px';
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                            document.getElementById("temptext").innerHTML = null;
                                                            setTimeout(function()
                                                            {
                                                                parcel.replaceChild(rain, cloud);
                                                                setTimeout(function()
                                                                {
                                                                    parcel.replaceChild(cloud, rain);
                                                                    setTimeout(function()
                                                                    {
                                                                        parcel.replaceChild(rain, cloud);
                                                                        setTimeout(function()
                                                                        {
                                                                            parcel.replaceChild(cloud, rain);
                                                                            setTimeout(function()
                                                                            {
                                                                                parcel.replaceChild(rain, cloud);
                                                                                waiting=0;
                                                                                tested=1;
                                                                            }, 600);
                                                                        }, 600);
                                                                    }, 600);
                                                                }, 600);
                                                            }, 600);
                                                        }, 600);
                                                    } else if (weather == 7) {
                                                        var cloud=document.createElement("img");
                                                        cloud.src = "image/weather3.png";
                                                        cloud.style.width = '107.6px';
                                                        cloud.style.height = '66.4px';
                                                        cloud.setAttribute('draggable', false);
                                                        cloud.style.position = 'relative';
                                                        cloud.style.left = '-8px';
                                                        var rain=document.createElement("img");
                                                        rain.src = "image/weather7.png";
                                                        rain.style.width = '107.6px';
                                                        rain.style.height = '90px';
                                                        rain.setAttribute('draggable', false);
                                                        rain.style.position = 'relative';
                                                        rain.style.left = '-8px';
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                            document.getElementById("temptext").innerHTML = null;
                                                            setTimeout(function()
                                                            {
                                                                parcel.replaceChild(rain, cloud);
                                                                setTimeout(function()
                                                                {
                                                                    parcel.replaceChild(cloud, rain);
                                                                    setTimeout(function()
                                                                    {
                                                                        parcel.replaceChild(rain, cloud);
                                                                        setTimeout(function()
                                                                        {
                                                                            parcel.replaceChild(cloud, rain);
                                                                            setTimeout(function()
                                                                            {
                                                                                parcel.replaceChild(rain, cloud);
                                                                                waiting=0;
                                                                                tested=1;
                                                                            }, 600);
                                                                        }, 600);
                                                                    }, 600);
                                                                }, 600);
                                                            }, 600);
                                                        }, 600);
                                                    } else if (weather == 8) {
                                                        var cloud=document.createElement("img");
                                                        cloud.src = "image/weather3.png";
                                                        cloud.style.width = '107.6px';
                                                        cloud.style.height = '66.4px';
                                                        cloud.setAttribute('draggable', false);
                                                        cloud.style.position = 'relative';
                                                        cloud.style.left = '-8px';
                                                        var rain=document.createElement("img");
                                                        rain.src = "image/weather8.png";
                                                        rain.style.width = '107.6px';
                                                        rain.style.height = '90px';
                                                        rain.setAttribute('draggable', false);
                                                        rain.style.position = 'relative';
                                                        rain.style.left = '-8px';
                                                        setTimeout(function()
                                                        {
                                                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                                                            document.getElementById("temptext").innerHTML = null;
                                                            setTimeout(function()
                                                            {
                                                                parcel.replaceChild(rain, cloud);
                                                                setTimeout(function()
                                                                {
                                                                    parcel.replaceChild(cloud, rain);
                                                                    setTimeout(function()
                                                                    {
                                                                        parcel.replaceChild(rain, cloud);
                                                                        setTimeout(function()
                                                                        {
                                                                            parcel.replaceChild(cloud, rain);
                                                                            setTimeout(function()
                                                                            {
                                                                                parcel.replaceChild(rain, cloud);
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
                            }, 600);
                        }, 600);
                    }, 600);
                } else {
                    if (weather == 0) {
                        parcel.childNodes[1].setAttribute('draggable', false);
                        window.alert("Please try again!");
                        waiting=0;
                        tested=1;
                    } else if (weather == 1) {
                        var cloud=document.createElement("img");
                        cloud.src = "image/weather1.png";
                        cloud.style.width = '138px';
                        cloud.style.height = '60px';
                        cloud.setAttribute('draggable', false);
                        cloud.style.position = 'relative';
                        cloud.style.top = '15px';
                        cloud.style.left = '-25px';
                        setTimeout(function()
                        {
                            parcel.replaceChild(cloud, parcel.childNodes[1]);
                            document.getElementById("temptext").innerHTML = null;
                            waiting=0;
                            tested=1;
                        }, 600);
                    } 
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
    var temp = document.getElementById("temp").value;
    var moisture = document.getElementById("moisture").value;
    var level = 0;
    if (temp == 0) {
        if (moisture == 1) {
            if (placetemp <= -20) {
                level = 1;
            }
        } else if (moisture == 2) {
            if (placetemp == -10) {
                level = 1;
            } else if (placetemp <= -20) {
                level = 2;
            }
        } else if (moisture == 3) {
            if (placetemp == 0) {
                level = 1;
            } else if (placetemp == -10) {
                level = 2;
            } else {
                level = 3;
            }
        }
    } else if (temp == 10) {
        if (moisture == 1) {
            if (placetemp <= -20) {
                level = 2;
            }
        } else if (moisture == 2) {
            if (placetemp == -10) {
                level = 2;
            } else if (placetemp == -20) {
                level = 3;
            } else if (placetemp <= -30) {
                level = 4;
            }
        } else if (moisture == 3) {
            if (placetemp >= -10) {
                level = 3;
            } else if (placetemp == -20) {
                level = 4;
            } else {
                level = 5;
            }
        }
    } else if (temp == 20) {
        if (moisture == 1) {
            if (placetemp == -20) {
                level = 3;
            } else if (placetemp <= -30) {
                level = 4;
            }
        } else if (moisture == 2) {
            if (placetemp == -10) {
                level = 4;
            } else if (placetemp <= -20) {
                level = 5;
            }
        } else if (moisture == 3) {
            if (placetemp == 0) {
                level = 5;
            } else {
                level = 6;
            }
        }
    } else {
        if (moisture == 1) {
            if (placetemp == -20) {
                level = 5;
            } else if (placetemp <= -30) {
                level = 6;
            }
        } else if (moisture == 2) {
            if (placetemp == -10) {
                level = 5;
            } else if (placetemp == -20) {
                level = 6;
            } else if (placetemp <= -30) {
                level = 7;
            }
        } else if (moisture == 3) {
            if (placetemp == 0) {
                level = 6;
            } else if (placetemp == -10) {
                level = 7;
            } else {
                level = 8;
            }
        }
    }
    var delta = placetemp - temp;
    var weather = [delta, level];
    return weather;
}

function info(ev) {
    if (ev.target.id == "vapor") {
        if (document.getElementById("vaporinfo") == undefined) {
            if (document.getElementById("waterinfo") != undefined) {
                var water = document.getElementById("waterinfo");
                ev.target.parentNode.parentNode.removeChild(water);
            }
            if (document.getElementById("raininfo") != undefined) {
                var rain = document.getElementById("raininfo");
                ev.target.parentNode.parentNode.removeChild(rain);
            }
            var vapor = document.createElement("img");
            vapor.src = "image/gas-water-molecules.png";
            vapor.id = "vaporinfo"
            vapor.style.width = '54.9px';
            vapor.style.height = '51.5px';
            vapor.setAttribute('draggable', false);
            vapor.style.position = 'relative';
            if (parcel.parentNode.id != "panel") {
                vapor.style.left = '30px';
                vapor.style.top = '-558px';
            } else {
                vapor.style.left = '30px';
                vapor.style.top = '-648px';
            }
            ev.target.parentNode.parentNode.appendChild(vapor);
        } else {
            var vapor = document.getElementById("vaporinfo");
            ev.target.parentNode.parentNode.removeChild(vapor);
        }
    } else if (ev.target.id == "water") {
        if (document.getElementById("waterinfo") == undefined) {
            if (document.getElementById("vaporinfo") != undefined) {
                var vapor = document.getElementById("vaporinfo");
                ev.target.parentNode.parentNode.removeChild(vapor);
            }
            if (document.getElementById("raininfo") != undefined) {
                var rain = document.getElementById("raininfo");
                ev.target.parentNode.parentNode.removeChild(rain);
            }
            var water = document.createElement("img");
            water.src = "image/liquid-water-molecules.png";
            water.id = "waterinfo"
            water.style.width = '54.9px';
            water.style.height = '51.5px';
            water.setAttribute('draggable', false);
            water.style.position = 'relative';
            if (parcel.parentNode.id != "panel") {
                water.style.left = '30px';
                water.style.top = '-535px';
            } else {
                water.style.left = '30px';
                water.style.top = '-625px';
            }
            ev.target.parentNode.parentNode.appendChild(water);
        } else {
            var water = document.getElementById("waterinfo");
            ev.target.parentNode.parentNode.removeChild(water);
        }
    } else if (ev.target.id == "rain") {
        if (document.getElementById("raininfo") == undefined) {
            if (document.getElementById("vaporinfo") != undefined) {
                var vapor = document.getElementById("vaporinfo");
                ev.target.parentNode.parentNode.removeChild(vapor);
            }
            if (document.getElementById("waterinfo") != undefined) {
                var water = document.getElementById("waterinfo");
                ev.target.parentNode.parentNode.removeChild(water);
            }
            var rain = document.createElement("img");
            rain.src = "image/liquid-water-molecules.png";
            rain.id = "raininfo"
            rain.style.width = '54.9px';
            rain.style.height = '51.5px';
            rain.setAttribute('draggable', false);
            rain.style.position = 'relative';
            if (parcel.parentNode.id != "panel") {
                rain.style.left = '30px';
                rain.style.top = '-512px';
            } else {
                rain.style.left = '30px';
                rain.style.top = '-602px';
            }
            ev.target.parentNode.parentNode.appendChild(rain);
        } else {
            var rain = document.getElementById("raininfo");
            ev.target.parentNode.parentNode.removeChild(rain);
        }
    }
}