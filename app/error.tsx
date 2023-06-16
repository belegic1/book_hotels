"use client";
import Error from 'next/error';
import React, { useState, useEffect } from 'react';
import EmptyState from './api/components/EmptyState';

interface ErrorStateProps  {
  error: Error
}
const ErrorState: React.FC<ErrorStateProps> = ({error}) => {
  useEffect(() => {
    console.log(error)
  }, [error])
  return (
    <EmptyState
      title="Something went wrong"
      subtitle="We're having some trouble loading the page you requested. Please try again."
    />
  )
}

export default ErrorState