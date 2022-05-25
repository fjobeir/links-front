import './App.css';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Me from './components/me/Me';
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from './contexts/AppContext';

function App() {
	const appCtx = useContext(AppContext)
	return (
		<div>
			<Routes>
				<Route path='/signin' element={<Signin />} />
				<Route path='/signup' element={<Signup />} />
				{appCtx.loggedIn && <Route path='/me' element={<Me />} />}
			</Routes>
		</div>
	);
}

export default App;
