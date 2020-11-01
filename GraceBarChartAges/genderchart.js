export default function genderBarChart(data) {
    console.log(data)
    const filteredData = data.filter(d=> d.Country === "Afghanistan" && d.Age === "All ages" && d.Sex !== "Both" &&d.Year === 2010);
    console.log(filteredData)
    
    const margin = { top: 50, right: 30, bottom: 30, left: 50 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const sexData = [...new Set(data.map(d=>d.Sex))].slice(0,2);
    const xScale = d3.scaleBand().domain(sexData).range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);
  

    
    const xAxis = d3.axisBottom().scale(xScale)

    const yAxis = d3.axisLeft().scale(yScale)
    .ticks(6, "s");    

    const svg = d3.select(".barchart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")


    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .attr("transform", `translate(${margin.left}, ${height+margin.top})`);

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .attr("transform", `translate(${margin.left} , ${margin.top})`);
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 50)
        .attr("x", -30)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Death Rate");       
    
    svg.append("text")
    .attr("y", height+margin.top)
    .attr("x", width+margin.left+margin.right)
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text("Gender");       
    update(filteredData)

    function update(data){

        yScale.domain([0, parseFloat(d3.max(data, d=>d.DeathRate))]);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', 50)
            .attr('y', 50)
            .attr('width',  20)
            .attr('height', 100)
        
        const bars = svg.selectAll('rect').data(data, d=>d.company)

        bars.enter()
            .append('rect')
            .merge(bars)
            .transition()
            .duration(1000) 
			.attr('x', d => xScale(d.Sex)+margin.left+55)
            .attr('y', d => yScale(d.DeathRate)+margin.top)
            .attr('width', 50)
            .attr('height', d=> height - yScale(d.DeathRate))
            .attr('fill', 'lightblue')
            .attr('stroke', 'black')
            .attr('opacity', 0.8)
            .attr('class', 'income')

        bars.exit().remove();

    svg.select('.x-axis')
        .transition()
        .duration(1000) 
        .call(xAxis)
        
    svg.select('.y-axis')
        .transition()
        .duration(1000) 
        .call(yAxis)

    }
}
