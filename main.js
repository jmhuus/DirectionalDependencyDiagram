var data =   {
    "name": "Node1",
    "parents": [
        {
            "name": "Node2",
            "parent": "Node1"
        },
        {
            "name": "Node3",
            "parent": "Node1"
        },
    ],
    "children": [
      {
        "name": "Node4",
        "parent": "Node1",
        "children": [
          {
            "name": "Node5",
            "parent": "Node2"
          },
          {
            "name": "Node6",
            "parent": "Node3"
          },
          {
            "name": "Node7",
            "parent": "Node3"
          }
        ]
      },
      {
        "name": "Node8",
        "parent": "Node1"
    }
    ]
};


var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", "100%");


// Draw dependency diagram
buildDiagram(data, svg);

function buildDiagram(source, svg){
    var startingX = 500,
        startingY = 500;

    source.x = startingX;
    source.y = startingY;

    svg.append("circle")
        .attr("cx", startingX)
        .attr("cy", startingY)
        .attr("r", 10)
        .attr("name", source.name);

    source.parents.forEach(function(d, i){
        drawParents(source, d, i+1, svg);
    });

    source.children.forEach(function(d, i){
        drawChildren(source, d, i+1, svg);
    });

    function drawParents(root, parent, pos, svg){

        parent.x = root.x-50+(pos*50);
        parent.y = root.y-50;

        svg.append("circle")
            .attr("cx", parent.x)
            .attr("cy", parent.y)
            .attr("r", 10)
            .attr("class", "parent")
            .attr("name", parent.name);

        if(parent.parents){
            parent.parents.forEach(function(d, i){
                drawChildren(parent, d, i, svg);
            });
        }
    }

    function drawChildren(root, child, pos, svg){

        child.x = root.x-50+(pos*50);
        child.y = root.y+50;

        svg.append("circle")
            .attr("cx", child.x)
            .attr("cy", child.y)
            .attr("r", 10)
            .attr("class", "child")
            .attr("name", child.name);

        if(child.children){
            child.children.forEach(function(d, i){
                drawChildren(child, d, i, svg);
            });
        }
    }

}












//
