const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div>
            <h1> {error?.message}</h1>
            <button onClick={resetErrorBoundary}>Reset Error boundary</button>
        </div>
    )
}

export default ErrorFallback;