const menuIcon = document.getElementById('menuIcon');
const dropdownMenu = document.getElementById('dropdownMenu');

menuIcon.addEventListener('click', () => {
    dropdownMenu.classList.toggle('open');
});

// Optional: Close dropdown if clicking outside of it
document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('open');
    }
});