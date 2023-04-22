class LineChart{
      /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 400,
      containerHeight: _config.containerHeight || 240,
      margin: _config.margin || {top: 25, right: 30, bottom: 30, left: 50}
    }
    this.data = _data;
    this.initVis();
  }

  initVis(){
    let vis = this; 
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    vis.xScale = d3.scaleLinear()
        .range([0,vis.width]);

    vis.yScale = d3.scaleLinear()
        .range([vis.height-40,0])
        .nice();

    vis.xAxis = d3.axisBottom(vis.xScale)
    .ticks(6)
    .tickSizeOuter(0)
    .tickPadding(10);

    vis.yAxis = d3.axisLeft(vis.yScale)
    .ticks(4)
    .tickSizeOuter(0)
    .tickPadding(10);


    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);
    

    vis.chart = vis.svg.append('g')
    .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height-40})`);
    
    
    // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
    .attr('class', 'axis y-axis');

    vis.marks = vis.chart.append('g');

    this.svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", vis.width)
    .attr("y", vis.height +40)
    .text("Episode Number");


    this.svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 5)
    .attr("x", -50)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Lines per Episode");

  
}

updateVis()
{
    let vis = this;
    vis.xValue=d => d.x;
    vis.yValue=d=>d.y;

    vis.line = d3.line()
        .x(d=>vis.xScale(vis.xValue(d)))
        .y(d => vis.yScale(vis.yValue(d)));

    vis.xScale.domain(d3.extent(vis.data,vis.xValue));
    vis.yScale.domain(d3.extent(vis.data, vis.yValue));

    vis.renderVis();
}

renderVis(){
    let vis = this;

    //I think this is where line is customized?
    vis.marks.selectAll('.chart-line')
        .data([vis.data])
    .join('path')
        .attr('class', 'chart-line')
        .attr('d', vis.line);

        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
}
}