window.onload = () => {
    var hamberger = document.querySelector('#hamberger');
    var sidebar = document.querySelector('#sidebar');
    var contents = document.querySelectorAll('#contents> .content');

    hamberger.addEventListener('click', () => {
        hamberger.firstElementChild.classList.toggle('rotateR');
        hamberger.lastElementChild.classList.toggle('rotateL');
        sidebar.classList.toggle('active');
        contents.forEach(v => v.classList.toggle('active'));
    })
}