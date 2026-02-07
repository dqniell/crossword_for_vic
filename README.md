# New York Times Themed Crossword Puzzle

A beautiful, interactive crossword puzzle built with React and JavaScript, styled to look like the New York Times crossword.

## Features

- 🎯 Interactive crossword grid with clickable cells
- 📝 Across and Down clue navigation
- ⌨️ Keyboard input support (type letters, use arrow keys to navigate)
- 🎨 NYT-style design with classic black and white grid
- ✅ Real-time answer validation (incorrect answers highlighted in red)
- 🔄 Toggle between Across and Down clues
- 📱 Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Play

1. **Click on a cell** in the grid to select it
2. **Type letters** to fill in answers
3. **Use arrow keys** to navigate between cells
4. **Press spacebar** to toggle between Across and Down directions
5. **Click on clues** in the clue list to jump to that word
6. **Switch tabs** between "Across" and "Down" to see different clues

## Project Structure

```
crossword_for_vic/
├── src/
│   ├── components/
│   │   ├── Crossword.jsx      # Main crossword grid component
│   │   ├── Crossword.css      # Grid styling
│   │   ├── ClueList.jsx       # Clue list component
│   │   └── ClueList.css       # Clue list styling
│   ├── data/
│   │   └── crosswordData.js   # Puzzle data (grid, clues, answers)
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styling
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
└── vite.config.js            # Vite configuration
```

## Customizing the Puzzle

To create your own crossword puzzle, edit `src/data/crosswordData.js`:

- Modify the `grid` array to set up the puzzle layout (use empty strings `''` for blocked cells)
- Add clues in the `clues.across` and `clues.down` arrays
- Each clue needs: `number`, `clue` (the hint), `answer` (the solution), `row`, and `col` (starting position)

## Technologies Used

- React 18
- Vite (build tool)
- JavaScript (ES6+)
- CSS3

## License

This project is open source and available for personal use.

