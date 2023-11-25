document.getElementById('navbar').innerHTML = `
    <nav>
        <div class="logo">
            <img src="static/logo.svg" alt="">
        </div>
        <div class="menu">
            <a href="/" class="active">Главная</a>
            <a href="/analytics" class="active">Аналитика</a>
        </div>
        <div id="userIcon" class="user">
            
        </div>
    </nav>

    <div id="authPopup" class="auth-popup">
        <button id="closeBtn" onclick="closeAuthPopup()">✖</button>
        <h2>Login</h2>
        <form id="auth-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br>

            <button type="button" onclick="authenticate()">Login</button>
        </form>
    </div>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

        *, *:before, *:after {
            box-sizing: border-box;
        }

        body {
            margin: 0;
        }

        nav {
            background: #ffffff;
            display: flex;
            justify-content: space-between;
            padding: 0 24px;
            align-items: center;
            height: 48px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .logo{
            width: 131.36px;
            height: 23.552px;
        }

        .user{
            width: 32px;
            height: 32px;
            border-radius: 32px;
            border: 1px solid var(--02-secondary-200, #F5F5F5);
            background: url('static/user.png') lightgray 50% / cover no-repeat;
        }

        .menu {
            height: 48px;
        }

        .menu a {
            width: 164px;
            height: 48px;
            display: inline-block;
            text-decoration: none;
            color: #423838; /* цвет текста по умолчанию */
            line-height: 48px;
            position: relative;
            overflow: hidden; /* чтобы скрыть полоску при нажатии */
            transition: color 0.3s ease-in-out; /* анимация цвета текста */
            text-align: center;

            font-family: 'Roboto';
            text-transform: uppercase;
            font-size: 14px;
            letter-spacing: 1.25px;
            color: var(--00-on-surface-medium-emphasis, rgba(0, 0, 0, 0.60));
            font-weight: 500;
        }

        .menu a::before {
            content: "";
            position: absolute;
            bottom: 0; /* изменено с bottom: 0; на bottom: 0; */
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background-color: var(--01-primary-500, #23B04A);
            transition: width 0.3s ease-in-out;
        }

        .menu a:hover::before {
            width: 100%; /* полоска на 100% ширины при наведении */
        }

        .menu a:hover {
            color: var(--01-primary-500, #23B04A); /* цвет текста при наведении */
        }

        .menu a.active::before {
            width: 100%; /* полоска на 100% ширины при активации */
        }

        .menu a.active {
            color: var(--01-primary-500, #23B04A); /* цвет текста при активации */
        }

        .auth-popup {
            position: fixed;
            top: 20%;
            left: 91%;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: 'Roboto';
            z-index: 1000;
            pointer-events: none; /* Добавьте это, чтобы избежать взаимодействия с всплывающим окном */
        }

        .auth-popup.show {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            pointer-events: auto; /* Возвращаем взаимодействие с всплывающим окном */
        }

        /* Стили для иконки пользователя */
        #userIcon {
            cursor: pointer;
        }

        #closeBtn {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            background: none;
            border: none;
            font-size: 16px;
            color: #333;
        }
    </style>
`;

document.getElementById('userIcon').addEventListener('click', openAuthPopup);

function openAuthPopup() {
    const authPopup = document.getElementById('authPopup');
    authPopup.classList.add('show');
}

function closeAuthPopup() {
    const authPopup = document.getElementById('authPopup');
    authPopup.classList.remove('show');
}

function setActiveTab() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        link.classList.remove('active');
        if (currentPath === linkPath) {
            link.classList.add('active');
        }
    });
}

// устанавливаем активную вкладку при загрузке страницы
document.addEventListener('DOMContentLoaded', setActiveTab);

// устанавливаем активную вкладку при изменении URL
window.addEventListener('popstate', setActiveTab);


