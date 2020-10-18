const bannerWidth = 300;
const bannerHeight = 250;

const loopDuration = 15;
const pauseLastLoopAfter = 15;

const loopNumber = 3;

const whiteoutSpeed = 0.6;

const enableTerms = false;

const enableCtaPause = false;
const ctaPauseAfter = 30; // second

const ctaSolid = false;



const preloadImages = ["cta_1.png", "cta_2.png", "logo.png"];

/*  imagesAll[[],[],[]] (or images[]) posiible parameters filled after the | (example: "bg.jpg|-retina.someClass" or "bgs/bg.jpg|-r" ...)
I   -retina, -r, -retina2, -r2 => make image in half size (divide by 2)
N   -retina15, -r15 => half retina etc... (divide image size by 1.5) => -r05 (divide by 0.5 - make the image twice bigger)
F   -wrapper => create self wrapper for this image/element (check the dev tools, how it looks)
O   .someClass.someAnotherClass => add additional class (check the dev tools, how it looks)
    #differentID => different id than file name
*/
//const imgFolder = "./img/"; // set folder for all imagesAll[[],[],[]] (or images[]) without their own path (own path have more priority) -> (light reaction specs etc...)

const images = ["bg.jpg|-r", "bg_2.jpg|-r", "bg_3.jpg|-r", "copy_1.png|-r", "copy_2.png|-r", "copy_3.png|-r"]



const tl_Frame = [];

tl_Frame[1] = function () {
    var tl = new TimelineMax();

    var f1 = 0.1,
        f2 = 2.7,
        f3 = 8.4,
        f4 = 12;
    var fadeTime = 1;

    // start parameters
    tl.set([bg_2, bg_3, copy_1, copy_2, copy_3, plinth, cta_all], { opacity: 0 }, 0);
    tl.set(terms_copy, { opacity: 0 }, 0); //t
    tl.set([terms_btn, terms_btn_2], { display: "none" }, 0); //t

    tl.add(function () {
        linePath = document.getElementById("linePath");

        var svgStart = f2 + 0.5;
        var svgLength = 1.5; // anim. length

        var lineSvgEase = Power2.easeInOut;

        tl.set(svgLine, { opacity: 1 }, svgStart);
        tl.set(linePath, { strokeDasharray: "0 336.381", strokeDashoffset: "0" }, 0);
        tl.to(linePath, svgLength, { strokeDasharray: "336.381", ease: lineSvgEase }, svgStart);
        tl.to(svgLine, 3, { x: 0, scaleX: 0.55, ease: Power0.easeNone, force3D: false }, svgStart);
    }, 0);


    // frame 1 ----------
    tl.to(bg, 5, { scale: 1, ease: Power0.easeNone, force3D: false }, 0);
    tl.to(copy_1, fadeTime, { opacity: 1 }, f1);


    // frame 2 ----------
    tl.to(copy_1, fadeTime, { opacity: 0 }, f2 - .5);
    tl.to(bg_2, fadeTime, { opacity: 1 }, f2);
    tl.to(bg_2, 5, { scale: 1, ease: Power0.easeNone, force3D: false }, f2);
    tl.to(copy_2, fadeTime, { opacity: 1 }, f2 + .4);
    //tl.set(terms_btn_2, { display: "block" }, f2 + .5); //t
    tl.to(copy_2, fadeTime, { opacity: 0 }, f2 + 5);


    // frame 3 ----------  
    tl.to(copy_3, fadeTime, { opacity: 1 }, f3 + .5);
    //tl.set(terms_btn_2, { display: "none" }, f3); //t
    tl.set(copy_3, { opacity: 0 }, f3);
    tl.set(bg, { opacity: 0 }, f3); // off for horse frame
    tl.to(bg_2, fadeTime, { opacity: 0 }, f3);
    tl.to(svgLine, fadeTime - 0.5, { opacity: 0 }, f3);
    tl.to(plinth, 0.1, { opacity: 1 }, f3 + 0.3);



    // svg code start ------------------------------------->>>
    tl.add(function () {
        var mustangOP = document.querySelectorAll(".mustangShapePath");
        var svgStart = f3;
        var svgLength = 1; // anim. length
        var mustangSvgEase = Power0.easeNone;

        tl.set(svgMustangShape, { opacity: 1 }, svgStart - 0.1);
        tl.set(mustangOP[1], { opacity: 0.3 }, svgStart - 0.1);
        tl.to(mustangOP[1], 0.5, { strokeDashoffset: mustangOP[0].getTotalLength() * 2, ease: mustangSvgEase }, svgStart + 0.4);
        tl.to(mustangOP[1], svgLength, { strokeWidth: 27, roundProps: { strokeWidth: 0.01 }, ease: mustangSvgEase }, svgStart);
        tl.to(mustangOP[1], svgLength / 10, { opacity: 0.75, ease: mustangSvgEase }, svgStart + ((svgLength / 3) * 2.8));
        tl.to(mustangOP[1], svgLength / 9, { stroke: "#43ffff", ease: mustangSvgEase }, svgStart + ((svgLength / 3) * 2.4));
        tl.to(svgMustangShape, svgLength / 9, { filter: "blur(1.2px) saturate(1)", ease: mustangSvgEase }, svgStart + ((svgLength / 3) * 2.4));

    }, 0);

    tl.add(function () {
        var lines = document.querySelectorAll(".svgLines");
        var opacityArr = [0.21, 0.76, 1, 0.84, 0.68, 0.51, 0.82, 1, 1, 0.82]
        var svgStart = f3;
        tl.set([svgBgWrapper, shadow_floor], { opacity: 1 }, svgStart - 0.1);
        for (let i = 0; i < lines.length; i++) {
            if (i !== 0) {
                tl.set(lines[i - 1], { opacity: 0 }, svgStart + (i * (1 / 18)));
            }
            tl.set(lines[i], { opacity: 1 }, svgStart + (i * (1 / 18)));
        }
        for (let i = 0; i < opacityArr.length * 2; i++) {
            tl.set(floor, { opacity: opacityArr[i] }, svgStart + (i * (1 / 18)));
        }
        var svgStart2 = ((1 / 18) * lines.length) + svgStart;
        tl.set(bg10, { opacity: 0 }, svgStart2);

        for (let i = 0; i < lines.length; i++) {
            if (i !== 0) {
                tl.set(lines[i - 1], { opacity: 0 }, svgStart2 + (i * (1 / 18)));
            }
            tl.set(lines[i], { opacity: 1 }, svgStart2 + (i * (1 / 18)));

            tl.set(floor, { opacity: opacityArr[i] }, svgStart2 + (i * (1 / 18)));
        }
        tl.set([floor, shadow_floor, bg10], { opacity: 0 }, svgStart2 + ((1 / 18) * lines.length));
    }, 0);

    // svg code end -------------------------------------<<<


    // frame 4 ----------  
    tl.to(bg_3, fadeTime, { opacity: 0 }, f4);
    tl.to(bg, fadeTime, { opacity: 1 }, f4);
    tl.to(cta_all, fadeTime, { opacity: 1 }, f4);


    /* tl.to(terms_copy, 0.5, { opacity: 1 }, f4); //t
    tl.set(terms_btn, { display: "block" }, f4); //t */



    return tl;
}





