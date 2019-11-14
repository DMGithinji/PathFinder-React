
/**
 * Uses A* algorithm to determine the shortest path
 * Returns all the nodes in the order they were visited
 * Basically, the nodes point to the previous neighbouring node
 * that was visited, enabling calculation of the shortest path 
 * between start point and end point
 */


//Open set - list containing nodes to be evaluated. Usually neighbouring nodes to current node that haven't been evaluated, not all the nodes in grid
//Closed set - list containing all nodes that have already been evaluated
//g_cost - distance between current node and start node
//h_cost - distance between current node and finish node
//f_cost - sum of g_cost and f_cost
//Algorithm considered finished once all nodes that can possibly be evaluated have been evaluated or you've found the end node

export function aStar( grid, startNode, finishNode) {
    const openSet = [];
    const closedSet = [];
    
    openSet.push(startNode); //add startNode to openSet
    calcF(startNode, finishNode, startNode);

    //keep looping as long as openSet's greater than 0
    while(openSet.length > 0) {
        
        //determine the node with the lowest f_cost and set it as currentNode
        let winner = 0;
        openSet.forEach((node, index) => {
            if(node.f_cost < openSet[winner].f_cost){
                winner = index;
            }
        });
        let currentNode = openSet[winner];
        //remove currentNode from openSet and add it to closedSet
        removeFromArray(openSet, currentNode);
        closedSet.push(currentNode);
        //if currentNode is finishNode, solution found, reconstruct path
        if (currentNode === finishNode) {
            console.log("Done");
            return closedSet;
        }



        let neighbours = getNeighbours(currentNode, grid, closedSet);

        neighbours.forEach(neigh => {
            if(!closedSet.includes(neigh) && !neigh.isWall){
                let tentative_g_score = currentNode.g_cost + heuristic(neigh, currentNode);
                if(!openSet.includes(neigh)){
                    openSet.push(neigh);
                } 
                else if (tentative_g_score >= neigh.g_cost){
                    neigh.g_cost = tentative_g_score;
                }

                neigh.g_cost = tentative_g_score;
                neigh.h_cost = heuristic(neigh, finishNode);
                neigh.f_cost = neigh.g_cost +  neigh.h_cost;
                neigh.previousNode = currentNode;
            }
        });
    }
    return closedSet;
}

function removeFromArray(arr, node){
    for( var i = arr.length-1; i >= 0; i--){
        if (arr[i] === node){
            arr.splice(i, 1);
        }
    }
}

/**
 * Get the heiristic between point a and d
 */
function heuristic(current, target) {
    // return Math.sqrt( (current.col-target.col)**2 + (current.row-target.row)**2);
    return (Math.abs(current.col-target.col) + (Math.abs(current.row - target.row)));
}
/**
 * Function to assign nodes with their costs
 */
function calcF(startNode, finishNode, node) {
    node.g_cost = Math.sqrt( (node.col-startNode.col)**2 + (node.row-startNode.row)**2);
    node.h_cost = Math.sqrt( (node.col-finishNode.col)**2 + (node.row-finishNode.row)**2);
    node.f_cost = node.g_cost + node.h_cost;
}

/**
 * Function to get the node with minimum f_cost
 */
// function getMinFcost(openSet){
//     return openSet.reduce((min, node) => node.f_cost < min ? node.f_cost : min, openSet[0]);
// }



/**
 * Function to get the surrounding neighbours of the current node that haven't been visited
 */
function getNeighbours (node, grid, closedSet) {
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
    return neighbours.filter(neighbour=> !closedSet.includes(neighbour)); //return array of neighbour nodes that havent been visited
}

/**
 * Function to organize the nodes that draw out the shortest path
 */
export function orderedAStarPath (finishNode){
    const nodesInShortestPath = [];
    let currentNode = finishNode; //setup initial node as the final node
    while (currentNode!== null){ //while current node isn't start node
        nodesInShortestPath.unshift(currentNode); //keep adding current node to front of array
        currentNode = currentNode.previousNode; //update currentNode
    }
    return nodesInShortestPath;
}