// import { concerts } from '../components/conserts'
import { Link } from 'react-router-dom'
import TicketWidget from '../components/buyTicket'
import { useEffect, useState } from 'react'
import AuthForm from '../components/authForm'
import { getConcerts } from '../http/concertApi'

const ConcertsPage = () => {
	const [showTicketWidget, setShowTicketWidget] = useState(false)
	const [selectedConcert, setSelectedConcert] = useState(null)
	const [isAuthFormVisible, setIsAuthFormVisible] = useState(false)
	const [sectorId, setSectorId] = useState(null)
	const [isRegister, setIsRegister] = useState(false)
  const [concerts, setConcerts] = useState([])

    useEffect(() => {
        const fetchConcerts = async () => {
            const data = await getConcerts()
            setConcerts(data)
        }
        fetchConcerts()
    }, [])
	const handleTicketButtonClick = concert => {
		const token = localStorage.getItem('token')

		if (!token) {
      setSelectedConcert(concert)
      setIsRegister(false)
      setIsAuthFormVisible(true)
    } else {
			setSelectedConcert(concert)
    setShowTicketWidget(true)
		}
		

  }	 
	return (
		<>
			{isAuthFormVisible && (
				<AuthForm
					isRegister={isRegister}
					onClose={() => {setIsAuthFormVisible(false)
						setSelectedConcert(null)
					}}
					switchForm={() => setIsRegister(!isRegister)}
				/>
			)}
			<div className='concertTitle'>
				<h1>График концертов</h1>
				<div>
					<button className='concert-button'>
						<Link style={{ textDecoration: 'none' }} to='/'>
							Главная
						</Link>
					</button>
				</div>
			</div>
			<div className='allConcerts'>
				<ul className='concert-list'>
					{concerts.map(concert => (
						<li key={concert.id} className='flex concert-item'>
							<div className='concert-grid'>
								<p className='concert-date'>
									{concert.date.replace(/-/g, '.')}
								</p>
								<p className='concert-city'>{concert.city}</p>
								<p className='concert-place'>{concert.place}</p>

								<button
									className='concert-button'
									onClick={() => {handleTicketButtonClick(concert), setSectorId(concert.id)}}
								>
									Купить билет
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
			{showTicketWidget && (
				<TicketWidget
					concert={selectedConcert}
					onClose={() => {
						setShowTicketWidget(false)
						setSelectedConcert(null)
					}}
					sectorId={sectorId}

				/>
			)}
		</>
	)
}

export default ConcertsPage
