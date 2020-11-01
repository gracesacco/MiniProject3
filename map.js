
function filterData(country) {
    let newResults = [];
    let finalResults = data.filter(function(e){
     if (e.CountryCode == country && e.Year == 1970 && e.Age == "All ages" && e.Sex == "Both") {
        newResults.push(e.DeathRate);
      };
    if (e.CountryCode == country && e.Year == 1980 && e.Age == "All ages" && e.Sex == "Both") {
        newResults.push(e.DeathRate);
      };
    if (e.CountryCode == country && e.Year == 1990 && e.Age == "All ages" && e.Sex == "Both") {
        newResults.push(e.DeathRate);
      };
    if (e.CountryCode == country && e.Year == 2000 && e.Age == "All ages" && e.Sex == "Both") {
        newResults.push(e.DeathRatee);
      };
    if (e.CountryCode == country && e.Year == 2010 && e.Age == "All ages" && e.Sex == "Both") {
        newResults.push(e.DeathRate);
      };
    })
    console.log(newResults);
  }

Promise.all([ // load multiple files
        d3.json('world-110m.json'),d3.csv('IHME_GBD_2010_MORTALITY_AGE_SPECIFIC_BY_COUNTRY_1970_2010 (1).csv',d3.autoType)])
        .then(([map, countries])=>{ // or use destructuring :([airports, wordmap])=>{ ... 

        const features = topojson.feature(map, map.objects.countries).features;
        console.log('features', features);
        console.log('mortality', countries);

        const width = 630;
        const height = 400;

        const projection = d3.geoMercator()
            .fitExtent([[0,0], [width, height]],
            topojson.feature(map, map.objects.countries));
        
        const path = d3.geoPath()
            .projection(projection);

        const color = d3.scaleQuantize([0,30000], d3.schemeBlues[9])

        const svg = d3.select('body').append('svg')
            .attr('viewBox', [0,0,width,height]);

        svg.selectAll('path')
            .data(features)
            .join('path')
            .attr('d', path)
            .attr('fill', data => color(d.DeathRate));
                
        svg.append('path')
            .datum(topojson.mesh(map, map.objects.countries))
            .attr("d", path)
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr("class", "subunit-boundary");  

    });


