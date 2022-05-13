window.onload = () => {
    var hamRight = document.querySelector('#hamberger > :first-child');
    var hamLeft = document.querySelector('#hamberger > :last-child');
    var ham = document.querySelector('#hamberger');

    ham.addEventListener('click', () => {
        hamRight.classList.toggle('right');
        hamLeft.classList.toggle('left');
        // hamRight.classList.toggle('marginRight');
        // hamLeft.classList.toggle('marginLeft');
    });

    // ham.addEventListener('mouseover', () => {
    //     hamRight.classList.toggle('marginRight');
    //     hamLeft.classList.toggle('marginLeft');
    // })

    // ham.addEventListener('mouseout', () => {
    //     hamRight.classList.toggle('marginRight');
    //     hamLeft.classList.toggle('marginLeft');
    // })
}