class Picture {
    constructor(options){
        this.container = document.getElementById(options.container);
        this.imageUrl = options.imageUrl;
        this.textDescription = options.textPicture;
        this.callback = options.callback;
    }

    defaultRender() {
        return `<div class="col text-center kabanStyle">
                    <img src="img/Z6W8.gif">
                    <img src=${this.imageUrl}>
                    <p>${this.textDescription}</p>
                </div>`
    }

    render() {
        this.container.innerHTML += this.callback ? this.callback(this.imageUrl, this.textDescription) : this.defaultRender();
    }
}