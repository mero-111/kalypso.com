const sheetID = "1YmGnvamXY_j78zMujn7fEIuBH4S2Sd0EKVYwnpxNi50"; 
const sheetMap = {
  coffee: "coffee",
  espresso: "espresso",
  hotDrink: "hotDrink",
  soda: "soda",
  mojito: "mojito",
  iceCoffee: "iceCoffee",
  frappe: "frappe",
  milkShake: "milkShake",
  juice: "juice",
  smoothie: "smoothie",
  mix: "mix",
  dessert: "dessert",
  shisha: "shisha"
};

const coffee = document.getElementById("coffee")
const hotDrink = document.getElementById("hotDrink")
const coldDrink = document.getElementById("coldDrink")
const juice = document.getElementById("juice")
const dessert = document.getElementById("dessert")
const shisha = document.getElementById("shisha")
const menuCard = document.querySelector(".menu-cards")
const MenuTit = document.getElementById("MenuTit")

for (const [divID, sheetName] of Object.entries(sheetMap)) {
  const container = document.getElementById(divID);
  const categoryContainers = {};

  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}&tqx=out:json`;

  fetch(url)
    .then(res => res.text())
    .then(data => {
      const json = JSON.parse(data.substring(47).slice(0, -2));
      const rows = json.table.rows;

      rows.forEach(row => {
        const classification = row.c[0]?.v || "";
        const titleEn = row.c[1]?.v || "";
        const price = row.c[2]?.v || "";
        const titleAr = row.c[3]?.v || "";
        const mixEn = row.c[4]?.v || "";
        const mixAr = row.c[5]?.v || "";

        // تجاهل الصف لو التصنيف فاضي
        if (!classification) return;

        if (!categoryContainers[classification]) {
          const section = document.createElement("div");
          section.className = "category-block";
          section.dataset.type = classification;

          // ✅ إضافة h2 لعرض اسم التصنيف
          const header = document.createElement("h2");
          header.textContent = classification;
          header.className = "loader";

          section.appendChild(header);
          container.appendChild(section);

          categoryContainers[classification] = section;
        }

        const block = document.createElement("div");
        block.classList.add("content-block");

        block.innerHTML = `
          <div class="loader all_content menu-style" data-type="${classification}">
            <div class="organizeEn"><h3>${titleEn}</h3><h4>${mixEn}</h4></div>
            <p class="price">${price} L.E</p>
            <div class="organizeAr"><h3>${titleAr}</h3><h4>${mixAr}</h4></div>
          </div>
          <br>
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

  cls.classList.remove("hidden")
  menuCard.classList.add("hidden")
  MenuTit.style.backgroundImage = `url('photos/${cls.id}.jpg')`
  scrollToTop()
  
}

function hide(cls){
  cls.classList.add("hidden")
  menuCard.classList.remove("hidden")
  MenuTit.style.backgroundImage = `url('photos/menu.jfif')`
}

//shesha