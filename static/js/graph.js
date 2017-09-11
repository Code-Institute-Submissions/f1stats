
queue()
    .defer(d3.json, "/f1db")
    .await(makeGraphs);

//Wikipedia URL Replacer - replaces url with name of selected driver, adding and underscore between names to complete URL
function getDriver(name) {

    var iframe = document.getElementById("driverWiki");
    iframe.src="https://en.wikipedia.org/wiki/" + name.replace(" ", "_");
}

function makeGraphs(error, data) {
//Completes the date by adding a month of 0 and day of 1 to the selected year to complete the format
    data.forEach(function(d) {
        d["date"] = new Date(d["year"], 0, 1);
    });

    var ndx = crossfilter(data);




//Dimensions which are used by graphs, including groups
    var nameDim = ndx.dimension(function (d) {
        return d["name"];
    });

    var yearDim = ndx.dimension(function (d) {
        return d["date"];
    });

    var sumPoints = nameDim.group().reduceSum(function (d) {
        return d["points"];
    });

//Sum of all the laps of a certain driver, to be used in the total laps chart
    var sumLaps = nameDim.group().reduceSum(function (d) {
        return d["laps"];
    });

//Sum off all the laps of each year, for the lapsChart at bottom of page
//Takes the Year as group in date format
    var sumLapsPerYear = yearDim.group().reduceSum(function (d) {
        return d["laps"];
    });

    //Create chart
    var lineChart = dc.lineChart('#lineChart');
    var rowChart = dc.rowChart('#rowChart');
    var lapsChart = dc.rowChart('#lapsChart');


    //Row Chart for total points
    rowChart
        .ordering(function(d) { return -d.value })
        //Colours will fade from red to orange from value 10 being most red, to 14000 in data terms
        .linearColors(['red', 'orange'])
            .colorDomain([10, 14000])
            .colorAccessor(function (d, i) {console.log(d);  return d.value; })
        .width(600)
        .height(600)
        .dimension(nameDim)
        .group(sumPoints)
        //Ensures only 20 results are shown, as list is many many drivers.
        .cap(20)
        .othersGrouper(false)
        .xAxis().ticks(12);

    //Row Chart for total amount of laps driven
    lapsChart
        .ordering(function(d) { return -d.value })
        //Colours will fade from red to orange from value 10 being most red, to 100000 in data terms
        .linearColors(['red', 'orange'])
            .colorDomain([10, 100000])
            .colorAccessor(function (d, i) {console.log(d);  return d.value; })
        .width(600)
        .height(600)
        .dimension(nameDim)
        .group(sumLaps)
        //Ensures only 20 results are shown, as list contains many many drivers.
        .cap(20)
        .othersGrouper(false)
        .on("renderlet", function(chart){
            var drivers = chart.selectAll('rect')[0];
            drivers.forEach(function(driver) {
                var driverName = driver.parentNode.getElementsByTagName('text')[0].innerHTML;
                driver.onmouseover = function(){
                    getDriver(driverName);
                };
            });
        })
        .xAxis().ticks(12);

    //Line Chart spanning 1950-2017, month set to 0 and day set to 1 for format purposes
    lineChart
        .renderArea(true)
        .xyTipsOn('always')
        .ordinalColors(['orange'])
        .width(900)
        .height(400)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(yearDim)
        .group(sumLapsPerYear)
        .transitionDuration(500)
        .x(d3.time.scale().domain([new Date(1950, 0, 1), new Date(2017, 0, 1)]))
        .xAxisLabel("Year")
        //Data dictates the min is 40000 and max is 230000 to ensure data fits within scale of chart
        .y(d3.scale.linear().domain([40000, 230000]))
        .yAxis().ticks(10);

    //Ensure this is at the bottom for rendering of all graphs
    dc.renderAll();
}

