const deliveryPrices = {
  "Москва (в пределах садового кольца)": { price: 100, time: 15 },
  "Москва (в пределах ТТК)": { price: 150, time: 30 },
  "Москва (в пределах МКАД)": { price: 200, time: 50 },
  "МО (в пределах ЦКАД)": { price: 600, time: 120 },
};

// Обработчик формы доставки
document.querySelector(".adres").addEventListener("submit", function (e) {
  e.preventDefault();

  // Проверяем, что выбран план питания и продолжительность
  if (selectedCalorieOption === null || selectedDuration === null) {
    alert("Пожалуйста, сначала выберите план питания и продолжительность");
    return;
  }

  const currentKcal = calorieOptions[selectedCalorieOption].kcal;
  const prices = priceOptions[currentKcal];
  const zoneSelect = document.querySelector(".adres select");
  const selectedZone = zoneSelect.options[zoneSelect.selectedIndex].text;

  // Получаем данные о доставке
  const delivery = deliveryPrices[selectedZone];

  // Рассчитываем стоимость
  let totalPrice;
  let durationText;

  if (selectedDuration === "trial") {
    totalPrice = prices.trial + delivery.price;
    durationText = "2 дня";
  } else {
    const durationPrices = {
      week: prices.week,
      twoWeeks: prices.twoWeeks,
      threeWeeks: prices.threeWeeks,
      fourWeeks: prices.fourWeeks,
    };
    totalPrice = durationPrices[selectedDuration] + delivery.price;

    // Текст продолжительности
    const durationTexts = {
      week: "1 неделю",
      twoWeeks: "2 недели",
      threeWeeks: "3 недели",
      fourWeeks: "4 недели",
    };
    durationText = durationTexts[selectedDuration];
  }

  // Формируем результат
  let resultHTML = `
    <div class="delivery-result">
      <p>Стоимость подписки с учётом выбранного плана питания и адреса на ${durationText} составит <strong>${totalPrice}₽/день</strong></p>
      <p>Доставка от ресторана займет примерно <strong>${delivery.time} минут</strong></p>
    </div>
  `;

  // Отображаем результат - можно добавить перед кнопкой "Рассчитать"
  const existingResult = document.querySelector(".delivery-result");
  if (existingResult) {
    existingResult.innerHTML = resultHTML;
  } else {
    const form = document.querySelector(".adres");
    const resultDiv = document.createElement("p");
    resultDiv.className = "delivery-result";
    resultDiv.innerHTML = resultHTML;
    form.appendChild(resultDiv);
  }
});

// Добавляем стили для отображения результата
const style = document.createElement("style");
style.textContent = `
  .delivery-result {
    flex-direction: column;
  }
`;
document.head.appendChild(style);
// BMR
function calculateBMR(weight, height, age, gender) {
  if (gender === "М") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

document.querySelector(".calculate-btn").addEventListener("click", function () {
  const weightInput = document.querySelectorAll(".form-input")[0];
  const heightInput = document.querySelectorAll(".form-input")[1];
  const ageInput = document.querySelectorAll(".form-input")[2];
  const activitySelect = document.querySelectorAll(".form-select")[0];
  const goalSelect = document.querySelectorAll(".form-select")[1];

  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  const age = parseInt(ageInput.value);
  const activity = activitySelect.value;
  const goal = goalSelect.value;

  if (isNaN(weight) || isNaN(height) || isNaN(age) || !activity || !goal) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  let activityMultiplier = 1.2; // Низкая
  if (activity === "Средняя") activityMultiplier = 1.55;
  if (activity === "Высокая") activityMultiplier = 1.725;

  const BMR = calculateBMR(
    weight,
    height,
    age,
    document.querySelectorAll('.gender-selection input[type="checkbox"]')[0]
      .checked
      ? "М"
      : "Ж"
  );

  let calories = BMR * activityMultiplier;

  if (goal === "Похудение") {
    calories = 0.85 * calories; // дефицит
  } else if (goal === "Набор массы") {
    calories = 1.15 * calories; // избыток
  }

  calories = Math.round(calories);

  document.getElementById("calorieResult").textContent = calories;

  const modal = document.getElementById("calorieModal");
  modal.style.display = "flex";
});

function closeModal() {
  document.getElementById("calorieModal").style.display = "none";
}

document.querySelector(".close").addEventListener("click", closeModal);
document.getElementById("closeModalBtn").addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  const modal = document.getElementById("calorieModal");
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const maleBtn = document.getElementById("maleBtn");
  const femaleBtn = document.getElementById("femaleBtn");

  maleBtn.addEventListener("click", function () {
    maleBtn.classList.add("active");
    femaleBtn.classList.remove("active");
  });

  femaleBtn.addEventListener("click", function () {
    femaleBtn.classList.add("active");
    maleBtn.classList.remove("active");
  });
});
// Данные о калорийности
const calorieOptions = [
  { kcal: 900, dishes: 3 },
  { kcal: 1250, dishes: 4 },
  { kcal: 1600, dishes: 5 },
  { kcal: 2050, dishes: 6 },
];

// Цены в зависимости от калорийности
const priceOptions = {
  900: {
    trial: 800,
    week: 1500,
    twoWeeks: 1400,
    threeWeeks: 1320,
    fourWeeks: 1250,
  },
  1250: {
    trial: 1000,
    week: 1700,
    twoWeeks: 1600,
    threeWeeks: 1520,
    fourWeeks: 1450,
  },
  1600: {
    trial: 1200,
    week: 1900,
    twoWeeks: 1800,
    threeWeeks: 1720,
    fourWeeks: 1650,
  },
  2050: {
    trial: 1400,
    week: 2100,
    twoWeeks: 2000,
    threeWeeks: 1920,
    fourWeeks: 1850,
  },
};

// Дни недели
const days = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
  "воскресенье",
];

