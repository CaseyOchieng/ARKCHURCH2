class App {
  constructor() {
    this.heroImages = [...document.querySelectorAll(".hero__images img")];
    this.texts = [...document.querySelectorAll(".text__effect")];
    console.log("Hero Images:", this.heroImages);
    console.log("Texts:", this.texts);
    this._initialize();
    this._render();
  }

  _initialize() {
    console.log("Initializing...");
    this._setInitialStates();
    this._createLenis();
    this._createIntro();
    this._createHero();
    this._createTextAnimation();
    this._createPinnedSection();
  }

  _setInitialStates() {
    gsap.set(".hero__title span, .fullwidth-image__text", {
      y: 32,
      opacity: 0,
    });

    gsap.set(".hero__images img", {
      opacity: 0,
      y: gsap.utils.random(50, 100),
    });

    gsap.set(".fullwidth-image img", {
      scale: 1.3,
    });
  }

  _createLenis() {
    // Ensure Lenis is properly initialized
    this.lenis = new Lenis({
      lerp: 0.1,
    });
    requestAnimationFrame(this._render.bind(this));
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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    this.heroImages.forEach((image) => {
      tl.to(
        image,
        {
          ease: "none",
          yPercent: gsap.utils.random(-100, -50),
        },
        0
      );
    });
  }

  _createTextAnimation() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".text-block",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    this.texts.forEach((text, index) => {
      const overlay = text.querySelector(".text__overlay");
      tl.to(overlay, {
        scaleX: 0,
      });
    });
  }

  _createPinnedSection() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".fullwidth-image",
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".fullwidth-image__overlay", {
      opacity: 0.4,
    })
      .to(
        ".fullwidth-image",
        {
          ease: "expo.out",
          "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        0
      )
      .to(
        ".fullwidth-image img",
        {
          scale: 1,
        },
        0
      )
      .to(
        ".fullwidth-image__text",
        {
          y: 0,
          opacity: 1,
          ease: "expo.out",
        },
        0
      );
  }

  _render(time) {
    if (this.lenis) {
      this.lenis.raf(time);
    }
    requestAnimationFrame(this._render.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});

// The Title changer
let title = document.title;
window.addEventListener("blur", () => {
  document.title = "Thank you for visiting us";
});

window.addEventListener("focus", () => {
  document.title = "Ark Youth Church";
});

// Leave it if you dont know how it works
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".join-us__button");

  button.addEventListener("mouseover", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 50; i++) {
      createParticle(x, y, button);
    }
  });

  function createParticle(x, y, container) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    container.appendChild(particle);

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.transform = `translate(-50%, -50%) translate(${
      Math.random() * 100 - 50
    }px, ${Math.random() * 100 - 50}px)`;

    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
});

// Link to gallery
function Linkstogallery() {
  window.location.href =
    "https://thearkyouthchurch.pixieset.com/stagesofdishonour/";
}
