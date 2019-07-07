function DragDrop() {
    this.dragObj = {};
}

DragDrop.prototype.mouseDown = function (e) {
    if (e.which !== 1) return;

    var target = this._targetElement(e, ".drag");

    if (!target) return;

    var task = target.closest(".task");

    this.dragObj.parentElem = task;
    this.dragObj.parentElemWidht = task.offsetWidth;
    this.dragObj.downY = e.pageY;
    this.dragObj.downX = e.pageX;

    e.preventDefault();
};

DragDrop.prototype.mouseMove = function (e) {
    if (!this.dragObj.parentElem) return;

    if (!this.dragObj.clone) {
        if (Math.abs(e.pageY - this.dragObj.downY) < 3) {
            return;
        }

        this._createClone();

        var cord = this.getCords(this.dragObj.parentElem);


        this.dragObj.shiftY = this.dragObj.downY - cord.top;
        this.dragObj.shiftX = this.dragObj.downX - cord.left;
    }

    document.body.appendChild(this.dragObj.clone);


    this.dragObj.parentElem.classList.add("hiddenTask");


    this.dragObj.clone.classList.add("draggable");
    this.dragObj.clone.style.zIndex = "99999";
    this.dragObj.clone.style.width = this.dragObj.parentElemWidht + "px";
    this.dragObj.clone.style.left = e.pageX - this.dragObj.shiftX + "px";
    this.dragObj.clone.style.top = e.pageY - this.dragObj.shiftY + "px";


    e.preventDefault();
};

DragDrop.prototype.mouseUp = function (e) {
    if (!this.dragObj.clone) return;

    this.dragObj.clone.hidden = true;

    var elem = document.elementFromPoint(e.clientX, e.clientY);

    this.dragObj.clone.hidden = false;

    if (this._container.contains(elem.closest(".task"))) {
        this.positionClone(e, elem);
        this.dragObj.parentElem.classList.remove("hiddenTask");
        this.dragObj.parentElem.parentElement.insertBefore(this.dragObj.parentElem, this.dragObj.nextElementParent);
        document.body.removeChild(document.querySelector(".draggable"));
        this._writePosition(this.dragObj.parentElem.parentElement);
    } else {
        this.dragObj.parentElem.classList.remove("hiddenTask");
        document.body.removeChild(document.querySelector(".draggable"));
    }
    this.dragObj = {};
};


DragDrop.prototype._writePosition = function (elem) {

    var first = elem.firstElementChild;

    for (var i = 0; first !== null; i++) {
        this._data.textTask[i] = first.innerText;
        this._data.arrId[i] = first.getAttribute("data-id");

        first = first.nextElementSibling;
    }

    moduleCookie.cookie(this._idContainer, this._data);
};


DragDrop.prototype.positionClone = function (e, elem) {
    elem = elem.closest(".task");
    var cords = elem.getBoundingClientRect();
    var elemHeight = elem.offsetHeight / 2;

    if ((cords.top + elemHeight) > e.clientY) {
        this.dragObj.nextElementParent = elem;
    } else {
        this.dragObj.nextElementParent = elem.nextElementSibling;
    }
};


DragDrop.prototype._createClone = function () {
    var clone = this.dragObj.parentElem.cloneNode(true);

    this.dragObj.nextElementParent = this.dragObj.parentElem.nextElementSibling;

    this.dragObj.clone = clone;
};

DragDrop.prototype.getCords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    }
};
