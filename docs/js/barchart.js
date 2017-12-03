

function dollarValue(d) {
	return "$" + d3.format(",.0f")(d);
}

/** Class implementing the tree view. */
class BarChart {
	/**
	 * Creates a Tree Object
	 */
	constructor() {
	}

	/**
	 * Creates a node/edge structure and renders a tree layout based on the input data
	 *
	 * @param treeData an array of objects that contain parent/child information.
	 */
	createBarChart(array, maxAverage) {
		// console.log(array);
		d3.select("#bars").selectAll("g").remove();

        let mySVG = document.getElementById("bars");
        mySVG.setAttribute("width",  window.innerWidth/4)
        let width = window.innerWidth/4;

		let margin = {top: 10, right: 10, bottom: 10, left: 10};
		 // let width = 400 - margin.left - margin.right;
		let height = 450 - margin.top - margin.bottom;
		let spaceForTitles = 300;

		// append the svg object to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select("#bars")
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom);





		var xscale = d3.scaleLinear()
			.domain([0, maxAverage])
			.range([0, width - margin.right - spaceForTitles]);

		var yscale = d3.scaleBand().rangeRound([0, height]).padding(0.1)
			.domain(array.map(function(d) { return d.name; }));

		let g = svg.append('g')
			.attr("transform", "translate(" + spaceForTitles +",0)");

		g.append("g")
			.attr('class', 'y axis')
			.call(d3.axisLeft(yscale))



		var chart = g
			.attr('id','bars')
			.selectAll('rect')
			.data(array)
			.enter()
			.append('rect')
			.attr('height', yscale.bandwidth())
			.attr('x', 0)
			.attr('y', function(d, i){
				return yscale(d.name); 
			})
			.attr('width',function(d){ return 0; });

		var labels = svg.append("g").attr("transform", "translate(" + spaceForTitles +",0)")
			.selectAll("text")
			.data(array)
			.enter()
			.append("text")
			.attr('x', d=> xscale(d.average))
			.attr('dx', -45)
			.attr('y', function(d, i){
				return yscale(d.name); 
			})
			.attr('dy', yscale.bandwidth() - 2)
			.style('fill', 'white')
			.style("font-size",12)
			.text(function(d){
				return dollarValue(d.average);
			});


		var transit = d3.select("svg").selectAll("rect")
			.data(array)
			.transition()
			.duration(1000) 
			.attr("width", function(d) {return xscale(d.average); });


	};
}
