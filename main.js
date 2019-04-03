var nodes = [
    {
        "name": "Node1",
        "id": 1,
        "isTrunk": true
    },
    {
        "name": "Node2",
        "id": 2,
        "isTrunk": false
    },
    {
        "name": "Node3",
        "id": 3,
        "isTrunk": false
    },
    {
        "name": "Node4",
        "id": 4,
        "isTrunk": true
    },
    {
        "name": "Node5",
        "id": 5,
        "isTrunk": false
    },
    {
        "name": "Node6",
        "id": 6,
        "isTrunk": true
    },
    {
        "name": "Node7",
        "id": 7,
        "isTrunk": false
    },
    {
        "name": "Node8",
        "id": 8,
        "isTrunk": false
    },
    {
        "name": "Node9",
        "id": 9,
        "isTrunk": true
    },
    {
        "name": "Node10",
        "id": 10,
        "isTrunk": false
    },
    {
        "name": "Node11",
        "id": 11,
        "isTrunk": false
    },
    {
        "name": "Node12",
        "id": 12,
        "isTrunk": false
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
    },
    {
        "source": 1,
        "target": 4
    },
    {
        "source": 4,
        "target": 5
    },
    {
        "source": 4,
        "target": 6
    },
    {
        "source": 4,
        "target": 7
    },
    {
        "source": 4,
        "target": 8
    },
    {
        "source": 6,
        "target": 9
    },
    {
        "source": 6,
        "target": 10
    },
    {
        "source": 6,
        "target": 11
    },
    {
        "source": 6,
        "target": 12
    }
];

// Diagram container
var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", "140%");

// Starting positions
var startingX = 300,
    startingY = 300;

// Draw tree tree trunk
nodes.forEach(function(node, i){
    node.x = null;
    node.y = null;
    node.sourceCount = 0;
    node.targetCount = 0;

    if(node.isTrunk){
        node.x = startingX;
        node.y = startingY+(i*100);
    }

    // Init additional parameters
    node.isDrawn = false;
});


// Init additional parameters
links.forEach(function(link){
    link.isDrawn = false;
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
    targetNode.sourceCount += 1;
    return [targetNode.x + (100*targetNode.sourceCount), targetNode.y - 100];
}


function getNewTargetLocation(sourceNode){
    sourceNode.targetCount += 1;
    return [sourceNode.x + (100*sourceNode.targetCount), sourceNode.y + 100];
}











//
