import './header.css'
import { useContext, useState } from 'react'
import AuthForm from './authForm'
import { observer } from 'mobx-react-lite'
import { Context } from '../app'
import { Link } from 'react-router-dom'


const Header = observer(({ navItems }) => {
	const {user} = useContext(Context)
	const [isAuthFormVisible, setIsAuthFormVisible] = useState(false)
	const [isRegister, setIsRegister] = useState(false)

	const handleOpenAuthForm = (register) => {
		setIsRegister(register)
		setIsAuthFormVisible(true)
	}

	const handleCloseAuthForm = () => {
		setIsAuthFormVisible(false)
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		user.setIsAuth(false)
	}

	return (
		<>
			{isAuthFormVisible && (
				<AuthForm isRegister={isRegister} onClose={handleCloseAuthForm} />
			)}
			<nav>
				{navItems.map(navItem => (
					<div key={navItem.navId}>
						<a href={navItem.navHref}>{navItem.navName}</a>
					</div>
				))}
				<div className='auth-buttons'>
					{user.isAuth ? (
						<>
							<span className='user-name'><Link to='/user'>{user.userName}</Link></span>
							<button type='button' onClick={handleLogout}>Выйти</button>
						</>
					) : (
						<>
							<button onClick={() => handleOpenAuthForm(false)}>Войти</button>
							<button onClick={() => handleOpenAuthForm(true)}>
								Регистрация
							</button>
						</>
					)}
				</div>
			</nav>

			<div
				className={`en_socseti_bottom`}
			>
				<a
					href='https://www.youtube.com/channel/UC4ink5TgHMuRmSvJ2N1LOaQ'
					target='_blank'
					title=''
				>
					<img src=' /img/youtube.svg' alt='' />
				</a>
				<a
					href='https://www.instagram.com/rap_anacondaz/'
					target='_blank'
					title=''
				>
					<img src=' /img/instagram.svg' alt='' />
				</a>
				<a href='https://vk.com/anacondaz' target='_blank' title=''>
					<img src=' /img/vk.svg' alt='' />
				</a>
				<a
					href='https://www.facebook.com/rapanacondaz'
					target='_blank'
					title=''
				>
					<img src=' /img/facebook.svg' alt='' />
				</a>
				<a href='https://twitter.com/rap_anacondaz' target='_blank' title=''>
					<img src=' /img/twitter.svg' alt='' />
				</a>
			</div>
		</>
	)
})

export default Header
