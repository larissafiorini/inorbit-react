
export async function createGoalCompletion(goalId: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const completionsUrl = `${apiUrl}/completions`

  await fetch(completionsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        goalId,
    }),
  })

}