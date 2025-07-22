import React from 'react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

export const ErrorAlert = ({message}) => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>שגיאה</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}
