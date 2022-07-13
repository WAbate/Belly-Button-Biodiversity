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
