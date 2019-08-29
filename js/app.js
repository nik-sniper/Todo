window.toast = new Toast({
    header: "TodoList",
    container: document.querySelector(".container"),
    timer: 2000,
    autoClose: true,
    animation: true,
    typeAnimationShow: "fadeInDown",
    typeAnimationClose: "fadeOut"
});

new Todo({
    container: document.getElementById("todo1")
});

let kabanPicture = new Picture({
    container: "componentKoban",
    imageUrl: "img/KvDTLVW1n6s.jpg",
    textPicture: "уважаемому Кабану посвящается",
    callback: function (imgUrl, textImg) {
        return `<div class="col text-center kabanStyle">
                    <img src="img/Z6W8.gif">
                    <img src=${imgUrl}>
                    <p>${textImg}</p>
                </div>`
    }
});

let zhenyaPicture = new Picture({
    container: "componentKoban",
    imageUrl: "img/3687E8IOexk.jpg",
    textPicture: "уважаемой Евгении посвящается"
});

zhenyaPicture.render();
kabanPicture.render();