// Данные меню для разных калорийностей
// Данные меню для разных калорийностей (обновлённые значения)
const menuData = {
  900: {
    понедельник: [
      {
        name: "Лёгкий завтрак с йогуртом",
        image:
          "https://i.pinimg.com/736x/13/76/2c/13762c5a976b0290ef642f50b35dfcbb.jpg",
        kcal: 280,
        protein: 15,
        fat: 8,
        carbs: 35,
        weight: 250,
      },
      {
        name: "Салат с курицей и овощами",
        image:
          "https://i.pinimg.com/736x/06/f1/f3/06f1f3bf2e9d8b9308a78f56fdc7800b.jpg",
        kcal: 320,
        protein: 28,
        fat: 12,
        carbs: 18,
        weight: 300,
      },
      {
        name: "Овощной суп",
        image:
          "https://i.pinimg.com/736x/34/94/53/34945302f4dcb9e7802e35d52afe126a.jpg",
        kcal: 180,
        protein: 6,
        fat: 5,
        carbs: 25,
        weight: 300,
      },
      {
        name: "Фруктовый перекус",
        image:
          "https://i.pinimg.com/736x/4c/a6/f1/4ca6f12ce6c2065dd687ad9bee697d5a.jpg",
        kcal: 120,
        protein: 1,
        fat: 0,
        carbs: 30,
        weight: 200,
      },
    ],
    вторник: [
      {
        name: "Овсяная каша с ягодами",
        image:
          "https://i.pinimg.com/736x/d2/f0/69/d2f06908b5055355e16c395e32c33dcc.jpg",
        kcal: 270,
        protein: 8,
        fat: 5,
        carbs: 45,
        weight: 250,
      },
      {
        name: "Рыба на пару с брокколи",
        image:
          "https://i.pinimg.com/736x/c3/84/76/c384761cfe50ed905d358e5025474fdb.jpg",
        kcal: 310,
        protein: 30,
        fat: 10,
        carbs: 12,
        weight: 300,
      },
      {
        name: "Творог с зеленью",
        image:
          "https://i.pinimg.com/736x/9c/a4/73/9ca4733157e770b4ee987352d4a4b267.jpg",
        kcal: 200,
        protein: 18,
        fat: 7,
        carbs: 6,
        weight: 200,
      },
      {
        name: "Овощной смузи",
        image:
          "https://i.pinimg.com/736x/ab/7e/83/ab7e83894d7cfb7b1785005e5ca98027.jpg",
        kcal: 120,
        protein: 3,
        fat: 1,
        carbs: 22,
        weight: 250,
      },
    ],
    среда: [
      {
        name: "Тост с авокадо и яйцом пашот",
        image:
          "https://i.pinimg.com/736x/9c/74/9b/9c749bb6efe6414978b427ad24751174.jpg",
        kcal: 280,
        protein: 12,
        fat: 15,
        carbs: 25,
        weight: 200,
      },
      {
        name: "Куриные котлеты с тушёными овощами",
        image:
          "https://i.pinimg.com/736x/32/e9/26/32e9268fefa5640bb639f8423bc0b882.jpg",
        kcal: 320,
        protein: 30,
        fat: 12,
        carbs: 20,
        weight: 300,
      },
      {
        name: "Овощное рагу с индейкой",
        image:
          "https://i.pinimg.com/736x/38/0a/aa/380aaa159833e8abe5ce82f76a9a8881.jpg",
        kcal: 250,
        protein: 25,
        fat: 10,
        carbs: 15,
        weight: 300,
      },
      {
        name: "Фруктовый салат с семенами чиа",
        image:
          "https://i.pinimg.com/736x/43/2f/be/432fbe6dcf3f03902ad59b0a88c7631a.jpg",
        kcal: 180,
        protein: 5,
        fat: 5,
        carbs: 30,
        weight: 250,
      },
    ],
    четверг: [
      {
        name: "Греческий йогурт с мёдом и орехами",
        image:
          "https://i.pinimg.com/736x/a4/4f/4c/a44f4c793009891134529705648368b9.jpg",
        kcal: 200,
        protein: 10,
        fat: 8,
        carbs: 25,
        weight: 200,
      },
      {
        name: "Салат с курицей и овощами",
        image:
          "https://i.pinimg.com/736x/06/f1/f3/06f1f3bf2e9d8b9308a78f56fdc7800b.jpg",
        kcal: 320,
        protein: 28,
        fat: 12,
        carbs: 18,
        weight: 300,
      },
      {
        name: "Овощной суп",
        image:
          "https://i.pinimg.com/736x/34/94/53/34945302f4dcb9e7802e35d52afe126a.jpg",
        kcal: 180,
        protein: 6,
        fat: 5,
        carbs: 25,
        weight: 300,
      },
      {
        name: "Овощной смузи",
        image:
          "https://i.pinimg.com/736x/ab/7e/83/ab7e83894d7cfb7b1785005e5ca98027.jpg",
        kcal: 120,
        protein: 3,
        fat: 1,
        carbs: 22,
        weight: 250,
      },
    ],
    пятница: [
      {
        name: "Овсяная каша с ягодами",
        image:
          "https://i.pinimg.com/736x/d2/f0/69/d2f06908b5055355e16c395e32c33dcc.jpg",
        kcal: 270,
        protein: 8,
        fat: 5,
        carbs: 45,
        weight: 250,
      },
      {
        name: "Овощное рагу с индейкой",
        image:
          "https://i.pinimg.com/736x/38/0a/aa/380aaa159833e8abe5ce82f76a9a8881.jpg",
        kcal: 250,
        protein: 25,
        fat: 10,
        carbs: 15,
        weight: 300,
      },
      {
        name: "Рыба на пару с брокколи",
        image:
          "https://i.pinimg.com/736x/c3/84/76/c384761cfe50ed905d358e5025474fdb.jpg",
        kcal: 310,
        protein: 30,
        fat: 10,
        carbs: 12,
        weight: 300,
      },
      {
        name: "Фруктовый салат с семенами чиа",
        image:
          "https://i.pinimg.com/736x/43/2f/be/432fbe6dcf3f03902ad59b0a88c7631a.jpg",
        kcal: 180,
        protein: 5,
        fat: 5,
        carbs: 30,
        weight: 250,
      },
    ],
    суббота: [
      {
        name: "Лёгкий завтрак с йогуртом",
        image:
          "https://i.pinimg.com/736x/13/76/2c/13762c5a976b0290ef642f50b35dfcbb.jpg",
        kcal: 280,
        protein: 15,
        fat: 8,
        carbs: 35,
        weight: 250,
      },
      {
        name: "Творог с зеленью",
        image:
          "https://i.pinimg.com/736x/9c/a4/73/9ca4733157e770b4ee987352d4a4b267.jpg",
        kcal: 200,
        protein: 18,
        fat: 7,
        carbs: 6,
        weight: 200,
      },
      {
        name: "Морепродукты в соусе Гарсия со шпинатом",
        image:
          "https://i.pinimg.com/736x/40/e2/70/40e2703cebcda32fa6c033a4a98cd8c8.jpg",
        kcal: 300,
        protein: 30,
        fat: 12,
        carbs: 20,
        weight: 300,
      },
      {
        name: "Греческий йогурт с мёдом и орехами",
        image:
          "https://i.pinimg.com/736x/a4/4f/4c/a44f4c793009891134529705648368b9.jpg",
        kcal: 200,
        protein: 10,
        fat: 8,
        carbs: 25,
        weight: 200,
      },
    ],
    воскресенье: [
      {
        name: "Тост с авокадо и яйцом пашот",
        image:
          "https://i.pinimg.com/736x/9c/74/9b/9c749bb6efe6414978b427ad24751174.jpg",
        kcal: 280,
        protein: 12,
        fat: 15,
        carbs: 25,
        weight: 200,
      },
      {
        name: "Куриные котлеты с тушёными овощами",
        image:
          "https://i.pinimg.com/736x/32/e9/26/32e9268fefa5640bb639f8423bc0b882.jpg",
        kcal: 320,
        protein: 30,
        fat: 12,
        carbs: 20,
        weight: 300,
      },
      {
        name: "Овощной суп",
        image:
          "https://i.pinimg.com/736x/34/94/53/34945302f4dcb9e7802e35d52afe126a.jpg",
        kcal: 180,
        protein: 6,
        fat: 5,
        carbs: 25,
        weight: 300,
      },
      {
        name: "Фруктовый перекус",
        image:
          "https://i.pinimg.com/736x/4c/a6/f1/4ca6f12ce6c2065dd687ad9bee697d5a.jpg",
        kcal: 120,
        protein: 1,
        fat: 0,
        carbs: 30,
        weight: 200,
      },
    ],
  },
  1250: {
    понедельник: [
      {
        name: "Утренний боул с лососем и перепелинным яйцом",
        image:
          "https://i.pinimg.com/736x/97/01/f4/9701f4b240f8f336b9ab34691ff74014.jpg",
        kcal: 340,
        protein: 25,
        fat: 18,
        carbs: 28,
        weight: 300,
      },
      {
        name: "Куриная грудка с киноа и овощами",
        image:
          "https://i.pinimg.com/736x/e3/7d/1d/e37d1dc1d802d5b42f1cf4b7b54820a3.jpg",
        kcal: 420,
        protein: 40,
        fat: 12,
        carbs: 38,
        weight: 350,
      },
      {
        name: "Кукурузные блинчики с фруктовым тар-таром",
        image:
          "https://i.pinimg.com/736x/33/71/fb/3371fb5af7b5c60a3512443075e5240c.jpg",
        kcal: 250,
        protein: 8,
        fat: 10,
        carbs: 50,
        weight: 250,
      },
      {
        name: "Морепродукты в соусе Гарсия со шпинатом",
        image:
          "https://i.pinimg.com/736x/40/e2/70/40e2703cebcda32fa6c033a4a98cd8c8.jpg",
        kcal: 300,
        protein: 30,
        fat: 12,
        carbs: 20,
        weight: 300,
      },
    ],
    вторник: [
      {
        name: "Гречневая каша с авокадо и яйцом пашот",
        image:
          "https://i.pinimg.com/736x/b6/c3/31/b6c3317351b228829fd4d4e077bd30cc.jpg",
        kcal: 370,
        protein: 18,
        fat: 22,
        carbs: 35,
        weight: 320,
      },
      {
        name: "Боул с курицей в кунжуте",
        image:
          "https://i.pinimg.com/736x/58/6d/f6/586df60a9afb75202ec7e387b82b2876.jpg",
        kcal: 360,
        protein: 35,
        fat: 15,
        carbs: 35,
        weight: 350,
      },
      {
        name: "Салат с тунцом и яйцом",
        image:
          "https://i.pinimg.com/736x/d0/37/b7/d037b7ac3f31be4e66b187ad7a0969b0.jpg",
        kcal: 270,
        protein: 28,
        fat: 18,
        carbs: 10,
        weight: 280,
      },
      {
        name: "Тыквенный суп-пюре с гренками",
        image:
          "https://i.pinimg.com/736x/8a/a5/29/8aa529f127337963a7eab56037871559.jpg",
        kcal: 190,
        protein: 6,
        fat: 12,
        carbs: 35,
        weight: 300,
      },
    ],
    среда: [
      {
        name: "Скрэмбл с шампиньонами и тостами",
        image:
          "https://i.pinimg.com/736x/28/eb/ad/28ebada43ab4a369c8517e02d689e5ba.jpg",
        kcal: 350,
        protein: 20,
        fat: 18,
        carbs: 30,
        weight: 250,
      },
      {
        name: "Лосось на гриле со спаржей",
        image:
          "https://i.pinimg.com/736x/78/51/a4/7851a48c59ee2fa1af25a695acb87899.jpg",
        kcal: 400,
        protein: 35,
        fat: 25,
        carbs: 15,
        weight: 300,
      },
      {
        name: "Киноа с овощами и фетой",
        image:
          "https://i.pinimg.com/736x/ca/0c/c9/ca0cc9a22109f74dc1699460868233ce.jpg",
        kcal: 380,
        protein: 15,
        fat: 15,
        carbs: 45,
        weight: 300,
      },
      {
        name: "Протеиновый коктейль с бананом",
        image:
          "https://i.pinimg.com/736x/65/56/fa/6556fa8be20e3e3f7498f5a8b2de0b0a.jpg",
        kcal: 320,
        protein: 25,
        fat: 8,
        carbs: 35,
        weight: 300,
      },
    ],
    четверг: [
      {
        name: "Кукурузные блинчики с фруктовым тар-таром",
        image:
          "https://i.pinimg.com/736x/33/71/fb/3371fb5af7b5c60a3512443075e5240c.jpg",
        kcal: 250,
        protein: 8,
        fat: 10,
        carbs: 50,
        weight: 250,
      },
      {
        name: "Грибной крем-суп с семечками",
        image:
          "https://i.pinimg.com/736x/26/6e/ee/266eee673bed4401af90fd6e994937ee.jpg",
        kcal: 300,
        protein: 10,
        fat: 18,
        carbs: 30,
        weight: 350,
      },
      {
        name: "Боул с курицей в кунжуте",
        image:
          "https://i.pinimg.com/736x/58/6d/f6/586df60a9afb75202ec7e387b82b2876.jpg",
        kcal: 360,
        protein: 35,
        fat: 15,
        carbs: 35,
        weight: 350,
      },
      {
        name: "Тост с авокадо и яйцом пашот",
        image:
          "https://i.pinimg.com/736x/9c/74/9b/9c749bb6efe6414978b427ad24751174.jpg",
        kcal: 280,
        protein: 12,
        fat: 15,
        carbs: 25,
        weight: 200,
      },
    ],
    пятница: [
      {
        name: "Утренний боул с лососем и перепелинным яйцом",
        image:
          "https://i.pinimg.com/736x/97/01/f4/9701f4b240f8f336b9ab34691ff74014.jpg",
        kcal: 340,
        protein: 25,
        fat: 18,
        carbs: 28,
        weight: 300,
      },
      {
        name: "Салат с тунцом и яйцом",
        image:
          "https://i.pinimg.com/736x/d0/37/b7/d037b7ac3f31be4e66b187ad7a0969b0.jpg",
        kcal: 270,
        protein: 28,
        fat: 18,
        carbs: 10,
        weight: 280,
      },
      {
        name: "Тыквенный суп-пюре с гренками",
        image:
          "https://i.pinimg.com/736x/8a/a5/29/8aa529f127337963a7eab56037871559.jpg",
        kcal: 190,
        protein: 6,
        fat: 12,
        carbs: 35,
        weight: 300,
      },
      {
        name: "Киноа с овощами и фетой",
        image:
          "https://i.pinimg.com/736x/ca/0c/c9/ca0cc9a22109f74dc1699460868233ce.jpg",
        kcal: 380,
        protein: 15,
        fat: 15,
        carbs: 45,
        weight: 300,
      },
    ],
    суббота: [
      {
        name: "Протеиновый коктейль с бананом",
        image:
          "https://i.pinimg.com/736x/65/56/fa/6556fa8be20e3e3f7498f5a8b2de0b0a.jpg",
        kcal: 320,
        protein: 25,
        fat: 8,
        carbs: 35,
        weight: 300,
      },
      {
        name: "Куриная грудка с киноа и овощами",
        image:
          "https://i.pinimg.com/736x/e3/7d/1d/e37d1dc1d802d5b42f1cf4b7b54820a3.jpg",
        kcal: 420,
        protein: 40,
        fat: 12,
        carbs: 38,
        weight: 350,
      },
      {
        name: "Лосось на гриле со спаржей",
        image:
          "https://i.pinimg.com/736x/78/51/a4/7851a48c59ee2fa1af25a695acb87899.jpg",
        kcal: 400,
        protein: 35,
        fat: 25,
        carbs: 15,
        weight: 300,
      },
      {
        name: "Фруктовый перекус",
        image:
          "https://i.pinimg.com/736x/4c/a6/f1/4ca6f12ce6c2065dd687ad9bee697d5a.jpg",
        kcal: 120,
        protein: 1,
        fat: 0,
        carbs: 30,
        weight: 200,
      },
    ],
    воскресенье: [
      {
        name: "Гречневая каша с авокадо и яйцом пашот",
        image:
          "https://i.pinimg.com/736x/b6/c3/31/b6c3317351b228829fd4d4e077bd30cc.jpg",
        kcal: 370,
        protein: 18,
        fat: 22,
        carbs: 35,
        weight: 320,
      },
      {
        name: "Грибной крем-суп с семечками",
        image:
          "https://i.pinimg.com/736x/26/6e/ee/266eee673bed4401af90fd6e994937ee.jpg",
        kcal: 300,
        protein: 10,
        fat: 18,
        carbs: 30,
        weight: 350,
      },
      {
        name: "Морепродукты в соусе Гарсия со шпинатом",
        image:
          "https://i.pinimg.com/736x/40/e2/70/40e2703cebcda32fa6c033a4a98cd8c8.jpg",
        kcal: 300,
        protein: 30,
        fat: 12,
        carbs: 20,
        weight: 300,
      },
      {
        name: "Скрэмбл с шампиньонами и тостами",
        image:
          "https://i.pinimg.com/736x/28/eb/ad/28ebada43ab4a369c8517e02d689e5ba.jpg",
        kcal: 350,
        protein: 20,
        fat: 18,
        carbs: 30,
        weight: 250,
      },
    ],
  },
  1600: {
    понедельник: [
      {
        name: "Омлет с овощами и сыром",
        image:
          "https://i.pinimg.com/736x/d1/e7/84/d1e784fbe3113526d391f097f2e69efa.jpg",
        kcal: 380,
        protein: 28,
        fat: 30,
        carbs: 15,
        weight: 300,
      },
      {
        name: "Стейк из лосося с картофелем",
        image:
          "https://i.pinimg.com/736x/19/44/de/1944dea5843e902843e54d72b3f4c810.jpg",
        kcal: 520,
        protein: 38,
        fat: 25,
        carbs: 40,
        weight: 350,
      },
      {
        name: "Паста с морепродуктами",
        image:
          "https://i.pinimg.com/736x/c4/be/8e/c4be8e49bd03ce431b799646f598b1bf.jpg",
        kcal: 420,
        protein: 30,
        fat: 18,
        carbs: 50,
        weight: 350,
      },
      {
        name: "Творожная запеканка с ягодами",
        image:
          "https://i.pinimg.com/736x/87/99/0f/87990f72c858611b9c72a841bc642bfc.jpg",
        kcal: 280,
        protein: 22,
        fat: 15,
        carbs: 25,
        weight: 250,
      },
    ],
    вторник: [
      {
        name: "Сырники со сметаной",
        image:
          "https://i.pinimg.com/736x/66/45/0b/66450b8ac8cb410b0f61be4a41ad71a1.jpg",
        kcal: 420,
        protein: 25,
        fat: 20,
        carbs: 35,
        weight: 250,
      },
      {
        name: "Говядина с гречкой и салатом",
        image:
          "https://i.pinimg.com/736x/98/69/b4/9869b448c24bb2dcec51fae0f6ac63fb.jpg",
        kcal: 580,
        protein: 45,
        fat: 25,
        carbs: 40,
        weight: 350,
      },
      {
        name: "Крем-суп из брокколи",
        image:
          "https://i.pinimg.com/736x/81/f5/56/81f5563241617c2ff71fb7334d9acaed.jpg",
        kcal: 350,
        protein: 12,
        fat: 22,
        carbs: 25,
        weight: 300,
      },
      {
        name: "Фруктовый салат с йогуртом",
        image:
          "https://i.pinimg.com/736x/93/f8/ea/93f8eac6286ba49e9916b5f573abced9.jpg",
        kcal: 250,
        protein: 6,
        fat: 3,
        carbs: 50,
        weight: 250,
      },
    ],
    среда: [
      {
        name: "Бенедикт с лососем",
        image:
          "https://i.pinimg.com/736x/17/7a/6c/177a6cfddecbb1877cc7d1f4e2fbf1b2.jpg",
        kcal: 250,
        protein: 30,
        fat: 25,
        carbs: 35,
        weight: 150,
      },
      {
        name: "Стейк из говядины с печёным картофелем",
        image:
          "https://i.pinimg.com/736x/72/8a/27/728a27ad79cb4fc91eaeb1ff1f102692.jpg",
        kcal: 550,
        protein: 40,
        fat: 30,
        carbs: 40,
        weight: 400,
      },
      {
        name: "Паста с креветками в сливочном соусе",
        image:
          "https://i.pinimg.com/736x/a5/2b/61/a52b61d936c1b3a16e6d77a643d44176.jpg",
        kcal: 500,
        protein: 35,
        fat: 20,
        carbs: 50,
        weight: 350,
      },
      {
        name: "Сырная тарелка с орехами и мёдом",
        image:
          "https://i.pinimg.com/736x/84/d9/fe/84d9fe75b836ea62e349ffdbb62ed583.jpg",
        kcal: 320,
        protein: 25,
        fat: 30,
        carbs: 20,
        weight: 180,
      },
    ],
    четверг: [
      {
        name: "Салат с тунцом и яйцом",
        image:
          "https://i.pinimg.com/736x/d0/37/b7/d037b7ac3f31be4e66b187ad7a0969b0.jpg",
        kcal: 270,
        protein: 28,
        fat: 18,
        carbs: 10,
        weight: 280,
      },
      {
        name: "Сырники со сметаной",
        image:
          "https://i.pinimg.com/736x/66/45/0b/66450b8ac8cb410b0f61be4a41ad71a1.jpg",
        kcal: 420,
        protein: 25,
        fat: 20,
        carbs: 35,
        weight: 250,
      },
      {
        name: "Стейк из говядины с печёным картофелем",
        image:
          "https://i.pinimg.com/736x/72/8a/27/728a27ad79cb4fc91eaeb1ff1f102692.jpg",
        kcal: 550,
        protein: 40,
        fat: 30,
        carbs: 40,
        weight: 400,
      },
      {
        name: "Омлет с овощами и сыром",
        image:
          "https://i.pinimg.com/736x/d1/e7/84/d1e784fbe3113526d391f097f2e69efa.jpg",
        kcal: 380,
        protein: 28,
        fat: 30,
        carbs: 15,
        weight: 300,
      },
    ],
    пятница: [
      {
        name: "Крем-суп из брокколи",
        image:
          "https://i.pinimg.com/736x/81/f5/56/81f5563241617c2ff71fb7334d9acaed.jpg",
        kcal: 350,
        protein: 12,
        fat: 22,
        carbs: 25,
        weight: 300,
      },
      {
        name: "Сырная тарелка с орехами и мёдом",
        image:
          "https://i.pinimg.com/736x/84/d9/fe/84d9fe75b836ea62e349ffdbb62ed583.jpg",
        kcal: 320,
        protein: 25,
        fat: 30,
        carbs: 20,
        weight: 180,
      },
      {
        name: "Стейк из лосося с картофелем",
        image:
          "https://i.pinimg.com/736x/19/44/de/1944dea5843e902843e54d72b3f4c810.jpg",
        kcal: 520,
        protein: 38,
        fat: 25,
        carbs: 40,
        weight: 350,
      },
      {
        name: "Чизкейк с малиновым соусом",
        image:
          "https://i.pinimg.com/736x/c9/d3/bb/c9d3bb0ef6306bd9b147c2d805d274a3.jpg",
        kcal: 400,
        protein: 10,
        fat: 25,
        carbs: 40,
        weight: 200,
      },
    ],
    суббота: [
      {
        name: "Фруктовый салат с йогуртом",
        image:
          "https://i.pinimg.com/736x/93/f8/ea/93f8eac6286ba49e9916b5f573abced9.jpg",
        kcal: 250,
        protein: 6,
        fat: 3,
        carbs: 50,
        weight: 250,
      },
      {
        name: "Говядина с гречкой и салатом",
        image:
          "https://i.pinimg.com/736x/98/69/b4/9869b448c24bb2dcec51fae0f6ac63fb.jpg",
        kcal: 580,
        protein: 45,
        fat: 25,
        carbs: 40,
        weight: 350,
      },
      {
        name: "Бенедикт с лососем",
        image:
          "https://i.pinimg.com/736x/17/7a/6c/177a6cfddecbb1877cc7d1f4e2fbf1b2.jpg",
        kcal: 410,
        protein: 30,
        fat: 25,
        carbs: 35,
        weight: 260,
      },
      {
        name: "Паста с морепродуктами",
        image:
          "https://i.pinimg.com/736x/c4/be/8e/c4be8e49bd03ce431b799646f598b1bf.jpg",
        kcal: 420,
        protein: 30,
        fat: 18,
        carbs: 50,
        weight: 350,
      },
    ],
    воскресенье: [
      {
        name: "Сырники со сметаной",
        image:
          "https://i.pinimg.com/736x/66/45/0b/66450b8ac8cb410b0f61be4a41ad71a1.jpg",
        kcal: 420,
        protein: 25,
        fat: 20,
        carbs: 35,
        weight: 250,
      },
      {
        name: "Паста с креветками в сливочном соусе",
        image:
          "https://i.pinimg.com/736x/a5/2b/61/a52b61d936c1b3a16e6d77a643d44176.jpg",
        kcal: 500,
        protein: 35,
        fat: 20,
        carbs: 50,
        weight: 350,
      },
      {
        name: "Салат с курицей и овощами",
        image:
          "https://i.pinimg.com/736x/06/f1/f3/06f1f3bf2e9d8b9308a78f56fdc7800b.jpg",
        kcal: 320,
        protein: 28,
        fat: 12,
        carbs: 18,
        weight: 300,
      },
      {
        name: "Омлет с овощами и сыром",
        image:
          "https://i.pinimg.com/736x/d1/e7/84/d1e784fbe3113526d391f097f2e69efa.jpg",
        kcal: 380,
        protein: 28,
        fat: 30,
        carbs: 15,
        weight: 300,
      },
    ],
  },
  2050: {
    понедельник: [
      {
        name: "Яичница с беконом и тостами",
        image:
          "https://i.pinimg.com/736x/a8/99/c2/a899c2c305b59abb80ae97cc3d5fce4a.jpg",
        kcal: 500,
        protein: 35,
        fat: 35,
        carbs: 40,
        weight: 350,
      },
      {
        name: "Стейк рибай с картофелем фри",
        image:
          "https://i.pinimg.com/736x/7b/90/18/7b9018880c36173ad8321f719a43904b.jpg",
        kcal: 540,
        protein: 50,
        fat: 45,
        carbs: 50,
        weight: 350,
      },
      {
        name: "Паста карбонара",
        image:
          "https://i.pinimg.com/736x/0f/27/1c/0f271cf6e01caf1b1e3229546cf10d5f.jpg",
        kcal: 560,
        protein: 30,
        fat: 35,
        carbs: 55,
        weight: 300,
      },
      {
        name: "Чизкейк с ягодами",
        image:
          "https://i.pinimg.com/736x/2f/0d/dc/2f0ddc0d6c375ebfe58f62dd0fbfae54.jpg",
        kcal: 450,
        protein: 12,
        fat: 25,
        carbs: 45,
        weight: 200,
      },
    ],
    вторник: [
      {
        name: "Блины с мёдом и орехами",
        image:
          "https://i.pinimg.com/736x/06/a8/da/06a8da246c16b59c8b5f5009b761660c.jpg",
        kcal: 500,
        protein: 15,
        fat: 30,
        carbs: 55,
        weight: 300,
      },
      {
        name: "Утка с яблоками и картофелем",
        image:
          "https://i.pinimg.com/736x/15/ef/b0/15efb0cf062f1d73be1d3c1eb83456d2.jpg",
        kcal: 630,
        protein: 55,
        fat: 45,
        carbs: 45,
        weight: 350,
      },
      {
        name: "Лазанья болоньезе",
        image:
          "https://i.pinimg.com/736x/22/07/00/22070059b506a525596dd8733aedbdbc.jpg",
        kcal: 470,
        protein: 40,
        fat: 30,
        carbs: 55,
        weight: 300,
      },
      {
        name: "Тирамису",
        image:
          "https://i.pinimg.com/736x/ca/86/04/ca860498598af0bf60452eec35bc5c10.jpg",
        kcal: 450,
        protein: 10,
        fat: 25,
        carbs: 45,
        weight: 200,
      },
    ],
    среда: [
      {
        name: "Яичница с беконом и тостами",
        image:
          "https://i.pinimg.com/736x/a8/99/c2/a899c2c305b59abb80ae97cc3d5fce4a.jpg",
        kcal: 500,
        protein: 35,
        fat: 35,
        carbs: 40,
        weight: 350,
      },
      {
        name: "Бифштекс из мраморной говядины с розмарином",
        image:
          "https://i.pinimg.com/736x/29/ab/09/29ab09ff0b490ae52a479c2ec2500048.jpg",
        kcal: 720,
        protein: 65,
        fat: 50,
        carbs: 2,
        weight: 350,
      },
      {
        name: "Запечённый осьминог",
        image:
          "https://i.pinimg.com/736x/6e/09/2d/6e092dd71c9df1ca8673a0254bf1ecfb.jpg",
        kcal: 610,
        protein: 55,
        fat: 28,
        carbs: 35,
        weight: 300,
      },
      {
        name: "Фруктовый салат с семенами чиа",
        image:
          "https://i.pinimg.com/736x/43/2f/be/432fbe6dcf3f03902ad59b0a88c7631a.jpg",
        kcal: 180,
        protein: 5,
        fat: 5,
        carbs: 30,
        weight: 250,
      },
    ],
    четверг: [
      {
        name: "Тирамису",
        image:
          "https://i.pinimg.com/736x/ca/86/04/ca860498598af0bf60452eec35bc5c10.jpg",
        kcal: 450,
        protein: 10,
        fat: 25,
        carbs: 45,
        weight: 200,
      },
      {
        name: "Бенедикт с лососем",
        image:
          "https://i.pinimg.com/736x/17/7a/6c/177a6cfddecbb1877cc7d1f4e2fbf1b2.jpg",
        kcal: 250,
        protein: 30,
        fat: 25,
        carbs: 35,
        weight: 150,
      },
      {
        name: "Лобстер термидор под сырной корочкой",
        image:
          "https://i.pinimg.com/736x/09/6f/bf/096fbf53dfe4b0349048a60373af7198.jpg",
        kcal: 680,
        protein: 55,
        fat: 42,
        carbs: 25,
        weight: 300,
      },
      {
        name: "Томлёная баранина",
        image:
          "https://i.pinimg.com/736x/aa/dc/e7/aadce7ef16f5327ec6881ed3b90cce99.jpg",
        kcal: 680,
        protein: 58,
        fat: 45,
        carbs: 22,
        weight: 350,
      },
    ],
    пятница: [
      {
        name: "Чизкейк с ягодами",
        image:
          "https://i.pinimg.com/736x/2f/0d/dc/2f0ddc0d6c375ebfe58f62dd0fbfae54.jpg",
        kcal: 520,
        protein: 12,
        fat: 25,
        carbs: 45,
        weight: 200,
      },
      {
        name: "Крем-суп из брокколи",
        image:
          "https://i.pinimg.com/736x/81/f5/56/81f5563241617c2ff71fb7334d9acaed.jpg",
        kcal: 380,
        protein: 12,
        fat: 22,
        carbs: 25,
        weight: 300,
      },
      {
        name: "Утиная грудка с гранатовым соусом",
        image:
          "https://i.pinimg.com/736x/47/16/9b/47169b0b0db3a17da5a2aa8827de057d.jpg",
        kcal: 590,
        protein: 48,
        fat: 38,
        carbs: 18,
        weight: 280,
      },
      {
        name: "Тартар из тунца с авокадо",
        image:
          "https://i.pinimg.com/736x/4e/28/52/4e2852b11085c4eda8548920dace624b.jpg",
        kcal: 520,
        protein: 45,
        fat: 35,
        carbs: 12,
        weight: 220,
      },
    ],
    суббота: [
      {
        name: "Блины с мёдом и орехами",
        image:
          "https://i.pinimg.com/736x/06/a8/da/06a8da246c16b59c8b5f5009b761660c.jpg",
        kcal: 500,
        protein: 15,
        fat: 30,
        carbs: 55,
        weight: 300,
      },
      {
        name: "Паста карбонара",
        image:
          "https://i.pinimg.com/736x/0f/27/1c/0f271cf6e01caf1b1e3229546cf10d5f.jpg",
        kcal: 560,
        protein: 30,
        fat: 35,
        carbs: 55,
        weight: 300,
      },
      {
        name: "Равиоли с крабом и шафраном",
        image:
          "https://i.pinimg.com/736x/5d/37/f0/5d37f0bfb5c6e97a1f03555e420e5080.jpg",
        kcal: 580,
        protein: 38,
        fat: 32,
        carbs: 45,
        weight: 250,
      },
      {
        name: "Тост с авокадо и яйцом пашот",
        image:
          "https://i.pinimg.com/736x/9c/74/9b/9c749bb6efe6414978b427ad24751174.jpg",
        kcal: 400,
        protein: 12,
        fat: 15,
        carbs: 25,
        weight: 100,
      },
    ],
    воскресенье: [
      {
        name: "Сырники со сметаной",
        image:
          "https://i.pinimg.com/736x/66/45/0b/66450b8ac8cb410b0f61be4a41ad71a1.jpg",
        kcal: 420,
        protein: 25,
        fat: 20,
        carbs: 35,
        weight: 250,
      },
      {
        name: "Сырная тарелка с орехами и мёдом",
        image:
          "https://i.pinimg.com/736x/84/d9/fe/84d9fe75b836ea62e349ffdbb62ed583.jpg",
        kcal: 320,
        protein: 25,
        fat: 30,
        carbs: 20,
        weight: 180,
      },
      {
        name: "Лазанья болоньезе",
        image:
          "https://i.pinimg.com/736x/22/07/00/22070059b506a525596dd8733aedbdbc.jpg",
        kcal: 470,
        protein: 40,
        fat: 30,
        carbs: 55,
        weight: 300,
      },
      {
        name: "Котлета из мраморной говядины",
        image:
          "https://i.pinimg.com/736x/de/7a/af/de7aaf61db6e7117a3f55edd53ab195e.jpg",
        kcal: 790,
        protein: 62,
        fat: 55,
        carbs: 25,
        weight: 320,
        description:
          "Рубленый стейк из рибая с трюфельным соусом и запечёнными овощами",
      },
    ],
  },
};

