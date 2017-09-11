
queue()
    .defer(d3.json, "/f1db")
    .await(makeGraphs);

//Wikipedia track name changer url. Much like the Wiki name change, the function takes a selected race name such as '1950 British Grand Prix',
//and splits the array into 4 works. We then slice off the first, leaving 'British Grand Prix'. This is then added as a
//url to the wikipedia url iframe and words seperated by an underscore to ensure the url is legal.
function getCircuit(name) {

    var circuitWikiName = name.split(" ").slice(1).join("_");
    var iframe = document.getElementById("driverWiki");
    iframe.src = "https://en.wikipedia.org/wiki/" + circuitWikiName;
    }

function makeGraphs(error, data) {

    data.forEach(function(d) {
        d["date"] = new Date(d["year"], 0, 1);
    });

    var ndx = crossfilter(data);


    var raceDim = ndx.dimension(function (d) {
        return d["race"];
    });

    var raceGroup = raceDim.group().reduceCount();


    //This is a drop down Selection box for all recorded races in the database.
    var selectCircuit = dc.selectMenu('#circuitSelect')
        .dimension(raceDim)
        .group(raceGroup)
        //Once the user has selected a race, renderlet runs and uses the chosen field to run the above Wikipedia 'getCircuit'
        //function to then display the correct information about the track from Wikipedia.
        .on("renderlet", function(chart){
            var circuitSelect = chart.select('select')[0][0];
                circuitSelect.oninput = function(){
                    var circuitName=circuitSelect.options[circuitSelect.selectedIndex].value;
                    getCircuit(circuitName);
                };
        });
    //Ensure this is at the bottom for rendering of all graphs
    dc.renderAll();
}

