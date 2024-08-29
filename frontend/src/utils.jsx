const LoadingSpinner = () => (
    <div className="absolute flex items-center justify-center inset-0 bg-opacity-50">
        <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="text-center text-red-500 text-2xl">{message}</div>
);

const EmptyState = ({ message }) => (
    <div className="text-center text-gray-500 text-2xl">{message}</div>
);

export { LoadingSpinner, ErrorMessage, EmptyState }