import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  declare state: State;
  declare props: Props;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-4">Error</h1>
          <p className="text-white/60 text-sm mb-8 text-center max-w-md">
            Something went wrong. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-swiss-red hover:text-white hover:border-transparent transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
