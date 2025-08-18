/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { ErrorInfo, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class HydrationErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Hydration Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-yellow-50 text-yellow-800 text-center">
          <h2 className="text-lg font-bold mb-2">Display Error</h2>
          <p>There was an issue loading this content.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}