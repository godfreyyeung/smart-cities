function drawCharts() {

    // here, 'this' refers to the window of index.html,
    // which contains bundles for column and line chart

    // set column chart data
    this.columnChart.data = google.visualization.arrayToDataTable([
        ['TimeOfDay', 'Other', 'Morning', 'Evening', {
            role: 'annotation'
        }],
        ['Sunday', 10, 24, 20, ''],
        ['Monday', 16, 22, 23, ''],
        ['Tuesday', 28, 19, 29, ''],
        ['Wednesday', 28, 19, 29, ''],
        ['Thursday', 28, 19, 29, ''],
        ['Friday', 28, 19, 29, ''],
        ['Saturday', 28, 19, 29, '']
    ]);

    // set column chart options
    this.columnChart.options = {
        width: 400,
        height: 300,
        legend: {
            position: 'top',
            maxLines: 3
        },
        bar: {
            groupWidth: '75%'
        },
        isStacked: true,
    };

    // set column chart object
    this.columnChart.chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    this.columnChart.chart.draw(this.columnChart.data, this.columnChart.options);

    // bind select listener to column chart and pass drawLineChart as callback
    // Google Charts provides a 'select' event which is when a user clicks an element
    google.visualization.events.addListener(this.columnChart.chart, 'select', this.drawLineChart);
}

function drawLineChart() {

	// if selection is not null
	if (this.columnChart.chart.getSelection().length > 0) {
       
       	// get row day selected 
        var selection = this.columnChart.chart.getSelection(),
            day = (22 + selection[0].row).toString(),
            me = this;

         // load appropriate csv
        $.get("dailyData/deqAirQualityCombined-" + day + ".csv", function(csvString) {
            
        	// set up data
            var arrayData = $.csv.toObjects(csvString);
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'time');
            data.addColumn('number', 'NO');
            data.addColumn('number', 'NO2');
            //data.addColumn('number', 'Carbon Monoxide');
            data.addColumn('number', 'Sulfer Dioxide');
            data.addColumn('number', 'Nitric Oxide');

            var i = 0;
            for (i = 0; i < arrayData.length; i++) {
                data.addRows([
                    [(Number(arrayData[i].hour) * 60) + Number(arrayData[i].minute),
                     Number(arrayData[i].nitrogen_oxides),
                     Number(arrayData[i].nitrogen_dioxide),
                      //Number(arrayData[i].carbon_monoxide),
                      Number(arrayData[i].sulfer_dioxide),
                      Number(arrayData[i].nitric_oxide),
                    ],
                ]);
            }
			me.lineChart.data = data;
            
            // set up chart options
            me.lineChart.options = {
            	width: 800,
        		height: 700,
                hAxis: {
                    title: 'Time'
                },
                vAxis: {
                    title: 'NO2'
                }
            };

            // create chart object
            me.lineChart.chart = new google.visualization.LineChart(document.getElementById('line_chart'));

            /* no need to shrink column chart 
            if (columnChart.options.height !== 200) {
                me.columnChart.options.height = 200;
                me.columnChart.chart.draw(me.columnChart.data, me.columnChart.options);
                google.visualization.events.addListener(me.columnChart.chart, 'select', me.drawLineChart);
                me.columnChart.chart.setSelection(selection);
            } */

            // draw line chart
            me.lineChart.chart.draw(me.lineChart.data, me.lineChart.options);

            // text param needed to allow requesting local file
        }, "text");
    } else {
        
        console.log("Selection empty");
        /*
        if (columnChart.options.height !== 400) {
            me.columnChart.options.height = 400;
            me.columnChart.chart.draw(me.columnChart.data, me.columnChart.options);
        }
        me.lineChart.chart.clearChart();*/
    }


}




// process  nitrous oxide totals for a day
function noTotals(csvPath) {
    var noTotal;

    $.get(csvPath, function(csvString) {

        var arrayData = $.csv.toObjects(csvString);

        console.log("hi");
        console.log(arrayData[3][5]);

    });

    return noTotal;
}
