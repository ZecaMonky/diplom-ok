import RotateElement from './rotateElement'

const Friends = () => {
	const allFriends = [
		{
			id: 1,
			urlFriend: 'https://invisiblemanagement.ru/',
			imgFriend: '  /img/invisiblemanagement.png',
		},
		{
			id: 2,
			urlFriend: 'https://bagandmusic.ru/',
			imgFriend: '  /img/bagandmusic (1).png',
		},
		{
			id: 3,
			urlFriend: 'https://www.sennheiser.com/',
			imgFriend: '  /img/sennheiser.png',
		},
		{
			id: 4,
			urlFriend: 'https://www.roland.com/global/',
			imgFriend: '  /img/roland.png',
		},
		{
			id: 5,
			urlFriend: 'https://www.kieselguitars.com/',
			imgFriend: '  /img/kieselguitars.png',
		},
		{
			id: 6,
			urlFriend: 'https://www.adidas.ru/',
			imgFriend: '  /img/adidas.png',
		},
	]
	return (
		<div className='wrapper'>
			<RotateElement name='Друзья' colorText='black' transform='330' />
			<div className='wrapperCards'>
				{allFriends.map(friend => (
					<div className='cardFriend' key={friend.id}>
						<a href={friend.urlFriend} target='_blank'>
							<img src={friend.imgFriend} />
						</a>
					</div>
				))}
			</div>
		</div>
	)
}

export default Friends