// ============================== clicktag, cta, terms (mouse events) ============================== //

function clicktag_Click(e) {
    if (dcSelect) {
        Enabler.exit("Exit Click");
        //        Enabler.exitOverride("Exit Click", "https://www.google.com");
        Enabler.counter("Counter Click");
    } else {
        window.open(window.clickTag);
    }
}

function mouseEnter() {
    TweenMax.to(cta_2, 0.1, { opacity: 1 })
}

function mouseLeave() {
    TweenMax.to(cta_2, 0.1, { opacity: 0 })
}

function termsEnter() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_over 0.3s 0s linear forwards";

    terms_close_btn.style.display = "block";

    mouseEnter(); // cta on state
    animationsPause();
}

function termsLeave() {
    // terms_overlay.style.animation = undefined;
    // terms_overlay.style.animation = "terms_overlay_animation_out 0.3s 0s linear forwards";

    // if (!stopAnimations) { animationsPlay() }
}

function termsClose() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_out 0.3s 0s linear forwards";

    terms_close_btn.style.display = "none";

    if (!stopAnimations) { animationsPlay() }
}

// ============================== others ============================== //




// svg part start --- --- --->
function getSvgPolylineLength(el) {
    var totalLength = 0;
    var prevPos;
    for (var i = 0; i < el.points.numberOfItems; i++) {
        var pos = el.points.getItem(i);
        if (i > 0) {
            totalLength += Math.sqrt(Math.pow((pos.x - prevPos.x), 2) + Math.pow((pos.y - prevPos.y), 2));
        }
        prevPos = pos;
    }
    return totalLength;
}

