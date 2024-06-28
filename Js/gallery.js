class App {
  constructor() {
    this.heroImages = [...document.querySelectorAll(".hero__images img")];
    this._initialize();
    this._render();
  }

  _initialize() {
    this._setInitialStates();
    this._createLenis();
    this._createIntro();
    this._createHero();
  }

  _setInitialStates() {
    gsap.set(".hero__title span, .text__effect p, .fullwidth-image__text", {
      y: 32,
      opacity: 0,
    });

    gsap.set(".hero__images img", {
      opacity: 0,
      y: gsap.utils.random(100, 50),
    });

    gsap.set(".fullwidth-image img", {
      scale: 1.3,
    });
  }

  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.1,
    });
  }

  _createIntro() {
    const tl = gsap.timeline();

    tl.to(".hero__title div", {
      opacity: 1,
    })
      .to(".hero__title span", {
        y: 0,
        opacity: 1,
        ease: "expo.out",
        duration: 2,
        stagger: 0.01,
      })
      .to(
        ".hero__images img",
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 2,
          stagger: 0.04,
        },
        0.5
      );
  }
  _createHero() {
    const tl = gsap.timeline();

    this.heroImages.forEach((image) => {
      tl.to(image, {
        ease: "none",
        yPercent: gsap.utils.random(-100, -50),
      });
    });
  }

  _render(time) {
    this.lenis.raf(time);

    requestAnimationFrame(this._render.bind(this));
  }
}

new App();

// The Title changer
let title = document.title;
window.addEventListener("blur", () => {
  document.title = title = "Thank you for visiting us";
});
//Leave it if you dont know how it works
window.addEventListener("focus", () => {
  document.title = title = "Ark Youth Church";
});
