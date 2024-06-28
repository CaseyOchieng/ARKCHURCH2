gsap.registerPlugin(ScrollTrigger);

let images = gsap.utils.toArray("img");
let text = gsap.utils.toArray(".st0");
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".animated",
    start: "top center",
    end: "bottom bottom",
    scrub: 2,
  },
});

images.forEach((image) => {
  gsap.to(image, {
    yPercent: -100 * image.dataset.speed,
    ease: "none",
    scrollTrigger: {
      scrub: image.dataset.speed,
    },
  });
});
tl.to(text, {
  strokeDashoffset: 0,
}).to(text, {
  strokeDashoffset: 470,
});

// smooth scrolling

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
lenis.on("scroll", (e) => {
  console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// smooth scrolling

// The Title changer
let title = document.title;
window.addEventListener("blur", () => {
  document.title = title = "Thank you for visiting us";
});
//Leave it if you dont know how it works
window.addEventListener("focus", () => {
  document.title = title = "Ark Youth Church";
});