function getSvgLineLength(el) {
    return function (x1, x2, y1, y2) {
        return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
    }(el.getAttribute('x1'), el.getAttribute('x2'), el.getAttribute('y1'), el.getAttribute('y2'));
}

function setSVGParams() {
    function setPathsLength(className) {
        var totalLength;
        var svgElms = document.getElementsByClassName(className);

        var classNameLength = svgElms.length;
        for (var i = 0; i < classNameLength; i++) {
            if (svgElms[i].tagName.toLowerCase() === "path") {
                totalLength = svgElms[i].getTotalLength();
            } else if (svgElms[i].tagName.toLowerCase() === "polyline") {
                totalLength = getSvgPolylineLength(svgElms[i]);
            } else if (svgElms[i].tagName.toLowerCase() === "line") {
                totalLength = getSvgLineLength(svgElms[i]);
            }
            svgElms[i].style.strokeDashoffset = totalLength * 3;
            svgElms[i].style.strokeDasharray = totalLength + ' ' + totalLength;
        }
    }

    setPathsLength("mustangShapePath");

    console.log("done");
}


// svg content strings --->
var svgMustangShapeString = '\
<svg id="svgMustangShape" xmlns="http://www.w3.org/2000/svg" width="945" height="310.7" viewBox="-20 -20 945 310.7"> \
<defs> \
    <filter id="glow"> \
\
        <feMorphology operator="dilate" radius="3" in="SourceAlpha" result="thicken" /> \
        <feGaussianBlur in="thicken" stdDeviation="7" result="blurred" /> \
        <feFlood flood-color="rgb(67,255,255)" result="glowColor" /> \
        <feComposite in="glowColor" in2="blurred" operator="in" result="glowDone" /> \
\
        <feMerge> \
            <feMergeNode in="glowDone" /> \
            <feMergeNode in="SourceGraphic"/> \
        </feMerge> \
\
    </filter> \
\
    <style> \
\
    .a { \
            opacity: 0.4; \
\
            stroke:#00c1e5; \
\
            stroke-width: 2; \
            stroke-miterlimit: 7; \
\
            filter: url(#glow); \
        } \
\
        .b { \
            fill: none; \
\
            opacity: 1; \
\
            stroke:#00c1e5; \
\
            stroke-width: 15; \
            stroke-miterlimit: 7; \
\
            filter: url(#glow); \
        } \
\
        .c { \
            fill: #000000; \
            opacity: 1; \
        } \
\
    </style> \
</defs> \
\
<title>mustang logo</title>\
\
<g id="a" class="a">\
    <path class="mustangShapePath" d="M907.24,105.13c-43.74,1-80.65-9-118.75-14.1-41-5.49-50.61,34.59-52.68,39.05-6.71,14.49-29.46,5.48-36.76,1.08-70.55-42.57-122.6-42.12-154-40C424,99.46,393.28,97.42,386,95.48c-13-3.46,16.1-20.66,16.1-20.66H386.23l27.1-15.7-86.12,1.75c-11-2.69,14-13.15,14-13.15-27.64,2.41-45.88,6.71-45.88,6.71-32.2,7.24-48,8.58-48,5.5s14.21-10.6,14.21-10.6c-20.39,1.34-68.14,19.32-68.14,19.32-17.71,3.48-10.73-4.83-10.73-4.83l8.58-14.49c-24.68,2.15-40.24,21.19-40.24,21.19-17.44,2.42-46.41,27.37-55.27,41.86s-45.34,41.31-45.34,41.31c-8.85,8.05-4.47,13.27-2.41,16.64,3,5,7.49,13.65,13.44,15.6,4.58,1.5,24.5,3.5,29.48-1.38,13.42-13.15,32.69-27.09,46.95-27.91,37.56-2.14,38.76-3.86,48-12.07s20.86-5.46,25.85-3.08c10.21,4.89,52.55,30.24,53.29,33.4,1.93,8.18,5.23,17.26,6.71,23.34C276,216,259.32,235.39,253.43,247c-6.36,12.5,14.31,17.9,20.9,18.41,16.7,1.27,64.95-4.94,64.95-4.94,10.19,10.73,15.43,12.38,20.92,13.15,36.22,5.1,37,11.54,37,11.54l-21.46,11.26-20.66,2.15L337.4,318.42h41.05c2.14-7.24,4.2-9.29,7-11,4.81-2.95,21.47,3.22,21.47,3.22,6.44-14.75,11.53-10.73,11.53-10.73,4.83,8.32,13,8.75,18,8.85,16.9.35,26.29,9.66,26.29,9.66l32.46-1.34-27.36-21.19s-16,.76-21.2,0c-7.47-1.09-3.79-8.73-1.62-10.05,24.16-14.71,45.72-18.56,62.53-19.2,11.79-.45,36,9.66,36,9.66,10.85-18.68,23.89-32.4,36.21-34.34,64.66-10.19,99.75-57.1,107.05-68.68,7.78-12.34,14-13.8,21.73-13.42,10,.51,30.2.5,40.25,1.08,30.11,1.74,34.78-13.9,41.31-23.88,4.37-6.67,11.58-14.08,29.47-6.41,20.66,8.85,62,10.17,62,10.17,62-1.35,73.51-53.93,73.51-53.93C938.37,104.87,919.46,104.85,907.24,105.13ZM293.4,245.72c-1.88-1.88.81-15,12.88-28.17,0,0,24.68,24.14,25.49,28.17C331.77,245.72,295.28,247.59,293.4,245.72Zm223.75-44.54L483.71,250H450.89l-33.27,24.68L397.5,260.74s-8.32-5.36,4.56-9.66c0,0,28.17-3.49,43.19-24.14l-42.66-1.34s-7.51,15-12.34,15-7.35-1.62-8.58-4c-2.84-5.54-10-25.92,9.39-23.08,45.88,6.7,85.85-12.87,114.83-20.11C509.21,192.57,524.67,189.91,517.15,201.18Z" transform="translate(-45 -47.72)"/>\
</g>\
\
<g id="b" class="b">\
    <path class="mustangShapePath" d="M907.24,105.13c-43.74,1-80.65-9-118.75-14.1-41-5.49-50.61,34.59-52.68,39.05-6.71,14.49-29.46,5.48-36.76,1.08-70.55-42.57-122.6-42.12-154-40C424,99.46,393.28,97.42,386,95.48c-13-3.46,16.1-20.66,16.1-20.66H386.23l27.1-15.7-86.12,1.75c-11-2.69,14-13.15,14-13.15-27.64,2.41-45.88,6.71-45.88,6.71-32.2,7.24-48,8.58-48,5.5s14.21-10.6,14.21-10.6c-20.39,1.34-68.14,19.32-68.14,19.32-17.71,3.48-10.73-4.83-10.73-4.83l8.58-14.49c-24.68,2.15-40.24,21.19-40.24,21.19-17.44,2.42-46.41,27.37-55.27,41.86s-45.34,41.31-45.34,41.31c-8.85,8.05-4.47,13.27-2.41,16.64,3,5,7.49,13.65,13.44,15.6,4.58,1.5,24.5,3.5,29.48-1.38,13.42-13.15,32.69-27.09,46.95-27.91,37.56-2.14,38.76-3.86,48-12.07s20.86-5.46,25.85-3.08c10.21,4.89,52.55,30.24,53.29,33.4,1.93,8.18,5.23,17.26,6.71,23.34C276,216,259.32,235.39,253.43,247c-6.36,12.5,14.31,17.9,20.9,18.41,16.7,1.27,64.95-4.94,64.95-4.94,10.19,10.73,15.43,12.38,20.92,13.15,36.22,5.1,37,11.54,37,11.54l-21.46,11.26-20.66,2.15L337.4,318.42h41.05c2.14-7.24,4.2-9.29,7-11,4.81-2.95,21.47,3.22,21.47,3.22,6.44-14.75,11.53-10.73,11.53-10.73,4.83,8.32,13,8.75,18,8.85,16.9.35,26.29,9.66,26.29,9.66l32.46-1.34-27.36-21.19s-16,.76-21.2,0c-7.47-1.09-3.79-8.73-1.62-10.05,24.16-14.71,45.72-18.56,62.53-19.2,11.79-.45,36,9.66,36,9.66,10.85-18.68,23.89-32.4,36.21-34.34,64.66-10.19,99.75-57.1,107.05-68.68,7.78-12.34,14-13.8,21.73-13.42,10,.51,30.2.5,40.25,1.08,30.11,1.74,34.78-13.9,41.31-23.88,4.37-6.67,11.58-14.08,29.47-6.41,20.66,8.85,62,10.17,62,10.17,62-1.35,73.51-53.93,73.51-53.93C938.37,104.87,919.46,104.85,907.24,105.13ZM293.4,245.72c-1.88-1.88.81-15,12.88-28.17,0,0,24.68,24.14,25.49,28.17C331.77,245.72,295.28,247.59,293.4,245.72Zm223.75-44.54L483.71,250H450.89l-33.27,24.68L397.5,260.74s-8.32-5.36,4.56-9.66c0,0,28.17-3.49,43.19-24.14l-42.66-1.34s-7.51,15-12.34,15-7.35-1.62-8.58-4c-2.84-5.54-10-25.92,9.39-23.08,45.88,6.7,85.85-12.87,114.83-20.11C509.21,192.57,524.67,189.91,517.15,201.18Z" transform="translate(-45 -47.72)"/>\
</g>\
\
<g id="c" class="c">\
    <path class="mustangShapePath" d="M907.24,105.13c-43.74,1-80.65-9-118.75-14.1-41-5.49-50.61,34.59-52.68,39.05-6.71,14.49-29.46,5.48-36.76,1.08-70.55-42.57-122.6-42.12-154-40C424,99.46,393.28,97.42,386,95.48c-13-3.46,16.1-20.66,16.1-20.66H386.23l27.1-15.7-86.12,1.75c-11-2.69,14-13.15,14-13.15-27.64,2.41-45.88,6.71-45.88,6.71-32.2,7.24-48,8.58-48,5.5s14.21-10.6,14.21-10.6c-20.39,1.34-68.14,19.32-68.14,19.32-17.71,3.48-10.73-4.83-10.73-4.83l8.58-14.49c-24.68,2.15-40.24,21.19-40.24,21.19-17.44,2.42-46.41,27.37-55.27,41.86s-45.34,41.31-45.34,41.31c-8.85,8.05-4.47,13.27-2.41,16.64,3,5,7.49,13.65,13.44,15.6,4.58,1.5,24.5,3.5,29.48-1.38,13.42-13.15,32.69-27.09,46.95-27.91,37.56-2.14,38.76-3.86,48-12.07s20.86-5.46,25.85-3.08c10.21,4.89,52.55,30.24,53.29,33.4,1.93,8.18,5.23,17.26,6.71,23.34C276,216,259.32,235.39,253.43,247c-6.36,12.5,14.31,17.9,20.9,18.41,16.7,1.27,64.95-4.94,64.95-4.94,10.19,10.73,15.43,12.38,20.92,13.15,36.22,5.1,37,11.54,37,11.54l-21.46,11.26-20.66,2.15L337.4,318.42h41.05c2.14-7.24,4.2-9.29,7-11,4.81-2.95,21.47,3.22,21.47,3.22,6.44-14.75,11.53-10.73,11.53-10.73,4.83,8.32,13,8.75,18,8.85,16.9.35,26.29,9.66,26.29,9.66l32.46-1.34-27.36-21.19s-16,.76-21.2,0c-7.47-1.09-3.79-8.73-1.62-10.05,24.16-14.71,45.72-18.56,62.53-19.2,11.79-.45,36,9.66,36,9.66,10.85-18.68,23.89-32.4,36.21-34.34,64.66-10.19,99.75-57.1,107.05-68.68,7.78-12.34,14-13.8,21.73-13.42,10,.51,30.2.5,40.25,1.08,30.11,1.74,34.78-13.9,41.31-23.88,4.37-6.67,11.58-14.08,29.47-6.41,20.66,8.85,62,10.17,62,10.17,62-1.35,73.51-53.93,73.51-53.93C938.37,104.87,919.46,104.85,907.24,105.13ZM293.4,245.72c-1.88-1.88.81-15,12.88-28.17,0,0,24.68,24.14,25.49,28.17C331.77,245.72,295.28,247.59,293.4,245.72Zm223.75-44.54L483.71,250H450.89l-33.27,24.68L397.5,260.74s-8.32-5.36,4.56-9.66c0,0,28.17-3.49,43.19-24.14l-42.66-1.34s-7.51,15-12.34,15-7.35-1.62-8.58-4c-2.84-5.54-10-25.92,9.39-23.08,45.88,6.7,85.85-12.87,114.83-20.11C509.21,192.57,524.67,189.91,517.15,201.18Z" transform="translate(-45 -47.72)"/>\
</g>\
\
<g id="d" class="d">\
    <path class="mustangShapePath" d="M907.24,105.13c-43.74,1-80.65-9-118.75-14.1-41-5.49-50.61,34.59-52.68,39.05-6.71,14.49-29.46,5.48-36.76,1.08-70.55-42.57-122.6-42.12-154-40C424,99.46,393.28,97.42,386,95.48c-13-3.46,16.1-20.66,16.1-20.66H386.23l27.1-15.7-86.12,1.75c-11-2.69,14-13.15,14-13.15-27.64,2.41-45.88,6.71-45.88,6.71-32.2,7.24-48,8.58-48,5.5s14.21-10.6,14.21-10.6c-20.39,1.34-68.14,19.32-68.14,19.32-17.71,3.48-10.73-4.83-10.73-4.83l8.58-14.49c-24.68,2.15-40.24,21.19-40.24,21.19-17.44,2.42-46.41,27.37-55.27,41.86s-45.34,41.31-45.34,41.31c-8.85,8.05-4.47,13.27-2.41,16.64,3,5,7.49,13.65,13.44,15.6,4.58,1.5,24.5,3.5,29.48-1.38,13.42-13.15,32.69-27.09,46.95-27.91,37.56-2.14,38.76-3.86,48-12.07s20.86-5.46,25.85-3.08c10.21,4.89,52.55,30.24,53.29,33.4,1.93,8.18,5.23,17.26,6.71,23.34C276,216,259.32,235.39,253.43,247c-6.36,12.5,14.31,17.9,20.9,18.41,16.7,1.27,64.95-4.94,64.95-4.94,10.19,10.73,15.43,12.38,20.92,13.15,36.22,5.1,37,11.54,37,11.54l-21.46,11.26-20.66,2.15L337.4,318.42h41.05c2.14-7.24,4.2-9.29,7-11,4.81-2.95,21.47,3.22,21.47,3.22,6.44-14.75,11.53-10.73,11.53-10.73,4.83,8.32,13,8.75,18,8.85,16.9.35,26.29,9.66,26.29,9.66l32.46-1.34-27.36-21.19s-16,.76-21.2,0c-7.47-1.09-3.79-8.73-1.62-10.05,24.16-14.71,45.72-18.56,62.53-19.2,11.79-.45,36,9.66,36,9.66,10.85-18.68,23.89-32.4,36.21-34.34,64.66-10.19,99.75-57.1,107.05-68.68,7.78-12.34,14-13.8,21.73-13.42,10,.51,30.2.5,40.25,1.08,30.11,1.74,34.78-13.9,41.31-23.88,4.37-6.67,11.58-14.08,29.47-6.41,20.66,8.85,62,10.17,62,10.17,62-1.35,73.51-53.93,73.51-53.93C938.37,104.87,919.46,104.85,907.24,105.13ZM293.4,245.72c-1.88-1.88.81-15,12.88-28.17,0,0,24.68,24.14,25.49,28.17C331.77,245.72,295.28,247.59,293.4,245.72Zm223.75-44.54L483.71,250H450.89l-33.27,24.68L397.5,260.74s-8.32-5.36,4.56-9.66c0,0,28.17-3.49,43.19-24.14l-42.66-1.34s-7.51,15-12.34,15-7.35-1.62-8.58-4c-2.84-5.54-10-25.92,9.39-23.08,45.88,6.7,85.85-12.87,114.83-20.11C509.21,192.57,524.67,189.91,517.15,201.18Z" transform="translate(-45 -47.72)"/>\
</g>\
\
</svg>\
';

