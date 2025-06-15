import RotateElement from './rotateElement'
import { Link } from 'react-router-dom'

const Album = () => {
	return (
		<div className='wrapper'>
			<RotateElement name='Альбомы' colorText='white' transform='490' />
			<div className='albumCard'>
				<div className='albumText'>
					<h3>
						Альбом «Перезвони <br /> мне +7 (999) 577-12-02» <br />
						(DELUXE, 2022)
					</h3>
					<p>
						12 февраля 2021 Anacondaz выпустили первый за три года
						полноформатный альбом под названием «Перезвони мне +7 (999)
						577-12-02». Он стал вторым по продолжительности релизом в
						дискографии команды — треклист вмещает целых 16 песен, без
						каких-либо коротких музыкальных интро и аутро. Но Anacondaz решили,
						что они «не договорили» и 5 августа 2022 вышел DELUXE альбома
						«Перезвони мне +7 (999) 577-12-02».
						<i>
							<br />
							<br />
							«Три бонус-композиции на расширенной версии «Перезвони мне +7
							(999) 577-12-02» — это песни, которые мы не успели пульнуть на
							альбом год назад, а сейчас они созрели и оформились в достойное
							продолжение оригинальной пластинки.
							<br />
							<br />
							Песни из спокойной, безмятежной жизни — как привет из прошлого,
							надежда на будущее и аперитивчик к грядущим релизам Anacondaz,
							которые уже совсем не за горами.»
						</i>
					</p>
					<div className='btnWrapper'>
						<button className='albumBtn'>
							<Link style={{ textDecoration: 'none' }} to='/album-bio'>
								Подробнее
							</Link>
						</button>
					</div>
				</div>
				<div className='alubomImg'>
					<img src='/img/albom_perezvoni-mne_deluxe.jpg' />
					<a href='https://band.link/callmeback' target='_blank'>
						<img src='/img/iconLink.svg' />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Album
