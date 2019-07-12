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

let natashaPicture = new Picture({
    container: "componentKoban",
    imageUrl: "img/07czCkczMmY.jpg",
    textPicture: "уважаемой Наташе посвящается"
});


natashaPicture.render();
kabanPicture.render();