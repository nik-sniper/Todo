class Toast {
    constructor(options) {
        options.container.innerHTML += `<div class="containerToast ${options.position ? options.position : "right-top"}"></div>`;
        this.header = options.header;
        this.container = document.querySelector(".containerToast");
        this.animation = options.animation;
        this.timerClose = options.timer;
        this.animationShow = options.typeAnimationShow || "fadeIn";
        this.animationClose = options.typeAnimationClose || "fadeOut";
        this.autoClose = options.autoClose;

        document.addEventListener("click", (e) => {
            this._cancelAnimation(e);
            this.close(e);
        })
    }

    success(text) {
        let toast = document.createElement("div");
        toast.className = "toast success";
        this.container.appendChild(toast);
        toast.innerHTML = `<div class="toast-header success">
                               <strong class="mr-auto">${this.header}</strong>
                               <button type="button" class="ml-2 close-toast" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                               </button>
                            </div>
                            <div class="toast-body">
                                 ${text}
                            </div>`;
        if (this.animation) this[this.animationShow](toast);
    }

    warning(text) {
        let toast = document.createElement("div");
        toast.className = "toast warning";
        this.container.appendChild(toast);
        toast.innerHTML = `<div class="toast-header warning">
                               <strong class="mr-auto">${this.header}</strong>
                               <button type="button" class="ml-2 close-toast" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                               </button>
                            </div>
                            <div class="toast-body">
                                 ${text}
                            </div>`;
        if (this.animation) this[this.animationShow](toast);
    }

    error(text) {
        let toast = document.createElement("div");
        toast.className = "toast error";
        this.container.appendChild(toast);
        toast.innerHTML = `<div class="toast-header error">
                               <strong class="mr-auto">${this.header}</strong>
                               <button type="button" class="ml-2 close-toast" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                               </button>
                            </div>
                            <div class="toast-body">
                                 ${text}
                            </div>`;
        if (this.animation) this[this.animationShow](toast);
    }

    info(text) {
        let toast = document.createElement("div");
        toast.className = "toast info";
        this.container.appendChild(toast);
        toast.innerHTML = `<div class="toast-header info">
                               <strong class="mr-auto">${this.header}</strong>
                               <button type="button" class="ml-2 close-toast" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                               </button>
                            </div>
                            <div class="toast-body">
                                 ${text}
                            </div>`;
        if (this.animation) this[this.animationShow](toast);
    }

    fadeInDown(elem) {
        let me = this;
        let op = 0.1;
        let transform = -100;

        this.timerAnimation = setTimeout(function animation() {
            elem.style.opacity = op;
            elem.style.transform = `translate3d(0, ${transform}%, 0)`;
            op += op * 0.1;
            transform = transform + 4;

            if (op >= 1) {
                if (me.autoClose) {
                    me.timerAnimation = setTimeout(function () {
                        me[me.animationClose](elem);
                    },me.timerClose);
                }
            } else {
                me.timerAnimation = setTimeout(animation,10);
            }
        }, 10)
    }

    fadeIn(elem) {
        let me = this;
        let op = 0.1;
        this.timerAnimation = setTimeout(function animation() {
            elem.style.opacity = op;
            op += op * 0.1;
            if (op >= 1) {
                if (me.autoClose) {
                    me.timerAnimation = setTimeout(function () {
                        me[me.animationClose](elem);
                    },me.timerClose);
                }
            } else {
                me.timerAnimation = setTimeout(animation,10);
            }
        }, 10)
    }

    fadeOut(elem) {
        let me = this;
        let op = 1;
        this.timerAnimation = setTimeout(function animation() {
            elem.style.opacity = op;
            op -= op * 0.1;
            if (op <= 0.1) {
                elem.parentElement.removeChild(elem);
            } else {
                me.timerAnimation = setTimeout(animation,10);
            }
        }, 10)
    }

    close(e) {
        let target = e.target;

        target = target.closest(".close-toast");

        if (!target) return;

        this[this.animationClose](target.parentElement.parentElement);
    }

    _cancelAnimation(e) {
        let target = e.target;

        target = target.closest(".toast");

        if (!target) return;

        clearTimeout(this.timerAnimation);
        target.style.opacity = "1";
    }
}