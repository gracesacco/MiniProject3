export default function genderBarChart(countrydata, country, year) {
    const data = countrydata[1]
    const filteredData = data.filter(d=> d.Country === country && d.Age === "All ages" && d.Sex !== "Both" &&d.Year === year);
    
    const margin = {top: 20, right: 20, bottom: 70, left: 75};
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const sexData = [...new Set(data.map(d=>d.Sex))].slice(0,2);
    const xScale = d3.scaleBand().domain(sexData).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, parseFloat(d3.max(filteredData, d=>d.DeathRate))]).range([height, 0]);

    d3.select('#svgGender').remove();

    const xAxis = d3.axisBottom().scale(xScale)

    const yAxis = d3.axisLeft().scale(yScale)
    .ticks(6, "s");    

    const svg = d3.select("#gender-chart")
        .append("svg")
        .attr("id", "svgGender")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")

        //append axes

        svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .attr("transform", `translate(${margin.left}, ${height+margin.top})`);

        svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .attr("transform", `translate(${margin.left} , ${margin.top})`);
    
        //append text labels
        
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -120)
        .attr("y", 20)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Death Rate per 100,000");  

        svg.append("text")             
        .attr("transform",
              "translate(" + (width/2 + 60) + " ," + (height + margin.top + 40) + ")")
        .style("text-anchor", "middle")
        .text("Gender");
        
        svg.selectAll('rect')
        .data(filteredData)
        .enter()
        .append('rect')
        .attr('x', 50)
        .attr('y', 50)
        .attr('width',  20)
        .attr('height', 100)
    
    const bars = svg.selectAll('rect').data(filteredData, d=>d.company)

    bars.enter()
        .append('rect')
        .merge(bars)
        // .transition()
        // .duration(1000) 
        .attr("class", "bar1") 
        .attr('x', d => xScale(d.Sex)+margin.left+60)
        .attr('y', d => yScale(d.DeathRate)+margin.top)
        .attr('width', 50)
        .attr('height', d=> height - yScale(d.DeathRate))
        .attr('opacity', 0.8)
        .on("mouseover", function(event, d) {
            const pos = d3.pointer(event, window);
            d3.select("#tooltipGender")
                .style("left", pos[0] + "px")
                .style("top", pos[1] + "px")
              .select("#value")
              .html(
                "Death Rate per 100,000: " + " " +  d.DeathRate + " in " + d.Year
              )      
            d3.select("#tooltipGender").classed("hidden", false);
          })
          .on("mouseout", function(d) {
            d3.select("#tooltipGender").classed("hidden", true);
          });

    bars.exit().remove();


    svg.select('.y-axis')
        .transition()
        .duration(1000) 
        .call(yAxis)

    window.scrollTo(0, 500); 

}
