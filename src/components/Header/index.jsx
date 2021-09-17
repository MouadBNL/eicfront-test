import Container from 'components/ui/Container'
import Typography from 'components/ui/Typography'
import React from 'react'

function Header() {
    return (
        <header className="py-4 bg-dark-darker">
            <Container>
                <Typography className="text-white">EICoders</Typography>
            </Container>
        </header>
    )
}

export default Header
