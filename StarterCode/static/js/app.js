// Define the URL to fetch the JSON data
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to display demographic information of a test subject
function displayDemographicInfo(sample) {
  // Fetch data from the JSON URL
  d3.json(url).then((data) => {
    // Extract the metadata array from the fetched data
    let metadata = data.metadata;
    // Filter metadata for the selected test subject
    let resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
    // Get the first (and only) object in the filtered array
    let result = resultArray[0];

    // Select the panel where demographic information will be displayed
    let panel = d3.select("#sample-metadata");
    // Clear the existing demographic information
    panel.html("");

    // Append the key-value pairs of the demographic information to the panel
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// Function to initialize the dashboard
function init() {
  // Select the dropdown menu
  var dropdown = d3.select("#selDataset");

  // Fetch data from the JSON URL
  d3.json(url).then((data) => {
    // Extract the names array from the fetched data
    let names = data.names;

    // Append each name in the names array to the dropdown menu
    names.forEach((name) => {
      dropdown.append("option").property("value", name).text(name);
    });

    // Get the first test subject's ID from the names array
    let firstSample = names[0];
    // Create the charts for the first test subject
    create_charts(firstSample);
    // Display the demographic information for the first test subject
    displayDemographicInfo(firstSample);
  });
}

// Function to handle the change event of the dropdown menu
function optionChanged(newSample) {
  // Create the charts for the newly selected test subject
  create_charts(newSample);
  // Display the demographic information for the newly selected test subject
  displayDemographicInfo(newSample);
}

// Function to create charts for a test subject
function create_charts(sample) {
  // Fetch data from the JSON URL
  d3.json(url).then((data) => {
    // Extract the samples array from the fetched data
    let samples = data.samples;
    // Filter samples for the selected test subject
    let resultArray = samples.filter((sampleObj) => sampleObj.id == sample);
    // Get the first (and only) object in the filtered array
    let result = resultArray[0];

    // Get the top 10 OTU IDs, labels, and values for the selected test subject
    let otu_ids = result.otu_ids.slice(0, 10).reverse();
    let otu_labels = result.otu_labels.slice(0, 10).reverse();
    let sample_values = result.sample_values.slice(0, 10).reverse();

    // Set up bar chart data
    let bar_data = [
      {
        x: sample_values,
        y: otu_ids.map((otu_id) => `OTU ${otu_id}`),
        text: otu_labels,
        type: "bar",
        orientation: "h",
      },
    ];


    // Plot the bar chart
    Plotly.newPlot("bar", bar_data);

// chart data

let filteredArray = data.metadata.filter((obj) => obj.id == sample);
let filter = filteredArray[0];

let gauge_data = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: filter.wfreq,
    title: { text: "Belly Button Washing Frequency" },
    type: "indicator",
    mode: "gauge+number",
    gauge: { axis: { range: [null, 9] } },
  },
];

// Plot the gauge chart
Plotly.newPlot("gauge", gauge_data);

// Set up bubble chart data
let bubble_data = [
  {
    x: result.otu_ids,
    y: result.sample_values,
    text: result.otu_labels,
    mode: "markers",
    marker: {
      size: result.sample_values,
      color: result.otu_ids,
      colorscale: "Earth",
    },
  },
];

// Set up bubble chart layout
let bubble_layout = {
  xaxis: { title: "OTU ID" },
  hovermode: "closest",
};

// Plot the bubble chart
Plotly.newPlot("bubble", bubble_data, bubble_layout);
  });
}

init();