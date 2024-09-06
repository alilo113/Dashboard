import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from "./dashboard/dashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App