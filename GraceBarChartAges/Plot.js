export default
function Plot(container) {
	// initialization
    const margin = {top:30, left:50, bottom:65, right:30};
    const width = 700- margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    const svg = d3.select(container)
    .append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

   
    const xScale = d3.scalePoint()  
     .range([0, width]);    
  
    const yScale = d3.scaleLinear()       
      .range([height, 0]);

 
    const color=d3.scaleOrdinal()
        .range(d3.schemeTableau10);

    svg.append("g")
      .attr("class", "y-axis");

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`);
    
    
   
	function update(_data){
        const data=_data;
        
        const avals= _.uniq(_.pluck(data, 'Age')).filter(a=>a!="All ages");
        const yvals= _.uniq(_.pluck(data, 'Year')).sort((a,b)=>a-b);
        
        console.log("ages",avals);
        console.log("years",yvals);

        const ab= data.filter((a,i)=>a.Sex=="Both" && a.Age!="All ages");

        console.log("data",ab);

        
        yScale.domain([0, d3.max(ab,d=>d.DeathRate)]);
        xScale.domain(avals);
        color.domain(yvals);

    
          
        const legend= svg.selectAll('circle')
            .data(ab)
            .enter()
            .append('circle')
            .attr("class","age")
            .attr("cx", d=> xScale(d.Age))
            .attr("cy", d=> yScale(d.DeathRate))
            .attr("r", 3)
            .attr("fill",d=>{
                return color(d.Year);
            });

        
        svg.selectAll('.legend')
            .data(yvals)
            .enter()
            .append('circle')
            .attr('cx', 500 )
            .attr('cy', function(d,i){ return 100 + i*25} )
            .attr('r',8)
            .attr('fill', d=> color(d));
       
        svg.selectAll(".label")
            .data(yvals)
            .enter()
            .append('text')
            .attr("x", 520)
            .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
        
            
       

        const xAxis = d3.axisBottom()
            .scale(xScale);
        
        const yAxis = d3.axisLeft()
            .scale(yScale);

            svg.select(".x-axis")
            .call(xAxis)
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );
        
            svg.select(".y-axis")
            .call(yAxis);
            
    }
    return {
        update
        }

}