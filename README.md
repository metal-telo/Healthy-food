<div align="center">
  <h1>🥗 Пора поесть - сервис доставки здорового питания</h1>
  <h3>Репозиторий группы для олимпиады | Тема 3 "FreshMarket"</h3>
  
   [![Demo](https://img.shields.io/badge/ПОСМОТРЕТЬ_САЙТ-64D370?style=for-the-badge&logoColor=white&color=64D370&labelColor=64D370&logo=rocket)](https://metal-telo.github.io/Site-Pora-poest-/)
  &nbsp;
  [![Figma](https://img.shields.io/badge/FIGMA_МАКЕТ-64D370?style=for-the-badge&logoColor=white&color=64D370&labelColor=64D370&logo=figma)](https://www.figma.com/design/evOxCfoB6sAEwJIiAsfHf4/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%BB%D0%B8%D0%BC%D0%BF%D0%B8%D0%B0%D0%B4%D1%8B?node-id=51-2&t=lJFGelht1yGE4K15-1)
</div>

## 👥 Участники команды
- Конова Елизавета @metal-telo
- Гарас Кристина @KristinaGaras
- Болотная Виктория @edi-hobi
- Кунаева Кира @coldszz

## 🍏 О проекте
**Сайт-конструктор доставки здорового питания** с возможностью:

🥬 **Калькулятора калорий**  
Рассчитывает норму исходя из веса, роста, возраста, активности и целей

⏱ **Выбора тарифа**  
Гибкая система подписки с разной продолжительностью

🍽 **Примеров меню**  
Просмотр вариантов питания на неделю для разных калорийностей

📦 **Расчета стоимости**  
Учет доставки в разные районы Москвы и МО

🧞‍♂️ **Используется Telegram Bot API:**
- телеграмм api обрабатывает до 30 сообщений в секунду!
- URL: https://api.telegram.org/bot{BOT_TOKEN}/sendMessage
- Отправляется POST-запрос с данными в JSON-формате
- Сообщение форматируется с помощью HTML-тегов

🫧 **Обработка ошибок:**
- try-catch для обработки ошибок сети/API
- Пользовательские сообщения об ошибках

🌎 В дальнейшем будет реализован прокси-сервер на Netlify Functions для скрытия токена Telegram-бота

## ✨ Особенности

- Чистый и современный дизайн, отображающий эстетику здорового питания
- Темная тема, позволяющая приятно взаимодействовать с сайтом даже ночью
- Адаптивный интерфейс для всех устройств
- Просмотр различных акций с визуализацией экономии
- Интерактивная Яндекс карта и меню с яркими изображениями
- Оформленые заказы отправляются сообщением в телеграмм c помощью бота администратору, для упрощения использования 

## ⚙️ Инструкция для получения сообщений о заказе в телеграмм боте
1) находим в телеграмме @userinfobot 
2) нажимаем /start тем самым получаем свой ID
3) в нашем коде index.html находим 1981 строку  const CHAT_ID = "780851073";
4) меняем на свой ID
5) находим в телеграмме бот https://t.me/fkgjfjogfiofhkfdbot и подписываемся 
6) на сайте делаем заказ и видим появление информации о нём в боте


## 🛠 Технологии
<div>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma">
  <img src="https://img.shields.io/static/v1?message=Telegram&logo=telegram&label=&color=2CA5E0&logoColor=white&labelColor=&style=for-the-badge" alt="telegram logo"  />
</div>
