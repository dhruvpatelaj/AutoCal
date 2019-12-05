


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
    var d = selection.match(/(([1-9])|([0-2][0-9]))((\/)|(-))(([1-9])|([0-2][0-9])|([3][0-1]))((\/)|(-))((\d{4})|(\d{2}))/gi); //finds dates in mm/dd/yyy, m/d/yy, and same using dashes
    if(d == null){
      var d = selection.match(/(([1-9])|([0-2][0-9]))((\/)|(-))(([1-9])|([0-2][0-9])|([3][0-1]))/gi); //finds dates in  mm/dd, m/d, 
    }
    if(d == null){
      var d = selection.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Jan.|Feb.|Mar.|Apr.|May.|Jun.|Jul.|Aug.|Sep.|Oct.|Nov.|Dec.|January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2}/gi);
    }
    date = d;
}

function timeFinder(selection)
{
    //first clear the variables
    time = "";
    endTime = "";

    //first search for times in colon format like: 6:30, 9:20, 2:00
    var colonTime = selection.match(/([0-9]{1,2})(:[0-5][0-9])/gi);

    //if anything in colon format have been found, then assume
    //them to be the start and end time. If no end time, it returns undefined
    if (colonTime != undefined)
    {
        time = colonTime[0];
        endTime = colonTime[1];
        return;
    }

    // this don't do anything yet
    //search() returns-1 if none found
    var position_of_first_num = selection.search(/[0-9]/gi);
    var am_pm = selection.search(/am|pm/gi);
    var space = selection.search(/../gi);

    var full = selection.match(/[0-9](\s?)(am|pm)/mi);
    var fullIndex = full.index;

    //time =  "hehexd";
    //full + " : " + fullIndex;
    //position_of_first_num + ", " + am_pm + ", " + space;
}

function locFinder(selection){


    loc = "d";
}
/** BACKEND  */


//function fillForm(title, location, date, time){


//listener for submit button that calls oauth function