// // Для простоты заполним остальные дни аналогичными блюдами
// for (let kcal in menuData) {
//   for (let day of days.slice(3)) {
//     menuData[kcal][day] = [...menuData[kcal]["понедельник"]];
//   }
// }

// Текущие выбранные значения
let selectedCalorieOption = 1; // Индекс выбранной калорийности (по умолчанию 1250 ккал)
let selectedDay = days[0]; // По умолчанию понедельник
let selectedDuration = null; // Выбранная продолжительность

// Инициализация страницы
document.addEventListener("DOMContentLoaded", function () {
  renderCalorieOptions();
  renderDurationOptions();
  renderDayOptions();
  renderMenu();
  updateTotals();
});

// Рендер опций калорийности
function renderCalorieOptions() {
  const container = document.getElementById("calorieOptions");
  container.innerHTML = "";

  calorieOptions.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = `option ${
      index === selectedCalorieOption ? "selected" : ""
    }`;
    optionElement.innerHTML = `
                  <div class="kcal">${option.kcal} ккал</div>
              `;

    optionElement.addEventListener("click", () => {
      selectedCalorieOption = index;
      renderCalorieOptions();
      renderDurationOptions();
      renderMenu();
      updateTotals();
    });

    container.appendChild(optionElement);
  });
}

