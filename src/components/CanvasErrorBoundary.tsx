import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // Suppress rapier WASM cleanup errors — they're non-fatal
    if (
      error.message?.includes('recursive use of an object') ||
      error.message?.includes('unreachable') ||
      error.message?.includes('unsafe aliasing')
    ) {
      return
    }
    console.error('3D Scene error:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
