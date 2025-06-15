import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './page/homePage'
import AlbumBio from './page/albumBio'
import ConcertsPage from './page/concertsPage'
import { createContext } from 'react'
import UserStore from './store/userStore'
import UserProfil from './page/userProfil'
import CatalogPage from './page/CatalogPage'
import ProductPage from './page/ProductPage'

export const Context = createContext(null)

const App = () => {
	return (
		<Context.Provider value={{ user: new UserStore() }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/concerts' element={<ConcertsPage />} />
					<Route path='/album-bio' element={<AlbumBio />} />
					<Route path='/user' element={<UserProfil />} />
					<Route path='/catalog' element={<CatalogPage />} />
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</BrowserRouter>
		</Context.Provider>
	)
}

export default App
