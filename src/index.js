import { animate, scroll, inView } from 'https://cdn.skypack.dev/@motionone/dom';

const projects = document.querySelectorAll("li");
const lottieFiles = [
    { id: 'lottie1', path: './public/computer.json' },
    { id: 'lottie2', path: './public/globe.json' }
];

/** function for smooth background color transitions */
const sections = document.querySelectorAll(".hasBackground");
sections.forEach((section, index) => {
  const nextSection = sections[index + 1];
  if (nextSection) {
    scroll(
      animate(section, {
        backgroundColor: [section.dataset.bgcolor, nextSection.dataset.bgcolor]
      }),
      {
        target: section,
        offset: ["0 100%", "100% 100%"]
      }
    );
  }
});

/** function for main progress bar */
scroll(
  animate(".progress-bar", { scaleX: [0, 1] })
);

/** function for title and subtitle animation */
inView('.content', ({ target }) => {
  animate(target.querySelectorAll("h1"), {
    height: ["0", "150px"],
    transform: "none"
  },
  {duration: 1.5 });
});

/** function for animating the main section's subtitle */
animate("#subtitle", { opacity: 1 }, { duration: 5, easing: "ease-out" });

/** function for loading & displaying lottiefiles */
lottieFiles.forEach(file => {
    lottie.loadAnimation({
        container: document.getElementById(file.id),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: file.path
    });
});

/** function for translating lottiefiles */
const lotties = ["lottie1", "lottie2"];
const fadeStart = 0; //start moving immediately as you start scrolling
const fadeEnd = 600; //fully moved off-screen after 600px of scrolling
const moveDistance = 600;
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    lotties.forEach((id, index) => {
        const element = document.getElementById(id);
        const progress = Math.min(1, Math.max(0, (scrollPosition - fadeStart) / (fadeEnd - fadeStart)));
        //update position
        const direction = index === 0 ? -1 : 1; //move left for first element, right for second
        element.style.transform = `translateX(${direction * progress * moveDistance}px)`;
    });
});

/** function for 'my work' projects horizontal scroll */
scroll(
  animate("ul", {
    transform: ["none", `translateX(-${projects.length - 1}00vw)`]
  }),
  { target: document.querySelector("section") }
);

/** function for 'my work' projects titles */
const segmentLength = 1 / projects.length;
projects.forEach((project, i) => {
  const header = project.querySelector("h2");
  scroll(animate(header, { x: [200, -200] }), {
    target: document.querySelector("section"),
    offset: [
      [i * segmentLength, 1],
      [(i + 1) * segmentLength, 0]
    ]
  });
});

/** function for progress bar for 'my work' section */
scroll(animate(".projectProgressBar", { scaleX: [0, 1] }), {
  target: document.querySelector("section")
});
