// src/pages/ErrorPage.tsx
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  const isDevelopment = import.meta.env.DEV;

  // Determine error type - simplified for static site
  const is404 =
    error &&
    typeof error === 'object' &&
    'status' in error &&
    error.status === 404;
  const isJSError = error instanceof Error;

  // Get error details
  const getErrorDetails = () => {
    if (is404) {
      return {
        code: '404',
        title: 'Page Not Found',
        message: "The page you're looking for doesn't exist.",
        action: 'Go Home',
      };
    }

    if (isJSError) {
      return {
        code: 'ERROR',
        title: 'Something Went Wrong',
        message: isDevelopment
          ? 'A JavaScript error occurred. Check the console for details.'
          : 'An unexpected error occurred. Please try reloading the page.',
        action: 'Reload Page',
      };
    }

    // Fallback for unknown error types
    return {
      code: 'ERROR',
      title: 'Unexpected Error',
      message: 'An unknown error occurred.',
      action: 'Go Home',
    };
  };

  const errorDetails = getErrorDetails();

  const handleReload = () => {
    window.location.reload();
  };

  const getActionButton = () => {
    if (errorDetails.action === 'Reload Page') {
      return (
        <div className="space-y-3">
          <button
            onClick={handleReload}
            className="inline-block px-6 py-3 bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors font-medium mr-4"
          >
            Reload Page
          </button>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>
      );
    }

    return (
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors font-medium"
      >
        {errorDetails.action}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-6xl font-bold mb-4 text-gray-100">
          {errorDetails.code}
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          {errorDetails.title}
        </h2>
        <p className="text-lg mb-8 text-gray-300">{errorDetails.message}</p>

        {/* Show technical details in development */}
        {isDevelopment && isJSError ? (
          <div className="mb-8 p-4 bg-gray-600 rounded-md text-left">
            <h3 className="text-sm font-semibold text-gray-200 mb-2">
              Development Details:
            </h3>
            <div className="text-xs text-gray-300 font-mono">
              <p className="mb-1">
                <strong>Message:</strong>{' '}
                {String((error as Error).message || 'No message available')}
              </p>
              {(error as Error).stack ? (
                <div>
                  <strong>Stack:</strong>
                  <pre className="mt-1 text-xs overflow-x-auto whitespace-pre-wrap">
                    {String((error as Error).stack)}
                  </pre>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Show attempted URL for 404s */}
        {is404 ? (
          <div className="mb-8 text-sm text-gray-400">
            <p>
              Attempted URL:{' '}
              <code className="bg-gray-600 px-2 py-1 rounded text-gray-200">
                {String(window.location.pathname)}
              </code>
            </p>
          </div>
        ) : null}

        {getActionButton()}

        {isJSError && !isDevelopment ? (
          <div className="mt-6 text-sm text-gray-400">
            <p>
              If this problem persists, try clearing your browser cache or
              contact support.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorPage;
