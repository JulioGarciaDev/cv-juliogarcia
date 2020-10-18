var bannerWidth = 300;
var bannerHeight = 250;
var loopDuration = 14;
var pauseLastLoopAfter = 14;
var loopNumber = 3;
var whiteoutSpeed = 1;
var enableTerms = false;
var enableCtaPause = false;
var ctaPauseAfter = 30000;
var ctaSolid = false;

var preloadImages = [];

var f1 = 0,
    f2 = 4,
    f3 = 7;


var images = ["bg.jpg", "copy_1.png", "copy_2.png", "ford_service.png"];

var tl_Frame = [];

tl_Frame[1] = function () {
    var tl = new TimelineMax();

    // start parameters
    tl.set([copy_1, copy_2], { opacity: 0 }, 0);
    tl.set(terms_btn, { display: "none" }, 0);
    tl.set(bg, { scale: .47, x: 0, y: 0, ease: Power0.easeNone, force3D: true }, 0);

    // frame 1
    //tl.to(blue_bg, 0, {opacity:1, ease: Power0.easeNone},0);
    tl.to(bg, 6.8, { scale: .5, x: -26, y: -7, ease: Power0.easeNone, force3D: true }, 0);
    tl.to(bg, 0.5, { opacity: 1 }, 0);
    tl.to(copy_1, 0.5, { opacity: 1 }, 0);

    tl.to([copy_1], 1, { opacity: 0 }, f1 + 3.5);

    // frame 2
    //tl.to(blue_bg, 0.5, {opacity:1, ease: Power0.easeNone},f3);
    tl.to(copy_2, 1, { opacity: 1 }, f2 + 0.8);


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
    var cta_2_bg = document.getElementById("cta_2_bg");
    cta_2_bg.style.animation = "cta_animation_in 0.01s 0s linear forwards";

    if (!ctaSolid) {
        var cta_1 = document.getElementById("cta_1");
        cta_1.style.animation = "cta_animation_out 0.01s 0s linear forwards";

        var cta_2 = document.getElementById("cta_2");
        cta_2.style.animation = "cta_animation_in 0.01s 0s linear forwards";
    }
}

function mouseLeave() {
    var cta_2_bg = document.getElementById("cta_2_bg");
    cta_2_bg.style.animation = "cta_animation_out 0.01s 0s linear forwards";


    if (!ctaSolid) {
        var cta_1 = document.getElementById("cta_1");
        cta_1.style.animation = "cta_animation_in 0.01s 0s linear forwards";

        var cta_2 = document.getElementById("cta_2");
        cta_2.style.animation = "cta_animation_out 0.01s 0s linear forwards";
    }
}

function termsEnter() {
    //   TweenMax.to([headline, bulletpoint_01, bulletpoint_02, bulletpoint_03, price, ford_service], .1, {opacity: 0});

    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_over 0.3s 0s linear forwards";

    mouseEnter(); // cta on state
    animationsPause();
}

function termsLeave() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_out 0.3s 0s linear forwards";

    TweenMax.to([headline, bulletpoint_01, bulletpoint_02, bulletpoint_03, price, ford_service], .1, { opacity: 1 });

    if (!stopAnimations) { animationsPlay() }
}

// ============================== others ============================== //









// ============================== Do not edit ============================== //

var mTL, content, loopCount = 1, stopAnimations = false, ctaStop = false;

// preloading images
if (!preloadImages) var preloadImages = [];
if (enableTerms) preloadImages.push("terms_overlay.png");
if (!ctaSolid) preloadImages.push("cta_2.png");
preloadImages.push("cta_1.png", "cta_2.png");



// ---------- special functions ---------- //

function ctaPause() {
    if (enableCtaPause) {
        setTimeout(function () {
            mouseLeave();
            ctaStop = true;
        }, ctaPauseAfter);
    }
}



// ---------- (05) - main animation ---------- //

function startMainTimeLine() {
    for (var i = 1; i < tl_Frame.length; i++) {
        mTL.add(tl_Frame[i]());
        stopwatch.start();
    }


    mTL.to(whiteout, whiteoutSpeed, { opacity: 0, onComplete: runWhiteout }, 0);
    mTL.to(whiteout, whiteoutSpeed, { opacity: 1 }, loopDuration - whiteoutSpeed);

    mTL.set({}, { onComplete: pauseMainTimeLine }, pauseLastLoopAfter);
    mTL.set({}, { onComplete: resetMainTimeLine }, loopDuration);
}

