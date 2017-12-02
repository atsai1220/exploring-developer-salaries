/*
yearsData[0] == 2017
yearsData[1] == 2016
yearsData[2] == 2015
yearsData[3] == 2014
 */
class LineChart{
	constructor(htmlId){
		this.htmlId = htmlId;
	}


	createLineChart(survey_array, yearsData, linesAttribute, yAxisText){

	    /*
	    only keep jobs that occur in all years and from current selection
	     */
		let occupations = [];
        survey_array.forEach(function(d){
            occupations.push({'id': d.name, 'values': []});
		});
        // console.log(yearsData[0]);
		yearsData[0].data.forEach(function(job_data){
            occupations.forEach(function(job){
                if(job_data.name === job.id){
                    job['values'].push({'year': 2017, 'value': job_data[linesAttribute]});
                }
			})
		});
        yearsData[1].data.forEach(function(job_data){
            occupations.forEach(function(job){
                if(job_data.name === job.id){
                    job['values'].push({'year': 2016, 'value': job_data[linesAttribute]});
                }
            })
        });
        yearsData[2].data.forEach(function(job_data){
            occupations.forEach(function(job){
                if(job_data.name === job.id){
                    job['values'].push({'year': 2015, 'value': job_data[linesAttribute]});
                }
            })
        });
        yearsData[3].data.forEach(function(job_data){
            occupations.forEach(function(job){
                if(job_data.name === job.id){
                    job['values'].push({'year': 2014, 'value': job_data[linesAttribute]});
                }
            })
        });

        // console.log(yearsData[0]);
        // console.log(yearsData[1]);
        // console.log(yearsData[2]);
        // console.log(yearsData[3]);
		
		let svg = d3.select(this.htmlId),
			margin = {top: 20, right: 100, bottom: 30, left: 50},
			width = svg.attr("width") - margin.left - margin.right,
			height = svg.attr("height") - margin.top - margin.bottom;
		
		svg.selectAll("*").remove();

		let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // let parseTime = d3.timeParse("%Y");
        // parseTime = d3.timeParse("%Y%m%d");

        let x = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            z = d3.scaleOrdinal(d3.schemeCategory10);

		x.domain([2014, 2017]);

		y.domain([
			d3.min(occupations, function(c) {
			    return d3.min(c.values, function(d) {
			        return d.value;
                }); }),
			d3.max(occupations, function(c) {
			    return d3.max(c.values, function(d) {
			        return d.value;
                }); })
		]);

		z.domain(occupations.map(function(c) { return c.id; }));

		let line = d3.line()
            .defined(function(d) {
                return d;
            })
            .curve(d3.curveBasis)
            .x(function(d) {
                return x(d.year);
            })
            .y(function (d) {
                return y(d.value);
            });

		g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x).tickFormat(d3.format("d")).tickValues([2014, 2015, 2016, 2017]));


		g.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("fill", "#000")
			.text(yAxisText);

		// console.log(occupations);
		let jobSelection = g.selectAll(".job")
			.data(occupations)
			.enter().append("g")
			.attr("class", "job");

        jobSelection.append("path")
			.attr("class", "line")
			.attr("d", function(d) {
			    // console.log(d.values);
			    return line(d.values);
			})
			.style("stroke", function(d) { return z(d.id); })
            .style("stroke-width", 2);

        // jobSelection.append("circle")
        //     .attr("class", "dot")
        //     .attr("cx", function(d) {
        //         // console.log(circle(d.values));
        //         // return getX(d.values);
        //     })
        //     .attr("cy", function(d) {
        //         // return getY(d.values);
        //     })
        //     .attr("r", 3.5);

        jobSelection.append("text")
			.datum(function(d) {
			    return {
			        id: d.id, value: d.values
			    };
			})
			.attr("transform", function(d) {
			    // console.log(x(d.value[0].year));
			    // console.log(d.value[0].year);
			    // console.log(d.value);
			    return "translate(" + x(d.value[0].year) + "," + y(d.value[0].value) + ")";
                // if (Number.isInteger(d.value[0].value)) {
			     //    console.log(d.value[0].year);
			     //    return "translate(" + x(d.value[0].year) + "," + y(d.value[0].salary) + ")";
                // } else {
			     //    return "translate(" + x(10) + "," + y(10) + ")";
                // }
			})
			.attr("x", 3)
			.attr("dy", "0.35em")
			.style("font", "10px sans-serif")
			.text(function(d) { return d.id; });

	}
}











