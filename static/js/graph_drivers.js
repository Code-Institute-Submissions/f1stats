
queue()
    .defer(d3.json, "/f1db")
    .await(makeGraphs);

//Wikipedia URL Replacer - replaces url with name of selected driver, adding and underscore between names to complete URL
function getDriver(name) {

    var iframe = document.getElementById("driverWiki");
    iframe.src="https://en.wikipedia.org/wiki/" + name.replace(" ", "_");
}

function makeGraphs(error, data) {

    data.forEach(function(d) {
        d["date"] = new Date(d["year"], 0, 1);
    });

    var ndx = crossfilter(data);


    //Create dimensions used for the drivers page.
    var nameDim = ndx.dimension(function (d) {
        return d["name"];
    });

    var positionDim = ndx.dimension(function (d) {
        return d["position"];
    });

    var driverGroup = nameDim.group().reduceCount();

    var countPosition = positionDim.group().reduceCount();




    //Driver Select menu where user selects a driver from a drop-down box.
    var selectDriver = dc.selectMenu('#driverSelect')
        .dimension(nameDim)
        .group(driverGroup)
        //Once driver has been selected, renderlet runs and selects chosen driver as target for Wikipedia name change, and
        //also the below Pie Chart positions displayed match the input for just the selected driver.
        .on("renderlet", function(chart){
            var driverSelect = chart.select('select')[0][0];
                driverSelect.oninput = function(){
                    var driverName=driverSelect.options[driverSelect.selectedIndex].value;
                    getDriver(driverName);
                };
        });

    var driverPositions = dc.pieChart('#driverPositions');

    //Create Pie Chart for selected driver
    driverPositions
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .height(750)
        .radius(190)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(positionDim)
        .group(countPosition)
        .cap(20)
        .drawPaths(true)
        .externalLabels(10);



    //Ensure this is at the bottom for rendering of all graphs
    dc.renderAll();
}

