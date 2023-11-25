document.addEventListener('DOMContentLoaded', function () {
    const cardsData = [
        { deviceName: 'pH-метр Mettler-Toledo International, Inc. SevenCompact S220', status: 'Свободен', notificationStatus: 'Включено', imagePath: 'static/pH.svg',
    in: 'S1.4.I14-9.001', state: '00-024004' },
        { deviceName: 'Спектрофотометр Varian, Inc Cary 50 Bio', status: 'Свободен', notificationStatus: 'Нейтрально', imagePath: 'static/spectr.svg' },
        { deviceName: 'Титратор', status: 'Свободен', notificationStatus: 'Выключено', imagePath: 'static/titrator.svg' },
        { deviceName: 'Коагулометр Tcoag, KC 4 Delta', status: 'Свободен', notificationStatus: 'Выключено', imagePath: 'static/koagulometr.svg' },
        { deviceName: 'Коагулометр Tcoag, KC 4 Delta', status: 'Свободен', notificationStatus: 'Выключено', imagePath: 'static/koagulometr.svg' },
    ];

    function updateAnalyticsInOtherTabs() {
        try {
            const savedStatuses = cardsData.map(card => ({
                deviceName: card.deviceName,
                status: localStorage.getItem(card.deviceName) || card.status,
                in: card.in,
                state: card.state,
                imagePath: card.imagePath,
            }));
            localStorage.setItem('analyticsData', JSON.stringify(savedStatuses));
            const event = new CustomEvent('analyticsDataUpdated', { detail: savedStatuses });
            window.dispatchEvent(event);
        } catch (error) {
            console.error("Произошла ошибка при обновлении аналитики:", error);

            // обработка ошибки
            window.location.href = "error.html";
        }
    }

    function createStatusDropdown(data) {
        const statusContainer = createElement('div', { className: 'status-container' });
        const statusSelect = createElement('select');
    
        const statusOptions = ['Свободен', 'В работе', 'Завершен'];
    
        statusOptions.forEach(optionText => {
            const option = createElement('option', { value: optionText.toLowerCase(), textContent: optionText });
            statusSelect.appendChild(option);
        });
    
        const savedStatus = localStorage.getItem(data.deviceName);
        statusSelect.value = savedStatus || data.status.toLowerCase();
    
        statusSelect.addEventListener('change', function () {
            const newStatus = statusSelect.value;
    
            if (newStatus !== data.status) {
                console.log(`Changing status for ${data.deviceName} to ${newStatus}`);
                localStorage.setItem(data.deviceName, newStatus);
                window.postMessage({ status: newStatus, deviceName: data.deviceName }, '*');
                console.log(`Status changed: ${data.deviceName} is now ${newStatus}`);
                // обновление данных
                updateAnalyticsInOtherTabs(cardsData);
            }
        });
    
        statusContainer.appendChild(statusSelect);
    
        return statusContainer;
    }

    function createElement(tag, options = {}) {
        const element = document.createElement(tag);
        Object.entries(options).forEach(([key, value]) => {
            element[key] = value;
        });
        return element;
    }

    function createNotificationIcon(data) {
        console.log('Creating notification icon for:', data);
        const notificationIcon = createElement('span', { className: 'notification-icon' });

        const svgCode = getSvgCode(data.notificationStatus);
        notificationIcon.innerHTML = svgCode;

        const statusClass = getStatusClass(data.notificationStatus);
        notificationIcon.classList.add(statusClass);

        notificationIcon.addEventListener('click', function () {
            toggleNotificationIcon(notificationIcon, data);
        });

        return notificationIcon;
    }

    function toggleNotificationIcon(notificationIcon, data) {
        console.log('Toggling notification icon for:', data);
        if (data.notificationStatus === 'Включено') {
            data.notificationStatus = 'Нейтрально';
        } else if (data.notificationStatus === 'Нейтрально') {
            data.notificationStatus = 'Выключено';
        } else {
            data.notificationStatus = 'Включено';
        }

        updateNotificationIcon(notificationIcon, data);
    }

    function updateNotificationIcon(notificationIcon, data) {
        const svgCode = getSvgCode(data.notificationStatus);
        notificationIcon.innerHTML = svgCode;

        const statusClass = getStatusClass(data.notificationStatus);
        notificationIcon.className = `notification-icon ${statusClass}`;
    }

    function getSvgCode(notificationStatus) {
        switch (notificationStatus) {
            case 'Включено':
                return `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <g clip-path="url(#clip0_5_2077)">
                <path d="M8.08 4.08L6.65 2.65C4.25 4.48 2.67 7.3 2.53 10.5H4.53C4.68 7.85 6.04 5.53 8.08 4.08ZM20.47 10.5H22.47C22.32 7.3 20.74 4.48 18.35 2.65L16.93 4.08C18.95 5.53 20.32 7.85 20.47 10.5ZM18.5 11C18.5 7.93 16.86 5.36 14 4.68V4C14 3.17 13.33 2.5 12.5 2.5C11.67 2.5 11 3.17 11 4V4.68C8.13 5.36 6.5 7.92 6.5 11V16L4.5 18V19H20.5V18L18.5 16V11ZM12.5 22C12.64 22 12.77 21.99 12.9 21.96C13.55 21.82 14.08 21.38 14.34 20.78C14.44 20.54 14.49 20.28 14.49 20H10.49C10.5 21.1 11.39 22 12.5 22Z" fill="black" fill-opacity="0.6"/>
                </g>
                <defs>
                <clipPath id="clip0_5_2077">
                <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                </clipPath>
                </defs>
                </svg>`;
            case 'Нейтрально':
                return `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 22C13.6 22 14.5 21.1 14.5 20H10.5C10.5 21.1 11.4 22 12.5 22ZM18.5 16V11C18.5 7.93 16.87 5.36 14 4.68V4C14 3.17 13.33 2.5 12.5 2.5C11.67 2.5 11 3.17 11 4V4.68C8.14 5.36 6.5 7.92 6.5 11V16L4.5 18V19H20.5V18L18.5 16ZM16.5 17H8.5V11C8.5 8.52 10.01 6.5 12.5 6.5C14.99 6.5 16.5 8.52 16.5 11V17Z" fill="black" fill-opacity="0.6"/>
                </svg>`;
            case 'Выключено':
                return `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <g clip-path="url(#clip0_5_2284)">
                <path d="M20.5 18.69L8.34 6.14L5.77 3.49L4.5 4.76L7.3 7.56V7.57C6.78 8.56 6.5 9.73 6.5 10.99V15.99L4.5 17.99V18.99H18.23L20.23 20.99L21.5 19.72L20.5 18.69ZM12.5 22C13.61 22 14.5 21.11 14.5 20H10.5C10.5 21.11 11.39 22 12.5 22ZM18.5 14.68V11C18.5 7.92 16.86 5.36 14 4.68V4C14 3.17 13.33 2.5 12.5 2.5C11.67 2.5 11 3.17 11 4V4.68C10.85 4.71 10.71 4.76 10.58 4.8C10.48 4.83 10.38 4.87 10.28 4.91H10.27C10.26 4.91 10.26 4.91 10.25 4.92C10.02 5.01 9.79 5.12 9.57 5.23C9.57 5.23 9.56 5.23 9.56 5.24L18.5 14.68Z" fill="black" fill-opacity="0.6"/>
                </g>
                <defs>
                <clipPath id="clip0_5_2284">
                <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                </clipPath>
                </defs>
                </svg>`;
            default:
                return '';
        }
    }

    function getStatusClass(notificationStatus) {
        switch (notificationStatus) {
            case 'Включено':
                return 'bell-icon';
            case 'Нейтрально':
                return 'crossed-bell-icon';
            case 'Выключено':
                return 'disabled-bell-icon';
            default:
                return '';
        }
    }

    function createCard(data) {
        console.log('Creating card for:', data);
    
        // объект в массиве cardsData по имени устройства
        const matchingDevice = cardsData.find(device => device.deviceName === data.deviceName);
    
        if (matchingDevice) {
            // использовать данные из массива cardsData
            data.in = matchingDevice.in;
            data.state = matchingDevice.state;
        }
    
        const card = createElement('div', { className: 'card' });
    
        card.appendChild(createElement('img', { src: data.imagePath, alt: 'Картинка устройства' }));
        card.appendChild(createElement('h3', { textContent: data.deviceName }));
        card.appendChild(createStatusDropdown(data));
        card.appendChild(createNotificationIcon(data));
    
        return card;
    }

    const cardContainer = document.getElementById('cardContainer');
    const headerCard = createElement('div', { className: 'header-card', innerHTML: '<p class="header-text">Название</p><p class="header-text">Статус</p>' });
    cardContainer.appendChild(headerCard);

    cardsData.forEach(function (data, index) {
        const card = createCard(data);
        cardContainer.appendChild(card);
    
        if (index < cardsData.length - 1) {
            const line = createElement('div', { className: 'line' });
            cardContainer.appendChild(line);
        }
    });

    cardContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('notification-icon')) {
            const cardIndex = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
            toggleNotificationIcon(event.target, cardsData[cardIndex]);
            updateAnalyticsInOtherTabs(cardsData);
        }
    });
});

function search() {
    var searchText = document.getElementById("searchInput").value.toLowerCase();
    var cards = document.getElementById("cardContainer").getElementsByClassName("card");

    for (var i = 0; i < cards.length; i++) {
        var cardText = cards[i].textContent.toLowerCase();
        var containsText = cardText.includes(searchText);

        // добавляем класс visible или hidden в зависимости от результата поиска
        cards[i].classList.toggle("visible", containsText);
        cards[i].classList.toggle("hidden", !containsText);
    }
}
