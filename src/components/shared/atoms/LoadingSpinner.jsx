import React from 'react'

export const LoadingSpinner = () => {
    return (
        <div class="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}


