import { useState, Fragment, useEffect } from 'react'
import { Group, Rect, Text } from 'react-konva'
import SectorsAnimation from './Sectors'
import SectorsRotateAnimation from './SectorsRotate'
import SectorPrice from './sectorPrice'
import { Html } from 'react-konva-utils'
import './style.scss'
import {
	getBookedSeats,
	getSector,
	getSectors,
	updateSectorTickets,
} from '../../http/concertApi'
import { bookSeat } from '../../http/concertApi'

function Sectors({ concertInfo, onClose, sectorId }) {
	const [selectedSector, setSelectedSector] = useState(null)
	const [ticketCount, setTicketCount] = useState(0)
	const [availableTickets, setAvailableTickets] = useState(100)
	const [selectedSeats, setSelectedSeats] = useState([])
	const [generatedSeats, setGeneratedSeats] = useState([])
	const [sectors, setSectors] = useState([])

	useEffect(() => {
		const loadSectors = async () => {
			const data = await getSectors(sectorId)

			setSectors(data)
		}

		loadSectors()
	}, [sectorId])

	const generateSeats = (
		sectorId,
		{
			rows = 8,
			seatsPerRow = 8,
			minPrice,
			maxPrice,
			priceStep,
			direction,
			priceOrder,
		},
		bookedSeats = []
	) => {
		const seats = []
		const priceLevels = []

		// Генерация уровней цен
		for (let price = minPrice; price <= maxPrice; price += priceStep) {
			priceLevels.push(price)
		}

		if (direction === 'horizontal' && priceOrder === 'left-right') {
			priceLevels.reverse()
		}

		const rowOrder = Array.from({ length: rows }, (_, i) =>
			direction === 'vertical' && priceOrder === 'top-down' ? rows - 1 - i : i
		)
		const seatOrder = Array.from({ length: seatsPerRow }, (_, j) => {
			if (direction === 'horizontal') {
				if (priceOrder === 'right-left') {
					return seatsPerRow - 1 - j
				} else if (priceOrder === 'left-right') {
					return j
				}
			}
			return j
		})

		const seatsPerPrice = Math.ceil((rows * seatsPerRow) / priceLevels.length)
		let priceIndex = 0
		let countInCurrentPrice = 0

		for (const i of rowOrder) {
			for (const j of seatOrder) {
				let x, y
				if (direction === 'vertical') {
					x = 10 + j * 35
					y = 100 + i * 40
				} else {
					x = 10 + i * 35
					y = 100 + j * 40
				}

				if (
					countInCurrentPrice >= seatsPerPrice &&
					priceIndex < priceLevels.length - 1
				) {
					priceIndex++
					countInCurrentPrice = 0
				}
				const seatId = `${sectorId}-${i}-${j}`
				const isBooked = bookedSeats.includes(seatId)

				seats.push({
					id: `${sectorId}-${i}-${j}`,
					x,
					y,
					fill: '#44ef4a',
					price: priceLevels[priceIndex],
					isSelected: false,
					isBooked,
				})

				countInCurrentPrice++
			}
		}

		return seats
	}

	const COLORS = {
		text: '#2d3436',
		stroke: '#ffffff',
		shadow: 'rgba(0,0,0,0.3)',
		textBg: 'rgba(255,255,255,0.9)',
	}

	const handleSectorClick = async sector => {
		const response = await getBookedSeats(sector.id)
		const bookedSeatIds = response.map(seat => seat.seatId)

		if (sector.type === 'dancefloor') {
			const response = await getSector(sectorId, sector.id)
			const updateSector = response[0]

			setSelectedSector(updateSector)

			setAvailableTickets(updateSector.totalTickets)
		} else if (sector.seats !== null) {
			const seats = generateSeats(
				sector.id,
				{
					rows: sector.seats.rows,
					seatsPerRow: sector.seats.seatsPerRow,
					minPrice: sector.seats.minPrice,
					maxPrice: sector.seats.maxPrice,
					priceStep: sector.seats.priceStep,
					direction: sector.seats.direction,
					priceOrder: sector.seats.priceOrder,
				},
				bookedSeatIds
			)
			setGeneratedSeats(seats)
			setSelectedSector({ ...sector, seats })
		}
	}
	const handleSeatClick = seatId => {
		setGeneratedSeats(prevSeats => {
			const updatedSeats = prevSeats.map(seat => {
				if (seat.id === seatId && !seat.isBooked) {
					const isSelected = !seat.isSelected

					// Обновляем выбранные места
					setSelectedSeats(prevSelected => {
						if (isSelected) {
							return [...prevSelected, { ...seat, isSelected }]
						} else {
							return prevSelected.filter(s => s.id !== seat.id)
						}
					})

					return { ...seat, isSelected }
				}
				return seat
			})

			// Также обновляем seats в selectedSector
			setSelectedSector(prev => ({ ...prev, seats: updatedSeats }))

			return updatedSeats
		})
	}

	const handleBuy = () => {
		if (selectedSector.type === 'dancefloor') {
			handleDancefloorPurchase()
		} else {
			handleSeatedPurchase()
		}
	}

	const handleDancefloorPurchase = async () => {
		if (ticketCount > availableTickets) {
			alert('Недостаточно доступных билетов')
			return
		}

		if (ticketCount === 0) {
			alert('Выберите количество билетов!')
			return
		}

		
		for (let i = 0; i < ticketCount; i++) {
			const unikl = Date.now();
			await updateSectorTickets(selectedSector.id, 1, selectedSector.name + unikl);
	}

		const totalAmount = selectedSector.price * ticketCount
		alert(
			`Вы успешно забронировали ${ticketCount} билетов на сумму ${totalAmount} ₽`
		)

		// Обновляем доступное количество билетов
		setAvailableTickets(prev => prev - ticketCount)
		setTicketCount(0)
	}

	console.log(selectedSeats)

	const handleSeatedPurchase = async () => {
		if (selectedSeats.length === 0) {
			alert('Выберите хотя бы одно место')
			return
		}

		try {
			// Подготовка данных для бронирования
			const bookings = selectedSeats.map(seat => ({
				seatId: seat.id,
				sectorId: selectedSector.id,
				consertId: concertInfo.id,
				price: seat.price,
			}))

			// Отправка запросов на бронирование
			const bookingPromises = bookings.map(booking => bookSeat(booking))
			const results = await Promise.all(bookingPromises)

			// Обновление UI после успешного бронирования
			const updatedSeats = generatedSeats.map(seat => {
				if (selectedSeats.some(s => s.id === seat.id)) {
					return { ...seat, isBooked: true, isSelected: false }
				}
				return seat
			})

			setGeneratedSeats(updatedSeats)
			setSelectedSector(prev => ({
				...prev,
				seats: updatedSeats,
			}))
			setSelectedSeats([])

			alert(`Успешно забронировано ${selectedSeats.length} мест!`)
		} catch (error) {
			console.error('Ошибка бронирования:', error)
			alert('Не удалось завершить бронирование. Попробуйте снова.')
		}
	}

	const DancefloorInterface = ({ sector }) => {
		return (
			<Group x={500} y={150}>
				{/* Фоновая плашка */}
				<Rect
					width={400}
					height={260}
					fill='#ffffff'
					cornerRadius={20}
					shadowColor='rgba(0,0,0,0.15)'
					shadowBlur={15}
					shadowOffset={{ x: 0, y: 5 }}
				/>
				{/* Информация о билетах */}
				<Group y={30}>
					<Text
						text={`Доступно билетов: ${availableTickets}`}
						fontSize={20}
						fill='#2c2c2d'
						fontStyle='bold'
						width={400}
						height={20}
						align='center'
						verticalAlign='middle'
					/>

					{/* Поле ввода */}
					<Group x={40} y={40}>
						<Text
							text='Количество билетов:'
							fontSize={18}
							fill='#2d3436'
							y={10}
							verticalAlign='middle'
							height={45}
						/>
					</Group>
				</Group>

				{/* Кнопка покупки */}
				<Group x={40} y={140} onClick={handleBuy} onTap={handleBuy}>
					<Rect
						width={320}
						height={50}
						fill={availableTickets > 0 ? '#34d399' : '#cbd5e1'}
						cornerRadius={12}
						shadowColor={availableTickets > 0 ? '#34d399' : '#cbd5e1'}
						shadowBlur={8}
						shadowOpacity={0.3}
						onClick={handleBuy}
						onTap={handleBuy}
						zIndex={11}
					/>
					<Text
						text={availableTickets > 0 ? 'Купить билеты' : 'Билеты распроданы'}
						fontSize={20}
						fill='white'
						fontStyle='bold'
						width={320}
						height={50}
						align='center'
						verticalAlign='middle'
					/>
				</Group>

				{/* Сумма */}
				<Group x={40} y={210}>
					<Text
						text={`Сумма: ${sector.price * ticketCount} ₽`}
						fontSize={22}
						fill='#313234'
						fontStyle='bold'
						width={320}
						align='center'
					/>
				</Group>
				<Group>
					<Html>
						<div
							style={{
								display: 'flex',
								gap: '18px',
								alignItems: 'center',
								margin: '230px 10px 10px 490px',
							}}
						>
							<input
								type='number'
								min='1'
								max={availableTickets}
								value={ticketCount}
								onChange={e => {
									let value = Math.max(
										1,
										Math.min(availableTickets, Number(e.target.value))
									)
									setTicketCount(isNaN(value) ? 1 : value)
								}}
								style={{
									width: '80px',
									padding: '8px 15px ',
									border: '2px solid #e2e8f0',
									borderRadius: '8px',
									fontSize: '16px',
									textAlign: 'center',
									outline: 'none',
									transition: 'all 0.2s',
									boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
								}}
							/>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '4px',
								}}
							>
								<button
									onClick={() =>
										setTicketCount(Math.min(ticketCount + 1, availableTickets))
									}
									style={{
										width: '28px',
										height: '28px',
										border: 'none',
										background: '#34d399',
										color: 'white',
										borderRadius: '6px',
										cursor: 'pointer',
										fontSize: '16px',
										lineHeight: '0',
									}}
								>
									+
								</button>
								<button
									onClick={() => setTicketCount(Math.max(ticketCount - 1, 1))}
									style={{
										width: '28px',
										height: '28px',
										border: 'none',
										background: '#f87171',
										color: 'white',
										borderRadius: '6px',
										cursor: 'pointer',
										fontSize: '16px',
										lineHeight: '0',
									}}
								>
									-
								</button>
							</div>
						</div>
					</Html>
				</Group>
			</Group>
		)
	}

	const SectorSeats = ({ seats }) => {
		return seats.map(seat => (
			<Rect
				key={seat.id}
				x={seat.x}
				y={seat.y}
				width={25}
				height={25}
				fill={seat.isBooked ? '#64748b' : seat.fill}
				cornerRadius={4}
				stroke={seat.isSelected ? '#c5c522' : null}
				strokeWidth={2}
				shadowColor={COLORS.shadow}
				shadowBlur={3}
				shadowOpacity={0.2}
				onClick={() => !seat.isBooked && handleSeatClick(seat.id)}
			/>
		))
	}

	return (
		<>
			{!selectedSector ? (
				<Group>
					<Rect width={1400} height={600} fill='white' cornerRadius={30} />
					<Text
						text='×'
						x={1400 - 50}
						y={22}
						fontSize={28}
						fill='#6b7280'
						align='center'
						width={30}
						height={30}
						verticalAlign='middle'
						onClick={onClose}
					/>
					<Text
						text='Выберите сектор'
						fontSize={28}
						fontStyle='bold'
						align='center'
						width={1000}
						height={80}
						verticalAlign='middle'
						fill='black'
					/>
					<Text
						text={concertInfo.date.replace(/-/g, '.')}
						fontSize={28}
						fontStyle='bold'
						x={120}
						y={65}
						fill='black'
					/>
					<Text
						text={concertInfo.city}
						fontSize={28}
						fontStyle='bold'
						x={380}
						y={65}
						fill='black'
					/>
					<Text
						text={concertInfo.place}
						fontSize={28}
						fontStyle='bold'
						x={610}
						y={65}
						fill='black'
					/>
					{sectors.map((sector, idx) => (
						<Fragment key={sector.id}>
							<Group y={20}>
								{sector.rotation ? (
									<SectorsRotateAnimation
										sector={sector}
										COLORS={COLORS}
										onClick={() => handleSectorClick(sector)}
									/>
								) : (
									<SectorsAnimation
										sector={sector}
										COLORS={COLORS}
										onClick={() => handleSectorClick(sector)}
									/>
								)}
								{sector.sectorPrices && (
									<SectorPrice sector={sector} COLORS={COLORS} idx={idx} />
								)}
							</Group>
						</Fragment>
					))}
				</Group>
			) : (
				<Group>
					{selectedSector.type === 'dancefloor' ? (
						<>
							<Text
								text={selectedSector.name}
								fontSize={28}
								fontStyle='bold'
								fill={COLORS.text}
								align='center'
								verticalAlign='middle'
								width={1400}
								height={80}
								zIndex={10}
							/>
							<DancefloorInterface sector={selectedSector} />
						</>
					) : (
						<>
							<Rect
								width={300}
								height={420}
								x={550}
								y={10}
								fill='white'
								cornerRadius={30}
							/>
							<Text
								text={selectedSector.name}
								fontSize={28}
								fontStyle='bold'
								fill={COLORS.text}
								align='center'
								verticalAlign='middle'
								width={1400}
								height={80}
								zIndex={10}
							/>
							<Group x={555}>
								<SectorSeats seats={generatedSeats} />
							</Group>
						</>
					)}

					{/* Кнопка назад */}
					<Rect
						x={880}
						y={20}
						width={120}
						height={40}
						fill='#60a5fa'
						cornerRadius={8}
						onClick={() => {
							setSelectedSector(null), setSelectedSeats([]), setTicketCount(0)
						}}
					/>
					<Text
						text='Назад'
						fontSize={18}
						fill='white'
						x={880}
						y={30}
						width={120}
						align='center'
						verticalAlign='middle'
						onClick={() => {
							setSelectedSector(null), setSelectedSeats([]), setTicketCount(0)
						}}
					/>
					{selectedSeats.length > 0 && (
						<Group x={600} y={450}>
							{/* Белая карточка */}
							<Rect
								width={200}
								height={120}
								fill='white'
								cornerRadius={12}
								shadowBlur={10}
								shadowColor='rgba(0, 0, 0, 0.15)'
								shadowOffset={{ x: 0, y: 4 }}
							/>

							{/* Текст с количеством и суммой */}
							<Text
								text={`Выбрано мест: ${
									selectedSeats.length
								}\nСумма: ${selectedSeats.reduce(
									(sum, seat) => sum + seat.price,
									0
								)} ₽`}
								fontSize={18}
								fill='#111827'
								padding={10}
								width={200}
								align='center'
								verticalAlign='top'
							/>

							{/* Кнопка Купить */}
							<Rect
								x={20}
								y={70}
								width={160}
								height={40}
								fill='#34d399'
								cornerRadius={8}
								onClick={handleBuy}
							/>
							<Text
								text='Купить'
								fontSize={20}
								fontStyle='bold'
								fill='white'
								x={20}
								y={80}
								width={160}
								align='center'
								verticalAlign='middle'
								onClick={handleBuy}
							/>
						</Group>
					)}
				</Group>
			)}
		</>
	)
}

export default Sectors
