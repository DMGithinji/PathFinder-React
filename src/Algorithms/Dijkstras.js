//Uses Djikstra's algorithm to determine the shortest path
//Returns all the nodes in the order they were visited
//Basically, the nodes point to the previous neighbouring node
//that was visited, enabling calculation of the shortest path 
//between start point and end point

export function dijkstra(grid, startNode, finishNode) {
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid)
    const orderedVisitedNodes = [];
    while(!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift(); 
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return orderedVisitedNodes;
        closestNode.isVisited = true; 
        if (closestNode === finishNode) return orderedVisitedNodes;
        orderedVisitedNodes.push(closestNode); 
        updateUnvisitedNeighbours(closestNode, grid); 
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
    if (col < grid[0].length-1) neighbours.push(grid[row][col+1]); //get right neighbour
    if (row < grid.length-1) neighbours.push(grid[row+1][col]); //get lower neighbour
    if (row > 0) neighbours.push(grid[row - 1][col]); //get upper neighbour
    if (col > 0) neighbours.push(grid[row][col-1]); //get left neighbour

    // if (col < grid[0].length-1 && row < grid.length-1) neighbours.push(grid[row+1][col+1]); //get right neighbour
    // if (col > 0  &&  row < grid.length-1) neighbours.push(grid[row+1][col-1]); //get lower neighbour
    // if (col > 0 && row > 0) neighbours.push(grid[row - 1][col-1]); //get upper neighbour
    // if (col < grid[0].length-1 && row > 0)neighbours.push(grid[row-1][col+1]); //get left neighbour
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