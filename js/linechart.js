import { get_char_stats } from "./data_wrangling";
class LineChart{
      /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 800,
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

    vix.xScale = d3.scaleLinear()
        .range([0,vis.width]);

    vis.yScale = d3.scaleLinear()
        .range([vis.height,0])
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
        .attr('transform', `translate(0,${vis.height})`);
    
    
    // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
    .attr('class', 'axis y-axis');

}

updateVis()
{
    let vis = this;
    vis.xValue=d => d.
}
}