// Рендер опций продолжительности
function renderDurationOptions() {
  const currentKcal = calorieOptions[selectedCalorieOption].kcal;
  const prices = priceOptions[currentKcal];

  const container = document.getElementById("durationOptions");
  container.innerHTML = "";

  // Пробный вариант
  const trialOption = document.createElement("div");
  trialOption.className = `option ${
    selectedDuration === "trial" ? "selected" : ""
  }`;
  trialOption.innerHTML = `
      <div class="kcal">Пробные 2 дня</div>
      <div class="dishes">
          <span class="new-price">${prices.trial} ₽</span>
          <span class="old-price">${prices.trial + 200} ₽</span>
      </div>
  `;

  trialOption.addEventListener("click", () => {
    selectedDuration = "trial";
    renderDurationOptions();
  });

  container.appendChild(trialOption);

  // Варианты подписки
  const durations = [
    { name: "1 неделя", key: "week" },
    { name: "2 недели", key: "twoWeeks" },
    { name: "3 недели", key: "threeWeeks" },
    { name: "4 недели", key: "fourWeeks" },
  ];

  durations.forEach((duration) => {
    const option = document.createElement("div");
    option.className = `option ${
      selectedDuration === duration.key ? "selected" : ""
    }`;
    option.innerHTML = `
          <div class="kcal">${duration.name}</div>
          <div class="dishes">
              <span class="new-price">${prices[duration.key]} ₽/день</span>
          </div>
      `;

    option.addEventListener("click", () => {
      selectedDuration = duration.key;
      renderDurationOptions();
    });

    container.appendChild(option);
  });
}

