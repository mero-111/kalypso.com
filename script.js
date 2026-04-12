const sheetIDFood = "1YmGnvamXY_j78zMujn7fEIuBH4S2Sd0EKVYwnpxNi50";
const sheetName = "slider";

const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetIDFood}/gviz/tq?sheet=${sheetName}&tqx=out:json`;

const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots");

let images = [];
let dots = [];
let currentIndex = 0;

const style = document.createElement("style");
style.innerHTML = `
  #slider::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {

    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;

    rows.forEach((row, i) => {

      const imageId = row.c[0]?.v;
      if (!imageId) return;

      const img = document.createElement("img");

      img.src = `https://lh3.googleusercontent.com/d/${imageId}`;

      img.style.minWidth = "100%";
      img.style.flexShrink = "0";
      img.style.display = "block";
      img.style.scrollSnapAlign = "start";
      

      slider.appendChild(img);
      images.push(img);

      const dot = document.createElement("span");
      dot.style.height = "10px";
      dot.style.width = "10px";
      dot.style.margin = "5px";
      dot.style.display = "inline-block";
      dot.style.borderRadius = "50%";
      dot.style.background = i === 0 ? "#452512" : "#e2cda6";
      dot.style.cursor = "pointer";

      dot.onclick = () => {
        slider.scrollTo({
          left: i * slider.clientWidth,
          behavior: "smooth"
        });
      };

      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    startAutoSlide();
  });

slider.addEventListener("scroll", () => {
  const index = Math.floor((slider.scrollLeft + 10) / slider.clientWidth);

  if (dots[index] && index !== currentIndex) {
    dots[currentIndex].style.background = "#e2cda6";
    dots[index].style.background = "#452512";
    currentIndex = index;
  }
});

// Auto slide
function startAutoSlide() {
  setInterval(() => {
    if (images.length === 0) return;

    currentIndex = (currentIndex + 1) % images.length;

    slider.scrollTo({
      left: currentIndex * slider.clientWidth,
      behavior: "smooth"
    });

  }, 3000);
}
