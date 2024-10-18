import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const summary = `${apiUrl}/summary`

  console.log(apiUrl)
  console.log(summary)
  
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
