import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllCatalogItems } from '../http/catalogApp'

const CatalogPage = () => {
	const [allProducts, setAllProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const productsPerPage = 12

	// Фильтры
	const [priceRange, setPriceRange] = useState({ min: 150, max: 10000 })
	const [selectedSizes, setSelectedSizes] = useState([])
	const [selectedBrands, setSelectedBrands] = useState([])
	const [selectedCompositions, setSelectedCompositions] = useState([])
	const [sortOption, setSortOption] = useState('default')

	useEffect(() => {
		const loadProducts = async () => {
			try {
				// Проверяем, есть ли данные в localStorage
				const cachedProducts = localStorage.getItem('cachedProducts');
				
				if (cachedProducts) {
					const { data, timestamp } = JSON.parse(cachedProducts);
					const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
					
					// Проверяем, не устарели ли данные
					if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
						// Данные актуальны - используем их
						setAllProducts(data);
						setFilteredProducts(data);
						setLoading(false);
						return; // Выходим из функции, чтобы не делать лишний запрос
					}
				}
				
				// Если кэша нет или он устарел - загружаем новые данные
				const data = await fetchAllCatalogItems();
				setAllProducts(data);
				setFilteredProducts(data);
				
				// Сохраняем в кэш с текущей меткой времени
				const cacheData = {
					data,
					timestamp: Date.now()
				};
				localStorage.setItem('cachedProducts', JSON.stringify(cacheData));
				
			} catch (error) {
				console.error('Error loading products:', error);
			} finally {
				setLoading(false);
			}
		};
	
		loadProducts();
	}, []);

	// Применение фильтров и сортировки
	useEffect(() => {
		let result = [...allProducts]

		// Фильтрация по цене
		result = result.filter(product => {
			const price = parseFloat(product.price.replace(/[^0-9.]/g, ''))
			return price >= priceRange.min && price <= priceRange.max
		})

		// Фильтрация по размеру
		// if (selectedSizes.length > 0) {
		//   result = result.filter(product =>
		//     product.sizes && selectedSizes.some(size => product.sizes.includes(size))
		//   )
		// }

		// Фильтрация по бренду
		// if (selectedBrands.length > 0) {
		//   result = result.filter(product =>
		//     product.brand && selectedBrands.includes(product.brand)
		//   )
		// }

		// Фильтрация по составу
		// if (selectedCompositions.length > 0) {
		//   result = result.filter(product =>
		//     product.composition && selectedCompositions.some(comp => product.composition.includes(comp))
		//   )
		// }

		// Сортировка
		switch (sortOption) {
			case 'price-asc':
				result.sort(
					(a, b) =>
						parseFloat(a.price.replace(/[^0-9.]/g, '')) -
						parseFloat(b.price.replace(/[^0-9.]/g, ''))
				)
				break
			case 'price-desc':
				result.sort(
					(a, b) =>
						parseFloat(b.price.replace(/[^0-9.]/g, '')) -
						parseFloat(a.price.replace(/[^0-9.]/g, ''))
				)
				break
			case 'newest':
				result.sort((a, b) => new Date(b.date) - new Date(a.date))
				break
			case 'name':
				result.sort((a, b) => a.title.localeCompare(b.title))
				break
			default:
				// Без сортировки или сортировка по умолчанию
				break
		}

		setFilteredProducts(result)
		setCurrentPage(1) // Сброс на первую страницу при изменении фильтров
	}, [
		allProducts,
		priceRange,
		selectedSizes,
		selectedBrands,
		selectedCompositions,
		sortOption,
	])

	// Вычисляем товары для текущей страницы
	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	)

	// Изменение страницы
	const paginate = pageNumber => setCurrentPage(pageNumber)

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
			color: '#373737',
		},
		title: {
			fontSize: '28px',
			marginBottom: '30px',
			fontWeight: 'normal',
		},
		filterBar: {
			display: 'flex',
			justifyContent: 'space-between',
			marginBottom: '30px',
		},
		filter: {
			padding: '8px 12px',
			border: '1px solid #ddd',
			borderRadius: '4px',
			fontSize: '14px',
		},
		productsGrid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
			gap: '30px',
		},
		productCard: {
			// border: '1px solid #eee',
			padding: '15px',
			borderRadius: '4px',
      textAlign: "center",
		},
		productLink: {
			textDecoration: 'none',
			color: '#333',
		},
		productImage: {
			width: '100%',
			height: '200px',
			objectFit: 'fill',
			marginBottom: '15px',
		},
		productTitle: {
			fontSize: '16px',
			margin: '0 0 10px 0',
		},
		productPrice: {
			fontSize: '18px',
			fontWeight: 'bold',
			margin: '0 0 15px 0',
		},
		addToCart: {
			width: '100%',
			padding: '10px',
			backgroundColor: '#000',
			color: '#fff',
			border: 'none',
			borderRadius: '4px',
			cursor: 'pointer',
		},
		pagination: {
			display: 'flex',
			justifyContent: 'center',
			marginTop: '40px',
			gap: '5px',
		},
		pageButton: {
			padding: '8px 12px',
			border: '1px solid #ddd',
			backgroundColor: 'white',
			cursor: 'pointer',
			borderRadius: '4px',
			minWidth: '36px',
		},
		activePageButton: {
			backgroundColor: '#000',
			color: 'white',
			borderColor: '#000',
		},
		filtersContainer: {
			display: 'flex',
			gap: '20px',
			marginBottom: '30px',
		},
		filterSection: {
			border: '1px solid #eee',
			padding: '15px',
			borderRadius: '4px',
		},
		filterTitle: {
			fontWeight: 'bold',
			marginBottom: '10px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		filterOption: {
			display: 'block',
			margin: '5px 0',
			cursor: 'pointer',
		},
		priceInput: {
			width: '80px',
			padding: '5px',
			margin: '0 5px',
			border: '1px solid #ddd',
		},
		applyButton: {
			marginTop: '10px',
			padding: '8px 15px',
			backgroundColor: '#000',
			color: '#fff',
			border: 'none',
			borderRadius: '4px',
			cursor: 'pointer',
		},
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '10px',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#09f',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    text: {
      color: '#555',
      fontSize: '16px',
      fontWeight: '500',
    },
	}

	if (loading) {
		return (
      <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <div style={styles.text}>Загрузка...</div>
    </div>
		)
	}

	return (
		<div style={styles.container}>
			<div style={styles.breadcrumbs}>
				<Link style={{ color: '#333', textDecoration: 'none' }} to='/'>
					Главная
				</Link>
			</div>

			<h1 style={styles.title}>Каталог</h1>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<div style={styles.filtersContainer}>
					{/* Фильтр по цене */}
					<div style={styles.filterSection}>
						<div style={styles.filterTitle}>Цена</div>
						<div>
							от{' '}
							<input
								type='number'
								value={priceRange.min}
								onChange={e =>
									setPriceRange({ ...priceRange, min: Number(e.target.value) })
								}
								style={styles.priceInput}
							/>
							до{' '}
							<input
								type='number'
								value={priceRange.max}
								onChange={e =>
									setPriceRange({ ...priceRange, max: Number(e.target.value) })
								}
								style={styles.priceInput}
							/>
						</div>
					</div>
				</div>
				{/* Сортировка */}
				<div style={styles.filterBar}>
					<select
						style={styles.filter}
						value={sortOption}
						onChange={e => setSortOption(e.target.value)}
					>
						<option value='default'>Сортировка</option>
						<option value='price-asc'>По возрастанию цены</option>
						<option value='price-desc'>По убыванию цены</option>
						<option value='newest'>Сначала новые</option>
						<option value='name'>По названию</option>
					</select>
				</div>
			</div>

			<div style={styles.productsGrid}>
				{currentProducts.map(product => (
					<div key={product.id} style={styles.productCard}>
						<Link to={product.link} style={styles.productLink}>
							<img
								src={product.images.main}
								alt={product.title}
								style={styles.productImage}
								onError={e => {
									e.target.onerror = null
									e.target.src = '/images/placeholder.jpg'
								}}
							/>
							<h3 style={styles.productTitle}>{product.title}</h3>
							<p style={styles.productPrice}>{product.price}</p>
						</Link>
					</div>
				))}
			</div>

			{filteredProducts.length > productsPerPage && (
				<div style={styles.pagination}>
					<button
						style={styles.pageButton}
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
					>
						&lt;
					</button>

					{Array.from({
						length: Math.ceil(filteredProducts.length / productsPerPage),
					}).map((_, index) => (
						<button
							key={index}
							style={{
								...styles.pageButton,
								...(currentPage === index + 1 ? styles.activePageButton : {}),
							}}
							onClick={() => paginate(index + 1)}
						>
							{index + 1}
						</button>
					))}

					<button
						style={styles.pageButton}
						onClick={() => paginate(currentPage + 1)}
						disabled={
							currentPage ===
							Math.ceil(filteredProducts.length / productsPerPage)
						}
					>
						&gt;
					</button>
				</div>
			)}
		</div>
	)
}

export default CatalogPage