var svgLineString = '\
<svg id="svgLine" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="280" height="154.25" viewBox="0 0 280 170">\
    <defs>\
        <style>\
            #linePath {\
                fill:none;\
                stroke: #00ffff;\
                stroke-width: 3;\
                stroke-miterlimit: 10;\
                transform: translate(10px, 8px);\
                filter: url(#lineGlow);\
            }\
        </style>\
        <filter id="lineGlow">\
            <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />\
            <feGaussianBlur in="thicken" stdDeviation="6" result="blurred" />\
            <feFlood flood-color="rgb(6,246,246)" result="glowColor" />\
            <feComposite in="glowColor" in2="blurred" operator="in" result="glowDone" />\
        \
            <feMerge>\
                <feMergeNode in="glowDone" />\
                <feMergeNode in="SourceGraphic"/>\
            </feMerge>\
        </filter>\
    </defs>\
    <path id="linePath" d="M.06,1.5S68.93,4.11,84.58,16.63c8.35,12,7.3,42.26,44.35,66.78,64.17,33.92,100.69,54.78,152.34,69.39"/>\
</svg>';

// ============================== Do not edit ============================== //

var mTL, content, loopCount = 1, stopAnimations = false;

// --- preloading images
if (enableTerms) preloadImages.push("terms_overlay.jpg");
if (!ctaSolid) preloadImages.push("cta_2.png");
// --- end preloading images



