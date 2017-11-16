/** Class implementing the table. */
class Table {
	/**
	 * Creates a Table Object
	 */

	constructor(columns, barchart) {
		// console.log(teamData);

		this.columns = columns;
		console.log(columns);

		this.barchart = barchart;

		this.barchart.createBarChart("DeveloperType");

		this.width = 150;
		this.height = 20;

		this.padding = {
			left: 3.5,
			right: 6,
			top: 5,
			bottom: 5
		}

		let tablebody = d3.select("#QuestionsTable").select("tbody");

		let tr = tablebody.selectAll('tr').data(this.columns);

		let trenter = tr.enter().append("tr");

		tr = trenter.merge(tr);

		tr.on("click", (d, i)=> this.barchart.createBarChart(d));

		let td = tr.selectAll("td").data(function(d){
			let array = [];
			array.push(d);
			return array;
		});

		let tdenter = td.enter().append("td");

		td = tdenter.merge(td);

		td.text(d=>d);

	}


}
