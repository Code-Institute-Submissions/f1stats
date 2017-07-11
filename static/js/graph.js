
queue()
    .defer(d3.json, "/f1db")
    .await(makeGraphs);

function getDriver(name) {

    var iframe = document.getElementById("driverWiki")
    iframe.src="https://en.wikipedia.org/wiki/" + name.replace(" ", "_")
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



    //var countPosition = positionDim.group().



    //var minDate = yearDim.bottom(1)[1]["date_posted"];
    //var maxDate = yearDim.top(1)[1]["date_posted"];


    //Create chart
    // var chart1 = dc.pieChart("#chart1");
    //var chart2 = dc.pieChart("#chart2");
    var lineChart = dc.lineChart('#lineChart')
    var rowChart = dc.rowChart('#rowChart')
    var lapsChart = dc.rowChart('#lapsChart')


     // chart1
     //    .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
     //    .height(550)
     //    .radius(190)
     //    .innerRadius(40)
     //    .transitionDuration(1500)
     //    .dimension(driverDim)
     //    .group(countPosition);

    // chart2
    //     .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F", "#C96A23"])
    //     .height(220)
    //     .radius(90)
    //     .innerRadius(20)
    //     .transitionDuration(1500)
    //     .dimension(driverDim)
    //     .group(sumPoints);

    rowChart
        .ordering(function(d) { return -d.value })
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(600)
        .height(600)
        .dimension(nameDim)
        .group(sumPoints)
        .cap(20)
        .othersGrouper(false)
        .xAxis().ticks(12);

    lapsChart
        .ordering(function(d) { return -d.value })
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(600)
        .height(600)
        .dimension(nameDim)
        .group(sumLaps)
        .cap(20)
        .othersGrouper(false)
        .on("renderlet", function(chart){

        })
        .xAxis().ticks(12);

    lineChart
        .renderArea(true)
        .xyTipsOn('always')
        .ordinalColors(["#C96A23"])
        .width(900)
        .height(350)
        //.brushOn(false)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(yearDim)
        .group(sumLapsPerYear)
        .transitionDuration(500)
        .x(d3.time.scale().domain([new Date(1950, 0, 1), new Date(2017, 0, 1)]))
        //.elasticY(true)
        .xAxisLabel("Year")
        .y(d3.scale.linear().domain([20000, 80000]))
        .yAxis().ticks(6);

    // var data = [{
    //     x: ['Mercedes', 'Ferrari', 'Red Bull', 'Force India', 'Toro Rosso', 'Williams', 'Renault', 'HAAS', 'Sauber', 'McLaren'],
    //     y: [222, 214, 112, 71, 29, 22, 18, 15, 4, 0],
    //     type: 'bar'
    // }];
    // Plotly.newPlot('barchart', data);


    dc.renderAll();
}