// -------------------- special functions -------------------- //

function ctaPause() {
    if (enableCtaPause) {
        setTimeout(function () {
            mouseLeave();
            clicktag.removeEventListener("mouseover", mouseEnter);
            clicktag.removeEventListener("mouseout", mouseLeave);
        }, ctaPauseAfter * 1000);
    }
}



// -------------------- (05) - main animation -------------------- //

function startMainTimeLine() {
    for (var i = 1, l = tl_Frame.length; i < l; i++) {
        mTL.add(tl_Frame[i]());
        stopwatch.start();
    }

    mTL.to(whiteout, whiteoutSpeed, { opacity: 0, onComplete: stopWhiteout }, 0);
    mTL.to(whiteout, whiteoutSpeed, { opacity: 1 }, loopDuration - whiteoutSpeed);

    mTL.set({}, { onComplete: pauseMainTimeLine }, pauseLastLoopAfter);
    mTL.set({}, { onComplete: resetMainTimeLine }, loopDuration);

    // --- new loop terms bugFix --- //
    mTL.add(function () { if (enableTerms) { terms_btn.style.pointerEvents = "auto" } }, 0);
    mTL.add(function () { if (loopNumber != loopCount && enableTerms) { terms_btn.style.pointerEvents = "none" } }, loopDuration - 0.3);
}

