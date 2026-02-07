import React from 'react'
import './ClueList.css'

const ClueList = ({ clues, direction, setDirection, selectedClue, setSelectedClue, setCurrentCell, getClueCells }) => {
  const handleClueClick = (clue) => {
    setSelectedClue(clue)
    setCurrentCell({ row: clue.row, col: clue.col })
  }

  return (
    <div className="clue-list-container">
      <div className="clue-tabs">
        <button
          className={`clue-tab ${direction === 'across' ? 'active' : ''}`}
          onClick={() => setDirection('across')}
        >
          Across
        </button>
        <button
          className={`clue-tab ${direction === 'down' ? 'active' : ''}`}
          onClick={() => setDirection('down')}
        >
          Down
        </button>
      </div>
      <div className="clue-list">
        <h3>{direction === 'across' ? 'Across' : 'Down'}</h3>
        <ul>
          {clues[direction].map((clue, idx) => (
            <li
              key={idx}
              className={`clue-item ${selectedClue === clue ? 'selected' : ''}`}
              onClick={() => handleClueClick(clue)}
            >
              <span className="clue-number">{clue.number}.</span>
              <span className="clue-text">{clue.clue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ClueList

