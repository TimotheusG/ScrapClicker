var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Resource = (function () {
    function Resource() {
    }
    return Resource;
})();
var Scrap = (function (_super) {
    __extends(Scrap, _super);
    function Scrap(amount) {
        _super.call(this);
        this.amount = amount;
        this.name = "scrap";
        this.cost = 0;
        document.getElementById('scrapLbl').innerHTML = this.name + ": ";
    }
    return Scrap;
})(Resource);
var Rat = (function (_super) {
    __extends(Rat, _super);
    function Rat(amount) {
        _super.call(this);
        this.amount = amount;
        this.name = "rat";
        this.cost = 10; //eventually make a resource cost class for validation
        document.getElementById('ratLbl').innerHTML = this.name + ": ";
    }
    return Rat;
})(Resource);
var resourceList = {};
var curScrap = new Scrap(0);
var curRat = new Rat(0);
resourceList["scrap"] = curScrap;
resourceList["rat"] = curRat;
function updateView() {
    document.getElementById('scrapId').innerHTML = resourceList["scrap"].amount.toString();
    document.getElementById('ratId').innerHTML = resourceList["rat"].amount.toString();
    if (resourceList["scrap"].amount >= resourceList["rat"].cost) {
        document.getElementById('scrapRat').disabled = false;
    }
    else {
        document.getElementById('scrapRat').disabled = true;
    }
}
function collectScrap() {
    resourceList["scrap"].amount += 1;
    updateView();
}
function scrapRat() {
    //cost
    resourceList["scrap"].amount -= resourceList["rat"].cost;
    //create
    resourceList["rat"].amount += 1;
    //update cost
    resourceList["rat"].cost *= 1.12;
    updateView();
}
//# sourceMappingURL=game.js.map