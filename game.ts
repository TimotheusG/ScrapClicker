class Resource {
    name: string;
    amount : number;
    cost: number;
}

class Scrap extends Resource {
    constructor(public amount) {
        super();
        this.name = "scrap";
        this.cost = 0;
        document.getElementById('scrapLbl').innerHTML = this.name + ": ";
    }
}

class Rat extends Resource {
    constructor(public amount) {
        super();
        this.name = "rat";
        this.cost = 10; //eventually make a resource cost class for validation
        document.getElementById('ratLbl').innerHTML = this.name + ": ";
    }
}

var resourceList: { [id: string] : Resource; } = {};
var curScrap = new Scrap(0);
var curRat = new Rat(0);
resourceList["scrap"] = curScrap;
resourceList["rat"] = curRat;

function updateView()
{
    document.getElementById('scrapId').innerHTML = resourceList["scrap"].amount.toString();
    document.getElementById('ratId').innerHTML = resourceList["rat"].amount.toString();
    if(resourceList["scrap"].amount >= resourceList["rat"].cost)
    {
        document.getElementById('scrapRat').disabled = false;
    }
    else
    {
        document.getElementById('scrapRat').disabled = true;
    }
}

function collectScrap()
{
    resourceList["scrap"].amount += 1;
    updateView();
}

function scrapRat()
{
    //cost
    resourceList["scrap"].amount -= resourceList["rat"].cost;
    //create
    resourceList["rat"].amount += 1;
    //update cost
    resourceList["rat"].cost *= 1.12;
    updateView();
}