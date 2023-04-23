class Wordcloud {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data, _words) {
        // Configuration object with defaults
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || window.innerWidth, //425,
            containerHeight: _config.containerHeight || window.innerHeight / 2, //410,
            margin: _config.margin || {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            },
            reverseOrder: _config.reverseOrder || false,
            tooltipPadding: _config.tooltipPadding || 15
        }
        this.data = _data;
        this.words = _words;
        this.initVis();
    }

    /**
     * Initialize scales/axes and append static elements, such as axis titles
     */
    initVis() {
        let vis = this;



        // Calculate inner chart size. Margin specifies the space around the actual chart.
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        // SVG Group containing the actual chart; D3 margin convention
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);




    }

    updateVis() {
        let vis = this;

        vis.words.sort((a, b) => b.count - a.count)

        vis.myWords = []
        let size = 70

        for (var i = 0; i < 15; i++) {
            temp = Object()
            temp.word = vis.words[i].word
            temp.size = size
            size -= 5
            vis.myWords.push(temp)
        }



        vis.renderVis()

    }

    renderVis() {

        let vis = this;

        // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
        // Wordcloud features that are different from one word to the other must be here
        vis.layout = d3.layout.cloud()
            .size([vis.width, vis.height])
            .words(vis.myWords.map(function(d) {
                return {
                    text: d.word,
                    size: d.size
                };
            }))
            .padding(5) //space between words
            .rotate(function() {
                return ~~(Math.random() * 2) * 90;
            })
            .fontSize(function(d) {
                return d.size;
            }) // font size of words
            .on("end", draw);

        vis.layout.start();


        function draw(words) {
            
            vis.chart.join("g")
                .attr("transform", "translate(" + vis.layout.size()[0] / 2 + "," + vis.layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .join("text")
                .style("font-size", function(d) {
                    return d.size;
                })
                .style("fill", "#69b3a2")
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) {
                    return d.text;
                })
                ;
        }
    }

}