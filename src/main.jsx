import React, { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// const ReactElement = {
//   type: "div",
//   props: {
//       href: "https://google.com",
//       target: "_blank"
//   },
//   children: "Click me"
// }

let name = "Anurag"

const ReactElement = createElement(
  'a',
  {href: "https://google.com", target: "_blank"},
  'click me ',
  name
)

const MyApp = () => (
  <h1>heola</h1>
)

createRoot(document.getElementById('root')).render(
  
    <App />
  
)
