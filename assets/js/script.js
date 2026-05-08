'use strict';
console.log("Welcome to Jenish's Portfolio!");



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectBox = select ? select.closest(".filter-select-box") : null;
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
    if (selectBox) elementToggleFunc(selectBox);
  });
}

// close select when clicking outside
document.addEventListener("click", function (e) {
  if (select && selectBox && !selectBox.contains(e.target)) {
    select.classList.remove("active");
    selectBox.classList.remove("active");
  }
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) {
      select.classList.remove("active");
      if (selectBox) selectBox.classList.remove("active");
    }
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// =============================================
// SCROLL-REVEAL ANIMATION (improved stagger)
// =============================================
const revealElements = document.querySelectorAll(
  ".service-item, .timeline-item, .skills-section, .project-item, .skills-tags-list"
);

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, index) {
    if (entry.isIntersecting) {
      setTimeout(function () {
        entry.target.classList.add("revealed");
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealElements.forEach(function (el) {
  el.classList.add("reveal-on-scroll");
  revealObserver.observe(el);
});


// =============================================
// PROJECT CARD 3D TILT EFFECT
// =============================================
const projectCards = document.querySelectorAll(".project-item > a");

projectCards.forEach(function (card) {
  card.addEventListener("mousemove", function (e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = "perspective(600px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});