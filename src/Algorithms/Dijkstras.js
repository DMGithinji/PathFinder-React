//Uses Djikstra's algorithm to determine the shortest path
//Returns all the nodes in the order they were visited
//Basically, the nodes point to the previous neighbouring node
//that was visited, enabling calculation of the shortest path 
//between start point and end point

export function dijkstra(grid, startNode, finishNode) {
    //start is changed from a distance of infinity to 0
    startNode.distance = 0;
    //create an array of all the nodes of which are unvisited
    const unvisitedNodes = getAllNodes(grid)
    //create an empty array to store a visited nodes in order in which they were visited
    const orderedVisitedNodes = [];

    //while we havent checked all nodes
    while(!!unvisitedNodes.length) {
        //consistently sort all the nodes based on distance on each loop
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift(); //get the next closest node 
        if (closestNode.isWall) continue; //if closest node is a wall, skip it
        closestNode.isVisited = true; //mark closest node if not wall as visited 
        orderedVisitedNodes.push(closestNode); //Add it to VisitedArray

        //if we get to finish node, return all the visited nodes
        if (closestNode === finishNode){
            return orderedVisitedNodes;
        }

        //otherwise, get the next set of nodes and update distances and mark their previous node
        updateUnvisitedNeighbours(closestNode, grid)

    }

}

//gets all the nodes
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbours (node, grid){
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const unvisited of unvisitedNeighbours){
        unvisited.distance = node.distance + 1;
        unvisited.previousNode = node;
    }
}

function getUnvisitedNeighbours (node, grid) {
    const neighbours = [];
    const {col, row} = node;
    if (row > 0) neighbours.push(grid[row - 1][col]); //get upper neighbour
    if (row < grid.length-1) neighbours.push(grid[row+1][col]); //get lower neighbour
    if (col > 0) neighbours.push(grid[row][col-1]); //get left neighbour
    if (col < grid[0].length-1) neighbours.push(grid[row][col+1]); //get right neighbour
    // if (col > 0 && row > 0) neighbours.push(grid[col-1][row-1]); //bottom-left
    // if (col < grid[0].length-1 && row > 0) neighbours.push(grid[col-1][row-1]); //bottom-right
    // if (col > 0 && row < grid.length-1) neighbours.push(grid[col-1][row-1]); //top-left
    // if (col < grid[0].length-1 && row < grid.length-1) neighbours.push(grid[col-1][row-1]); //top-right
    return neighbours.filter(neighbour=> !neighbour.isVisited); //return array of neighbour nodes that havent been visited
}

export function orderedShortestPath (finishNode){
    const nodesInShortestPath = [];
    let currentNode = finishNode; //setup initial node as the final node
    while (currentNode!== null){ //while current node isn't start node
        nodesInShortestPath.unshift(currentNode); //keep adding current node to front of array
        currentNode = currentNode.previousNode; //update currentNode
    }
    return nodesInShortestPath;
}