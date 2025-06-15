import { useEffect, useState } from 'react'
import { changePassword, check, updateUser } from '../http/userAPI'
import { cancelBooking, getUserBookings } from '../http/concertApi'

const UserProfil = () => {
	const [activeTab, setActiveTab] = useState('profile')
	const [loading, setLoading] = useState({
		user: true,
		bookings: false,
	})
	const [error, setError] = useState(null)

	const [userData, setUserData] = useState(null)
	const [editMode, setEditMode] = useState(false)
	const [bookings, setBookings] = useState([]) // Renamed from booking to bookings for clarity
	const [passwords, setPasswords] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})

	// Fetch user data
	useEffect(() => {
		const fetchUser = async () => {
			try {
				setLoading(prev => ({ ...prev, user: true }))
				const user = await check()
				setUserData({
					id: user.id,
					name: user.name,
					email: user.email,
				})
			} catch (err) {
				console.error('Failed to fetch user:', err)
				setError('Не удалось загрузить данные пользователя')
			} finally {
				setLoading(prev => ({ ...prev, user: false }))
			}
		}

		fetchUser()
	}, [])

	// Fetch bookings when user data is available
	useEffect(() => {
		if (userData?.id) {
			const fetchBookings = async () => {
				try {
					setLoading(prev => ({ ...prev, bookings: true }))
					const userBookings = await getUserBookings(userData.id)
					setBookings(userBookings)
				} catch (err) {
					console.error('Failed to fetch bookings:', err)
					setError('Не удалось загрузить билеты')
				} finally {
					setLoading(prev => ({ ...prev, bookings: false }))
				}
			}
			fetchBookings()
		}
	}, [userData?.id]) // Only re-run if userData.id changes

	const handleChange = e => {
		const { name, value } = e.target
		setPasswords(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async () => {
		if (passwords.newPassword !== passwords.confirmPassword) {
			alert('Пароли не совпадают')
			return
		}

		try {
			await changePassword(passwords.currentPassword, passwords.newPassword)
			alert('Пароль успешно изменен')
			setPasswords({
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			})
		} catch (error) {
			console.error('Ошибка при изменении пароля:', error)
			alert(error.response?.data?.message || 'Не удалось изменить пароль')
		}
	}

	const handleProfileChange = e => {
		const { name, value } = e.target
		setUserData(prev => ({ ...prev, [name]: value }))
	}

	const saveProfile = async () => {
		try {
			await updateUser(userData.name, userData.email)
			setEditMode(false)
			alert('Данные профиля сохранены!')
		} catch (error) {
			console.error('Ошибка при сохранении профиля:', error)
			alert('Не удалось сохранить изменения')
		}
	}

	const cancelTicket = async ticketId => {
		if (window.confirm('Вы уверены, что хотите отменить бронирование?')) {
			try {
				await cancelBooking(ticketId)
				setBookings(bookings.filter(booking => booking.seatId !== ticketId))
				alert('Бронирование отменено!')
			} catch (error) {
				console.error('Ошибка при отмене бронирования:', error)
				alert('Не удалось отменить бронирование')
			}
		}
	}

	const formatSeatId = seatId => {
		if (!seatId) return 'Место не указано'

		if (/^\d+-\d+-\d+$/.test(seatId)) {
			const [_, seat, row] = seatId.split('-')
			return `Ряд ${Number(row) + 1}, Место ${Number(seat) + 1}`
		}

		const formatted = seatId.replace(/\d+$/, '')
		return formatted || seatId
	}

	const styles = {
		app: {
			fontFamily: '"Helvetica Neue", Arial, sans-serif',
			maxWidth: '900px',
			margin: '0 auto',
			padding: '20px',
			backgroundColor: '#fff',
			minHeight: '100vh',
			color: '#000',
		},
		header: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '30px',
			borderBottom: '1px solid #000',
			paddingBottom: '10px',
		},
		homeButton: {
			backgroundColor: 'transparent',
			color: '#000',
			padding: '8px 12px',
			border: '1px solid #000',
			cursor: 'pointer',
			fontSize: '14px',
			textDecoration: 'none',
			display: 'inline-block',
		},
		tabs: {
			display: 'flex',
			borderBottom: '1px solid #000',
			marginBottom: '20px',
		},
		tab: {
			padding: '12px 24px',
			cursor: 'pointer',
			backgroundColor: '#fff',
			border: 'none',
			borderBottom: '2px solid transparent',
			outline: 'none',
			fontSize: '14px',
			marginRight: '1px',
			color: '#000',
		},
		activeTab: {
			borderBottom: '2px solid #000',
			fontWeight: 'bold',
		},
		content: {
			backgroundColor: '#fff',
			padding: '20px 0',
		},
		profileHeader: {
			display: 'flex',
			alignItems: 'center',
			marginBottom: '20px',
		},
		avatar: {
			width: '60px',
			height: '60px',
			backgroundColor: '#f0f0f0',
			color: '#000',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: '18px',
			marginRight: '20px',
			border: '1px solid #000',
		},
		inputGroup: {
			marginBottom: '20px',
			maxWidth: '400px',
		},
		label: {
			display: 'block',
			marginBottom: '5px',
			fontSize: '14px',
			fontWeight: '500',
		},
		input: {
			width: '100%',
			padding: '8px',
			border: '1px solid #000',
			fontSize: '14px',
			backgroundColor: '#fff',
			color: '#000',
		},
		button: {
			backgroundColor: '#fff',
			color: '#000',
			padding: '8px 16px',
			border: '1px solid #000',
			cursor: 'pointer',
			fontSize: '14px',
			marginRight: '10px',
			marginTop: '10px',
		},
		ticket: {
			border: '1px solid #000',
			padding: '15px',
			marginBottom: '15px',
			display: 'flex',
			justifyContent: 'space-between',
		},
		ticketInfo: {
			flex: '1',
		},
		ticketActions: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-end',
		},
		qrCode: {
			width: '80px',
			height: '80px',
			margin: '10px 0',
			border: '1px solid #000',
		},
		cancelButton: {
			backgroundColor: '#fff',
			color: '#000',
			padding: '6px 12px',
			border: '1px solid #000',
			cursor: 'pointer',
			fontSize: '12px',
		},
		eventTitle: {
			margin: '0 0 10px 0',
			fontSize: '16px',
		},
		ticketDetail: {
			margin: '5px 0',
			fontSize: '14px',
		},
	}

	const renderTabContent = () => {
		if (loading.user) {
			return <p>Загрузка данных пользователя...</p>
		}

		if (!userData) {
			return <p>{error || 'Пользователь не найден'}</p>
		}

		switch (activeTab) {
			case 'profile':
				return (
					<div style={styles.content}>
						<div style={styles.profileHeader}>
							<div style={styles.avatar}>
								{userData.name
									.split(' ')
									.map(n => n[0])
									.join('')}
							</div>
							<h2 style={{ margin: 0 }}>{userData.name}</h2>
						</div>

						<div style={styles.inputGroup}>
							<label style={styles.label}>Имя</label>
							<input
								type='text'
								name='name'
								value={userData.name}
								onChange={handleProfileChange}
								style={styles.input}
								disabled={!editMode}
							/>
						</div>

						<div style={styles.inputGroup}>
							<label style={styles.label}>Email</label>
							<input
								type='email'
								name='email'
								value={userData.email}
								onChange={handleProfileChange}
								style={styles.input}
								disabled={!editMode}
							/>
						</div>

						{editMode ? (
							<>
								<button style={styles.button} onClick={saveProfile}>
									Сохранить
								</button>
								<button
									style={styles.button}
									onClick={() => setEditMode(false)}
								>
									Отменить
								</button>
							</>
						) : (
							<button style={styles.button} onClick={() => setEditMode(true)}>
								Редактировать профиль
							</button>
						)}
					</div>
				)

			case 'tickets':
				if (loading.bookings) {
					return <p>Загрузка билетов...</p>
				}

				return (
					<div style={styles.content}>
						<h2 style={{ marginBottom: '20px' }}>Мои билеты</h2>

						{bookings.length === 0 ? (
							<p>У вас нет активных билетов</p>
						) : (
							bookings.map(ticket => (
								<div key={ticket.seatId} style={styles.ticket}>
									<div style={styles.ticketInfo}>
										<h3 style={styles.eventTitle}>
											Концерт: {ticket.consert.city}
										</h3>
										<p style={styles.ticketDetail}>
											<strong>Дата:</strong>{' '}
											{new Date(ticket.consert.date).toLocaleDateString(
												'ru-RU'
											)}
										</p>
										<p style={styles.ticketDetail}>
											<strong>Место:</strong> {ticket.consert.place},{' '}
											{ticket.sector?.name || 'Не указано'} (
											{formatSeatId(ticket.seatId)})
										</p>
										<p style={styles.ticketDetail}>
											<strong>Цена:</strong> {ticket.price} руб.
										</p>
									</div>
									<div style={styles.ticketActions}>
										<img
											src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.userId}-${ticket.consertId}-${ticket.seatId}`}
											alt='QR-код билета'
											style={styles.qrCode}
										/>
										<button
											style={styles.cancelButton}
											onClick={() => cancelTicket(ticket.seatId)}
										>
											Отменить бронь
										</button>
									</div>
								</div>
							))
						)}
					</div>
				)

			case 'security':
				return (
					<div style={styles.content}>
						<h2 style={{ marginBottom: '20px' }}>Безопасность</h2>
						<div style={styles.inputGroup}>
							<label style={styles.label}>Текущий пароль</label>
							<input
								type='password'
								style={styles.input}
								name='currentPassword'
								value={passwords.currentPassword}
								onChange={handleChange}
							/>
						</div>
						<div style={styles.inputGroup}>
							<label style={styles.label}>Новый пароль</label>
							<input
								type='password'
								style={styles.input}
								name='newPassword'
								value={passwords.newPassword}
								onChange={handleChange}
							/>
						</div>
						<div style={styles.inputGroup}>
							<label style={styles.label}>Подтвердите новый пароль</label>
							<input
								type='password'
								style={styles.input}
								name='confirmPassword'
								value={passwords.confirmPassword}
								onChange={handleChange}
							/>
						</div>
						<button style={styles.button} onClick={handleSubmit}>
							Изменить пароль
						</button>
					</div>
				)

			default:
				return null
		}
	}

	return (
		<div style={styles.app}>
			<header style={styles.header}>
				<h1 style={{ margin: 0, fontSize: '24px' }}>Личный кабинет</h1>
				<a href='/' style={styles.homeButton}>
					На главную
				</a>
			</header>

			<div style={styles.tabs}>
				<button
					style={{
						...styles.tab,
						...(activeTab === 'profile' ? styles.activeTab : {}),
					}}
					onClick={() => setActiveTab('profile')}
				>
					Профиль
				</button>
				<button
					style={{
						...styles.tab,
						...(activeTab === 'tickets' ? styles.activeTab : {}),
					}}
					onClick={() => setActiveTab('tickets')}
				>
					Мои билеты
				</button>
				<button
					style={{
						...styles.tab,
						...(activeTab === 'security' ? styles.activeTab : {}),
					}}
					onClick={() => setActiveTab('security')}
				>
					Безопасность
				</button>
			</div>

			{error && <p style={{ color: 'red' }}>{error}</p>}
			{renderTabContent()}
		</div>
	)
}

export default UserProfil
