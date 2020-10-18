const bannerWidth = 300;
const bannerHeight = 250;

const loopDuration = 10;
const pauseLastLoopAfter = 9.4; // end before fleet frame

const loopNumber = 3;

const whiteoutSpeed = 0.5;

const enableTerms = false;

const enableCtaPause = false;
const ctaPauseAfter = 30000;

const ctaSolid = false;



const preloadImages = [];

/*  imagesAll[[],[],[]] (or images[]) posiible parameters filled after the | (example: "bg.jpg|-retina.someClass")
    -retina, -r, -retina2, -r2 => make image in half size (divide by 2)
    -retina15, -r15 => half retina etc... (divide image size by 1.5) => -r05 (divide by 0.5 - make the image twice bigger)
    -wrapper => create self wrapper for this image/element (check the dev tools, how it looks)
    .someClass.someAnotherClass => add additional class (check the dev tools, how it looks)
    #differentID than file name
*/
const images = ["bg_1.jpg|-r", "bg_2.jpg|-r", "bg_3.jpg|-r", "bg_4.jpg|-r", "copy_1.png|-r", "copy_1b.png|-r", "copy_2.png|-r", "copy_2b.png|-r", "copy_4.png|-r", "copy_4b.png|-r", "copy_4c.png|-r", "copy_4d.png|-r"];


const tl_Frame = [];

tl_Frame[1] = function () {
    var tl = new TimelineMax();

    var f1 = 0.1,
        f2 = 2,
        f3 = 3.5,
        f4 = 6;
    var fadeTime = 1;

    // start parameters
    tl.set([bg_2, bg_3, bg_4, copy_1, copy_1b, copy_2, copy_2b, copy_4, copy_4b, copy_4c, copy_4d, cta_all], {
        opacity: 0
    }, 0);
    //    tl.set(terms_copy, {opacity: 0}, 0); //t
    //    tl.set(terms_btn, {display: "none"}, 0); //t


    // frame 1 ----------
    tl.to(bg_1, fadeTime, {
        opacity: 1,
        force3D: false
    }, 0);
    tl.to(copy_1, 0, {
        opacity: 1
    }, 1);
    tl.to(copy_1b, 0, {
        opacity: 1
    }, 1.2);


    // frame 2 ----------
    tl.to([copy_1, copy_1b], fadeTime, {
        opacity: 0
    }, f2);

    tl.to([bg_2], fadeTime, {
        opacity: 1,
        force3D: false
    }, f2);
    tl.to(copy_2, 0, {
        opacity: 1
    }, f2 + 1);
    tl.to(copy_2b, 0, {
        opacity: 1
    }, f2 + 1.2);

    tl.to(bg_3, fadeTime, {
        opacity: 1,
        force3D: false
    }, f3);


    // frame 5 ----------
    tl.to([copy_2, copy_2b,], fadeTime, {
        opacity: 0
    }, f4);

    tl.to(bg_4, fadeTime, {
        opacity: 1,
        force3D: false
    }, f4);
    tl.to(copy_4b, 0, {
        opacity: 1
    }, f4 + 1);

    tl.to(copy_4c, 0, {
        opacity: 1
    }, f4 + 1.2);
    tl.to(copy_4, 0, {
        opacity: 1
    }, f4 + 1.4);

    tl.to(copy_4d, 0, {
        opacity: 1
    }, f4 + 1.6);


    tl.to(cta_all, fadeTime, {
        opacity: 1
    }, f4 + 1.8);

    //    tl.to(terms_copy, 0.5, {opacity: 1}, f5 + 2*fadeTime); //t
    //    tl.set(terms_btn, {display: "block"}); //t




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
    cta_2_bg.style.opacity = 1;

    if (!ctaSolid) {
        var cta_1 = document.getElementById("cta_1");
        cta_1.style.opacity = 0;

        var cta_2 = document.getElementById("cta_2");
        cta_2.style.opacity = 1;
    }
}

function mouseLeave() {
    var cta_2_bg = document.getElementById("cta_2_bg");
    cta_2_bg.style.opacity = 0;

    if (!ctaSolid) {
        var cta_1 = document.getElementById("cta_1");
        cta_1.style.opacity = 1;

        var cta_2 = document.getElementById("cta_2");
        cta_2.style.opacity = 0;
    }
}

function termsEnter() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_over 0.3s 0s linear forwards";

    mouseEnter(); // cta on state
    animationsPause();
}

