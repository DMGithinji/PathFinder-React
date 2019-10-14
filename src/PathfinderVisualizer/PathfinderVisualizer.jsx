
import React, {Component} from 'react';
import Node from './Node/Node';
import './PathfinderVisualizer.scss';
import {dijkstra, orderedShortestPath} from '../Algorithms/Dijkstras';

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 18;
const FINISH_NODE_COL = 50;
const ROW_NUMBER = 20;
const COLUMN_NUMBER = 52;


export default class PathfinderVisualizer extends Component {
  constructor(){
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startNodeIsPressed: false,
    };
  }

  //Creating 2D grid layout
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }
  
  //When mouse is clicked, make node wall
  handleMousePress(row, col){
    if (this.state.grid[row][col].isStart){
      this.handleMousePressforStart(row, col);
      return;
    }
    const newGrid = toggleWallResetGrid(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
    console.log(`mouse is pressed at col - ${col} and row -${row}`);
  }

  //When mouse enters node while pressed, make node wall
  handleMouseEnter(row, col){
    if ((!this.state.mouseIsPressed) && (!this.state.startNodeIsPressed)) return; //if not pressed already, don't do anything
    if(this.state.startNodeIsPressed){
      this.handleMouseEnterWithStart(row, col);
      return;
    } 
    else {
      const newGrid = toggleWallResetGrid(this.state.grid, row, col);
      this.setState({grid: newGrid});
    }
  }

  //When user stops pressing, stop making walls
  handleStop(row, col){
    this.setState({mouseIsPressed: false});
    this.setState({startNodeIsPressed: false});
  }

  //When mouse is clicked on start, note that it is start pressed - prep to hold it
  handleMousePressforStart(row, col){
      this.setState({startNodeIsPressed: true});
  }

  //When mouse enters node while pressed, make node wall
  handleMouseEnterWithStart(row, col){
    if (!this.state.startNodeIsPressed) return; //if start not pressed already, don't do anything
    const newGrid = toggleStartResetGrid(this.state.grid, row, col);
    this.setState({grid: newGrid});
  } 

  handleMouseLeave(row, col){
    if (!this.state.startNodeIsPressed) return; //if not pressed already, don't do anything
    const newGrid = toggleStartResetGrid(this.state.grid, row, col);
    this.setState({grid: newGrid});
}

  //Function to enable visualization of Dijkstra's Algorithm in play
  animateDijkstra (visitedNodesInOrder, nodesInShortestPathOrder){
    for (let i = 1; i <= visitedNodesInOrder.length-1; i++) {
      if (i === visitedNodesInOrder.length-1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }    
      setTimeout(()=>{
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * i);
    }    
  }

  //Function to enable visualization of result ie shortest path found
  animateShortestPath(nodesInShortestPathOrder) {
    if(nodesInShortestPathOrder[0] !== this.state.grid[START_NODE_ROW][START_NODE_COL]){
      alert('No path available');
    }
    console.log(this.state.grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
    console.log(nodesInShortestPathOrder[0]);
    for (let i = 1; i < nodesInShortestPathOrder.length-1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
      }, 50 * i);
    }
  }

  //Function to be ran on click to initiate visualization of Dijkstra's ALgorithm
  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = orderedShortestPath(finishNode);
    // console.log(visitedNodesInOrder, nodesInShortestPathOrder);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render(){
    const {grid, mouseIsPressed, startNodeIsPressed} = this.state;
    
    return (
      <div>
        Pathfinder Visualizer <br/>

        <button onClick={() => this.visualizeDijkstra()}>Visualize</button>

        {/* Render the 2D grid layout */}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      startNodeIsPressed={startNodeIsPressed}
                      whileMousePressed={(row, col) => this.handleMousePress(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}   
                      onMouseLeave={(row, col) => this.handleMouseLeave(row, col)}   
                      onMouseUp={()=> this.handleStop(row, col)}                
                      row={row}>
                    </Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// function to setup nodes and position of startpoint and endpoint
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

//function to setup 2D grid layout
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row <ROW_NUMBER; row++) {
    const currentRow = [];
    for (let col = 0; col < COLUMN_NUMBER; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

//function to make a node a wall
const toggleWallResetGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}




//function to make a node a startPoint or remove it as a startPoint
const toggleStartResetGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}