
/**
 * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
 *
 */

var dollarValue = function(d) { return "$" + d3.format(",.0f")(d); }
// var dollarValue = function(d) { return (d); }
function compare(a,b) {
  if (a.average > b.average)
    return -1;
  if (a.average < b.average)
    return 1;
  return 0;
}

d3.csv("data/survey_results_public.csv", function (error, csvData) {

	let data = [];
	// console.log(csvData[0]);
	for(let i =0; i < csvData.length; i++){
		if(csvData[i].Salary != "NA"){
			data.push(csvData[i]);
		}
	}


	let barchart = new BarChart(data);

	let table = new Table(Object.keys(data[0]), barchart);

});