function runWhiteout() {
    if (loopCount == loopNumber) { TweenMax.killTweensOf(whiteout) }
}

function pauseMainTimeLine() {
    if (loopCount == loopNumber) {
        console.log("animation stop");
        stopwatch.stop();
        stopAnimations = true;
        animationsPause();
        TweenMax.killAll();
    }
}

function resetMainTimeLine() {
    if (loopCount != loopNumber) {
        loopCount++;
        mTL.restart();
    }
}

function animationsPause() {
    mTL.pause();
}

function animationsPlay() {
    mTL.play();
}



// ---------- (04) - init ---------- //

function init() {


    // cta autoadjusting ------------------------------------------------------------ start


    //cta text 2
    if (!ctaSolid) {
        const cta_2 = document.createElement("img");
        cta_2.setAttribute("src", "cta_2.png");
        cta_2.setAttribute("id", "cta_2");
        cta_2.setAttribute("class", "cta_position");
        cta_all.appendChild(cta_2);
    }

    if (!ctaSolid) cta_2.setAttribute("src", "cta_2.png");

    // cta autoadjusting ------------------------------------------------------------ end

    content = document.getElementById("content");
    var ad_size = document.querySelectorAll(".ad_size");

    TweenMax.set([content, main, clicktag], { width: bannerWidth, height: bannerHeight });
    TweenMax.set(border, { width: bannerWidth - 2, height: bannerHeight - 2 });

    plinth.style.backgroundImage = "url(plinth.png)";

    if (enableTerms) {
        terms_overlay.style.backgroundImage = "url(terms_overlay.png)";
        terms_btn.style.display = "block";
    }

    TweenMax.set(".ad_size", { width: bannerWidth, height: bannerHeight });

    mTL = new TimelineMax({ repeat: loopNumber - 1 });

    content.style.display = "block";

    ctaPause();


    startMainTimeLine();

}



// ---------- (03) - images/styles load ---------- //
function initStage() {



    init();
}

function loadStyles() {
    var extCSS = document.createElement("link");
    extCSS.setAttribute("rel", "stylesheet");
    extCSS.setAttribute("type", "text/css");
    extCSS.setAttribute("href", "style.css");
    document.getElementsByTagName("head")[0].appendChild(extCSS);

    extCSS.onerror = initStage; extCSS.onload = initStage; // callback
}

function preLoadImages() {
    // preload images inside array preloadImages
    var newImages = [], l = preloadImages.length;
    for (var i = 0; i < preloadImages.length; i++) {
        newImages[i] = new Image();
        newImages[i].src = preloadImages[i];
        newImages[i].onerror = function () { l-- }
        newImages[i].onload = function () {
            if (!--l) {
                loadStyles(); // <- callback
            }
        }
    } if (!l) loadStyles(); // <- callback if array empty
}

function createImages() {
    function initImage(id, src) {
        var image = document.createElement("img");
        image.setAttribute("id", id);
        image.setAttribute("class", "image");
        image.setAttribute("src", src);
        main.appendChild(image);
    }
    var newImages = [], l = images.length
    for (var i = 0; i < images.length; i++) {
        var imageId = images[i].split(".");
        initImage(imageId[0], images[i]);

        // preload images inside array images
        newImages[i] = new Image();
        newImages[i].src = images[i];
        newImages[i].onerror = function () { l--; document.getElementById(this.attributes.src.value.slice(0, -4)).style.display = "none" }
        newImages[i].onload = function () {
            if (!--l) {
                preLoadImages(); // <- callback
            }
        }
    } if (!l) preLoadImages(); // <- callback if array empty
}



// ---------- (02) - DC/ST/polite load ---------- //
function preloadingStage() {
    createImages();
    //    preLoadImages(); // if skip createImages
}

function stLoad() {
    console.log("ready-Standalone");

    preloadingStage();
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



// ---------- (01) - first stage ---------- //
window.onload = function start() {
    if (typeof TimelineMax !== 'undefined') {

        if (dcSelect) {
            dcLoad();
        } else {
            stLoad();
        }

    } else {
        console.log("TimelineMax is not defined, trying to reload");
        setTimeout(function () {
            start();
        }, 200);
    }
}