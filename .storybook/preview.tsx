import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import '../src/main.css'

export const parameters = {}

export const decorators = [
  Story => (
    <Router>
      <Story />
    </Router>
  ),
]
