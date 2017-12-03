

function compare(a,b) {
	if (a.average > b.average)
		return -1;
	if (a.average < b.average)
		return 1;
	return 0;
}

function sort_name(a, b) {
    let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
    if (nameA < nameB) //sort string ascending
        return -1;
    if (nameA > nameB)
        return 1;
    return 0 //default return value (no sorting)
}


/** Class implementing the table. */
class Table {
	/**
	 * Creates a Table Object
	 */

	constructor(data, barchart, linechart, percentageLinechart) {

		this.data = data;

		this.columns = Object.keys(data.survey_public[0]);
        //
		// debugger;

		this.columns = this.columns.filter(name => {
		    if (name === "Country" || name === "YearsCodedJob" || name === "DeveloperType"
            || name === "HaveWorkedLanguage" || name === "Gender") {
		        return name;
            }
        });

        this.barchart = barchart;
		this.linechart = linechart;

		this.percentageLinechart = percentageLinechart;

		this.initialSelected = "DeveloperType";

		this.questionSelected(this.initialSelected);
        //
		// this.width = 150;
		// this.height = 20;

		this.padding = {
			left: 3.5,
			right: 6,
			top: 5,
			bottom: 5
		};
        // Country, YearsCoded, DeveloperType, HaveWorkedLanguage, WantWorkLanguage, Gender, Salary

		let parent = this;

		let tablebody = d3.select("#QuestionsTable").select("tbody");

		let tr = tablebody.selectAll('tr').data(this.columns);

		let trenter = tr.enter().append("tr");

		tr = trenter.merge(tr);

		tr.filter(function(d){
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
		this.data.survey_public.forEach(function(d){
			d[column].split("; ").forEach(function(type){
			    // console.log(type);
				if(type in map){
				    if (Number.isInteger(parseInt(d.Salary))) {
                        map[type].total = map[type].total + Number(d.Salary);
                        map[type].count = map[type].count + 1;
                        totalCount += 1;
                    }
				}else{
				    if (Number.isInteger(parseInt(d.Salary))) {
                        map[type] = {};
                        map[type].name = type;
                        map[type].total = parseInt(d.Salary);
                        map[type].count = 1;
                        totalCount += 1;
                    }
				}
			})
		});

		/*
		Parsing yearly data
		 */
		let map_yearly = {};
		totalCount = 0;
		map_yearly.survey_2017 = {};
		map_yearly.survey_2016 = {};
		map_yearly.survey_2015 = {};
		map_yearly.survey_2014 = {};
		this.data.survey_2017.forEach(function(d) {
            d[column].split("; ").forEach(function(type) {
                if (type in map_yearly.survey_2017) {
                    if (Number.isInteger(parseInt(d.Salary))) {
                        // console.log(d.Salary);
                        map_yearly.survey_2017[type].total = map_yearly.survey_2017[type].total + parseInt(d.Salary);
                        map_yearly.survey_2017[type].count = map_yearly.survey_2017[type].count + 1;
                        // console.log(map_yearly.survey_2017[type].total);
                    }
                } else {
                    if (Number.isInteger(parseInt(d.Salary))) {
                        map_yearly.survey_2017[type] = {};
                        map_yearly.survey_2017[type].name = type;
                        map_yearly.survey_2017[type].total = parseInt(d.Salary);
                        map_yearly.survey_2017[type].count = 1;
                        totalCount += 1;
                        // console.log(map_yearly.survey_2017[type].total);
                    }
                }
            })
        });

        totalCount = 0;
        this.data.survey_2016.forEach(function(d) {
            d[column].split("; ").forEach(function(type) {
                    if (type in map_yearly.survey_2016) {
                        if (Number.isInteger(parseInt(d.Salary))) {
                            map_yearly.survey_2016[type].total = map_yearly.survey_2016[type].total + parseInt(d.Salary);
                            map_yearly.survey_2016[type].count += 1;
                        }
                } else {
                    if (Number.isInteger(parseInt(d.Salary))) {
                        map_yearly.survey_2016[type] = {};
                        map_yearly.survey_2016[type].name = type;
                        map_yearly.survey_2016[type].total = parseInt(d.Salary);
                        map_yearly.survey_2016[type].count = 1;
                        totalCount += 1;
                    }
                }
            })
        });
        totalCount = 0;
        this.data.survey_2015.forEach(function(d) {
            d[column].split("; ").forEach(function(type) {
                if (type in map_yearly.survey_2015) {
                    if (Number.isInteger(parseInt(d.Salary))) {
                        map_yearly.survey_2015[type].total += parseInt(d.Salary);
                        map_yearly.survey_2015[type].count += 1;
                    }
                } else {
                    if (Number.isInteger(parseInt(d.Salary))) {
                        map_yearly.survey_2015[type] = {};
                        map_yearly.survey_2015[type].name = type;
                        map_yearly.survey_2015[type].total = parseInt(d.Salary);
                        map_yearly.survey_2015[type].count = 1;
                        totalCount += 1;
                    }
                }
            })
        });
        totalCount = 0;
        this.data.survey_2014.forEach(function(d) {
            d[column].split("; ").forEach(function(type) {
                if (type in map_yearly.survey_2014) {
                    if (Number.isInteger(parseInt(d.Salary))) {
                        map_yearly.survey_2014[type].total += parseInt(d.Salary);
                        map_yearly.survey_2014[type].count += 1;
                    }
                } else {
                    if (Number.isInteger(parseInt(d.Salary))) {
                        map_yearly.survey_2014[type] = {};
                        map_yearly.survey_2014[type].name = type;
                        map_yearly.survey_2014[type].total = parseInt(d.Salary);
                        map_yearly.survey_2014[type].count = 1;
                        totalCount += 1;
                    }
                }
            })
        });

        // console.log(map_yearly.survey_2017);
        // console.log(map_yearly.survey_2016);
        // console.log(map_yearly.survey_2015);
        // console.log(map_yearly.survey_2014);


		let maxAverage = -1;

		let array = [];

		for (let key in map) {
		// skip loop if the property is from prototype
			if (!map.hasOwnProperty(key)) continue;

			let obj = map[key];
			obj.average = obj.total/obj.count;

			obj.fractionOfTotal = obj.count/totalCount;

			array.push(obj);
			if(obj.average  > maxAverage){
				maxAverage = obj.average ;
			}
		}
		array.sort(sort_name);
        // array.sort(compare);

        /*
        Taking average salary for each category
         */
		let array_2017 = [];
        for (let key in map_yearly.survey_2017) {
            // skip loop if the property is from prototype
            if (!map_yearly.survey_2017.hasOwnProperty(key)) continue;

            let obj = map_yearly.survey_2017[key];
            obj.average = obj.total/obj.count;

            obj.fractionOfTotal = obj.count/totalCount;

            array_2017.push(obj);
            if(obj.average  > maxAverage){
                maxAverage = obj.average ;
            }
        }
        array_2017.sort(sort_name);
        // array_2017.sort(compare);
        this.responseArray_2017 = array_2017;

        let array_2016 = [];
        for (let key in map_yearly.survey_2016) {
            // skip loop if the property is from prototype
            if (!map_yearly.survey_2016.hasOwnProperty(key)) continue;

            let obj = map_yearly.survey_2016[key];
            obj.average = obj.total/obj.count;

            obj.fractionOfTotal = obj.count/totalCount;

            array_2016.push(obj);
            if(obj.average  > maxAverage){
                maxAverage = obj.average ;
            }
        }
        array_2016.sort(sort_name);
        // array_2016.sort(compare);
        this.responseArray_2016 = array_2016;

        let array_2015 = [];
        for (let key in map_yearly.survey_2015) {
            // skip loop if the property is from prototype
            if (!map_yearly.survey_2015.hasOwnProperty(key)) continue;

            let obj = map_yearly.survey_2015[key];
            obj.average = obj.total/obj.count;

            obj.fractionOfTotal = obj.count/totalCount;

            array_2015.push(obj);
            if(obj.average  > maxAverage){
                maxAverage = obj.average ;
            }
        }
        array_2015.sort(sort_name);
        // array_2015.sort(compare);
        this.responseArray_2015 = array_2015;

        let array_2014 = [];
        for (let key in map_yearly.survey_2014) {
            // skip loop if the property is from prototype
            if (!map_yearly.survey_2014.hasOwnProperty(key)) continue;

            let obj = map_yearly.survey_2014[key];
            obj.average = obj.total/obj.count;

            obj.fractionOfTotal = obj.count/totalCount;

            array_2014.push(obj);
            if(obj.average  > maxAverage){
                maxAverage = obj.average ;
            }
        }
        array_2014.sort(sort_name);
        // array_2014.sort(compare);
        this.responseArray_2014 = array_2014;



		this.columnsToDisplay = [];

		for(let i = 0; i < 5 && i < array.length; i++){
			this.columnsToDisplay.push(array[i].name);
		}

		let tablebody = d3.select("#Responses").select("tbody");

		let tempArray = [];
        /* note : data is the actual object that matched search criteria
  // or undefined if nothing matched */
        for (let i = 0; i < array.length; i++) {
            let col_name = array[i];
            // console.log(i);
            // console.log(col_name.name);
            let result_2014 = array_2014.find( function( item ) {
                return item.name === col_name.name;
            });
            let result_2015 = array_2015.find( function( item ) {
                return item.name === col_name.name;
            });
            let result_2016 = array_2016.find( function( item ) {
                return item.name === col_name.name;
            });
            if (result_2014 === undefined && result_2015 === undefined && result_2016 === undefined) {
                // console.log(col_name.name);
            } else {
                tempArray.push(col_name);
            }
        }
        array = tempArray;



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
		let array_2017 = [];
        let array_2016 = [];
        let array_2015 = [];
        let array_2014 = [];

		let parent = this;

		// Pass selected elements only
		this.responseArray.forEach(function(d){
			if(parent.columnsToDisplay.indexOf(d.name) >=0){
				array.push(d);
			}
		});
		this.responseArray_2017.forEach(function(d) {
		    if (parent.columnsToDisplay.indexOf(d.name) >= 0) {
		        array_2017.push(d);
            }
        });
        this.responseArray_2016.forEach(function(d) {
            if (parent.columnsToDisplay.indexOf(d.name) >= 0) {
                array_2016.push(d);
            }
        });
        this.responseArray_2015.forEach(function(d) {
            if (parent.columnsToDisplay.indexOf(d.name) >= 0) {
                array_2015.push(d);
            }
        });
        this.responseArray_2014.forEach(function(d) {
            if (parent.columnsToDisplay.indexOf(d.name) >= 0) {
                array_2014.push(d);
            }
        });
		this.barchart.createBarChart(array, this.maxAverage);


        // console.log(array_2017);
        // console.log(array_2016);
        // console.log(array_2015);
        // console.log(array_2014);

		let multiYearArray = [];

        multiYearArray.push({'year': 2017, 'data': array_2017});
        multiYearArray.push({'year': 2016, 'data': array_2016});
        multiYearArray.push({'year': 2015, 'data': array_2015});
        multiYearArray.push({'year': 2014, 'data': array_2014});

		this.linechart.createLineChart(array, multiYearArray, "average", "Average Salary");

		this.percentageLinechart.createLineChart(array, multiYearArray, "fractionOfTotal", "Percent of Respondents")

        let mySVG = document.getElementById("salary");
        mySVG.setAttribute("width",  window.innerWidth/4);

        mySVG = document.getElementById("percentage");
        mySVG.setAttribute("width",  window.innerWidth/4);


	}


}























