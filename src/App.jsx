import React from 'react'
import Crossword from './components/Crossword'
import { crosswordData } from './data/crosswordData'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Crossword for Pookie</h1>
        <p className="puzzle-date">Saturday, February 7, 2024</p>
      </header>
      <Crossword data={crosswordData} />
    </div>
  )
}

export default App

