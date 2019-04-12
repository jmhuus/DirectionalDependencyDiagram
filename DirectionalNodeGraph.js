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
    },
    {
        "name": "Node 10",
        "id": 10,
        "parents": [9,5]
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
        this.setNodePositions();
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
        var pathCount = 0;
        for (var i = 0; i < rootNode.parents.length; i++) {
            pathCount += this.countPaths(this.getNodeById(rootNode.parents[i]), targetNode);
        }

        return pathCount;
    }
    countPaths(rootNode, targetNode){
        // Target found, return path count of 1
        if(rootNode.id === targetNode.id){return 1;}

        var pathCount = 0;
        for (var i = 0; i < rootNode.parents.length; i++) {
            pathCount += this.countPaths(this.getNodeById(rootNode.parents[i]), targetNode);
        }

        return pathCount;
    }

    // Recursively set each node layer
    // TODO: encorporate setting node layers into getNodeWidth()
    setNodeLayer(){
        // Reset visited flag
        this.nodes.forEach(function(node){
            node.visited = false;
        });

        // Set layer for each node
        var startingLayer = 0;
        for (var x = 0; x < this.nodes.length; i++) {
            if (this.nodes[x].visited === false) {
                this.nodes[x].layer = startingLayer;
                for (var i = 0; i < this.nodes[x].parents.length; i++) {
                    // Set layer position

                    this.setParentLayers(this.getNodeById(this.nodes[x].parents[i]), startingLayer+1);
                }
            }
        }
    }
    // TODO: ensure that child nodes are immediate node memebers!!
    setParentLayers(node, layerPos){
        for (var i = 0; i < node.parents.length; i++) {
            this.getNodeById(node.parents[i]).visited = true;
            this.getNodeById(node.parents[i]).layer = layerPos;
            for (var x = 0; x < this.getNodeById(node.parents[i]).parents.length; x++) {
                this.setParentLayers(this.getNodeById(node.parents[i]).parents[x], layerPos+1);
            }
        }
    }
    setChildLayers(node, layerPos){
        for (var i = 0; i < this.nodes.length; i++) {
            for (var x = 0; x < this.nodes[i].parents.length; x++) {

                // TODO: ensure that child nodes are immediate node memebers
                if (this.getPathsCountBetweenTwoNodes(this.getNodeById(this.nodes[i].parents[x]), node) !== 0) {
                    continue;
                }

                if (node.id === this.nodes[i].parents[x]) {
                    this.getNodeById(this.nodes[i].parents[x]).visited = true;
                    this.getNodeById(this.nodes[i].parents[x]).layer = layerPos;
                    this.setChildLayers(this.getNodeById(this.nodes[i].parents[x]), layerPos-1);
                }
            }
        }
    }

    // Uses node widths to position node x,y coordinates
    setNodePositions(){
        this.nodes.forEach(function(node){

        });
    }
}


let directionalNodeGraph = new DirectionalNodeGraph(treeData);
directionalNodeGraph.getDirectionalNodeGraph();








//
