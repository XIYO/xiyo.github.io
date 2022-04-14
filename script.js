$(document).ready(() => {
    $('#upButton').click(() => {
        page.up();
    });

    $('#downButton').click(() => {
        page.down();
    });
})

let page = {};

page.up = () => {page.move(-1)};
page.down = () => {page.move(1)};
page.move = (preOrNext) => {
    let currentPage = Number($('#currentPage').text());
    let totalPage = Number($('#totalPage').text());

    if( (preOrNext == -1 &&currentPage == 1) || (preOrNext == 1 && currentPage == totalPage))
        return 0;
    
    currentPage += preOrNext;

    $('.content').each((i,e) => {
        e.style.top -= '500px';
    })
    $("#currentPage").text("0" + currentPage);
}