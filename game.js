var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Resource = (function () {
    function Resource() {
    }
    Resource.prototype.display = function () {
        if (this.amount - Math.floor(this.amount) > 0) {
            return this.amount.toFixed(2);
        }
        else
            return this.amount.toString();
    };
    return Resource;
})();
var Cost = (function () {
    function Cost(res, cost) {
        this.costList = {};
        for (var i = 0; i < res.length; i++) {
            this.costList[res[i]] = cost[i];
        }
    }
    return Cost;
})();
var Scrap = (function (_super) {
    __extends(Scrap, _super);
    function Scrap(amount) {
        _super.call(this);
        this.amount = amount;
        this.name = "scrap";
        this.cost = new Cost([""], [0]);
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
        this.cost = new Cost(["scrap"], [10]);
        this.value = 1;
        document.getElementById('ratLbl').innerHTML = this.name + ": ";
    }
    return Rat;
})(Resource);
var wRat = (function (_super) {
    __extends(wRat, _super);
    function wRat(amount) {
        _super.call(this);
        this.amount = amount;
        this.name = "wrat";
        this.cost = new Cost(["scrap", "rat"], [10, 1]);
        this.value = 1;
        document.getElementById('wratLbl').innerHTML = this.name + ": ";
    }
    return wRat;
})(Resource);
var resourceList = {};
var curScrap = new Scrap(0);
var curRat = new Rat(0);
var curWRat = new wRat(0);
resourceList["scrap"] = curScrap;
resourceList["rat"] = curRat;
resourceList["wrat"] = curWRat;
function updateView() {
    document.getElementById('scrapId').innerHTML = resourceList["scrap"].display();
    document.getElementById('ratId').innerHTML = resourceList["rat"].display();
    document.getElementById('wratId').innerHTML = resourceList["wrat"].display();
    if (resourceList["scrap"].amount >= resourceList["rat"].cost.costList["scrap"]) {
        document.getElementById('scrapRat').disabled = false;
    }
    else {
        document.getElementById('scrapRat').disabled = true;
    }
    if (resourceList["scrap"].amount >= resourceList["wrat"].cost.costList["scrap"] && resourceList["rat"].amount >= resourceList["wrat"].cost.costList["rat"]) {
        document.getElementById('wRat').disabled = false;
    }
    else {
        document.getElementById('wRat').disabled = true;
    }
    document.getElementById('ratId').title = resourceList["rat"].cost.toString(); // doesn't work yet
}
function updateValues() {
    if (resourceList["rat"].amount > 0)
        resourceList["scrap"].amount += (resourceList["rat"].value * resourceList["rat"].amount) / 10;
}
function collectScrap() {
    resourceList["scrap"].amount += 1;
}
function scrapRat() {
    //cost
    resourceList["scrap"].amount -= resourceList["rat"].cost.costList["scrap"];
    //create
    resourceList["rat"].amount += 1;
    //update cost
    resourceList["rat"].cost.costList["scrap"] *= 1.12;
}
function wScrapRat() {
    //cost
    resourceList["scrap"].amount -= resourceList["wrat"].cost.costList["scrap"];
    resourceList["rat"].amount -= resourceList["wrat"].cost.costList["rat"];
    //create
    resourceList["wrat"].amount += 1;
    //update cost
    resourceList["wrat"].cost.costList["scrap"] *= 1.12;
    resourceList["wrat"].cost.costList["rat"] *= 1.12;
}
window.setInterval(function () {
    this.updateValues();
    updateView();
}, 100);
//# sourceMappingURL=game.js.map