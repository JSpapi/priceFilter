const getData = async () => {
  const API_URL = "http://localhost:3000/fruits";

  try {
    const reqs = await fetch(API_URL);
    if (!reqs.ok) throw new Error("data is not received");
    const fruits = await reqs.json();

    createFruitsCard(fruits);
    const inputVal = document.getElementById("priceVal");
    inputVal.addEventListener("input", function () {
      const price = this.value;
      const priceBubble = document.querySelector(
        ".price__controller-slider span"
      );
      priceBubble.innerText = price;
      priceBubble.style.left = `${price - 8}%`;
    });

    inputVal.addEventListener("change", function () {
      const price = this.value;

      const newFruits = fruits.filter((fruit) => fruit.price >= +price);
      createFruitsCard(newFruits);
    });
  } catch (err) {
    alert(`сервер не отвечает: ${err.message}`);
    console.log(err);
  }
};

const createFruitsCard = (fruits) => {
  const tes = document.querySelector(".fruits__cards");
  if (fruits.length) {
    tes.innerHTML = fruits
      .map(
        ({ id, img, title, price }) =>
          `
      <articlie id="${id}" class="fruits__card">
            <div class="fruits__card-header">
              <img src="${img}" alt="${title}">
            </div>
            <div class="fruits__card-body">
              <p class="title">${title}</p>
              <p class="price">Price: <span>${price}$</span> </p>
            </div>
      </articlie>
    `
      )
      .join("");
      tes.style.gridTemplateColumns = `repeat(4, 1fr)`;
  } else {
    tes.style.gridTemplateColumns = `repeat(1, 1fr)`;
    tes.innerHTML = `<p class="warrning">пока нет фруктов с такой ценой</p>`;
  }
};

getData();
