import React from 'react'

function uomHeader(pageName) {
    return (
        <div role="main">
            <header className="header">
                <h1 id='title'>{pageName}</h1>
            </header>
        </div>
    )
}

export default uomHeader;