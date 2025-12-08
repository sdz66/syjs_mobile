'use strict';



/**
 * add eventListener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");
const circle = document.querySelector("[data-circle]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  circle.style.animation = "none";
  document.body.classList.add("loaded");
});



/**
 * NAVBAR TOGGLER FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * 
 * add active class on header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", headerActive);


// ####

/**
 * add event on element
 */

const addEventOnelem = function (elem, type, callback) {
  if (!elem) return;
  if (elem.length) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    if (typeof elem.addEventListener === "function") {
      elem.addEventListener(type, callback);
    }
  }
}

/**
 * filter tab
 */

const tabCard = document.querySelectorAll("[data-tab-card]");

let lastTabCard = tabCard[0];

const navigateTab = function () {
  lastTabCard.classList.remove("active");
  this.classList.add("active");
  lastTabCard = this;
}

addEventOnelem(tabCard, "click", navigateTab);

if (typeof annotatedTexts !== "undefined" && annotatedTexts && typeof annotatedTexts.forEach === "function") {
  annotatedTexts.forEach(text => {
    const annotationBox = text.querySelector('.annotation-box');
    if (annotationBox) {
        text.addEventListener('click', function(e) {
            e.stopPropagation();
            annotationBox.classList.toggle('active');
        });
    }
  });
}


// 点击页面其他位置关闭批注框和语言下拉菜单
document.addEventListener('click', function() {
  if (typeof languageDropdown !== "undefined" && languageDropdown) {
      languageDropdown.style.display = 'none';
  }
  if (typeof annotatedTexts !== "undefined" && annotatedTexts && typeof annotatedTexts.forEach === "function") {
    annotatedTexts.forEach(text => {
        const annotationBox = text.querySelector('.annotation-box');
        if (annotationBox) {
            annotationBox.classList.remove('active');
        }
    });
  }
});