function stopWhiteout() { if (loopCount == loopNumber) { TweenMax.killTweensOf(whiteout) } }
function pauseMainTimeLine() { if (loopCount == loopNumber) { stopAnimations = true; animationsPause(); console.log("animation stop"); stopwatch.stop(); } }
function resetMainTimeLine() { if (loopCount != loopNumber) { loopCount++; mTL.restart(); } }
function animationsPause() { mTL.pause() }
function animationsPlay() { mTL.play() }



// -------------------- (04) - init -------------------- //

function init() {
    if (enableTerms) {
        terms_overlay.style.backgroundImage = "url(terms_overlay.jpg)";
        terms_btn.style.pointerEvents = "auto";
    }

    content.style.opacity = 1;
    startMainTimeLine();
}

function preInit() {
    content = document.getElementById("content"); // firefox correction

    clicktag.addEventListener("mouseover", mouseEnter);
    clicktag.addEventListener("mouseout", mouseLeave);

    TweenMax.set(content, { width: bannerWidth, height: bannerHeight });
    TweenMax.set(".ad_size", { width: bannerWidth, height: bannerHeight });

    mTL = new TimelineMax();

    ctaPause();

    svgMustangShapeWrapper.innerHTML = svgMustangShapeString;
    svgLineWrapper.innerHTML = svgLineString;
    // set vectors styles    
    setSVGParams();

    init();
}



