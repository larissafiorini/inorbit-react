
type PendingGoalsResponse = {
    id: string
    title: string
    desiredWeeklyFrequency: number
    completionCount: number
  }[]
  
  export async function getPendingGoals(): Promise<PendingGoalsResponse> {
  
    const apiUrl = import.meta.env.VITE_API_URL;
    const pendingGoalsUrl = `${apiUrl}/pending-goals`
  
    const response = await fetch(pendingGoalsUrl)
    const data = await response.json()
    console.log(data.pendingGoals)
    
    return data.pendingGoals
  }