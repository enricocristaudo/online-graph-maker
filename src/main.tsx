import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GraphEditor from './components/GraphCreator'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GraphEditor />
    <Toaster />
  </StrictMode>,
)