function initStage() {
    preInit();
}

// -------------------- (03) - images/styles load -------------------- //

function preloadingStagePoint_1() {
    createImages(function () {
        preLoadImages(initStage);
    })
}

function loadStyles() {
    var extCSS = document.createElement("link");
    extCSS.setAttribute("rel", "stylesheet");
    extCSS.setAttribute("type", "text/css");
    extCSS.setAttribute("href", "style.css");
    document.getElementsByTagName("head")[0].appendChild(extCSS);

    extCSS.onerror = preloadingStagePoint_1; extCSS.onload = preloadingStagePoint_1; // callback
}



function preloadingStage() {
    loadStyles();
}

// -------------------- (02) - DC/ST/polite load -------------------- //

function stLoad() {
    console.log("ready-Standalone");

    if (politeLoad) {
        if (document.readyState === "complete") {
            preloadingStage();
        } else {
            console.log("polite load - waiting for page load");
            setTimeout(function () {
                stLoad();
            }, 200);
        }
    } else {
        preloadingStage();
    }
}

function dcLoad() {
    if (Enabler.isInitialized()) {
        enablerInitHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
    }
}

function enablerInitHandler() {
    console.log("ready-DoubleClick");

    if (politeLoad) {
        if (Enabler.isPageLoaded()) {
            pageLoadedHandler();
        } else {
            Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
        }
    } else {
        preloadingStage();
    }
}

function pageLoadedHandler() {
    console.log("ready-polite");

    preloadingStage();
}

