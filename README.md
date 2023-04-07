# belly-button-challenge

First, I read in the URL to fetch the JSON data. I used D3 to extract the all the data during the entirity of the project.

I extracted the metadata and filtered it to accomodate for the selected test subject. I selected the panel from the HTML in which I wanted to place the demographic information and appended the information in key value pairs to the panel. 

To append the names to the dropdown menu, I selected the dropdown from the HTML and extracted the names from the JSON. I appended them all to the selected portion of the HTML and included the chart creation and demographic metadata display in this function.

I also created a function that changes the chart and metadata inform once a new name is selected in the dropdown.

To create the charts, I filtered the samples for the selected test subject and got the correlating top 10 OTU IDs, labels and values. I used Plotly to chart this data in a bar chart.

I created a gauge chart using Plotly to show the gauge of washing frequency. 

I also created a Plotly bubble chart to display a bubble visual of the concentration of OTU IDs in the sample. 


