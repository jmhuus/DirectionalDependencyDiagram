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
    },
    {
        "name": "Node 11",
        "id": 11,
        "parents": []
    },
    {
        "name": "Node 12",
        "id": 12,
        "parents": []
    },
    {
        "name": "Node 13",
        "id": 13,
        "parents": []
    },
    {
        "name": "Node 14",
        "id": 14,
        "parents": [10,11,12,13]
    },
    {
        "name": "Node 15",
        "id": 15,
        "parents": [14]
    },
    {
        "name": "Node 16",
        "id": 16,
        "parents": [5]
    }
];



class DirectionalNodeGraph{
    constructor(data, pixelWidth, layerHeight){
        this.layerHeight = layerHeight;
        this.pixelWidth = pixelWidth;
        this.nodes = data;
        this.nodes.forEach(function(node){
            node.visited = false;
        });
    }


    getDirectionalNodeGraph(){
        this.setNodeBlockWidth();
        this.setNodeLayers();
        this.remapNodeLayersToBePositive();
        this.setNodeCoordinates();
        this.nodes.forEach(function(node){
            console.log(node);
        });

        return this.nodes;
    }

    getNodeById(id){
        for (var i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].id===id){
                return this.nodes[i];
            }
        }
    }

    // Calculates the blockWidth of each node based on the number parent nodes
    setNodeBlockWidth(){
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].visited === false) {

                // Leaf node, blockWidth of 1
                if(this.nodes[i].parents.length===0){
                    this.nodes[i].blockWidth = 1;
                    this.nodes[i].visited = true;
                    continue;
                }

                // Node blockWidth = sum blockWidths of parents
                var nodeBlockWidth = 0;
                for (var x = 0; x < this.nodes[i].parents.length; x++) {
                    // Only sum parent nodes that are immediately related
                    // If there are multiple paths to a parent, then don't sum
                    if (this.getPathsCountBetweenTwoNodes(this.nodes[i], this.getNodeById(this.nodes[i].parents[x])) === 1) {
                        nodeBlockWidth += this.getNodeBlockWidth(this.getNodeById(this.nodes[i].parents[x]));
                    }
                }
                this.nodes[i].blockWidth = nodeBlockWidth;
                this.nodes[i].visited = true;
            }
        }
    }


    // Calculate blockWidths for all nodes
    getNodeBlockWidth(node){
        // Node already visited, skip
        if(node.visited){return node.blockWidth;}

        // Leaf node; blockWidth = 1
        if(node.parents.length===0){
            node.blockWidth = 1;
            node.visited = true;
            return 1;
        }


        // Add all parent node blockWidths
        var nodeBlockWidth = 0;
        for (var x = 0; x < node.parents.length; x++) {
            // Only sum parent nodes that are immediately related
            // If there are multiple paths to a parent, then don't sum
            if (this.getPathsCountBetweenTwoNodes(node, this.getNodeById(node.parents[x])) === 1) {
                nodeBlockWidth += this.getNodeblockWidth(node.parents[x]);
            }
        }
        node.visited = true;
        node.blockWidth = nodeBlockWidth;
        return nodeBlockWidth;
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
    setNodeLayers(){
        // Reset visited flag
        this.nodes.forEach(function(node){
            node.visited = false;
        });

        // Set layer for each node
        // TODO: eventually account for multiple node diagrams; diagrams that are separate from each other
        var startingLayer = 0;
        this.nodes[4].layer = startingLayer;
        this.nodes[4].visited = true;
        this.setParentLayers(this.nodes[4], startingLayer);
        this.setChildLayers(this.nodes[4], startingLayer);
    }
    setParentLayers(node, layerPos){
        for (var i = 0; i < node.parents.length; i++) {

            // Ensure that parent nodes are immediate node memebers
            if ((this.getPathsCountBetweenTwoNodes(node, this.getNodeById(node.parents[i])) !== 1) || this.getNodeById(node.parents[i]).visited) {
                continue;
            }

            // Set layer
            this.getNodeById(node.parents[i]).visited = true;
            this.getNodeById(node.parents[i]).layer = layerPos+1;

            // Set parent layers
            this.setParentLayers(this.getNodeById(node.parents[i]), layerPos+1);

        }
    }
    setChildLayers(node, layerPos){
        for (var i = 0; i < this.nodes.length; i++) {
            for (var x = 0; x < this.nodes[i].parents.length; x++) {

                // Ensure that child nodes are immediate node memebers
                if (this.getPathsCountBetweenTwoNodes(this.nodes[i], this.getNodeById(this.nodes[i].parents[x])) !== 1) {
                    continue;
                }

                // Connection found, set layer
                if (node.id === this.nodes[i].parents[x]) {
                    this.nodes[i].visited = true;
                    this.nodes[i].layer = layerPos-1;
                    var randNode = this.nodes[i];
                    this.setChildLayers(this.nodes[i], layerPos-1);
                    this.setParentLayers(this.nodes[i], layerPos-1);
                }
            }
        }
    }

    // Node layers can be negative or positive, remap to always be positive
    remapNodeLayersToBePositive(){
        // Locate lowest layer number
        var lowestLayer = 0;
        var largestLayer = 0;
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].layer < lowestLayer) { lowestLayer = this.nodes[i].layer; }
            if (this.nodes[i].layer > largestLayer) { largestLayer  = this.nodes[i].layer}
        }

        largestLayer += Math.abs(lowestLayer);

        // Push each node layer up by abs(lowestLayer)
        this.nodes.forEach(function(node){
            node.layer += Math.abs(lowestLayer);
            node.layer = largestLayer - node.layer;
        });
    }

    // Uses node blockWidths to position node x,y coordinates
    setNodeCoordinates(){
        var maxNodeWidth = 0;
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].blockWidth > maxNodeWidth) {
                maxNodeWidth = this.nodes[i].blockWidth\\\\\\\\\\\\\\\\\\\\
                   }
        }
  
        var leafCountsPerNode = {};
        for (var i = 0; i < this.nodes.length; i++) {

            // X coordinates for non-leaf nodes
            if (this.nodes[i].blockWidth > 1) {
                this.nodes[i].x = node.blockWidth;


                // X coordinates for leaf nodes
                var parentWidthSum = (this.nodes[i].blockWidth/maxNodeWidth) * this.pixelWidth ;
                for (var x = 0; x < this.nodes[i].parents.length; x++) {
                    var parentNode = this.getNodeById(this.nodes[i].parents[x]);
                    if (parentNode.blockWidth === 1) {
                        parentNode.x = parentWidthSum;
                    }

                    parentWidthSum += parentNode.blockWidth;
                }
            }
        }
    }
}







//
