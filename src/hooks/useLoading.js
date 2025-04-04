import { useState } from 'react'

export default function useLoading(defaultState = false) {
  const [loading, setLoading] = useState(defaultState)

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  return { loading, startLoading, stopLoading }
}