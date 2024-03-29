import React from 'react';

export default function LoadingBar(): React.ReactElement {
    return (
        <div className="block mt-8">
            <progress className="progress is-large is-primary" max="100"></progress>
        </div>
    );
}
