import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav className="text-white flex items-center">
            <ul className="flex gap-4">
                <Link to="/ide">
                    <li>IDE</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav
