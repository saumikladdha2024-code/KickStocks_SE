import { Component } from "react";

// Class component is required here — React error boundaries cannot be hooks (yet).
// Catches render-time crashes anywhere below it in the tree (e.g. a malformed
// API payload breaking a chart) so one broken widget never takes down the whole app.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Swap for real error reporting later (Sentry, etc.)
    console.error("KickStocks UI crashed:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="panel m-4 flex flex-col items-center gap-3 rounded-lg p-8 text-center">
            <p className="font-display text-lg text-ink-primary">
              Something broke on this screen
            </p>
            <p className="max-w-sm text-sm text-ink-secondary">
              The rest of KickStocks is still running. Try reloading this section.
            </p>
            <button
              onClick={this.handleReset}
              className="mt-2 rounded-sm border border-base-border bg-base-raised px-4 py-2 text-sm font-medium text-ink-primary transition-colors duration-250 hover:border-accent/40 hover:text-accent"
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