function termsLeave() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_out 0.3s 0s linear forwards";

    if (!stopAnimations) {
        animationsPlay()
    }
}

// ============================== others ============================== //










// ============================== Do not edit ============================== //

var mTL, content, loopCount = 1,
    stopAnimations = false,
    ctaStop = false;

// --- preloading images
if (enableTerms) preloadImages.push("terms_overlay.png");
if (!ctaSolid) preloadImages.push("cta_2.png");
// --- end preloading images



// -------------------- special functions -------------------- //

function ctaInit() {
    const cta_all = document.getElementById("cta_all");
    const cta_1 = document.getElementById("cta_1");

    cta_1.src = "cta_1.png";
    cta_1.onload = function () {
        cta_all.style.height = cta_1.naturalHeight + "px";
        cta_all.style.width = cta_1.naturalWidth + "px";
    }

    //cta text 2
    if (!ctaSolid) {
        const cta_2 = document.createElement("img");
        cta_2.setAttribute("src", "cta_2.png");
        cta_2.setAttribute("id", "cta_2");
        cta_2.setAttribute("class", "cta_position");
        cta_all.appendChild(cta_2);
    }
}

function ctaPause() {
    if (enableCtaPause) {
        setTimeout(function () {
            mouseLeave();
            ctaStop = true;
        }, ctaPauseAfter);
    }
}



// -------------------- (05) - main animation -------------------- //

function startMainTimeLine() {
    stopwatch.start();
    for (var i = 1, l = tl_Frame.length; i < l; i++) {
        mTL.add(tl_Frame[i]());
    }

    mTL.to(whiteout, whiteoutSpeed, {
        opacity: 0,
        onComplete: stopWhiteout
    }, 0);
    mTL.to(whiteout, whiteoutSpeed, {
        opacity: 1
    }, loopDuration - whiteoutSpeed);

    mTL.set({}, {
        onComplete: pauseMainTimeLine
    }, pauseLastLoopAfter);
    mTL.set({}, {
        onComplete: resetMainTimeLine
    }, loopDuration);

    // --- new loop terms bugFix --- //
    mTL.add(function () {
        if (enableTerms) {
            terms_btn.style.pointerEvents = "auto"
        }
    }, 0);
    mTL.add(function () {
        if (loopNumber != loopCount && enableTerms) {
            terms_btn.style.pointerEvents = "none"
        }
    }, loopDuration - 0.3);
}

function stopWhiteout() {
    if (loopCount == loopNumber) {
        TweenMax.killTweensOf(whiteout)
    }
}

function pauseMainTimeLine() {
    if (loopCount == loopNumber) {
        stopAnimations = true;
        animationsPause();
        console.log("animation stop");
        stopwatch.stop();
    }
}

function resetMainTimeLine() {
    if (loopCount != loopNumber) {
        loopCount++;
        mTL.restart();
    }
}

function animationsPause() {
    mTL.pause()
}

function animationsPlay() {
    mTL.play()
}



// -------------------- (04) - init -------------------- //

function init() {
    content = document.getElementById("content"); // firefox correction
    TweenMax.set(content, {
        width: bannerWidth,
        height: bannerHeight
    });
    TweenMax.set(".ad_size", {
        width: bannerWidth,
        height: bannerHeight
    });

    // --- image polite load
    plinth.style.backgroundImage = "url(logo.png)";
    // --- image polite load - end

    if (enableTerms) {
        terms_overlay.style.backgroundImage = "url(terms_overlay.png)";
        terms_btn.style.pointerEvents = "auto";
    }

    mTL = new TimelineMax();

    content.style.opacity = 1;

    ctaPause();
    ctaInit();
    startMainTimeLine();
}



// -------------------- (03) - images/styles load -------------------- //
function initStage() {
    init();
}

function loadStyles() {
    var extCSS = document.createElement("link");
    extCSS.setAttribute("rel", "stylesheet");
    extCSS.setAttribute("type", "text/css");
    extCSS.setAttribute("href", "style.css");
    document.getElementsByTagName("head")[0].appendChild(extCSS);

    extCSS.onerror = initStage;
    extCSS.onload = initStage; // callback
}

function preloadingStage() {

    createImages(function () {
        preLoadImages(loadStyles);
    })

}



// -------------------- (02) - DC/ST/polite load -------------------- //
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







