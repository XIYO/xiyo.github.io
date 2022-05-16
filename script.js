let hamberger;
let sidebar;
let dimmed;
let sidebarContainer;

window.onload = () => {
    hamberger = document.querySelector('#hamberger');
    sidebarContainer = document.querySelector('#sidebarContainer');
    sidebar = document.querySelector('#sidebar');
    dimmed = document.querySelector('#dimmed');

    hamberger.addEventListener('click', () => {
        hambergerClick();
    })

    dimmed.addEventListener('click', () => {
        hambergerClick();
    })
}

function hambergerClick() {
    hamberger.firstElementChild.classList.toggle('rotateR');
    hamberger.lastElementChild.classList.toggle('rotateL');
    sidebar.classList.toggle('active');
    dimmed.classList.toggle('active');
    sidebarContainer.classList.toggle('active');
}