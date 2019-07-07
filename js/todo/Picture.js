(function () {
    function Picture(options) {

        options.container.innerHTML = createPicture(options.src, options.textPicture);


        function createPicture(src, text) {
            return `<div class="col text-center kabanStyle">
                        <img src="img/Z6W8.gif">
                        <img src=${src}>
                        <p>${text}</p>
                    </div>`
        }
    }

    new Picture({
        container: document.getElementById("componentKoban"),

        src: "img/KvDTLVW1n6s.jpg",
        textPicture: "уважаемому кабану посвящается"
    });
}());





