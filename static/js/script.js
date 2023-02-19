function setSizesSlider() {
  const sliderContainer = document.querySelector(".slider__container")
  const slider = document.querySelector(".slider__block")
  const sliderLine = slider.querySelector(".slider__line")
  const sliderItems = slider.querySelectorAll(".slider__item")
  
  setCorrectStyle()

  function setCorrectStyle() {
    slider.style.width = (sliderContainer.clientWidth / 100 * 90) + "px"
    sliderItems.forEach(item => item.style.minWidth = slider.style.width)
    sliderLine.style.width = sliderItems[0].clientWidth * (sliderItems.length-1) + "px"
  }
}

function setInteractionsSlider() {
  const slider = document.querySelector(".slider__block")
  const sliderLine = slider.querySelector(".slider__line")

  const prev = slider.querySelector(".slider__prev")
  const next = slider.querySelector(".slider__next")

  let offset = slider.clientWidth
  let lineOffset = 0
  const maxOffset = offset * 2

  setHandlers()

  // touches

  let startX = null
  let endX = null
  slider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX
  })
  slider.addEventListener("touchend", (event) => {
    endX = event.changedTouches[0].clientX
    startX > endX ? moveNext() : movePrev()
  })

  function setHandlers() {
    prev.addEventListener("click", movePrev)
    next.addEventListener("click", moveNext)
  }

  function movePrev() {
    lineOffset += offset
    if (lineOffset > 0) lineOffset = -maxOffset
    sliderLine.style.left = lineOffset + "px"
  }

  function moveNext() {
    lineOffset += offset
    if (lineOffset > maxOffset) lineOffset = 0
    sliderLine.style.left = -lineOffset + "px"
  }
}

function setAnchors() {
  const anchors = document.getElementsByClassName("anchor")

  for (const anchor of anchors) {
    anchor.addEventListener("click", () => {
      const toNode = document.querySelector(`.${anchor.dataset.to}`)
      window.scrollTo({
        top: toNode.offsetTop - toNode.offsetTop/6,
        behavior: "smooth"
      })
    })
  }
}

function setSmoothScroll() {
  const anchors = document.querySelectorAll('.header__nav.nav .header__link');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      const toScroll = document.querySelector(anchor.getAttribute('href'));
      window.scrollTo({
        top: toScroll.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    });
  });
}

try {
  setSizesSlider()
  setInteractionsSlider()
  setAnchors()

  // set animation things
  setSmoothScroll();

  window.addEventListener("resize", setSizesSlider)
} catch(err) {

}

console.log = {};
console.warn = {};
console.error = {};