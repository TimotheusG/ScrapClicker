class Resource {
    name: string;
    amount : number;
    cost: number;
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
        this.value = 1;
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
    document.getElementById('scrapId').innerHTML = resourceList["scrap"].display();
    document.getElementById('ratId').innerHTML = resourceList["rat"].display();
    if(resourceList["scrap"].amount >= resourceList["rat"].cost)
    {
        document.getElementById('scrapRat').disabled = false;
    }
    else
    {
        document.getElementById('scrapRat').disabled = true;
    }
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
    resourceList["scrap"].amount -= resourceList["rat"].cost;
    //create
    resourceList["rat"].amount += 1;
    //update cost
    resourceList["rat"].cost *= 1.12;
}

window.setInterval(function(){
    this.updateValues();
    updateView();
}, 100);