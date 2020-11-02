export default
function Plot(_data,_country,_year) {
	// initialization
    const margin = {top: 20, right: 20, bottom: 70, left: 75};
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select('#svgAge').remove();

    const svg = d3.select("#age-chart")
    .append("svg")
    .attr("id","svgAge")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

    const padding = 0;



        const data=_data[1];
        const country=_country;
        const year=_year;

        const avals= _.uniq(_.pluck(data, 'Age')).filter(a=>a!="All ages");
        const yvals= _.uniq(_.pluck(data, 'Year')).sort((a,b)=>a-b);

        const ab= data.filter((a)=>a.Sex=="Both" && a.Age!="All ages" && a.Country==country );


        // console.log("Plot data",ab);

        const xScale = d3.scalePoint()
        .range([padding, width-padding]);

        const yScale = d3.scaleLinear()
        .range([height-padding, padding]);


        const color=d3.scaleOrdinal()
            .range(d3.schemeTableau10);


        svg.append("g")
        .attr("class", "y-axis");

        svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`);


        yScale.domain([0, d3.max(ab,d=>d.DeathRate)]);
        xScale.domain(avals);
        color.domain(yvals);

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


    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left+20 )
        .attr("x",0 - (height / 2))
        .style("text-anchor", "middle")
        .attr("font-size",13)
        .text("Death rate per 100,000");

    svg.append("text")
        .attr("y", height + margin.bottom)
        .attr("x", width/2)
        .attr("font-size",10)
        .style("text-anchor", "middle")
        .attr("font-size",13)
        .text("Ages");


     svg.selectAll('circle')
            .data(ab)
            .enter()
            .append('circle')
            .attr("class", (d)=> {
                if(d.Year==1970)
                {
                    return "age1970";
                }
                if(d.Year==1980)
                {
                    return "age1980";
                }
                if(d.Year==1990){
                    return " age1990";
                }
                if(d.Year == 2010){
                    return "age2010";
                }
                if(d.Year==2000){
                    return "age2000";
                }

            })
            .attr("cx", d=> xScale(d.Age))
            .attr("cy", d=> yScale(d.DeathRate))
            .attr("r", 2.5)
            .attr("fill", "grey")
            .attr("opacity", .2);



            if(year==1970){
                svg.selectAll(".age1970").attr("opacity", 1).attr("r",4).attr("stroke-opacity", 1).attr("stroke","black").attr("fill", d=> color(d.Year)).on("mouseover", (event,d )=> {
                    const pos = d3.pointer(event, window);
                    d3.select("#tooltipAGES")
                    .style("left", pos[0] + "px")
                    .style("top", pos[1] + "px")
                    .select("#age")
                    .html(
                      "Year : " + d.Year + "<br>" +
                      "Death Rate : " + d.DeathRate + " (per 100,000)"
                    )
                    d3.select("#tooltipAGES").classed("hidden", false);
                  })
                .on("mouseleave", (event,d)=>{
                    d3.select("#tooltipAGES").classed("hidden", true);
                });
            }
            if(year==1980){
                svg.selectAll(".age1980").attr("opacity", 1).attr("r",4).attr("stroke-opacity", 1).attr("stroke","black").attr("fill", d=> color(d.Year)).on("mouseover", (event,d )=> {
                    const pos = d3.pointer(event, window);
                    d3.select("#tooltipAGES")
                    .style("left", pos[0] + "px")
                    .style("top", pos[1] + "px")
                    .select("#age")
                    .html(
                      "Year : " + d.Year + "<br>" +
                      "Death Rate : " + d.DeathRate + " (per 100,000)"
                    )
                    d3.select("#tooltipAGES").classed("hidden", false);
                  })
                .on("mouseleave", (event,d)=>{
                    d3.select("#tooltipAGES").classed("hidden", true);
                });
            }
            if(year==1990){
                svg.selectAll(".age1990").attr("opacity", 1).attr("r",4).attr("stroke-opacity", 1).attr("stroke","black").attr("fill", d=> color(d.Year)).on("mouseover", (event,d )=> {
                    const pos = d3.pointer(event, window);
                    d3.select("#tooltipAGES")
                    .style("left", pos[0] + "px")
                    .style("top", pos[1] + "px")
                    .select("#age")
                    .html(
                      "Year : " + d.Year + "<br>" +
                      "Death Rate : " + d.DeathRate + " (per 100,000)"
                    )
                    d3.select("#tooltipAGES").classed("hidden", false);
                  })
                .on("mouseleave", (event,d)=>{
                    d3.select("#tooltipAGES").classed("hidden", true);
                });
            }
            if(year==2000){
                svg.selectAll(".age2000").attr("opacity", 1).attr("r",4).attr("stroke-opacity", 1).attr("stroke","black").attr("fill", d=> color(d.Year)).on("mouseover", (event,d )=> {
                    const pos = d3.pointer(event, window);
                    d3.select("#tooltipAGES")
                    .style("left", pos[0] + "px")
                    .style("top", pos[1] + "px")
                    .select("#age")
                    .html(
                      "Year : " + d.Year + "<br>" +
                      "Death Rate : " + d.DeathRate + " (per 100,000)"
                    )
                    d3.select("#tooltipAGES").classed("hidden", false);
                  })
                .on("mouseleave", (event,d)=>{
                    d3.select("#tooltipAGES").classed("hidden", true);
                });
            }
            if(year==2010){

                svg.selectAll(".age2010").attr("opacity", 1).attr("r",4).attr("stroke-opacity", 1).attr("stroke","black").attr("fill", d=> color(d.Year)).on("mouseover", (event,d )=> {
                    const pos = d3.pointer(event, window);
                    d3.select("#tooltipAGES")
                    .style("left", pos[0] + "px")
                    .style("top", pos[1] + "px")
                    .select("#age")
                    .html(
                      "Year : " + d.Year + "<br>" +
                      "Death Rate : " + d.DeathRate + " (per 100,000)"
                    )
                    d3.select("#tooltipAGES").classed("hidden", false);
                  })
                .on("mouseleave", (event,d)=>{
                    d3.select("#tooltipAGES").classed("hidden", true);
                });
            }



            svg.selectAll('.legend')
            .data(yvals)
            .enter()
            .append('circle')
            .attr('cx', width-120 )
            .attr('cy', function(d,i){ return i*25-2} )
            .attr('r',8)
            .attr('fill', d=> color(d));

        svg.selectAll(".label")
            .data(yvals)
            .enter()
            .append('text')
            .attr("x", width-100)
            .attr("y", function(d,i){ return i*25}) 
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .attr("font-size",12)
            .style("alignment-baseline", "middle");


}
