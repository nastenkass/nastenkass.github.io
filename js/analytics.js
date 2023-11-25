document.addEventListener('DOMContentLoaded', function () {
    const analyticsContainer = document.getElementById('analytics-container');

    function updateAnalytics(data) {
        console.log(`Analytics updated: ${data.deviceName} is now ${data.status}`);

        // код обновления данных на странице аналитики
        if (data.status === 'в работе') {
            // создаем карточку для каждого объекта
            const card = createCardAnalytics(data);

            // добавляем карточку в контейнер
            analyticsContainer.appendChild(card);
        }
    }

    function clearAnalyticsContainer() {
        analyticsContainer.innerHTML = '';
    }

    window.addEventListener('analyticsDataUpdated', function (event) {
        const updatedData = event.detail;
    
        clearAnalyticsContainer();
    
        if (Array.isArray(updatedData)) {
            updatedData.forEach(updateAnalytics);
        } else {
            updateAnalytics(updatedData);
        }
    });

    const savedAnalyticsData = localStorage.getItem('analyticsData');
        if (savedAnalyticsData) {
            const parsedData = JSON.parse(savedAnalyticsData);
            clearAnalyticsContainer();
        if (Array.isArray(parsedData)) {
            parsedData.forEach(updateAnalytics);
        } else {
            updateAnalytics(parsedData);
        }
    }

    function createElement(tag, options = {}) {
        const element = document.createElement(tag);
        Object.assign(element, options);
    
        if (options.children && Array.isArray(options.children)) {
            options.children.forEach(child => {
                element.appendChild(child);
            });
        }
    
        return element;
    }

    function createCardAnalytics(data) {
        const cardAnalytics = createElement('div', { className: 'card-analytics' }); // создаем обертку для аналитической карточки
    
        const cardTop = createElement('div', { className: 'card-top' });

        const cardTopHeader = createElement('div', { className: 'card-top-header' });

        const cardTopHeaderImg = createElement('div', { className: 'card-top-header-img' });

        const cardTopHeaderText = createElement('div', { className: 'card-top-header-text' });

        const cardTopHeaderText2 = createElement('div', { className: 'card-top-header-text-2' });
    
        const deviceNameElement = document.createElement('h3');
        deviceNameElement.classList.add('device-name');
        deviceNameElement.textContent = `${data.deviceName}`;
    
        const statusElement = document.createElement('select');
        statusElement.classList.add('status');
    
        const statusOptions = ['Свободен', 'В работе', 'Завершен'];
    
        statusOptions.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText.toLowerCase();
            option.textContent = optionText;
            statusElement.appendChild(option);
        });
    
        statusElement.value = data.status.toLowerCase();
    
        const inElement = document.createElement('p');
        inElement.classList.add('in');
        inElement.textContent = `${data.in || 'N/a'}`;
    
        const stateElement = document.createElement('p');
        stateElement.classList.add('state');
        stateElement.textContent = `${data.state || 'N/a'}`;

        const imageElement = document.createElement('span');
        imageElement.classList.add('unknow-image');
        imageElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#F0F0F0"/>
        <rect x="11.7857" y="8.21432" width="16.4286" height="22.1429" rx="1.78571" fill="white" stroke="#C2C2C2" stroke-width="0.714286"/>
        <rect x="14.2857" y="30" width="2.14286" height="2.14286" rx="0.714286" fill="#C2C2C2"/>
        <rect x="23.5714" y="30" width="2.14286" height="2.14286" rx="0.714286" fill="#C2C2C2"/>
        <path d="M19.5815 20.6138C19.4885 20.8705 19.4382 21.2202 19.4308 21.663H20.4632C20.4632 21.0975 20.599 20.6641 20.8705 20.3627L21.4788 19.7601C22.0815 19.1276 22.3828 18.4859 22.3828 17.8348C22.3828 17.1763 22.1856 16.6592 21.7913 16.2835C21.4007 15.904 20.8538 15.7143 20.1507 15.7143C19.4736 15.7143 18.923 15.9003 18.4989 16.2723C18.0785 16.6406 17.8646 17.1261 17.8571 17.7288H18.8895C18.8895 17.3903 19.0048 17.1205 19.2355 16.9197C19.4662 16.7188 19.7712 16.6183 20.1507 16.6183C20.5413 16.6183 20.8389 16.7299 21.0435 16.9531C21.2481 17.1726 21.3505 17.4777 21.3505 17.8683C21.3505 18.2738 21.1942 18.6533 20.8817 19.0067L20.1507 19.7601C19.8642 20.0726 19.6745 20.3572 19.5815 20.6138Z" fill="#C2C2C2"/>
        <path d="M20.4643 23.0402C20.4643 23.3262 20.2324 23.558 19.9464 23.558C19.6604 23.558 19.4286 23.3262 19.4286 23.0402C19.4286 22.7542 19.6604 22.5223 19.9464 22.5223C20.2324 22.5223 20.4643 22.7542 20.4643 23.0402Z" fill="#C4C4C4"/>
        </svg>`

        const pointElement = document.createElement('p');
        pointElement.classList.add('point');
        pointElement.innerHTML = `<svg width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.0849609 1.99609V1.71582C0.0849609 1.32389 0.208008 1.00033 0.454102 0.745117C0.704753 0.489909 1.04427 0.362305 1.47266 0.362305C1.9056 0.362305 2.2474 0.489909 2.49805 0.745117C2.7487 1.00033 2.87402 1.32389 2.87402 1.71582V1.99609C2.87402 2.38346 2.7487 2.70475 2.49805 2.95996C2.25195 3.21061 1.91243 3.33594 1.47949 3.33594C1.05111 3.33594 0.711589 3.21061 0.460938 2.95996C0.210286 2.70475 0.0849609 2.38346 0.0849609 1.99609Z" fill="black" fill-opacity="0.38"/>
        </svg>`

        cardTopHeaderText.appendChild(deviceNameElement);
        cardTopHeaderText2.appendChild(inElement);
        cardTopHeaderText2.appendChild(pointElement);
        cardTopHeaderText2.appendChild(stateElement);
        
        cardTopHeader.appendChild(statusElement);

        cardTopHeaderImg.appendChild(imageElement);

        cardTop.appendChild(cardTopHeaderImg);
        cardTop.appendChild(cardTopHeaderText);
        cardTopHeaderText.appendChild(cardTopHeaderText2);
        cardTop.appendChild(cardTopHeader);

        cardAnalytics.appendChild(cardTop); // добавляем card-top внутрь card-analytics
    
        return cardAnalytics;
    }
});
