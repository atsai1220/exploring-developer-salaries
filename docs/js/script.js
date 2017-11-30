/**
 * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
 *
 */
d3.queue()
	.defer(d3.csv, "data/survey_results_public.csv")
	.defer(d3.csv, "data/survey_2017.csv")
    .defer(d3.csv, "data/survey_2016.csv")
    .defer(d3.csv, "data/survey_2015.csv")
    .defer(d3.csv, "data/survey_2014.csv")
    // .defer(d3.csv, "data/survey_2013.csv")
	.await(analyze);

function analyze(error, survey_public, survey_2017, survey_2016, survey_2015, survey_2014) {
	if (error) { console.log(error); }

	let data = initializeDictionary();

	for (let i = 0; i < survey_public.length; i++) {
        if (survey_public[i].Salary !== "NA"){
            // && survey_public[i].Country === "United States") {
            data.survey_public.push(survey_public[i]);
        }
    }

    for (let i = 0; i < survey_2017.length; i++) {
	    if (survey_2017[i].Salary !== "NA"){
            // && survey_2017[i].Country === "United States") {
	        data.survey_2017.push(survey_2017[i]);
        }
    }

    for (let i = 0; i < survey_2016.length; i++) {
        if (survey_2016[i].Salary !== "NA"){
            // && survey_2016[i].Country === "United States") {
            data.survey_2016.push(survey_2016[i]);
        }
    }

    for (let i = 0; i < survey_2015.length; i++) {
        if (survey_2015[i].Salary !== "NA"){
            // && survey_2015[i].Country === "United States") {
            data.survey_2015.push(survey_2015[i]);
        }
    }

    for (let i = 0; i < survey_2014.length; i++) {
        if (survey_2014[i].Salary !== "NA"){
            // && survey_2014[i].Country === "United States") {
            data.survey_2014.push(survey_2014[i]);
        }
    }

    // for (let i = 0; i < survey_2013.length; i++) {
    //     if (survey_2013[i].Salary !== "NA"
    //         && survey_public[i].Country === "United States") {
    //         data.survey_2013.push(survey_2013[i]);
    //     }
    // }

    // console.log(survey_public);
    // console.log(survey_2017);
    // console.log(survey_2016);
	// console.log(survey_2015);
	// console.log(survey_2014);
	// console.log(survey_2013);

    let barchart = new BarChart();

    let linechart = new LineChart("#salary");

    let percentageLinechart = new LineChart("#percentage");

    let table = new Table(data, barchart, linechart, percentageLinechart);
}

function initializeDictionary() {
    let dataDictionary = {};
    dataDictionary.survey_public = [];
    dataDictionary.survey_2017 = [];
    dataDictionary.survey_2016 = [];
    dataDictionary.survey_2015 = [];
    dataDictionary.survey_2014 = [];
    // dataDictionary.survey_2013 = [];
    return dataDictionary;
}

