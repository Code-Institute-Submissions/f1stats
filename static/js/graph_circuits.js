
queue()
    .defer(d3.json, "/f1db")
    .await(makeGraphs);


function getCircuit(name) {

    var circuitWikiName = name.split(" ").slice(1).join("_");
    var iframe = document.getElementById("driverWiki");
    iframe.src = "https://en.wikipedia.org/wiki/" + circuitWikiName
    }

function makeGraphs(error, data) {

    data.forEach(function(d) {
        d["date"] = new Date(d["year"], 0, 1);
    });

    var ndx = crossfilter(data);





    var nameDim = ndx.dimension(function (d) {
        return d["name"];
    });

    var positionDim = ndx.dimension(function (d) {
        return d["position"];
    });

    var pointsDim = ndx.dimension(function (d) {
        return d["points"];
    });

    var lapsDim = ndx.dimension(function (d) {
        return d["laps"];
    });

    var gridDim = ndx.dimension(function (d) {
        return d["grid"];
    });

    var yearDim = ndx.dimension(function (d) {
        return d["date"];
    });

    var raceDim = ndx.dimension(function (d) {
        return d["race"];
    });

    var sumPoints = nameDim.group().reduceSum(function (d) {
        return d["points"];
    });

    var sumLaps = nameDim.group().reduceSum(function (d) {
        return d["laps"];
    });

    var sumLapsPerYear = yearDim.group().reduceSum(function (d) {
        return d["laps"];
    });

    var raceGroup = raceDim.group().reduceCount();


    //Create chart
    var selectCircuit = dc.selectMenu('#circuitSelect')
        .dimension(raceDim)
        .group(raceGroup)
        .on("renderlet", function(chart){
            var circuitSelect = chart.select('select')[0][0];
                circuitSelect.oninput = function(){
                    var circuitName=circuitSelect.options[circuitSelect.selectedIndex].value;
                    getCircuit(circuitName);
                };
        });

    dc.renderAll();
}

