import React from 'react'
import Footer from './Footer'
import Header from './Header'

function Base({ children }) {
    return (
        <div className="bg-dark flex flex-col min-h-screen">
			<Header />

			<main className="text-white">
                {children}
            </main>

			<Footer />
		</div>
    )
}

export default Base
