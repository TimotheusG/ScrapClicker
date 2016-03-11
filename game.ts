class Resource {
    name: string;
    amount : number;
    cost: Cost;
    value: number;
    display() : string
    {
        if(this.amount - Math.floor(this.amount) > 0)
        {
            return this.amount.toFixed(2);
        }
        else
            return this.amount.toString();
    }
}

interface Cost {
    [key: string]: number;
}

class Scrap extends Resource {
    constructor(public amount) {
        super();
        this.name = "scrap";
        this.cost = <Cost>{
            "scrap": 0
        };
        document.getElementById('scrapLbl').innerHTML = this.name + ": ";
    }
}

class Rat extends Resource {
    constructor(public amount) {
        super();
        this.name = "rat";
        this.cost = <Cost>{
            "scrap": 10
        };
        this.value = 1;
        document.getElementById('ratLbl').innerHTML = this.name + ": ";
    }
}

class wRat extends Resource {
    constructor(public amount) {
        super();
        this.name = "wrat";
        this.cost = <Cost>{
            "scrap": 10,
            "rat": 1
        };
        this.value = 1;
        document.getElementById('wratLbl').innerHTML = this.name + ": ";
    }
}

var resourceList: { [id: string] : Resource; } = {};
var curScrap = new Scrap(0);
var curRat = new Rat(0);
var curWRat = new wRat(0);
resourceList["scrap"] = curScrap;
resourceList["rat"] = curRat;
resourceList["wrat"] = curWRat;

function updateView()
{
    document.getElementById('scrapId').innerHTML = resourceList["scrap"].display();
    document.getElementById('ratId').innerHTML = resourceList["rat"].display();
    document.getElementById('wratId').innerHTML = resourceList["wrat"].display();
    if(resourceList["scrap"].amount >= resourceList["rat"].cost["scrap"])
    {
        document.getElementById('scrapRat').disabled = false;
    }
    else
    {
        document.getElementById('scrapRat').disabled = true;
    }
    if(resourceList["scrap"].amount >= resourceList["wrat"].cost["scrap"] && resourceList["rat"].amount >= resourceList["wrat"].cost["rat"]) //condense this with a compare function on Cost/resourceList
    {
        document.getElementById('wRat').disabled = false;
    }
    else
    {
        document.getElementById('wRat').disabled = true;
    }
    document.getElementById('ratId').title = resourceList["rat"].cost.toString(); // doesn't work yet
}

function updateValues()
{
    if(resourceList["rat"].amount > 0)
        resourceList["scrap"].amount += (resourceList["rat"].value * resourceList["rat"].amount)/10;
}

function collectScrap()
{
    resourceList["scrap"].amount += 1;
}

function scrapRat()
{
    //cost
    resourceList["scrap"].amount -= resourceList["rat"].cost["scrap"];
    //create
    resourceList["rat"].amount += 1;
    //update cost
    resourceList["rat"].cost["scrap"] *= 1.12;
}

function wScrapRat()
{
    //cost
    resourceList["scrap"].amount -= resourceList["wrat"].cost["scrap"];
    resourceList["rat"].amount -= resourceList["wrat"].cost["rat"];
    //create
    resourceList["wrat"].amount += 1;
    //update cost
    resourceList["wrat"].cost["scrap"] *= 1.12;
    resourceList["wrat"].cost["rat"] *= 1.12;
}

window.setInterval(function(){
    this.updateValues();
    updateView();
}, 100);

