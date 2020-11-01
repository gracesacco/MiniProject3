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

            let filteredData = countries.filter(d=>d.Age === "All ages" && d.Sex === "Both" && d.Year === year)
            for (let i = 0; i<features.length; i++){
                for(let j =0; j<filteredData.length; j++){
                    if(filteredData[j].Country === features[i].properties.name){
                        features[i].properties.DeathRate = filteredData[j].DeathRate;
                    }
                }
            }
    
            const width = 630;
            const height = 400;
    
            const projection = d3.geoMercator()
                .fitExtent([[0,0], [width, height]],
                topojson.feature(map, map.objects.countries));
            
            const path = d3.geoPath()
                .projection(projection);
            const color = d3.scaleQuantize(d3.extent(features, d=>d.properties.DeathRate), d3.schemeReds[9])
    
            const svg = d3.select('.mapchart').append('svg')
                .attr('viewBox', [0,0,width,height]);
            svg.selectAll('path')
                .data(features)
                .join('path')
                .attr('d', path)
                .attr('fill', d=> color(d.properties.DeathRate))
                .on("click", d=> console.log(d));
    
            svg.append('path')
                .datum(topojson.mesh(map, map.objects.countries))
                .attr("d", path)
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr("class", "subunit-boundary");
            
            }
            filterData(1970);


    });