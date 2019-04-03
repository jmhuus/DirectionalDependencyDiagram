var nodes = [
    {
        "name": "Node1",
        "id": 1,
        "isTrunk": true,
        "x": null,
        "y": null,
        "isDrawn": false
    },
    {
        "name": "Node2",
        "id": 2,
        "isTrunk": true,
        "x": null,
        "y": null,
        "isDrawn": false
    },
    {
        "name": "Node3",
        "id": 3,
        "isTrunk": false,
        "x": null,
        "y": null,
        "isDrawn": false
    }
];

var links = [
    {
        "source": 1,
        "target": 2,
        "isDrawn": false
    },
    {
        "source": 1,
        "target": 3,
        "isDrawn": false
    }
];

// Diagram container
var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", "120%");

// Starting positions
var startingX = 300,
    startingY = 300;

// Draw tree tree trunk
nodes.forEach(function(node, i){
    if(node.isTrunk){
        node.x = startingX;
        node.y = startingY+(i*100);
    }
});


//This is the accessor function we talked about above
var lineFunction = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });


nodes.forEach(function(node){
    // Parent nodes
    var x;
    for(x=0; x<links.length; x++){
        if(node.id == links[x].target && !(links[0].isDrawn)){
            if(getNodeById(links[x].source).x == null){
                // Draw line, draw node, store node location
                var sourceLocation = getNewSourceLocation(node);
                getNodeById(links[x].source).x = sourceLocation[0];
                getNodeById(links[x].source).y = sourceLocation[1];
                drawLine([node.x, node.y], sourceLocation);
                if(!getNodeById(links[x].source).isDrawn){
                    drawNode(getNodeById(links[x].source));
                    getNodeById(links[x].source).isDrawn = true;
                }
            } else {
                // Draw line between existing nodes
                var sourceLocation = [getNodeById(links[x].source).x, getNodeById(links[x].source).x];
                drawLine([node.x, node.y], sourceLocation);
            }

            links[x].isDrawn = true;
        }

        if(node.id == links[x].source && !(links[x].isDrawn)){
            if(getNodeById(links[x].target).x == null){
                var targetLocation = getNewTargetLocation(node);
                getNodeById(links[x].target).x = targetLocation[0];
                getNodeById(links[x].target).y = targetLocation[1];
                drawLine([node.x, node.y], targetLocation);
                if(!getNodeById(links[x].target).isDrawn){
                    drawNode(getNodeById(links[x].target));
                    getNodeById(links[x].target).isDrawn = true;
                }
            } else {
                // Draw line between existing nodes
                var targetLocation = [getNodeById(links[x].target).x, getNodeById(links[x].target).y];
                drawLine([node.x, node.y], targetLocation);
            }

            links[x].isDrawn = true;
        }
    }


    if(!node.isDrawn){
        drawNode(node);
        node.isDrawn = true;
    }
});


function drawNode(node){
    svg.append("circle")
        .attr("cx", node.x)
        .attr("cy", node.y)
        .attr("r", 10);

    svg.append("text")
        .attr("x", node.x+15)
        .attr("y", node.y+5)
        .text(node.name);
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


function getNewSourceLocation(targetNode){
    // TODO: determine where node sould exist based on other nodes
    return [targetNode.x + 100, targetNode.y - 100];
}


function getNewTargetLocation(sourceNode){
    // TODO: determine where node sould exist based on other nodes
    return [sourceNode.x + 100, sourceNode.y + 100];
}











//
