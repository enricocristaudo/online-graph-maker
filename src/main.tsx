import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GraphEditor from './components/GraphCreator'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GraphEditor />
  </StrictMode>,
)
