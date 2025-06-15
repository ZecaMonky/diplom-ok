import './App.css'
import Album from '../components/album'
import Anons from '../components/anons'
import Conserts from '../components/conserts'
import Footer from '../components/footer'
import Friends from '../components/friends'
import Header from '../components/header'
import Merch from '../components/merch'
import TeamList from '../components/teamList'
import { check } from '../http/userAPI'
import { Context } from '../app'
import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Spinner } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'

export const navItems = [
	{
		navId: 1,
		navName: 'ГЛАВНАЯ',
		navHref: '#',
	},
	{
		navId: 2,
		navName: 'КОМАНДА',
		navHref: '#team',
	},
	{
		navId: 3,
		navName: 'КОНЦЕРТЫ',
		navHref: '#concerts',
	},
	{
		navId: 4,
		navName: 'МЕРЧ',
		navHref: '#merch',
	},
	{
		navId: 6,
		navName: 'АЛЬБОМЫ',
		navHref: '#album',
	},
	{
		navId: 7,
		navName: 'ДРУЗЬЯ',
		navHref: '#friends',
	},
	{
		navId: 8,
		navName: 'КОНТАКТЫ',
		navHref: '#contacts',
	},
]

function HomePage() {

	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		check()
			.then(() => {
				const token = localStorage.getItem('token')
				const data = jwtDecode(token)
				
				if (!token) {
					user.setUser({})
					user.setIsAuth(false)
				} else {
					user.setUser(true)
					user.setIsAuth(true)
					user.setUserName(data.name)
				}
			})
			.finally(() => setLoading(false))
	}, [user])

	if (loading) {
		return <Spinner animation={'grow'} />
	}

	const teamMembers = [
		{
			id: 1,
			img: ' /img/team/Evgen.svg',
			name: 'Сергей Карамушкин',
			bandRole: 'Речитатив, чистый вокал',
		},
		{
			id: 2,
			img: ' /img/team/Zheny.svg',
			name: 'Евгений Стадниченко',
			bandRole: 'Барабанщик',
		},
		{
			id: 3,
			img: ' /img/team/Formanenko.svg',
			name: 'Евгений Форманенко',
			bandRole: 'Бас-гитара',
		},
		{
			id: 4,
			img: ' /img/team/Xorev.svg',
			name: 'Артём Хорев',
			bandRole: 'Речитатив',
		},
		{
			id: 5,
			img: ' /img/team/Ily.svg',
			name: 'Илья Погребняк',
			bandRole: 'Гитара,  бэк-вокал',
		},
	]

	return (
		<>
			<Header navItems={navItems} />
			<main>
				<div id='home' className='home'>
					<div className='homeIcon'>
						<img src='/img/iconHome.svg' alt='iconHome'></img>
					</div>
				</div>
				<div id='team'>
					<div>
						<h2>Команда</h2>
					</div>
					<div>
						<TeamList teamMembers={teamMembers} />
					</div>
				</div>
				<div id='concerts'>
					<Conserts />
				</div>
				<div id='merch'>
					<Merch />
				</div>
				<div id='video'></div>
				<div id='album'>
					<Album />
					<div className='fon'> </div>
				</div>
				<div id='anons'>
					<Anons />
				</div>
				<div id='friends'>
					<Friends />
				</div>
			</main>
			<footer id='contacts'>
				<Footer />
			</footer>
		</>
	)
}

export default observer(HomePage) 
