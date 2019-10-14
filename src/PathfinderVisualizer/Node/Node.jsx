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
      onMouseLeave,
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
        onMouseLeave={() => onMouseLeave(row, col)}
        onMouseUp={() => onMouseUp(row, col)}>
        </div>
    );
  }
}