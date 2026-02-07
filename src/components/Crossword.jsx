import React, { useState, useRef, useEffect } from 'react'
import ClueList from './ClueList'
import VictoryPage from './VictoryPage'
import './Crossword.css'

const Crossword = ({ data }) => {
  const [grid, setGrid] = useState(data.grid.map(row => [...row]))
  const [userAnswers, setUserAnswers] = useState(
    Array(data.size).fill(null).map(() => Array(data.size).fill(''))
  )
  const [currentCell, setCurrentCell] = useState(() => {
    const firstClue = data.clues.across[0]
    return firstClue ? { row: firstClue.row, col: firstClue.col } : { row: 0, col: 0 }
  })
  const [direction, setDirection] = useState('across') // 'across' or 'down'
  const [selectedClue, setSelectedClue] = useState(data.clues.across[0] || null)
  const [isComplete, setIsComplete] = useState(false)
  const cellRefs = useRef({})

  // Find clue number for a cell
  const getClueNumber = (row, col) => {
    if (grid[row][col] === '') return null
    
    // Check if this is the start of an across clue
    const acrossClue = data.clues.across.find(clue => clue.row === row && clue.col === col)
    if (acrossClue) return acrossClue.number
    
    // Check if this is the start of a down clue
    const downClue = data.clues.down.find(clue => clue.row === row && clue.col === col)
    if (downClue) return downClue.number
    
    return null
  }

  // Get all cells for a clue
  const getClueCells = (clue, dir = null) => {
    const cells = []
    let clueDir = dir
    
    if (!clueDir) {
      // Determine direction by checking which array contains this clue
      const isAcross = data.clues.across.some(c => 
        c.number === clue.number && c.row === clue.row && c.col === clue.col
      )
      clueDir = isAcross ? 'across' : 'down'
    }
    
    if (clueDir === 'across') {
      for (let i = 0; i < clue.answer.length; i++) {
        cells.push({ row: clue.row, col: clue.col + i })
      }
    } else {
      for (let i = 0; i < clue.answer.length; i++) {
        cells.push({ row: clue.row + i, col: clue.col })
      }
    }
    return cells
  }

  // Move to next clue in sequence
  const moveToNextClue = (currentAnswers) => {
    if (!selectedClue) return
    
    const clueList = direction === 'across' ? data.clues.across : data.clues.down
    const currentIndex = clueList.findIndex(c => 
      c.number === selectedClue.number && c.row === selectedClue.row && c.col === selectedClue.col
    )
    
    // Check if current word is complete
    const currentCells = getClueCells(selectedClue, direction)
    const isWordComplete = currentCells.every(cell => 
      currentAnswers[cell.row][cell.col] !== ''
    )
    
    if (isWordComplete && currentIndex < clueList.length - 1) {
      // Move to next clue in same direction
      const nextClue = clueList[currentIndex + 1]
      setSelectedClue(nextClue)
      setCurrentCell({ row: nextClue.row, col: nextClue.col })
    } else if (isWordComplete && currentIndex === clueList.length - 1) {
      // Last clue in this direction, switch to other direction
      const otherClues = direction === 'across' ? data.clues.down : data.clues.across
      if (otherClues.length > 0) {
        const nextClue = otherClues[0]
        setDirection(direction === 'across' ? 'down' : 'across')
        setSelectedClue(nextClue)
        setCurrentCell({ row: nextClue.row, col: nextClue.col })
      }
    }
  }

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (grid[row][col] === '') return
    
    // Find which clue this cell belongs to
    const acrossClue = data.clues.across.find(clue => {
      const cells = getClueCells(clue, 'across')
      return cells.some(c => c.row === row && c.col === col)
    })
    
    const downClue = data.clues.down.find(clue => {
      const cells = getClueCells(clue, 'down')
      return cells.some(c => c.row === row && c.col === col)
    })
    
    if (direction === 'across' && acrossClue) {
      setSelectedClue(acrossClue)
      setCurrentCell({ row: acrossClue.row, col: acrossClue.col })
    } else if (direction === 'down' && downClue) {
      setSelectedClue(downClue)
      setCurrentCell({ row: downClue.row, col: downClue.col })
    } else if (acrossClue) {
      setDirection('across')
      setSelectedClue(acrossClue)
      setCurrentCell({ row: acrossClue.row, col: acrossClue.col })
    } else if (downClue) {
      setDirection('down')
      setSelectedClue(downClue)
      setCurrentCell({ row: downClue.row, col: downClue.col })
    }
  }

  // Handle key input
  const handleKeyDown = (e) => {
    const { row, col } = currentCell
    
    if (grid[row][col] === '') {
      // Try to find next valid cell
      return
    }
    
    // Toggle direction with spacebar
    if (e.key === ' ') {
      e.preventDefault()
      setDirection(direction === 'across' ? 'down' : 'across')
      return
    }
    
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const newAnswers = userAnswers.map(r => [...r])
      newAnswers[row][col] = ''
      setUserAnswers(newAnswers)
      
      // Move to previous cell
      if (direction === 'across' && col > 0 && grid[row][col - 1] !== '') {
        setCurrentCell({ row, col: col - 1 })
      } else if (direction === 'down' && row > 0 && grid[row - 1][col] !== '') {
        setCurrentCell({ row: row - 1, col })
      }
      return
    }
    
    if (e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
      const letter = e.key.toUpperCase()
      const newAnswers = userAnswers.map(r => [...r])
      newAnswers[row][col] = letter
      setUserAnswers(newAnswers)
      
      // Check if we're at the last cell of current word
      const currentCells = selectedClue ? getClueCells(selectedClue, direction) : []
      const lastCell = currentCells[currentCells.length - 1]
      const isLastCellOfWord = lastCell && lastCell.row === row && lastCell.col === col
      
      if (isLastCellOfWord) {
        // Auto-advance to next word
        setTimeout(() => moveToNextClue(newAnswers), 50)
      } else {
        // Move to next cell in current word
        if (direction === 'across') {
          let nextCol = col + 1
          while (nextCol < data.size && grid[row][nextCol] === '') {
            nextCol++
          }
          if (nextCol < data.size) {
            setCurrentCell({ row, col: nextCol })
          }
        } else {
          let nextRow = row + 1
          while (nextRow < data.size && grid[nextRow][col] === '') {
            nextRow++
          }
          if (nextRow < data.size) {
            setCurrentCell({ row: nextRow, col })
          }
        }
      }
    }
    
    // Arrow keys
    if (e.key === 'ArrowRight' && col < data.size - 1) {
      let nextCol = col + 1
      while (nextCol < data.size && grid[row][nextCol] === '') {
        nextCol++
      }
      if (nextCol < data.size) {
        setCurrentCell({ row, col: nextCol })
      }
    }
    if (e.key === 'ArrowLeft' && col > 0) {
      let nextCol = col - 1
      while (nextCol >= 0 && grid[row][nextCol] === '') {
        nextCol--
      }
      if (nextCol >= 0) {
        setCurrentCell({ row, col: nextCol })
      }
    }
    if (e.key === 'ArrowDown' && row < data.size - 1) {
      let nextRow = row + 1
      while (nextRow < data.size && grid[nextRow][col] === '') {
        nextRow++
      }
      if (nextRow < data.size) {
        setCurrentCell({ row: nextRow, col })
      }
    }
    if (e.key === 'ArrowUp' && row > 0) {
      let nextRow = row - 1
      while (nextRow >= 0 && grid[nextRow][col] === '') {
        nextRow--
      }
      if (nextRow >= 0) {
        setCurrentCell({ row: nextRow, col })
      }
    }
  }

  // Focus current cell
  useEffect(() => {
    const key = `${currentCell.row}-${currentCell.col}`
    if (cellRefs.current[key]) {
      cellRefs.current[key].focus()
    }
  }, [currentCell])

  // Check if cell is correct
  const isCellCorrect = (row, col) => {
    if (grid[row][col] === '') return null
    if (userAnswers[row][col] === '') return null
    return userAnswers[row][col] === grid[row][col]
  }

  // Check if puzzle is complete
  useEffect(() => {
    const checkCompletion = () => {
      for (let row = 0; row < data.size; row++) {
        for (let col = 0; col < data.size; col++) {
          if (grid[row][col] !== '' && userAnswers[row][col] !== grid[row][col]) {
            return false
          }
        }
      }
      return true
    }
    
    if (checkCompletion()) {
      // Small delay before showing victory for better UX
      setTimeout(() => setIsComplete(true), 500)
    }
  }, [userAnswers, grid, data.size])

  // Check if cell is in selected clue
  const isInSelectedClue = (row, col) => {
    if (!selectedClue) return false
    const isAcross = data.clues.across.some(c => 
      c.number === selectedClue.number && c.row === selectedClue.row && c.col === selectedClue.col
    )
    const clueDir = isAcross ? 'across' : 'down'
    const cells = getClueCells(selectedClue, clueDir)
    return cells.some(c => c.row === row && c.col === col)
  }

  // Show victory page when complete
  if (isComplete) {
    return <VictoryPage />
  }

  return (
    <div className="crossword-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="crossword-main">
        <div className="crossword-grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="crossword-row">
              {row.map((cell, colIdx) => {
                const isBlocked = cell === ''
                const clueNum = !isBlocked ? getClueNumber(rowIdx, colIdx) : null
                const isCurrent = currentCell.row === rowIdx && currentCell.col === colIdx
                const isSelected = isInSelectedClue(rowIdx, colIdx)
                const isCorrect = isCellCorrect(rowIdx, colIdx)
                const userAnswer = userAnswers[rowIdx][colIdx]
                const key = `${rowIdx}-${colIdx}`
                
                return (
                  <div
                    key={key}
                    ref={el => cellRefs.current[key] = el}
                    className={`crossword-cell ${isBlocked ? 'blocked' : ''} ${isCurrent ? 'current' : ''} ${isSelected ? 'selected' : ''} ${isCorrect === false ? 'incorrect' : ''}`}
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                    tabIndex={isBlocked ? -1 : 0}
                  >
                    {clueNum && <span className="clue-number">{clueNum}</span>}
                    {!isBlocked && (
                      <span className="cell-letter">
                        {userAnswer || ''}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <ClueList
          clues={data.clues}
          direction={direction}
          setDirection={setDirection}
          selectedClue={selectedClue}
          setSelectedClue={setSelectedClue}
          setCurrentCell={setCurrentCell}
          getClueCells={getClueCells}
        />
      </div>
    </div>
  )
}

export default Crossword

