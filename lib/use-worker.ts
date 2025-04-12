"use client"

import { useState, useEffect } from "react"

export function useWorker<T>(
  workerPath: string,
  action: string,
  data: any,
  dependencies: any[] = [],
): { result: T | null; isLoading: boolean; error: Error | null } {
  const [result, setResult] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let worker: Worker | null = null

    try {
      worker = new Worker(workerPath)

      worker.onmessage = (event) => {
        if (event.data.action === `${action}Result`) {
          setResult(event.data.data)
          setIsLoading(false)
        }
      }

      worker.onerror = (err) => {
        setError(new Error("Worker error: " + err.message))
        setIsLoading(false)
      }

      worker.postMessage({ action, data })
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      setIsLoading(false)
    }

    return () => {
      if (worker) {
        worker.terminate()
      }
    }
  }, dependencies)

  return { result, isLoading, error }
}
