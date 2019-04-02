var nodes = [
    {
        "name": "Node1",
        "id": 1,
        "isTrunk": true,
        "x": null,
        "y": null
    },
    {
        "name": "Node2",
        "id": 2,
        "isTrunk": true,
        "x": null,
        "y": null
    },
    {
        "name": "Node3",
        "id": 3,
        "isTrunk": false,
        "x": null,
        "y": null
    }
];

var links = [
    {
        "source": 1,
        "target": 2
    },
    {
        "source": 1,
        "target": 3
    }
];

// Diagram container
var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", "120%");

// Draw tree tree trunk
nodes.forEach(function(node){
    var startingX = 300,
        startingY = 300;
    if(node.isTrunk){
        drawNode(svg, [startingX, startingY]);
    }
});

//This is the accessor function we talked about above
var lineFunction = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });


nodes.forEach(function(node){
    // Parent nodes
    links.forEach(function(link){
        if(node.id == link.target){
            if(getNodeById(link.source).x == null){
                // Draw line, draw node, store node location
                var sourceLocation = getNewSourceLocation(node);
                drawLine([node.x, node.y], sourceLocation);
                drawNode(sourceLocation);
                getNodeById(link.source).x = sourceLocation[0];
                getNodeById(link.source).y = sourceLocation[1];
            } else {
                // Draw line between existin nodes
                var sourceLocation = [getNodeById(link.source).x, getNodeById(link.source).x];
                drawLine([node.x, node.y], sourceLocation);
            }
        }

        if(node.id == link.source){
            if(getNodeById(link.target).x == null){
                var targetLocation = getNewTargetLocation(node);
                drawLine([node.x, node.y], targetLocation);
                drawNode(targetLocation);
                getNodeById(link.target).x = targetLocation[0];
                getNodeById(link.target).y = targetLocation[1];
            } else {
                var targetLocation = [getNodeById(link.target).x, getNodeById(link.target.y)];
                drawLine([node.x, node.y], targetLocation);
            }
        }
    });
});


function drawNode(location){
    svg.append("circle")
        .attr("cx", location[0])
        .attr("cy", location[1])
        .attr("r", 10);
}


function getNodeById(id){
    var i;
    for(i=0; i<nodes.length; i++){
        if(nodes[i].id == id){
            return nodes[i];
        }
    }
}


function drawLine(location1, location2){
    svg.append("path")
        .attr("d", lineFunction([{"x":location1[0], "y":location1[1]}, {"x":location2[0], "y":location2[1]}]))
        .attr("class", "line");
}


function getNewSourceLocation(node){
    // TODO: determine where node sould exist based on other nodes
    return [node.x + 10, node.y - 50];
}


function getNewTargetLocation(node){
    // TODO: determine where node sould exist based on other nodes
    return [node.x + 10, node.y + 50];
}











//
