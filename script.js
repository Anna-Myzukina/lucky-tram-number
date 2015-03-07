var arr = [];
var num, i;

for (i = 0; i < 1000000; i++) {
    num = "" + i;
    while (num.length < 6 ) {
        num = "0" + num;
    }

    if ((+num[0]) + (+num[1]) + (+num[2]) === (+num[3]) + (+num[4]) + (+num[5])) {
        arr.push(0);
    } else {
        arr.push(arr[arr.length - 1] + 1);
    }
}

//console.log(arr);

var a = 100;

var mini = [];
var len = arr.length;
for (i = 0; i < len; i++) {
    if (i % Math.round(1000000 / (a * a)) === 0) {
        mini.push(arr[i]);
    } else {
        mini[mini.length - 1] += arr[i];
    }
}

var heatmap = d3.scale.linear()
    .domain([d3.min(mini), d3.max(mini)])
    .interpolate(d3.interpolateRgb)
    .range(["#ffffff","red"])

var width = 800,
    height = 800;

var svg = d3.select('body')
    .append('svg')
    .attr({ width: width, height: height});

svg.selectAll("g")
      .data(mini)
    .enter().append('g')
      .attr("transform", function(d, i){ return "translate(" + (width/a)*(i%a) + "," + Math.floor(i/a)*(height/a) + ")" })
    .append("rect")
    .attr('fill', function (d) {
        return heatmap(d);
    })
    .attr({height: (height/a) - 1, width: width/a - 1});
