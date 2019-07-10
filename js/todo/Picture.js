class Picture {
    constructor(options){
        this.container = document.getElementById(options.container);
        this.imageUrl = options.imageUrl;
        this.textDescription = options.textPicture;
    }


    render() {
        this.container.innerHTML = `<div class="col text-center kabanStyle">
                                        <img src="img/Z6W8.gif">
                                        <img src=${this.imageUrl}>
                                        <p>${this.textDescription}</p>
                                    </div>`
    }
}