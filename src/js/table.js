

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

	constructor(data, barchart, linechart, percentageLinechart) {
		// console.log(teamData);

		this.data = data;

		
		this.columns = Object.keys(data[0]);
		// console.log(columns);

		this.barchart = barchart;

		this.linechart = linechart;

		this.percentageLinechart = percentageLinechart;

		this.initialSelected = "DeveloperType";

		this.questionSelected(this.initialSelected);

		this.width = 150;
		this.height = 20;

		this.padding = {
			left: 3.5,
			right: 6,
			top: 5,
			bottom: 5
		}


		var parent = this;

		let tablebody = d3.select("#QuestionsTable").select("tbody");

		let tr = tablebody.selectAll('tr').data(this.columns);

		let trenter = tr.enter().append("tr");

		tr = trenter.merge(tr);

		tr.filter(function(d){
			// console.log(d);
			return d === parent.initialSelected;
		}).classed("selected", true);

		tr.on("click", function(d, i){
			d3.selectAll(".selected").classed("selected", false);
			d3.select(this).classed("selected", true);
			parent.questionSelected(d);
		});

		let td = tr.selectAll("td").data(function(d){
			let array = [];
			array.push(d);
			return array;
		});

		let tdenter = td.enter().append("td");

		td = tdenter.merge(td);

		td.text(d=>d);

	}

	questionSelected(column){
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

		this.columnsToDisplay = [];

		for(let i = 0; i < 5 && i < array.length; i++){
			this.columnsToDisplay.push(array[i].name);
		}

		let tablebody = d3.select("#Responses").select("tbody");

		let tr = tablebody.selectAll('tr').data(array);
		tr.exit().remove();

		let trenter = tr.enter().append("tr");

		tr = trenter.merge(tr);



		var parent = this;
		tr.on("click", function(d, i){
			// d3.selectAll(".selected").classed("selected", false);
			let cur = d3.select(this);
			if(cur.classed("selected")){
				cur.classed("selected", false);
				parent.responseDeselected(d.name);
			}else{
				cur.classed("selected", true);
				parent.responseSelected(d.name);
			}
			
		});

		tr.filter(function(d){
			return parent.columnsToDisplay.indexOf(d.name) >=0;
		}).classed('selected', true);

		let td = tr.selectAll("td").data(function(d){
			let array = [];
			// console.log(d);
			array.push(d.name);
			return array;
		});

		let tdenter = td.enter().append("td");

		td = tdenter.merge(td);

		td.text(d=>d);

		this.responseArray = array;
		this.maxAverage = maxAverage;

		this.updateVisualizations();
	}


	responseSelected(response){
		this.columnsToDisplay.push(response);
		this.updateVisualizations();
	}

	responseDeselected(response){
		this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(response), 1);
		this.updateVisualizations();
	}

	updateVisualizations(){
		
		let array = [];

		let parent = this;

		this.responseArray.forEach(function(d, i){
			if(parent.columnsToDisplay.indexOf(d.name) >=0){
				array.push(d);
			}
		})
		this.barchart.createBarChart(array, this.maxAverage);

		let multiYearArray = [];
		for(let i = 2014; i <  2018; i++){
			multiYearArray.push({'year': i, 'data': array});
		}

		this.linechart.createLineChart(multiYearArray, "average", "Average Salary");

		this.percentageLinechart.createLineChart(multiYearArray, "fractionOfTotal", "Percent of Respondants")

	}


}























