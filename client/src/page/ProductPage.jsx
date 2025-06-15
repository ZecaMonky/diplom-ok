import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ProductPage = () => {
	const { id } = useParams()

	// Mock data - in a real app you would fetch this from an API
	const product = {
		id: 1,
		title: 'Свитер "Выходи за меня" 2.0',
		price: '10 900 ₽',
		images: [
			'/images/sweater-1.jpg',
			'/images/sweater-2.jpg',
			'/images/sweater-3.jpg',
		],
		description: 'Теплый вязаный свитер one-size. Ограниченный тираж.',
		details: 'Рост Евгении - 180 см, рост Славы - 175 см',
		characteristics: [
			'Свитер хачкаровой вазки, плотный и теплый, спущенный рукав, круглый ворот',
			'Ширина 68 см, длина спереди 71 см, длина сзади 76',
			'Состав: 50% хлопок, 50% акрил',
			'Размер оверсай 1.5VL',
		],
		care:
			'Рекомендации по уходу: перед стиркой выверните изделие наизнанку, выбирайте режим бережной машинной стирки при 30° без отбеливателей.',
	}

	const [mainImage, setMainImage] = React.useState(product.images[0])
	const [activeTab, setActiveTab] = React.useState('description')

	return (
		<div style={styles.container}>
			<div style={styles.breadcrumbs}>
				<Link style={{ color: '#333', textDecoration: 'none' }} to='/'>
					Главная
				</Link>{' '}
				&gt;{' '}
				<Link style={{ color: '#333', textDecoration: 'none' }} to='/catalog'>
					Каталог
				</Link>{' '}
				&gt; <span>{product.title}</span>
			</div>

			<div style={styles.productContainer}>
				<div style={styles.gallery}>
					<div style={styles.mainImageContainer}>
						<img src={mainImage} alt={product.title} style={styles.mainImage} />
					</div>
					<div style={styles.thumbnails}>
						{product.images.map((img, index) => (
							<img
								key={index}
								src={img}
								alt={`${product.title} ${index + 1}`}
								style={styles.thumbnail}
								onClick={() => setMainImage(img)}
							/>
						))}
					</div>
				</div>

				<div style={styles.productInfo}>
					<h1 style={styles.productTitle}>{product.title}</h1>
					<p style={styles.productPrice}>{product.price}</p>

					<div style={styles.sizeSelector}>
						<label style={styles.sizeLabel}>Размер</label>
						<select style={styles.sizeSelect}>
							<option>One Size</option>
							<option>S</option>
							<option>M</option>
							<option>L</option>
						</select>
					</div>

					<div style={styles.quantitySelector}>
						<button style={styles.quantityButton}>-</button>
						<span style={styles.quantityValue}>1</span>
						<button style={styles.quantityButton}>+</button>
					</div>

					<button style={styles.addToCart}>Добавить в корзину</button>

					<div style={styles.tabs}>
						<button
							style={{
								...styles.tabButton,
								...(activeTab === 'description' ? styles.activeTab : {}),
							}}
							onClick={() => setActiveTab('description')}
						>
							Описание
						</button>
						<button
							style={{
								...styles.tabButton,
								...(activeTab === 'characteristics' ? styles.activeTab : {}),
							}}
							onClick={() => setActiveTab('characteristics')}
						>
							Характеристики
						</button>
					</div>

					<div style={styles.tabContent}>
						{activeTab === 'description' && (
							<>
								<p>{product.description}</p>
								<p>{product.details}</p>
								<p>{product.care}</p>
							</>
						)}

						{activeTab === 'characteristics' && (
							<ul style={styles.characteristicsList}>
								{product.characteristics.map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

const styles = {
	container: {
		maxWidth: '1200px',
		margin: '0 auto',
		padding: '20px',
		fontFamily: '"Helvetica Neue", Arial, sans-serif',
	},
	breadcrumbs: {
		marginBottom: '20px',
		fontSize: '14px',
		color: '#666',
	},
	productContainer: {
		display: 'flex',
		gap: '40px',
		marginTop: '20px',
	},
	gallery: {
		flex: '1',
	},
	mainImageContainer: {
		marginBottom: '15px',
	},
	mainImage: {
		width: '100%',
		height: 'auto',
		maxHeight: '600px',
		objectFit: 'contain',
	},
	thumbnails: {
		display: 'flex',
		gap: '10px',
	},
	thumbnail: {
		width: '80px',
		height: '80px',
		objectFit: 'cover',
		cursor: 'pointer',
		border: '1px solid #ddd',
	},
	productInfo: {
		flex: '1',
		maxWidth: '500px',
	},
	productTitle: {
		fontSize: '24px',
		margin: '0 0 10px 0',
	},
	productPrice: {
		fontSize: '20px',
		fontWeight: 'bold',
		margin: '0 0 20px 0',
	},
	sizeSelector: {
		marginBottom: '20px',
	},
	sizeLabel: {
		display: 'block',
		marginBottom: '5px',
		fontSize: '14px',
	},
	sizeSelect: {
		width: '100%',
		padding: '8px',
		border: '1px solid #ddd',
		borderRadius: '4px',
	},
	quantitySelector: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		marginBottom: '20px',
	},
	quantityButton: {
		width: '30px',
		height: '30px',
		border: '1px solid #ddd',
		backgroundColor: 'transparent',
		cursor: 'pointer',
		fontSize: '16px',
	},
	quantityValue: {
		width: '40px',
		textAlign: 'center',
	},
	addToCart: {
		width: '100%',
		padding: '12px',
		backgroundColor: '#000',
		color: '#fff',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		fontSize: '16px',
		marginBottom: '30px',
	},
	tabs: {
		display: 'flex',
		borderBottom: '1px solid #ddd',
		marginBottom: '20px',
	},
	tabButton: {
		padding: '10px 20px',
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
		fontSize: '16px',
	},
	activeTab: {
		borderBottom: '2px solid #000',
		fontWeight: 'bold',
	},
	tabContent: {
		minHeight: '150px',
	},
	characteristicsList: {
		paddingLeft: '20px',
	},
}

export default ProductPage
