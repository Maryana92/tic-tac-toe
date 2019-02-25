import React from "react";
import ReactDOM from "react-dom";

function calculateWinner(squares) {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
  return (
    <button
      className="square"
      style={{ backgroundColor: props.value }}
      onClick={props.onClick}
    />
  );
}

function Restart(props) {
  return (
    <button className="restart " onClick={props.onClick}>
      {" "}
      Restart{" "}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      turn: 0
    };
  }

  handleClick(i) {
    const squares = [...this.state.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "green" : "blue";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleReset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      turn: 0
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    const squares = [...this.state.squares];
    let full = squares.every(square => {
      return square !== null;
    });
    if (winner) {
      status = "Winner: " + winner;
    } else if (full) {
      status = "Board is full";
    } else {
      status = "Next player ";
    }

    return (
      <div>
        <div
          className={`${
            full
              ? "full"
              : winner
              ? winner
              : this.state.xIsNext
              ? "greenTurn"
              : "blueTurn"
          } staticStyle`}
        >
          {status}
        </div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <div>
          <Restart onClick={() => this.handleReset()} />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
