

function compare(a,b) {
	if (a.average > b.average)
		return -1;
	if (a.average < b.average)
		return 1;
	return 0;
}

/** Class implementing the table. */
class Table {
	/**
	 * Creates a Table Object
	 */

	constructor(data, barchart) {
		// console.log(teamData);

		this.data = data;

		
		this.columns = Object.keys(data[0]);
		// console.log(columns);

		this.barchart = barchart;

		this.updateVisualizations("DeveloperType");

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

		tr.on("click", (d, i)=> this.updateVisualizations(d));

		let td = tr.selectAll("td").data(function(d){
			let array = [];
			array.push(d);
			return array;
		});

		let tdenter = td.enter().append("td");

		td = tdenter.merge(td);

		td.text(d=>d);

	}

	updateVisualizations(column){
		let map = {};

		let totalCount = 0;
		this.data.forEach(function(d, i){
			d[column].split("; ").forEach(function(type){
				if(type in map){
					map[type].total = map[type].total + Number(d.Salary);
					map[type].count = map[type].count + 1;
					totalCount += 1;
					// console.log(number(d.Salary))
				}else{
					map[type] = {};
					map[type].name = type;
					map[type].total = parseInt(d.Salary);
					map[type].count = 1;
					totalCount += 1;
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

			obj.fractionOfTotal = obj.count/totalCount;

			array.push(obj);
			if(obj.average  > maxAverage){
				maxAverage = obj.average ;
			} 
			
		}

		array.sort(compare);

		this.barchart.createBarChart(array, maxAverage);

	}


}
