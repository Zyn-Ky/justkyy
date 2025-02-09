'use client' // Error boundaries must be Client Components

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html>
        <head>
            <style jsx global>{`
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f4f4f4;
                }

                .container {
                    text-align: center;
                    background-color: #fff;
                    padding: 50px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    font-size: 3em;
                    color: #333;
                    margin-bottom: 20px;
                }

                p {
                    font-size: 1.2em;
                    color: #666;
                    margin-bottom: 30px;
                }

                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    border-radius: 8px;
                    cursor: pointer;
                }`}</style>
            <title>Error</title>
        </head>
        <body>

        <div className="container">
            <h1>App Crashed!</h1>
            <p>Sorry, an error occurred</p>
            <p>(View console tab for more details)</p>
            <details>
                <summary>Logs</summary>
                {JSON.stringify(error, null, 2)}
            </details>
            <button onClick={() => reset()}>Try again</button>
        </div>

        </body>
        </html>
    )
}