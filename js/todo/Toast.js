class Toast {
    constructor(options) {
        this.header = options.header;
        this.container = options.container;

        let me = this;
        document.addEventListener("click", function (e) {
            me.close(e);
        })
    }

    show(text) {
        this.container.innerHTML += `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                        <div class="toast-header">
                                            <strong class="mr-auto">${this.header}</strong>
                                            <small>11 mins ago</small>
                                            <button type="button" class="ml-2 close-toast" data-dismiss="toast" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div class="toast-body">
                                            ${text}
                                        </div>`;
        setTimeout(function () {
            let toast = document.querySelector(".toast");
            toast.parentElement.removeChild(toast);
        },2000);
    }

    close(e) {
        let target = e.target;

        target = target.closest(".close-toast");

        if (!target) return;

        target.parentElement.parentElement.removeChild(target.parentElement);
    }
}