/**
 * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
 *
 */

d3.csv("data/survey_results_public.csv", function (error, csvData) {

	let data = [];
	// console.log(csvData[0]);
	for(let i =0; i < csvData.length; i++){
		if(csvData[i].Salary != "NA"){
			data.push(csvData[i]);
		}
	}

	let barchart = new BarChart();

	let linechart = new LineChart("#salary");

	let percentageLinechart = new LineChart("#percentage");

	let table = new Table(data, barchart, linechart, percentageLinechart);

});
