"use client"

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

// LoadingSpinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)

// ErrorMessage component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-3 rounded-md" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
)

// SuccessMessage component
const SuccessMessage = ({ message }: { message: string }) => (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md" role="alert">
    <strong className="font-bold">Success: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
)

// FormFeedback component
export const FormFeedback = ({ status, errorMessage, successMessage }: {
  status: 'idle' | 'loading' | 'error' | 'success';
  errorMessage?: string;
  successMessage?: string;
}) => {
  switch (status) {
    case 'loading':
      return <LoadingSpinner />
    case 'error':
      return <ErrorMessage message={errorMessage || 'An error occurred'} />
    case 'success':
      return <SuccessMessage message={successMessage || 'Submission successful'} />
    default:
      return null
  }
}

// Example usage in a form component
export default function ExampleForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulating a successful submission
      setStatus('success')
      setSuccessMessage('Form submitted successfully!')
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to submit the form. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <div className="mt-4">
        <FormFeedback status={status} errorMessage={errorMessage} successMessage={successMessage} />
      </div>
    </div>
  )
}