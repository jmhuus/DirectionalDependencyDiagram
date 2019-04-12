var treeData = [
    {
        "name": "Node 1",
        "id": 1,
        "parents": []
    },
    {
        "name": "Node 2",
        "id": 2,
        "parents": []
    },
    {
        "name": "Node 3",
        "id": 3,
        "parents": []
    },
    {
        "name": "Node 4",
        "id": 4,
        "parents": [1,2,3]
    },
    {
        "name": "Node 5",
        "id": 5,
        "parents": [4]
    },
    {
        "name": "Node 6",
        "id": 6,
        "parents": []
    },
    {
        "name": "Node 7",
        "id": 7,
        "parents": []
    },
    {
        "name": "Node 8",
        "id": 8,
        "parents": []
    },
    {
        "name": "Node 9",
        "id": 9,
        "parents": [6,7,8,5]
    }
];



class DirectionalNodeGraph{
    constructor(data){
        this.nodes = data;
        this.nodes.forEach(function(node){
            node.visited = false;
        });
    }


    getDirectionalNodeGraph(){
        this.setNodeWidth();
        // setNodePositions();
        this.nodes.forEach(function(node){ console.log(node);});
    }

    getNodeById(id){
        for (var i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].id===id){
                return this.nodes[i];
            }
        }
    }

    // Calculates the width of each node based on the number parent nodes
    setNodeWidth(){
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].visited === false) {

                // Leaf node, width of 1
                if(this.nodes[i].parents.length===0){
                    this.nodes[i].width = 1;
                    this.nodes[i].visited = true;
                    continue;
                }

                // Node width = sum widths of parents
                var nodeWidth = 0;
                for (var x = 0; x < this.nodes[i].parents.length; x++) {
                    // Only sum parent nodes that are immediately related
                    // If there are multiple paths to a parent, then don't sum
                    if (this.getPathsCountBetweenTwoNodes(this.nodes[i], this.getNodeById(this.nodes[i].parents[x])) === 1) {
                        nodeWidth += this.getNodeWidth(this.getNodeById(this.nodes[i].parents[x]));
                    }
                }
                this.nodes[i].width = nodeWidth;
                this.nodes[i].visited = true;
            }
        }
    }


    // Calculate widths for all nodes
    getNodeWidth(node){
        // Node already visited, skip
        if(node.visited){return node.width;}

        // Leaf node; width = 1
        if(node.parents.length===0){
            node.width = 1;
            node.visited = true;
            return 1;
        }


        // Add all parent node widths
        var nodeWidth = 0;
        for (var x = 0; x < node.parents.length; x++) {
            // Only sum parent nodes that are immediately related
            // If there are multiple paths to a parent, then don't sum
            if (this.getPathsCountBetweenTwoNodes(node, this.getNodeById(node.parents[x])) === 1) {
                nodeWidth += this.getNodeWidth(node.parents[x]);
            }
        }
        node.visited = true;
        node.width = nodeWidth;
        return nodeWidth;
    }


    // DFS to count the number of paths available between a node and one of it's parents
    getPathsCountBetweenTwoNodes(rootNode, targetNode){
        return 1;
        // var visitedNodes = [];
        //
        // for (var i = 0; i < rootNode.parents.length; i++) {
        //     visitedNodes.push(rootNode.parents[i]);
        //     if(isPath(this.getNodeById(rootNode.parents[i]), targetNode, visitedNodes)){
        //         return true;
        //     }
        // }
    }
    isPath(rootNode, targetNode, visitedNodes){

        if(rootNode.id === targetNode.id){return true;}

        for (var i = 0; i < rootNode.parents.length; i++) {
            if(isPath(this.getNodeById(rootNode.parents[i]), targetNode, visitedNodes)){
                return true;
            }
        }

        return false;
    }



}


let directionalNodeGraph = new DirectionalNodeGraph(treeData);
directionalNodeGraph.getDirectionalNodeGraph();








//
