// Start by setting the desired url to a variable
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {

// Fetch JSON data and read in using D3
    d3.json(url).then((data)=> {
        console.log(data);

// First select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // Add names to a variable 
    names = data.names;
    console.log(names);

    // Loop through names and append them to the dropdown
    for (let i = 0; i < names.length; i++){
        dropdown.append("option").property("value", names[i]).text(names[i]);
        console.log(names[i]);
    };

    });

// Call the rest of the functions
    create_chart();
    console.log(create_chart);
};

  
// Call the init function
init();

// Create chart function
function create_chart() {

    d3.json(url).then((data)=> {

    let sample_values = data.sample_values;
    let otu_ids = data.otu_ids;
    let otu_labels = data.otu_labels;

    let plot_data = [
        {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: 'bar'
        }
    ];

     Plotly.newPlot('plot', plot_data);

    })};




// choices.on("change", function(){
//     var choice = choices.property("value");
//     console.log(choice);
//     console.log(data[choice])});



// function create_plot

// create_plot(plot_data["OTUs"])

