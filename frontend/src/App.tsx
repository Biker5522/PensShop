import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sites/homePage';
import NavbarPenShop from './components/navbarPenShop';
import { Row, Col } from 'react-bootstrap';
function App() {
	return (
		<div className="App">
			<NavbarPenShop />
		</div>
	);
}

export default App;
