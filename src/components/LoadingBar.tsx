import React from 'react';

export default function LoadingBar() {
    return (
        <div className="block mt-8">
            <progress className="progress is-large is-info" max="100"></progress>
        </div>
    );
}