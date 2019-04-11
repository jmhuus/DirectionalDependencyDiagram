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
        "parents": [1,2]
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
        setNodeHeightAndWidth
    }

    getNodeById(id){
        for (var i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].id===id){
                return this.nodes[i];
            }
        }
    }

    // Calculates the width of each node based on the number parent nodes
    setNodeHeightAndWidth(){
        for (var i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].visited === false){

                if(this.nodes[i].parents > 0){
                    this.nodes[i].
                }

                var nodeWidth = 0;

                for (var x = 0; x < this.nodes[i].parents.length; x++) {
                    nodeWidth += this.getNodeWidth(this.getNodeById(this.nodes[i].parents[x]));
                }


                this.nodes[i].height = nodeHeight;
                this.nodes[i].width = nodeWidth;
            }
        }
    }


    // Calculate widths for all nodes
    getNodeWidth(node){
        // Node already visited, skip
        if(node.visited){return [node.height, node.width];}

        // Leaf node; width = 1
        if(node.parents.length===0){
            node.visited = true;
            return 1;
        }

        var width = 0;

        // Add all parent node widths
        for (var i = 0; i < node.parents.length; i++) {
            // Skip parents with more than one path to root
            if(this.getPathsCountBetweenTwoNodes(node, this.getNodeById(node.parents[i]))){continue;}

            nodeWidth += this.getNodeWidth(this.getNodeById(node.parents[i]));
        }

        node.visited = true;
    }


    // DFS to count the number of paths available between a node and one of it's parents
    getPathsCountBetweenTwoNodes(rootNode, targetNode){

        var visitedNodes = [];

        for (var i = 0; i < rootNode.parents.length; i++) {
            visitedNodes.push(rootNode.parents[i]);
            if(isPath(this.getNodeById(rootNode.parents[i]), targetNode, visitedNodes)){
                return true;
            }
        }
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








//
