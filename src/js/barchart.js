/** Class implementing the tree view. */
class BarChart {
	/**
	 * Creates a Tree Object
	 */
	constructor(data) {
		this.data = data;
		console.log(data);
		
	}

	/**
	 * Creates a node/edge structure and renders a tree layout based on the input data
	 *
	 * @param treeData an array of objects that contain parent/child information.
	 */
	createBarChart(column) {

		d3.select("#bars").selectAll("g").remove();

		let data = this.data;
		console.log(data);
		let margin = {top: 10, right: 10, bottom: 10, left: 10};
		let width = 1000 - margin.left - margin.right;
		let height = 500 - margin.top - margin.bottom;
		let spaceForTitles = 300;

		// append the svg object to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select("#bars")
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom);


		let map = {};

		data.forEach(function(d, i){
			d[column].split("; ").forEach(function(type){
				if(type in map){
					map[type].total = map[type].total + Number(d.Salary);
					map[type].count = map[type].count + 1;
					// console.log(number(d.Salary))
				}else{
					map[type] = {};
					map[type].name = type;
					map[type].total = parseInt(d.Salary);
					map[type].count = 1;
				}
			})
		})
		let maxAverage = -1;

		let array = [];
		for (var key in map) {
		// skip loop if the property is from prototype
			if (!map.hasOwnProperty(key)) continue;

			var obj = map[key];
			obj.average = obj.total/obj.count;
			array.push(obj);
			if(obj.average  > maxAverage){
				maxAverage = obj.average ;
			} 
			
		}

		array.sort(compare);


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
			.attr('dx', -80)
			.attr('y', function(d, i){
				return yscale(d.name); 
			})
			.attr('dy', yscale.bandwidth()/2)
			.style('fill', 'white')
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
