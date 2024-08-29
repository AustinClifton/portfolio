const colors = ['#57eb64', '#fbff00', '#ca122b', '#0099CC', '#F76902'];
const getRandomColor = (colors) => colors[Math.floor(Math.random() * colors.length)];
const getRandom = (min, max) => Math.random() * (max - min) + min;

/** function to generate a non-overlapping position in a container */
function getNonOverlappingPosition(existingPositions, itemWidth, itemHeight) {
  const maxTop = document.documentElement.clientHeight - itemHeight;
  const maxLeft = document.documentElement.clientWidth - itemWidth;

  let top, left;
  let attempts = 0;
  
  do {
    top = getRandom(0, maxTop);
    left = getRandom(0, maxLeft);
    attempts++;
  } while (
    existingPositions.some(
      (p) => Math.abs(top - p.top) < itemHeight && Math.abs(left - p.left) < itemWidth
    ) && attempts < 1000000
  );

  return { top, left };
}

/** function used to initialize scroll-tracked containers */
function initializeScrollContainer(containerId) {
  const container = document.getElementById(containerId);
  const items = container.querySelectorAll('.skillItem, .classItem');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = entry.intersectionRatio;
      } else {
        entry.target.style.opacity = 0;
      }
    });
  }, {
    threshold: [0.2, 0.4, 0.6, 0.8, 1]
  });

  const positions = [];
  items.forEach((item, index) => {
    item.style.color = getRandomColor(colors);
    if (container.id.startsWith('scroll2')) {
      item.style.fontSize = `${getRandom(2, 2.5)}em`;
    } else {
      item.style.fontSize = `${getRandom(2.5, 5)}em`;
    }

    const itemHeight = item.clientHeight;
    const itemWidth = item.clientWidth;
    const { top, left } = getNonOverlappingPosition(positions, itemWidth, itemHeight);
    positions.push({ top, left });

    item.style.top = `${top}px`;
    item.style.left = `${left}px`;

    observer.observe(item);
    item.style.transition = 'opacity 0.15s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
  });
}

// Initialize scroll1 and scroll2
initializeScrollContainer('scroll1');
initializeScrollContainer('scroll2');
