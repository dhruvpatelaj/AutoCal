


var contextSelection = {
  "id": "baseString",
  "title": "Send To Calendar",
  "contexts": ["selection"]

};


var title;
var date;
var time;
var endTime;
var loc;
var description;
//....

/** BACKEND  */

chrome.contextMenus.create(contextSelection);

chrome.contextMenus.onClicked.addListener(function(parseData){


  if(parseData.menuItemId == "baseString" && parseData.selectionText){

    var selection = parseData.selectionText;
    eventRecognition(selection)
    alert(title + "\n" + date + "\n" + time + "\n" + endTime + "\n" + loc);

    //fillForm(<parameters>)
  }
})

function eventRecognition(selection)
{
    titleFinder(selection);
    dateFinder(selection);
    timeFinder(selection);
    locFinder(selection);
    //alert(parseData.selectionText)
}

function titleFinder(selection)
{

}


function dateFinder(selection){
    date = "";
    var d = selection.match(/(([1-9])|([0-2][0-9]))((\/)|(-))(([1-9])|([0-2][0-9])|([3][0-1]))((\/)|(-))((\d{4})|(\d{2}))/gi);
    if(d == null){
      var d = selection.match(/(([1-9])|([0-2][0-9]))((\/)|(-))(([1-9])|([0-2][0-9])|([3][0-1]))/gi);
    }
    if(d == null){
      var d = selection.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Jan.|Feb.|Mar.|Apr.|May.|Jun.|Jul.|Aug.|Sep.|Oct.|Nov.|Dec.|January|February|March|April|May|June|July|August|September|October|November|December)\s\d/gi);
    }
    date = d;
}

function timeFinder(selection)
{
    var n = /[0-9]/i
    time = n;
}


function locFinder(selection){


    loc = "d";
}
/** BACKEND  */


//function fillForm(title, location, date, time){


//listener for submit button that calls oauth function
