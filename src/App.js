import BaseLayout from 'Layouts/BaseLayout'
import About from 'pages/About';
import Home from 'pages/Home';
import Ide from 'pages/Ide';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {

	return (
		<Router>
			<BaseLayout>
				<Switch>
					<Route path="/" exact component={Home}/>
					<Route path="/about" component={About}/>
					<Route path="/ide" component={Ide}/>
				</Switch>
			</BaseLayout>
		</Router>

	);
}

export default App;
