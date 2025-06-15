const Anons = () => {
	const allAlbums = [
		{
			imgSrc: '  /img/albom_dracondaz.jpg',
			nameAlbum: 'Альбом Dracondaz «Песни Фрайвура»',
			aLink: 'https://band.link/dracondaz',
		},
		{
			imgSrc: '  /img/albom_perezvoni-mne_deluxe.jpg',
			nameAlbum: 'Альбом «Перезвони мне +7 (999) 577-12-02»',
			aLink: 'https://orcd.co/perezvonimne',
		},
		{
			imgSrc: '  /img/albom_moi-deti-ne-budut-skuchat.jpg',
			nameAlbum: 'ЕР «Мои дети не будут скучать»',
			aLink: 'https://orcd.co/anacondaz',
		},
		{
			imgSrc: '  /img/albom_ya-tebya-nikogda.jpg',
			nameAlbum: 'Альбом «Я тебя никогда»',
			aLink: 'https://orcd.co/yatebyanikogda',
		},
		{
			imgSrc: '  /img/albom_vyhodi-za-menya.jpg',
			nameAlbum: 'Альбом «Выходи за меня»',
			aLink: 'https://orcd.co/vyhodizamenya',
		},
		{
			imgSrc: '  /img/albom_bayki-insaydera.jpg',
			nameAlbum: 'Альбом «Байки инсайдера»',
			aLink: 'https://orcd.co/bajkiinsajdera',
		},
		{
			imgSrc: '  /img/albom_bez-paniki.jpg',
			nameAlbum: 'Альбом «Без паники»',
			aLink: 'https://band.link/bezpaniki',
		},
		{
			imgSrc: '  /img/albom_deti-i-raduga.jpg',
			nameAlbum: 'Альбом «Дети и радуга»',
			aLink: 'https://orcd.co/detiiraduga',
		},
		{
			imgSrc: '  /img/albom_evolyuciya.jpg',
			nameAlbum: 'ЕР «Эволюция»',
			aLink: 'https://orcd.co/evolyuciya',
		},
		{
			imgSrc: '  /img/albom_smachnye-nishtyaki.jpg',
			nameAlbum: 'Альбом «Смачные ништяки»',
			aLink: 'https://orcd.co/smachnyenishtyaki',
		},
	]
	return (
		<div className='anonsWrapper'>
			<div className='anonsWrapper'>
				{allAlbums.map((album, index) => (
					<div className='anonsCards' key={index}>
						<img src={album.imgSrc} alt={album.nameAlbum} />
						<p>{album.nameAlbum}</p>
						<a href={album.aLink} target='_blank' rel='noopener noreferrer'>
							<img src='  /img/iconLink.svg' alt='Ссылка' />
						</a>
					</div>
				))}
			</div>
		</div>
	)
}

export default Anons
