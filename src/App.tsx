import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
//import { useEffect } from 'react';
//import axios from 'axios';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const summary = `${apiUrl}/summary`

  console.log(apiUrl)
  
  fetch(summary).then((response) => {
    return response.json()
  }).then(data => {
    console.log(data)
  })

  return (
    <Dialog>
      <Summary/>
      <CreateGoal />
    </Dialog>

  )
}

export default App
