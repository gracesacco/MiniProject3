export default function BarChartAges(countryData, country){
  const data = countryData[1];
  let margin = {top: 20, right: 20, bottom: 70, left: 75},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
  d3.select('#chartAges').remove(); 
  let svg = d3
    .select("#chart-area")
    .append("svg")
    .attr("id", "chartAges")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  let x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1);

  let y = d3.scaleLinear().range([height, 0]);

  let xAxis = d3
    .axisBottom()
    .ticks(5)
    .scale(x)

  let yAxis = d3.axisLeft().scale(y);

  let xAxisGroup = svg.append("g").attr("class", "x-axis axis");

  let yAxisGroup = svg.append("g").attr("class", "y-axis axis");


filterData(data, country);

function filterData(data, country) {
  let newResults = [];
  let finalResults = data.filter(function(e){
   if (e.Country == country && e.Year == 1970 && e.Age == "All ages" && e.Sex == "Both") {
      newResults.push(e);
    };
  if (e.Country == country && e.Year == 1980 && e.Age == "All ages" && e.Sex == "Both") {
      newResults.push(e);
    };
  if (e.Country == country && e.Year == 1990 && e.Age == "All ages" && e.Sex == "Both") {
      newResults.push(e);
    };
  if (e.Country == country && e.Year == 2000 && e.Age == "All ages" && e.Sex == "Both") {
      newResults.push(e);
    };
  if (e.Country == country && e.Year == 2010 && e.Age == "All ages" && e.Sex == "Both") {
      newResults.push(e);
    };
  })
  renderBarChart(newResults);
}

function renderBarChart(data) {
  data.Deaths= +data.Deaths;
  x.domain( data.map(function(d) { return d.Year; }))
  y.domain([ 0, d3.max(data, function(d) { return d.Deaths;  })]);
  let bars = svg
    .selectAll(".bar")
    .attr("class", "bar")
    .remove()
    .exit()
    .data(data);

  bars.enter()
    .append("rect")
    .attr("class", "bar") 
    .attr("x", function(d) { 
      return x(d.Year);
    })
    .attr("y", function(d) {
      return y(d.Deaths);
    })
    .attr("height", function(d) {
      return (height - y(d.Deaths));
    })
    .attr("width", x.bandwidth())
    .on("mouseover", function(event, d) {
      
      let xPosition = margin.left + width / 2 + parseFloat(d3.select(this).attr("x")) + x.bandwidth() / 2;
      let yPosition = margin.top + parseFloat(d3.select(this).attr("y")) / 2 + height;

      d3.select("#tooltipAGES")
        .style("left", xPosition + -175 + "px")
        .style("top", yPosition + 500 + "px")
        .select("#value")
        .text("Number of Total Deaths: " + " " +  d.Deaths + " in " + d.Year);

      d3.select("#tooltipAGES").classed("hidden", false);
    })
    .on("mouseout", function(d) {
      d3.select("#tooltipAGES").classed("hidden", true);
    });

  // ---- DRAW AXIS	----
  xAxisGroup = svg
    .select(".x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  yAxisGroup = svg.select(".y-axis").call(yAxis);

    svg.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .transition()
    .duration(1000) 
    .text("Year");

// text label for the y axis
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 5)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Total Deaths");   
      
}
}