function start() {
    if (typeof TimelineMax !== 'undefined') {
        dcSelect ? dcLoad() : stLoad(); // inside script.js
    } else {
        console.log("TimelineMax is not defined, waiting for it");
        setTimeout(function () {
            start()
        }, 300);
    }
}


// ============================== modules and functions ============================== //

// ---------- preloadImages min v1.0 ---------- //
function preLoadImages(e) { if ("undefined" != typeof preloadImages) { var o = preloadImages.length; if (o) for (var a = [], n = 0, r = o; n < r; n++)a[n] = new Image, a[n].src = preloadImages[n], a[n].onerror = function () { o-- }, a[n].onload = function () { --o || e() }; else e() } else e() }

// ---------- createImages min - v1.0.1 ---------- //
function createImages(e, t) { function i(e, t) { t = document.getElementById(t); if (y) { var i = document.createElement("div"); i.setAttribute("id", e.id + "_wrap"), i.appendChild(e), t.appendChild(i) } else t.appendChild(e) } function n(e) { e = document.getElementById(e); var t = document.createElement(h); if (t.setAttribute("id", p), A && t.setAttribute("class", A), y) { var i = document.createElement("div"); i.setAttribute("id", p + "_wrap"), i.appendChild(t), e.appendChild(i) } else e.appendChild(t) } function a(e, t) { return e.reduce(function (e, i) { return e || (e = ""), e + (t.test(i) ? " " + /\w+/.exec(i)[0] : "") }, 0) } function l(e, t, i) { if (/\d/.test(t)) var n = /\d/.exec(t)[0], a = /\d+/.exec(t)[0].substring(1), l = a ? n + "." + a : n; else l = 2; document.getElementById(e).style.width = i / l + "px" } function s(e) { w = !0; var t = m[0].split(/\/(?=[^\/]+$)/); p = t[1], u = e } function r() { var e = /(?=[^\|]+$).*/.exec(m[1])[0]; e = e.match(/(\.\w+)|(\#\w+)|(\-\w+)/g), /\#\w+/.test(e) && (p = a(e, /\#/), p = /\w+/.exec(p)[0]), /\.\w+/.test(e) && function (e) { A = a(e, /\./), g && (f = (f += A).replace(/^\s/, "")), A = A.replace(/^\s/, "") }(e), /\-wrapper/.test(e) && (y = !0), /\-retina/.test(e) ? v = /\-retina\d*/.exec(e)[0] : /\-r/.test(e) && (v = /\-r\d*/.exec(e)[0]), u = w ? m[0] + "." + h : imgFolder + m[0] + "." + h } function d(e, t, a, d) { f = t; var o = e.length; if (o) for (var C = 0, x = o; C < x; C++) { if (m = e[C].split(/\.(.*)/), g = !!/^(jpg|png)/.test(m[1]), h = /^\w+/.exec(m[1])[0], /\//.test(m[0]) ? s(e[C]) : (p = m[0], u = d + e[C]), /\|/.test(m[1]) && r(), g) { var b = new Image; b.src = u, b.id = p, b.className = f, b.retinaSet = v, b.ii = e[C], i(b, a), b.onerror = function () { console.warn("input: " + this.ii + "\nid: " + this.id + " -> image with that id not found"), document.getElementById(this.id).style.display = "none", --o || c() }, b.onload = function () { this.retinaSet && l(this.id, this.retinaSet, this.naturalWidth), --o || c() } } else n(a), --o || c(); A = !1, f = t, w = !1, v = !1, y = !1 } else c() } function c() { o && --o || t() } var o; arguments.length < 2 && (t = arguments[0]), t && t instanceof Function || console.error("createImages(imgFolder_forAll, callback)\n-> At least a callback (one input parameter) must be specified."); var m, g, u, p, f, h, A = !1, w = !1, v = !1, y = !1; !function (e) { "undefined" == typeof imgFolder && (imgFolder = ""), "undefined" != typeof images && Array.isArray(images) && (imagesAll = [], imagesAllClass = [], imagesAllParent = [], imagesAll[0] = images); for (var t = 0, i = o = imagesAll.length; t < i; t++)imagesAllClass[t] || (imagesAllClass[t] = "image"), imagesAllParent[t] || (imagesAllParent[t] = "main"), t && !e && (imgFolder = ""), d(imagesAll[t], imagesAllClass[t], imagesAllParent[t], imgFolder) }(e) }
