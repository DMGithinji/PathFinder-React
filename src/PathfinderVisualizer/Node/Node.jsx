import React, {Component} from 'react';
import './Node.scss';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      whileMousePressed,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = 
      isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => whileMousePressed(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp(row, col)}>
        </div>
    );
  }
}