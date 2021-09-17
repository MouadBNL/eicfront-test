import Container from 'components/ui/Container'
import Typography from 'components/ui/Typography'
import React from 'react'
import Nav from '../Nav'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="py-4 bg-dark-darker">
            <Container className="flex justify-between">
                <Link to="/">
                    <Typography className="text-white">EICoders</Typography>
                </Link>
                <Nav />
            </Container>
        </header>
    )
}

export default Header
