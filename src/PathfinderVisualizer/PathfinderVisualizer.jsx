import React, {Component} from 'react';
import Node from './Node/Node'
import './PathfinderVisualizer.scss';


const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;
const ROW_NUMBER = 20;
const COLUMN_NUMBER = 52;


export default class PathfinderVisualizer extends Component {
  constructor(){
    super();
    this.state = {
      grid: [],
    };
  }

  //Creating 2D grid layout
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  render(){
    const {grid} = this.state;

    return (
      <div>
        Pathfinder Visualizer

        {/* Render the 2D grid layout */}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}                      
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
