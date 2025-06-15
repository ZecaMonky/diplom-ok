import { Rect } from 'react-konva'

const DancefloorInterface = ({sector}) => (
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
			<Grou y={30}>
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
						y={0}
						verticalAlign='middle'
						height={45}
					/>
					<Html>
						<div
							style={{
								position: 'absolute',
								left: '180px',
								top: '5px',
								display: 'flex',
								gap: '8px',
								alignItems: 'center',
								transform: 'none'
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
									padding: '8px 12px',
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
			</Grou>

			{/* Кнопка покупки */}
			<Group x={40} y={140}>
				<Rect
					width={320}
					height={50}
					fill={
						availableTickets > 0
							? ['#34d399', '#10b981']
							: ['#cbd5e1', '#94a3b8']
					}
					cornerRadius={12}
					shadowColor={availableTickets > 0 ? '#34d399' : '#cbd5e1'}
					shadowBlur={8}
					shadowOpacity={0.3}
					onClick={availableTickets > 0 ? handleBuy : null}
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
					text={`Сумма: ${selectedSector.price * ticketCount} ₽`}
					fontSize={22}
					fill='#313234'
					fontStyle='bold'
					width={320}
					align='center'
				/>
			</Group>
		</Group>
	)
	export default DancefloorInterface