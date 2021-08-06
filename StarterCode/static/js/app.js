
function getPlot() {

d3.json("../../samples.json").then(function(data) {
   console.log(data.samples[0])

var bar_plot = [
  {
    x: data.samples[0].sample_values.slice(0, 10),
    y: data.samples[0].otu_ids.slice(0, 10).map(d => "OTU " + d),
    orientation: 'h',
    type: 'bar'
  }
];


var layout = {
    title: "Sample Value vs. OTU ID",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU ID" }
  };
  
 
  Plotly.newPlot("bar", bar_plot, layout);



  var xvalue = data.samples[0].otu_ids;
  var yvalue = data.samples[0].sample_values;
  var label = data.otu_labels;
  var size = data.samples[0].sample_values;

console.log(xvalue)
console.log(yvalue)

  var bubbles = {
    x: xvalue,
    y: yvalue,
    label: label,
    mode: 'markers',
    marker: {
      size: size,
      color: xvalue
    }
  }
  var bubble_data = [bubbles];

  var layout = {
    title: "Bacteria Size",
  };
  Plotly.newPlot("bubble",bubble_data,layout);

  });
}

function getInfo() {

    d3.json("../../samples.json").then(function(data) {
        
       
        var metadata = data.metadata[0];
        var age = metadata.age
        var bbtype = metadata.bbtype
        var ethnicity = metadata.ethnicity
        var gender = metadata.gender
        var meta_id = metadata.id
        var location = metadata.location
        var wfreq = metadata.wfreq

        console.log(metadata)


      
        var demographicInfo = d3.select("#sample-metadata");
        
    
        demographicInfo.html("");

       
        demographicInfo.append("h5").text("Age: " + age);
        demographicInfo.append("h5").text("Bbtype: " + bbtype);
        demographicInfo.append("h5").text("Ethnicity " + ethnicity);
        demographicInfo.append("h5").text("Gender: " + gender);
        demographicInfo.append("h5").text("ID number: " + meta_id);
        demographicInfo.append("h5").text("Location: " + location);
        demographicInfo.append("h5").text("Frequency: " + wfreq);
        

        
    });
}


  function init() {
   
    var dropdown = d3.select("#selDataset");


    d3.json("../../samples.json").then((data)=> {
     
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

       
        getPlot();
        getInfo()

    });
}

function optionChanged(next_id) {
    getPlot(next_id);
    
}

init();