// ============================== modules and functions ============================== //

// ---------- preloadImages min v1.0 ---------- //
function preLoadImages(e) {
    if ("undefined" != typeof preloadImages) {
        var o = preloadImages.length;
        if (o)
            for (var a = [], n = 0, r = o; n < r; n++) a[n] = new Image, a[n].src = preloadImages[n], a[n].onerror = function () {
                o--
            }, a[n].onload = function () {
                --o || e()
            };
        else e()
    } else e()
}
// ---------- createImages min - v1.0 ---------- //
function createImages(e, t) {
    function i(e, t) {
        t = document.getElementById(t);
        if (y) {
            var i = document.createElement("div");
            i.setAttribute("id", e.id + "_wrap"), i.appendChild(e), t.appendChild(i)
        } else t.appendChild(e)
    }

    function n(e) {
        e = document.getElementById(e);
        var t = document.createElement(h);
        if (t.setAttribute("id", f), A && t.setAttribute("class", A), y) {
            var i = document.createElement("div");
            i.setAttribute("id", f + "_wrap"), i.appendChild(t), e.appendChild(i)
        } else e.appendChild(t)
    }

    function a(e, t) {
        return e.reduce(function (e, i) {
            return e || (e = ""), e + (t.test(i) ? " " + /\w+/.exec(i)[0] : "")
        }, 0)
    }

    function s(e, t, i) {
        if (/\d/.test(t)) {
            first = /\d/.exec(t)[0], other = /\d+/.exec(t)[0].substring(1);
            var n = other ? first + "." + other : first
        } else n = 2;
        document.getElementById(e).style.width = i / n + "px"
    }

    function l(e) {
        w = !0;
        var t = m[0].split(/\/(?=[^\/]+$)/);
        f = t[1], u = e
    }

    function r() {
        var e = /(?=[^\|]+$).*/.exec(m[1])[0];
        e = e.match(/(\.\w+)|(\#\w+)|(\-\w+)/g), /\#\w+/.test(e) && (f = a(e, /\#/), f = /\w+/.exec(f)[0]), /\.\w+/.test(e) && function (e) {
            A = a(e, /\./), g && (p = (p += A).replace(/^\s/, "")), A = A.replace(/^\s/, "")
        }(e), /\-wrapper/.test(e) && (y = !0), /\-retina/.test(e) ? v = /\-retina\d*/.exec(e)[0] : /\-r/.test(e) && (v = /\-r\d*/.exec(e)[0]), u = w ? m[0] + "." + h : imgFolder + m[0] + "." + h
    }

    function d(e, t, a, d) {
        p = t;
        var c = e.length;
        if (c)
            for (var C = 0, x = c; C < x; C++) {
                if (m = e[C].split(/\.(.*)/), g = !!/^(jpg|png)/.test(m[1]), h = /^\w+/.exec(m[1])[0], /\//.test(m[0]) ? l(e[C]) : (f = m[0], u = d + e[C]), /\|/.test(m[1]) && r(), g) {
                    var E = new Image;
                    E.src = u, E.id = f, E.className = p, E.retinaSet = v, E.ii = e[C], i(E, a), E.onerror = function () {
                        console.warn("input: " + this.ii + "\nid: " + this.id + " -> image with that id not found"), document.getElementById(this.id).style.display = "none", --c || o()
                    }, E.onload = function () {
                        this.retinaSet && s(this.id, this.retinaSet, this.width), --c || o()
                    }
                } else n(a), --c || o();
                A = !1, w = !1, v = !1, y = !1
            } else o()
    }

    function o() {
        c && --c || t()
    }
    var c;
    arguments.length < 2 && (t = arguments[0]);
    var m, g, u, f, p, h, A = !1,
        w = !1,
        v = !1,
        y = !1;
    ! function (e) {
        "undefined" == typeof imgFolder && (imgFolder = ""), "undefined" != typeof images && Array.isArray(images) && (imagesAll = [], imagesAllClass = [], imagesAllParent = [], imagesAll[0] = images);
        for (var t = 0, i = c = imagesAll.length; t < i; t++) imagesAllClass[t] || (imagesAllClass[t] = "image"), imagesAllParent[t] || (imagesAllParent[t] = "main"), t && e && (imgFolder = ""), d(imagesAll[t], imagesAllClass[t], imagesAllParent[t], imgFolder)
    }(e)
}