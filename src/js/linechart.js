/*

 */
class LineChart{
	constructor(htmlId){
		this.htmlId = htmlId;
	}

	createLineChart(yearsData, linesAttribute, yAxisText){

		var cities = [];

		yearsData[0].data.forEach(function(d){
			cities.push({'id': d.name, 'values': []});
		});

		yearsData.forEach(function(year){
			cities.forEach(function(answer){
				year.data.forEach(function(option){
					if(option.name === answer.id){
						answer['values'].push({'date': year.year, 'temperature': option[linesAttribute]});

					}
				})
			})
		});
		
		var svg = d3.select(this.htmlId),
			margin = {top: 20, right: 80, bottom: 30, left: 50},
			width = svg.attr("width") - margin.left - margin.right,
			height = svg.attr("height") - margin.top - margin.bottom;
		
		svg.selectAll("*").remove();
		let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		

		var parseTime = d3.timeParse("%Y");

		var line = d3.line()
			.curve(d3.curveBasis)
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d[linesAttribute]); });



		parseTime = d3.timeParse("%Y%m%d");

		var x = d3.scaleTime().range([0, width]),
			y = d3.scaleLinear().range([height, 0]),
			z = d3.scaleOrdinal(d3.schemeCategory10);

		line = d3.line()
			.curve(d3.curveBasis)
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d.temperature); });


		x.domain([2014, 2017]);

		y.domain([
			d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
			d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
		]);

		z.domain(cities.map(function(c) { return c.id; }));

		g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		g.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("fill", "#000")
			.text(yAxisText);

		var city = g.selectAll(".city")
			.data(cities)
			.enter().append("g")
			.attr("class", "city");

		city.append("path")
			.attr("class", "line")
			.attr("d", function(d) { return line(d.values); })
			.style("stroke", function(d) { return z(d.id); });

		city.append("text")
			.datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
			.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
			.attr("x", 3)
			.attr("dy", "0.35em")
			.style("font", "10px sans-serif")
			.text(function(d) { return d.id; });

	}
}











