// Custom crossword puzzle data - Beaver themed with proper crossword rules
// Rule: Adjacent cells must be part of a word in that direction
export const crosswordData = {
  size: 15,
  grid: [
    // Row 0: BARRY (0-4), blanks (5-6), CHIKURIN (7-14)
    ['B', 'A', 'R', 'R', 'Y', '', '', 'C', 'H', 'I', 'K', 'U', 'R', 'I', 'N'],
    // Row 1: blanks except HAMNET A (8) and REGINALD E (12)
    ['', '', '', '', '', '', '', '', 'A', '', '', '', 'E', '', ''],
    // Row 2: blanks except HAMNET M (8) and REGINALD G (12)
    ['', '', '', '', '', '', '', '', 'M', '', '', '', 'G', '', ''],
    // Row 3: SAWYER (0-5), HAMNET N (8), REGINALD I (12)
    ['S', 'A', 'W', 'Y', 'E', 'R', '', '', 'N', '', '', '', 'I', '', ''],
    // Row 4: blanks except HAMNET E (8) and REGINALD N (12)
    ['', '', '', '', '', '', '', '', 'E', '', '', '', 'N', '', ''],
    // Row 5: blanks except HAMNET T (8) and REGINALD A (12)
    ['', '', '', '', '', '', '', '', 'T', '', '', '', 'A', '', ''],
    // Row 6: MABEL (0-4), MUKMUK starts at M, REGINALD L (12)
    ['M', 'A', 'B', 'E', 'L', '', '', '', '', '', '', '', 'L', '', ''],
    // Row 7: MUKMUK U (0), REGINALD D (12)
    ['U', '', '', '', '', '', '', '', '', '', '', '', 'D', '', ''],
    // Row 8: MUKMUK K (0)
    ['K', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    // Row 9: MUKMUK M (0), SHRIMP (2-7), SMELLY starts at S
    ['M', '', 'S', 'H', 'R', 'I', 'M', 'P', '', '', '', '', '', '', ''],
    // Row 10: MUKMUK U (0), SMELLY M (2)
    ['U', '', 'M', '', '', '', '', '', '', '', '', '', '', '', ''],
    // Row 11: MUKMUK K (0), SMELLY E (2), HARRY (5-9)
    ['K', '', 'E', '', '', 'H', 'A', 'R', 'R', 'Y', '', '', '', '', ''],
    // Row 12: SMELLY L (2), MARIA (10-14)
    ['', '', 'L', '', '', '', '', '', '', '', 'M', 'A', 'R', 'I', 'A'],
    // Row 13: SMELLY L (2)
    ['', '', 'L', '', '', '', '', '', '', '', '', '', '', '', ''],
    // Row 14: SMELLY Y (2), CENTRALPARK (4-14)
    ['', '', 'Y', '', 'C', 'E', 'N', 'T', 'R', 'A', 'L', 'P', 'A', 'R', 'K']
  ],
  clues: {
    across: [
      { number: 1, clue: 'The oldest Beaver', answer: 'BARRY', row: 0, col: 0 },
      { number: 2, clue: 'The best sushi spot in the world', answer: 'CHIKURIN', row: 0, col: 7 },
      { number: 3, clue: 'The one with a furry tail', answer: 'SAWYER', row: 3, col: 0 },
      { number: 4, clue: 'Beaver runs a Cookie Class that Nobody attends', answer: 'MABEL', row: 6, col: 0 },
      { number: 5, clue: 'Barry secretly likes?', answer: 'SHRIMP', row: 9, col: 2 },
      { number: 6, clue: 'The mayor of Beaver City', answer: 'HARRY', row: 11, col: 5 },
      { number: 7, clue: 'The one that speaks multiple languages', answer: 'MARIA', row: 12, col: 10 },
      { number: 8, clue: 'Our first date spot', answer: 'CENTRALPARK', row: 14, col: 4 }
    ],
    down: [
      { number: 1, clue: 'Mabel\'s book', answer: 'HAMNET', row: 0, col: 8 },
      { number: 2, clue: 'The dog\'s full name', answer: 'REGINALD', row: 0, col: 12 },
      { number: 3, clue: 'Nick', answer: 'MUKMUK', row: 6, col: 0 },
      { number: 4, clue: 'Mabel\'s hair sometimes', answer: 'SMELLY', row: 9, col: 2 }
    ]
  }
}
