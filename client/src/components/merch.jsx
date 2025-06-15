import { Link } from 'react-router-dom'
import RotateElement from './rotateElement'

const Merch = () => {
	return (
		<div className='wrapper'>
			<RotateElement name='Мерч' colorText='white' transform='280' />
			<div className='merchInfo'>
				<h2>Офи­ци­аль­ный магазин</h2>
				<Link to='/catalog'>
					Прицениться
				</Link>
			</div>
		</div>
	)
}

export default Merch
