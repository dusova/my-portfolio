document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const languageSelect = document.getElementById('languageSelect');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-theme');
            const theme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }

    const translations = {
        en: {
            home: 'Home',
            about: 'About',
            career: 'Career',
            education: 'Education',
            certificates: 'Certificates',
            projects: 'Projects',
            connect: 'Connect',
            contact: 'Contact',
            greeting: "Hello! I'm Mustafa Arda. I'm a UI/UX Designer and Front-End Developer based in Istanbul."
        },
        tr: {
            home: 'Ana Sayfa',
            about: 'Hakkımda',
            career: 'Kariyerim',
            education: 'Eğitimim',
            certificates: 'Sertifikalarım',
            projects: 'Projelerim',
            connect: 'Bağlantılar',
            contact: 'İletişim',
            greeting: 'Merhaba! Ben Mustafa Arda. UI/UX Tasarımcısı ve Front-End Geliştirici olarak çalışıyorum. İstanbul\'da yaşıyorum.'
        }
    };

    function applyTranslations(lang) {
        const dict = translations[lang] || translations.tr;
        const navItems = document.querySelectorAll('.nav-list .nav-item a');
        const keys = ['home', 'about', 'career', 'education', 'certificates', 'projects', 'connect', 'contact'];
        navItems.forEach((link, idx) => {
            const key = keys[idx];
            if (dict[key]) link.textContent = dict[key];
        });
        const heroText = document.querySelector('.hero-text');
        if (heroText && dict.greeting) heroText.textContent = dict.greeting;
    }

    if (languageSelect) {
        const savedLang = localStorage.getItem('lang') || 'tr';
        languageSelect.value = savedLang;
        document.documentElement.lang = savedLang;
        applyTranslations(savedLang);

        languageSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            document.documentElement.lang = lang;
            localStorage.setItem('lang', lang);
            applyTranslations(lang);
        });
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').catch(console.error);
    }
});
