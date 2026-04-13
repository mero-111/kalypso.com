const sheetIDFood = "1YmGnvamXY_j78zMujn7fEIuBH4S2Sd0EKVYwnpxNi50"; 
const sheetMapFood = {
  sandwichs: "sandwichs",
  meals: "meals",
  appetizers:"appetizers"
};


for (const [divID, sheetName] of Object.entries(sheetMapFood)) {
  const container = document.getElementById(divID);
  const categoryContainers = {};

  const url = `https://docs.google.com/spreadsheets/d/${sheetIDFood}/gviz/tq?sheet=${sheetName}&tqx=out:json`;

  fetch(url)
    .then(res => res.text())
    .then(data => {
      const json = JSON.parse(data.substring(47).slice(0, -2));
      const rows = json.table.rows;

      rows.forEach(row => {
        const classification = row.c[0]?.v || "";
        const titleEn = row.c[1]?.v || "";
        const price = row.c[2]?.v || "";
        const image = row.c[3]?.v || "";
        const discreption = row.c[4]?.v || "";

        if (!classification) return;

        if (!categoryContainers[classification]) {
          const section = document.createElement("div");
          section.className = "category-block";
          section.classList.add("organizeFoodMenu")
          section.dataset.type = classification;
          
          container.appendChild(section);

          categoryContainers[classification] = section;
        }

        const block = document.createElement("div");
        block.classList.add("content-block");

        block.innerHTML = `
          <div class="foodMenuStyle loader all_content menu-style ${classification}" data-type="${classification}">
    <div class="organizeIMG"><img src="https://lh3.googleusercontent.com/d/${image}"></div>
            <div class="discCONT">
              <h3>${titleEn}</h3>
            <details>
            <summary class = "summary">More</summary>
            <p>${discreption}</p>
          </details>
            <p class="price">${price} L.E</p>
            </div>
            <br>
  </div>
        `;
        
        categoryContainers[classification].appendChild(block);
      });
    })
    .catch(error => {
      console.error(`Error in ${sheetName}:`, error);
    });
}





function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}




function show(cls){
  menutextedTitle.classList.add("hidden")
  cls.classList.remove("hidden")
  menuCard.classList.add("hidden")
  MenuTit.style.backgroundImage = `url('photos/${cls.id}.jpg')`
  scrollToTop()
}

function hide(cls){
  menutextedTitle.classList.remove("hidden")
  scrollToTop()
  cls.classList.add("hidden")
  menuCard.classList.remove("hidden")
  MenuTit.style.backgroundImage = `url('photos/menu.jfif')`
}








