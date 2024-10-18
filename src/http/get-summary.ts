type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<string, {
    id: string
    title: string
    completedAt: string
  }[]>
}

export async function getSummary(): Promise<SummaryResponse> {

  const apiUrl = import.meta.env.VITE_API_URL;
  const summaryUrl = `${apiUrl}/summary`

  const response = await fetch(summaryUrl)
  const data = await response.json()
  console.log(data.summary)
  
  return data.summary
}