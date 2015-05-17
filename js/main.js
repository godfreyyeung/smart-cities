/* main.js */

google.load('visualization', '1', {
    packages: ['corechart', 'bar']
});

// global obj literals for bundling charts with their data and options
columnChart = {
        data: null,
        options: null,
        chart: null
    }

lineChart = {
        data: null,
        options: null,
        chart: null
    }

google.setOnLoadCallback(drawCharts);
