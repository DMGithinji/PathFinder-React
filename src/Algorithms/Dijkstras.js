//Uses Djikstra's algorithm to determine the shortest path
//Returns all the nodes in the order they were visited
//Basically, the nodes point to the previous neighbouring node
//that was visited, enabling calculation of the shortest path 
//between start point and end point

export function dijkstra(grid, startNode, finishNode) {
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    const orderedVisitedNodes = [];
    while(!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift(); //update closest node
        if (closestNode.isWall) continue; //skip obstacle nodes
        if (closestNode.distance === Infinity) return orderedVisitedNodes; //When there is no solution
        closestNode.isVisited = true; //Mark node as visited
        if (closestNode === finishNode) return orderedVisitedNodes; //On completion of path determination
        orderedVisitedNodes.push(closestNode); //Add the latest visited node to the visited list
        updateUnvisitedNeighbours(closestNode, grid); 
    }
}

/**
 * Function to get all the nodes in grid and their coordinates
 */
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

/**
 * Function to sort nodes based on their coordinates
 */
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

/**
 * Function to update the distance of the neighbours to the current node
 * and mark the node it originated from for each
 */
function updateUnvisitedNeighbours (node, grid){
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for (const unvisited of unvisitedNeighbours){
        unvisited.distance = node.distance + 1;
        unvisited.previousNode = node;
    }
}

/**
 * Function to get the surrounding neighbours of the current node that haven't been visited
 */
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

/**
 * Function to organize the nodes that draw out the shortest path
 */
export function orderedShortestPath (finishNode){
    const nodesInShortestPath = [];
    let currentNode = finishNode; //setup initial node as the final node
    while (currentNode!== null){ //while current node isn't start node
        nodesInShortestPath.unshift(currentNode); //keep adding current node to front of array
        currentNode = currentNode.previousNode; //update currentNode
    }
    return nodesInShortestPath;
}