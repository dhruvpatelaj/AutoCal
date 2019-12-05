


var contextSelection = {
  "id": "baseString",
  "title": "Send To Calendar",
  "contexts": ["selection"]

};


var title;
var date;
var time;
var loc;
var description;
//....

/** BACKEND  */

chrome.contextMenus.create(contextSelection);

chrome.contextMenus.onClicked.addListener(function(parseData){


  if(parseData.menuItemId == "baseString" && parseData.selectionText){

    var selection = parseData.selectionText;
    eventRecognition(selection)
    alert(title + "\n" + date + "\n" + time + "\n" + loc);

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

  title = "a";
}


function dateFinder(selection){


    date = "b";
}

function timeFinder(selection)
{

    time = "c";
}


function locFinder(selection){


    loc = "d";
}
/** BACKEND  */


//function fillForm(title, location, date, time){


//listener for submit button that calls oauth function
