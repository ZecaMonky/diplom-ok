import { useEffect, useState } from 'react'
import { getConcerts } from '../http/concertApi'
import './conserts.css'
import RotateElement from './rotateElement'
import { Link } from 'react-router-dom'


// export  const concerts = await getConcerts()

// export const getConcertsAsync = async () => {const concerts = await getConcerts()}
const Conserts = () => {
	const [concerts, setConcerts] = useState([])
	useEffect(() => {
		const fetchConcerts = async () => {
				const data = await getConcerts()
				setConcerts(data)
		}
		fetchConcerts()
}, [])


	return (
		<div className='wrapper'>
			<RotateElement name='КОНЦЕРТЫ' colorText='black' transform='520' />
			<div className='poster'>
				<div>
					<h3>График концертов</h3>
				</div>
				<div>
					<ul className='concert-list'>
						{concerts.slice(0, 3).map(concert => (
							<li key={concert.id} className='flex concert-item'>
								<div className='concert-grid'>
									<p className='concert-date'>
										{concert.date.replace(/-/g, '.')}
									</p>
									<p className='concert-city'>{concert.city}</p>
									<p className='concert-place'>{concert.place}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div>
					<button className='concert-button'>
						<Link style={{ textDecoration: 'none' }} to='/concerts'>
							Подробнее
						</Link>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Conserts
