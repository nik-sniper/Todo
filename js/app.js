new Todo({
    container: document.getElementById("todo1")
});
new Todo({
    container: document.getElementById("todo2")
});

let kabanPicture = new Picture({
    container: "componentKoban",
    imageUrl: "img/KvDTLVW1n6s.jpg",
    textPicture: "уважаемому кабану посвящается"
});

kabanPicture.render();