// Рендер дней недели
function renderDayOptions() {
  const container = document.getElementById("dayOptions");
  container.innerHTML = "";

  days.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = `day ${day === selectedDay ? "selected" : ""}`;
    dayElement.textContent = day;

    dayElement.addEventListener("click", () => {
      selectedDay = day;
      renderDayOptions();
      renderMenu();
      updateTotals();
    });

    container.appendChild(dayElement);
  });
}

// Рендер меню для выбранного дня и калорийности
function renderMenu() {
  const container = document.getElementById("menuContainer");
  container.innerHTML = "";

  const currentKcal = calorieOptions[selectedCalorieOption].kcal;
  const dishes = menuData[currentKcal][selectedDay];

  document.getElementById(
    "selectedCaloriesInfo"
  ).textContent = `Выбрано: ${currentKcal} ккал`;

  dishes.forEach((dish) => {
    const dishElement = document.createElement("div");
    dishElement.className = "dish-card";
    dishElement.innerHTML = `
                  <img src="${dish.image}" alt="${dish.name}" class="dish-image">
                  <div class="dish-info">
                      <div class="dish-title">${dish.name}</div>
                      <div class="dish-details">
                          <div class="dish-detail">К: ${dish.kcal} ккал</div>
                          <div class="dish-detail">Б: ${dish.protein} г</div>
                          <div class="dish-detail">Ж: ${dish.fat} г</div>
                          <div class="dish-detail">У: ${dish.carbs} г</div>
                          <div class="dish-detail">Вес: ${dish.weight}г</div>
                      </div>
                  </div>
              `;

    container.appendChild(dishElement);
  });
}

