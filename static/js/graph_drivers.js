
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

    var driverGroup = nameDim.group().reduceCount();

    var countPosition = positionDim.group().reduceCount();




    //Create chart
    var selectDriver = dc.selectMenu('#driverSelect')
        .dimension(nameDim)
        .group(driverGroup)
        .on("renderlet", function(chart){
            var driverSelect = chart.select('select')[0][0];
                driverSelect.oninput = function(){
                    var driverName=driverSelect.options[driverSelect.selectedIndex].value;
                    getDriver(driverName);
                };
        });

    var driverPositions = dc.pieChart('#driverPositions')

    driverPositions
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .height(550)
        .radius(190)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(positionDim)
        .group(countPosition)
        .on("renderlet", function(chart){
            var driverSelect = chart.select('select')[0][0];
                driverSelect.oninput = function(){
                    var driverName=driverSelect.options[driverSelect.selectedIndex].value;
                    getDriver(driverName);
                };
        });



    dc.renderAll();
}

