// Start by setting the desired url to a variable
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {

    // First select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // Fetch JSON data and read in using D3
    d3.json(url).then((data)=> {
    console.log(data);
    
    // Add names to a variable 
    names = data.names;

    console.log(names);

    // Loop through names and append them to the dropdown
    for (let i = 0; i < names.length; i++){
        dropdown.append("option").property("value", names[i]).text(names[i]);
        console.log(names[i]);
    };

    dropdown.on("onChange", function(){
        var choice = dropdown.property("value");
        // console.log(d3.event.target);
        console.log(choice);
    });

    // Use the first sample from the list to build the initial plots
    let firstSample = names[0];
    create_chart(firstSample);
    console.log(create_chart);

})};




// Create chart function
function create_chart(samples) {

    d3.json(url).then((data)=> {
        
    // Sort the data by OTUs 
    // let sortedByOTUs = data.sort((a, b) => b.sample_values - a.sample_values);
    
    // Reverse the array to accommodate Plotly's defaults
    // reversedData = slicedData.reverse();

    // 
    let samples = data.samples.filter(sampleObj => sampleObj.id == samples);
    let result = samples[0];
    console.log(result)

    let otu_ids = result.otu_ids.slice(0, 10).reverse();
    let otu_labels = result.otu_labels.slice(0, 10).reverse();
    let sample_values = result.sample_values.slice(0, 10).reverse();

    let plot_data = [
        {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: "bar",
        orientation: "h"
        }
    ];

    Plotly.newPlot("bar", plot_data);

})};

// Call the init function
init();

// choices.on("change", function(){
//     var choice = choices.property("value");
//     console.log(choice);
//     console.log(data[choice])});

// function create_plot

// create_plot(plot_data["OTUs"])