//синхронизация тем
// Синхронизация переключателей
const mainThemeSwitcher = document.querySelector(
  "header .btn-color-mode-switch input"
);
const burgerThemeSwitcher = document.querySelector(
  ".burger .btn-color-mode-switch input"
);

function updateTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-preview");
    document.body.classList.remove("white-preview");
  } else {
    document.body.classList.add("white-preview");
    document.body.classList.remove("dark-preview");
  }
  // Синхронизируем оба переключателя
  mainThemeSwitcher.checked = isDark;
  burgerThemeSwitcher.checked = isDark;
}

// Обработчики для обоих переключателей
mainThemeSwitcher.addEventListener("change", function () {
  updateTheme(this.checked);
});

burgerThemeSwitcher.addEventListener("change", function () {
  updateTheme(this.checked);
});

// Обновление итоговых значений БЖУ
function updateTotals() {
  const currentKcal = calorieOptions[selectedCalorieOption].kcal;
  const dishes = menuData[currentKcal][selectedDay];

  const totalKcal = dishes.reduce((sum, dish) => sum + dish.kcal, 0);
  const totalProtein = dishes.reduce((sum, dish) => sum + dish.protein, 0);
  const totalFat = dishes.reduce((sum, dish) => sum + dish.fat, 0);
  const totalCarbs = dishes.reduce((sum, dish) => sum + dish.carbs, 0);

  document.getElementById("totalKcal").textContent = `${totalKcal} ккал`;
  document.getElementById("totalProtein").textContent = `${totalProtein} г`;
  document.getElementById("totalFat").textContent = `${totalFat} г`;
  document.getElementById("totalCarbs").textContent = `${totalCarbs} г`;
}

