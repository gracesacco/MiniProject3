import BarChartAges from './BarChartAges.js'

Promise.all([ // load multiple files
        d3.json('world-110m.json'),d3.csv('IHME_GBD_2010_MORTALITY_AGE_SPECIFIC_BY_COUNTRY_1970_2010-2.csv',d3.autoType)])
        .then((data) => { // or use destructuring :([airports, wordmap])=>{ ... 
        let map = data[0]
        let countries = data[1];
        const features = topojson.feature(map, map.objects.countries).features;
        
        const mySelect = document.getElementById('year-category');
        mySelect.onchange = function() {
            let year = document.getElementById("year-category").value;
            year = parseInt(year);
            d3.select("svg").remove();

            filterData(year);
            }

        const filterData = (year) => {
            let restOfCountries = [];
            let filteredData = countries.filter(d=>d.Age === "All ages" && d.Sex === "Both" && d.Year === year)
            console.log(filteredData)

              for (let i = 0; i<features.length; i++){
                let exist = false;
                for(let j =0; j<filteredData.length; j++){
                    if(filteredData[j].Country === features[i].properties.name){
                        features[i].properties.DeathRate = filteredData[j].DeathRate;
                        features[i].properties.Deaths = filteredData[j].Deaths;
                        exist = true;
                    } 
                }
                if(!exist) {
                  restOfCountries.push(features[i].properties.name)
                }

            }

            const width = 1000;
            const height = 400;
    
            const projection = d3.geoMercator()
                .fitExtent([[0,0], [width, height]],
                topojson.feature(map, map.objects.countries));
            
            const path = d3.geoPath()
                .projection(projection);
            const color = d3.scaleQuantize(d3.extent(features, d=>d.properties.DeathRate), d3.schemeReds[9])

            const hasDeathRate = (data) => {

              if(restOfCountries.includes(data.properties.name)){
                return "White"
              }

              if(data.properties.name !== "Greeland"){
                return color(data.properties.DeathRate)
              } 
            }
            const svg = d3.select('.mapchart').append('svg')
                .attr('viewBox', [0,0,width,height]);

            svg.selectAll('path')
                .data(features)
                .join('path')
                .attr('d', path)
                .attr('fill', d=> hasDeathRate(d))
                .on("click", (event,d )=> {
                  const pos = d3.pointer(event, window);
                  d3.select("#tooltip")
                  .style("left", pos[0] + "px")
                  .style("top", pos[1] + "px")
                  .select("#value")
                  .html(
                    "Country: " + d.properties.name + "<br>" +
                    "Deaths: " + d.properties.Deaths + "<br>" +
                    "Death Rate : " + d.properties.DeathRate + " (per 100,000)"
                  )
                  d3.select("#tooltip").classed("hidden", false);
                  BarChartAges(data, d.properties.name)
                  // genderBarChart(data, d.properties.name, year)
                  // Plot(data, d.properties.name)
                });
    
            svg.append('path')
                .datum(topojson.mesh(map, map.objects.countries))
                .attr("d", path)
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr("class", "subunit-boundary");
            }
            filterData(1970);


    });