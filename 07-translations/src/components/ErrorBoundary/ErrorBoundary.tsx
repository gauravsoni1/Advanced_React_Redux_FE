import { Component, ErrorInfo, ReactNode } from "react";

class ErrorBoundary extends Component {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error);
        this.setState({ hasError: true });
    }

    render(): ReactNode {
        if (this.state?.hasError) {
            return <h1>Runtime error occured</h1>
        }
        return this.props?.children
    }
}
export default ErrorBoundary;