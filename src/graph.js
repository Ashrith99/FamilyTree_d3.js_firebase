const dims = { height: 500, width: 1500 };

const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', dims.width + 100)
    .attr('height', dims.height + 100);

const graph = svg.append('g')
    .attr('transform', 'translate(50, 50)');


const stratify = d3.stratify()
    .id(d => d.name)
    .parentId(d => d.parent);

const tree = d3.tree()
    .size([dims.width, dims.height]);

const colour = d3.scaleOrdinal(['#f4511e', '#e91e63', '#e53935', '#9c27b0']);



const update = (data) => {
    //remove current nodes(worst method)
    graph.selectAll('.node').remove();
    graph.selectAll('.link').remove();

    colour.domain(data.map(d => d.department));

    const rootNode = stratify(data);
    //console.log(rootNode);

    const treeData = tree(rootNode);
    // console.log(treeData);

    const nodes = graph.selectAll('.node')
        .data(treeData.descendants());


    const link = graph.selectAll('.link')
        .data(treeData.links())
    console.log("links")
    console.log(treeData.links())

    link.enter()
        .append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#aaa')
        .attr('stroke-width', 2)
        .attr('d', d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y)
        );

    const enterNodes = nodes.enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    enterNodes.append('rect')
    .attr('fill', d => colour(d.data.department))
        .attr('stroke', '#555')
        .attr('stroke-width', 2)
        .attr('width', d => d.data.name.length * 20)
        .attr('height', 50)
        .attr('transform', (d, i, n) => {
            let x = (d.data.name.length * 10);
            return `translate(${-x}, -25)`
        });

    enterNodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .text(d => d.data.name);

};

