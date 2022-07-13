// Read the json file using d3
function buildMetaData(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      console.log(metadata);
      
      // Filter the data and select the required panel
        var buildArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = buildArray[0];
        var panelData = d3.select("#sample-metadata");

        panelData.html("");

        // Add values and key pairs to panelData using 'Object.entires'
        Object.entries(result).forEach(([key, value]) => {
        panelData.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
}

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var sampleData = data.samples;
      var buildArray = sampleData.filter(sampleObj => sampleObj.id == sample);
      var result = buildArray[0];
  
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
     
      // Create a chart
    var bubbleChart = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
      };
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }

      ];// Use Plotly with bubble chart to create horizontal bar chart
      Plotly.newPlot("bubble", bubbleData, bubbleChart);
      
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barChartData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];

      var barChartLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
  
      Plotly.newPlot("bar", barChartData, barChartLayout);
    });
  };

  // Select the element from dropdown references 
 // and then populate it by using the list of sample names
  function init() {
    var elementDropdown = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      var name = data.names;
  
      name.forEach((sample) => {
        elementDropdown
          .append("option")
          .text(sample)
          .property("value", sample);
      })

   // Use the sample data from the list to build the plots
   var sampleData = name[0];
   buildCharts(sampleData);
   buildMetaData(sampleData);
 });
};

function optionChanged(newSample) {
    // Retrieve new data each time
    buildCharts(newSample);
    buildMetaData(newSample);
  };

  
// Start dashboard
  init()
Footer