document.addEventListener("DOMContentLoaded", function () {
  const themeSwitcher = document.getElementById("color_mode");

  themeSwitcher.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-preview");
      document.body.classList.remove("white-preview");
    } else {
      document.body.classList.add("white-preview");
      document.body.classList.remove("dark-preview");
    }
  });
});

const BOT_TOKEN = "7869118515:AAFObnkn_dpPOQ69p7ZJQ4-6Enr6hVxpgus";
const CHAT_ID = "780851073";

// Создаем модальное окно для заказа
const orderModal = document.createElement("div");
orderModal.id = "orderModal";
orderModal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Оформление заказа</h2>
      <div id="orderSummary"></div>
      <form id="orderForm">
        <div class="form-g">
          <label>Имя</label>
          <input type="text" required placeholder="Ваше имя" id="orderName">
        </div>
        <div class="form-g">
          <label>Телефон</label>
          <input type="tel" required placeholder="+7 (999) 123-45-67" id="orderPhone">
        </div>
        <div class="form-g">
          <label>Адрес доставки</label>
          <input type="text" required placeholder="Город, улица, дом, квартира" id="orderAddress">
        </div>
        <div class="form-g">
          <label>Дата начала доставки</label>
          <input type="date" required id="orderDate">
        </div>
        <div class="form-g">
          <label>Комментарий</label>
          <textarea placeholder="Ваши пожелания" id="orderComment"></textarea>
        </div>
        <button type="submit" class="order-btn">Подтвердить заказ</button>
      </form>
    </div>
  `;
document.body.appendChild(orderModal);

function getDurationText(duration) {
  switch (duration) {
    case "trial":
      return "2 дня";
    case "week":
      return "1 неделю";
    case "twoWeeks":
      return "2 недели";
    case "threeWeeks":
      return "3 недели";
    case "fourWeeks":
      return "4 недели";
    default:
      return "";
  }
}
// Функция для открытия модального окна
function openOrderModal() {
  const currentKcal = calorieOptions[selectedCalorieOption].kcal;
  const prices = priceOptions[currentKcal];
  let priceText = "";

  if (selectedDuration === "trial") {
    priceText = `${prices.trial} ₽`;
  } else {
    const durationPrices = {
      week: prices.week,
      twoWeeks: prices.twoWeeks,
      threeWeeks: prices.threeWeeks,
      fourWeeks: prices.fourWeeks,
    };
    priceText = `${durationPrices[selectedDuration]} ₽/день`;
  }

  document.getElementById("orderSummary").innerHTML = `
    <h3>Ваш заказ</h3>
    <p><strong>Калорийность:</strong> ${currentKcal} ккал</p>
    <p><strong>Продолжительность:</strong> ${getDurationText(
      selectedDuration
    )}</p>
    <p><strong>Стоимость:</strong> ${priceText}</p>
  `;

  // Устанавливаем минимальную дану (завтра)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById("orderDate").min = tomorrow
    .toISOString()
    .split("T")[0];

  orderModal.style.display = "flex";
}

// Функция для закрытия модального окна
function closeOrderModal() {
  orderModal.style.display = "none";
}

// Обработчик для кнопки "Оформить заказ"
// Обработчик для кнопки "Оформить заказ"
document.querySelector(".order-btn").addEventListener("click", function (e) {
  e.preventDefault();

  // Проверяем, выбрана ли продолжительность
  if (!selectedDuration) {
    alert("Пожалуйста, сначала выберите продолжительность подписки");
    return;
  }

  openOrderModal();
});

// Обработчик для закрытия модального окна
orderModal.querySelector(".close").addEventListener("click", closeOrderModal);

// Обработчик для клика вне модального окна
window.addEventListener("click", function (event) {
  if (event.target === orderModal) {
    closeOrderModal();
  }
});

// Обработчик отправки формы
document
  .getElementById("orderForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("orderName").value,
      phone: document.getElementById("orderPhone").value,
      address: document.getElementById("orderAddress").value,
      date: document.getElementById("orderDate").value,
      comment: document.getElementById("orderComment").value,
      orderDetails: {
        kcal: calorieOptions[selectedCalorieOption].kcal,
        duration: selectedDuration,
      },
    };

    // Проверка заполнения обязательных полей
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.date
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Формируем сообщение для Telegram
    const message = `
      🍏 <b>Новый заказ!</b>
      ├ Имя: <b>${formData.name}</b>
      ├ Телефон: <code>${formData.phone}</code>
      ├ Адрес: ${formData.address}
      ├ Дата: ${formData.date}
      ├ Калорийность: ${formData.orderDetails.kcal} ккал
      ${
        formData.orderDetails.duration
          ? `├ Продолжительность: ${getDurationText(
              formData.orderDetails.duration
            )}`
          : ""
      }
      └ Комментарий: ${formData.comment || "нет"}
    `;

    try {
      // Отправляем в Telegram
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          "✅ Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время."
        );
        closeOrderModal();
        this.reset();
      } else {
        throw new Error(data.description || "Ошибка отправки");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert(
        `⚠️ Произошла ошибка при отправке: ${error.message}. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.`
      );
    }
  });
