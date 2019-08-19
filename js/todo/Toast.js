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
        let toast = document.createElement("div");
        toast.className = "toast";
        this.container.appendChild(toast);
        toast.innerHTML = `<div class="toast-header">
                               <strong class="mr-auto">${this.header}</strong>
                               <button type="button" class="ml-2 close-toast" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                               </button>
                            </div>
                            <div class="toast-body">
                                 ${text}
                            </div>`;
        this.fadeIn(toast);
    }

    fadeIn(elem) {
        let me = this;
        let op = 0.1;
        let timer = setTimeout(function animation() {
            elem.style.opacity = op;
            op += op * 0.1;
            if (op >= 1) {
                setTimeout(function () {
                    me.fadeOut(elem);
                },2000);
            } else {
                timer = setTimeout(animation,10);
            }
        }, 10)
    }

    fadeOut(elem) {
        let op = 1;
        let timer = setTimeout(function animation() {
            elem.style.opacity = op;
            op -= op * 0.1;
            if (op <= 0.1) {
                elem.parentElement.removeChild(elem);
            } else {
                timer = setTimeout(animation,10);
            }
        }, 10)
    }

    close(e) {
        let target = e.target;

        target = target.closest(".close-toast");

        if (!target) return;

        target.parentElement.parentElement.removeChild(target.parentElement);
    }
}