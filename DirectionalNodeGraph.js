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
    }

    // Sets x,y locations for all nodes
    getDirectionalNodesGraph(){
        for (var i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].parents.length > 0){
                var nodeHeight = 0;
                var nodeWidth = 0;
                for (var x = 0; x < this.nodes[i].parents.length; x++) {
                    var nodeSize = this.getNodeSize(this.getNodeById(this.nodes[i].parents[x]));
                    nodeHeight += nodeSize[0];
                    nodeWidth += nodeSize[1];
                }
            }
        }
    }


    getNodeById(id){
        for (var i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].id===id){
                return this.nodes[i];
            }
        }
    }


    // Recursive fuction to get node parent size
    getNodeSize(node){
        // Node doesn't have parents, return height 1, width 1
        if(!node.parents){return [1,1];}


        // Calculate each node height and width
        var nodeHeight = 0;
        var nodeWidth = 0;
        for (var i = 0; i < node.parents.length; i++) {
            for (var x = 0; x < this.nodes.length; x++) {
                var nodeSize = this.getNodeSize(this.getNodeById(this.nodes[x].id));
                nodeHeight += nodeSize[0];
                nodeWidth += nodeSize[1];
            }
        }
    }
}


let directionalNodeGraph = new DirectionalNodeGraph(treeData);
console.log(directionalNodeGraph.getDirectionalNodesGraph());








//
