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
    
        const data = [
					{
						"id": "367284872",
						"title": "Книга \"Энтони: Дорога к дракону\"",
						"price": "3 500 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/kniga-entoni-doroga-k-drakonu",
						"images": {
							"main": "https://static.insales-cdn.com/r/_Gi2hJbZWOE/rs:fit:500:0:1/q:100/plain/images/products/1/6648/688732664/Dracondaz_4__2_.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/k6BTcmxdR6w/rs:fit:500:0:1/q:100/plain/images/products/1/6735/688732751/Dracondaz_2__2_.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "619507384",
							"productId": "367284872"
						}
					},
					{
						"id": "411585546",
						"title": "Свитер \"Выходи за меня\" 2.0",
						"price": "10 900 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/sviter-vyhodi-za-menya",
						"images": {
							"main": "https://static.insales-cdn.com/r/GJYo52dAkgg/rs:fit:500:0:1/q:100/plain/images/products/1/813/939287341/%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3_%D0%B1%D0%B5%D0%B7_%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_15416_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_3.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/Fvw3wWK-hQI/rs:fit:500:0:1/q:100/plain/images/products/1/752/939287280/42.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "684436033",
							"productId": "411585546"
						}
					},
					{
						"id": "454098715",
						"title": "Худи \"СМНЛ\" violet one size",
						"price": "7 000 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/hudi-smnl-violet-one-size",
						"images": {
							"main": "https://static.insales-cdn.com/r/INzIMnkCJro/rs:fit:500:0:1/q:100/plain/images/products/1/8015/920706895/%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3_%D0%B1%D0%B5%D0%B7_%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_08184.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/H13JAtuSJ7Q/rs:fit:500:0:1/q:100/plain/images/products/1/922/920707994/%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3_%D0%B1%D0%B5%D0%B7_%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_08186.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "753007126",
							"productId": "454098715"
						}
					},
					{
						"id": "460742022",
						"title": "Термос \"Anacondaz\"",
						"price": "3 500 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/termos-anacondaz",
						"images": {
							"main": "https://static.insales-cdn.com/r/mN8r5_3LID4/rs:fit:500:0:1/q:100/plain/images/products/1/2397/924723549/%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3_%D0%B1%D0%B5%D0%B7_%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_08167.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/g45Mb4zNoAU/rs:fit:500:0:1/q:100/plain/images/products/1/2398/924723550/%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3_%D0%B1%D0%B5%D0%B7_%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_08166.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "765677553",
							"productId": "460742022"
						}
					},
					{
						"id": "441954351",
						"title": "Кроп-топ \"Девочка-деньги\"",
						"price": "2 250 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/krop-top-devochka-dengi",
						"images": {
							"main": "https://static.insales-cdn.com/r/Yoc_v4quvjs/rs:fit:500:0:1/q:100/plain/images/products/1/305/873177393/536-%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B8-2-raw-url-for-retouch-cfa84815-5023-4fe8-8352-8c338f6c29a9.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/BkanScBviow/rs:fit:500:0:1/q:100/plain/images/products/1/306/873177394/536-%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B8-5-raw-url-for-retouch-52887153-236f-4bda-b9d1-2bd14306e05c.jpg@jpg"
						},
						"stickers": [
							"-10%",
							"Предзаказ"
						],
						"metadata": {
							"variantId": "733779705",
							"productId": "441954351"
						}
					},
					{
						"id": "441946111",
						"title": "Футболка \"Eurotour 2024\"",
						"price": "2 880 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/futbolka-eurotour-2024",
						"images": {
							"main": "https://static.insales-cdn.com/r/17zf2f4QJs4/rs:fit:500:0:1/q:100/plain/images/products/1/119/873169015/536-%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B8-16-raw-url-for-retouch-31b0d774-0956-4771-9126-41c647b567b4.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/DWXzP8O3-Rw/rs:fit:500:0:1/q:100/plain/images/products/1/120/873169016/536-%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B8-21-raw-url-for-retouch-8eb0975a-a03e-4dbc-b140-b629eb40d4f7.jpg@jpg"
						},
						"stickers": [
							"-10%",
							"Предзаказ"
						],
						"metadata": {
							"variantId": "733770281",
							"productId": "441946111"
						}
					},
					{
						"id": "337211074",
						"title": "Винил \"Мои дети не будут скучать\"",
						"price": "6 990 ₽",
						"available": "Нет в наличии",
						"link": "https://invmerch.ru/product/vinil-moi-deti-ne-budut-skuchat-2",
						"images": {
							"main": "https://static.insales-cdn.com/r/C27svO8M7go/rs:fit:500:0:1/q:100/plain/images/products/1/1409/620217729/5_1_2502d0f1-43cc-47a9-90ed-f366f17832d3.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "574254474",
							"productId": "337211074"
						}
					},
					{
						"id": "337211222",
						"title": "Винил \"Я тебя никогда\"",
						"price": "7 880 ₽",
						"available": "Нет в наличии",
						"link": "https://invmerch.ru/product/vinil-ya-tebya-nikogda-2",
						"images": {
							"main": "https://static.insales-cdn.com/r/NCZX9ox_P8s/rs:fit:500:0:1/q:100/plain/images/products/1/1845/620218165/4_1.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "574254968",
							"productId": "337211222"
						}
					},
					{
						"id": "481757459",
						"title": "Винил \"Выходи за меня\"",
						"price": "7 530 ₽",
						"available": "Нет в наличии",
						"link": "https://invmerch.ru/product/vinil-vyhodi-za-menya-2",
						"images": {
							"main": "https://static.insales-cdn.com/r/epcUzaVqzZE/rs:fit:500:0:1/q:100/plain/images/products/1/6849/979352257/2025-02-26_18.47.41.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": null,
							"productId": "481757459"
						}
					},
					{
						"id": "292701402",
						"title": "Бейсболка \"Anacondaz black\"",
						"price": "2 900 ₽",
						"available": "Нет в наличии",
						"link": "https://invmerch.ru/product/beysbolka-anacondaz-black",
						"images": {
							"main": "https://static.insales-cdn.com/r/pwSwCMf-TsE/rs:fit:500:0:1/q:100/plain/images/products/1/328/884695368/547_%D0%BA%D0%B5%D0%BF%D0%BA%D0%B0_1_raw_url_for_retouch_61d459be_6743_47c3_baeb_c74c99e1735e.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/YsMNlYlnzmE/rs:fit:500:0:1/q:100/plain/images/products/1/1814/884672278/547-%D0%BA%D0%B5%D0%BF%D0%BA%D0%B0-4-raw-url-for-retouch-fea520ec-9d19-4440-b3c3-1f6bfe4990ed.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": null,
							"productId": "292701402"
						}
					},
					{
						"id": "421429312",
						"title": "Футболка \"XV\"",
						"price": "1 980 ₽",
						"available": "Нет в наличии",
						"link": "https://invmerch.ru/product/futbolka-xv",
						"images": {
							"main": "https://static.insales-cdn.com/r/1d-5GKer7LI/rs:fit:500:0:1/q:100/plain/images/products/1/7835/818683547/photo_5465140310301592872_y.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/wys6hE59qR4/rs:fit:500:0:1/q:100/plain/images/products/1/1386/822429034/IMG_9317.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": null,
							"productId": "421429312"
						}
					},
					{
						"id": "421453167",
						"title": "Уютный пак",
						"price": "7 200 ₽",
						"available": "Нет в наличии",
						"link": "https://invmerch.ru/product/pak",
						"images": {
							"main": "https://static.insales-cdn.com/r/vy-waPu8S-Q/rs:fit:500:0:1/q:100/plain/images/products/1/1052/816940060/%D0%BF%D0%BB%D0%B5%D0%B4_%D0%B8_%D1%81%D0%B2%D0%B5%D1%87%D0%B08.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/r31nx1iJuRE/rs:fit:500:0:1/q:100/plain/images/products/1/1324/816940332/350-%D0%BF%D0%BB%D0%B5%D0%B4-9-raw-url-for-retouch-121704a7-12ac-455b-983f-f63b8b8c2908.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": null,
							"productId": "421453167"
						}
					},
					{
						"id": "413136202",
						"title": "Худи \"Anacondaz\"",
						"price": "7 200 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/hudi-anacondaz-2",
						"images": {
							"main": "https://static.insales-cdn.com/r/w3LdjZl9-L4/rs:fit:500:0:1/q:100/plain/images/products/1/5254/794891398/367_%D1%85%D1%83%D0%B4%D0%B8_8_raw_url_for_retouch_b5eb7237_f6a7_4d05_b9ea_2cd5c4d04eff.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/DPsZWOEU1g8/rs:fit:500:0:1/q:100/plain/images/products/1/5793/927495841/25.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "686842141",
							"productId": "413136202"
						}
					},
					{
						"id": "413371189",
						"title": "Худи \"Выходи за меня\" 2.0",
						"price": "7 200 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/hudi-vyhodi-za-menya-20",
						"images": {
							"main": "https://static.insales-cdn.com/r/lSJ6pBQCfi0/rs:fit:500:0:1/q:100/plain/images/products/1/4361/824029449/426-%D1%85%D1%83%D0%B4%D0%B82-2-raw-url-for-retouch-1cda5dfd-147f-4b63-b739-c06a7b0743d6.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/GijuOGLweQA/rs:fit:500:0:1/q:100/plain/images/products/1/4360/824029448/426_%D1%85%D1%83%D0%B4%D0%B82_9_raw_url_for_retouch_f8d18945_bd88_4390_8a4e_900305abba7d1.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "687221180",
							"productId": "413371189"
						}
					},
					{
						"id": "395059700",
						"title": "Футболка \"Грёбаное зло\" peach",
						"price": "2 780 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/futbolka-gryobanoe-zlo-peach",
						"images": {
							"main": "https://static.insales-cdn.com/r/gnFEcEV_Ac8/rs:fit:500:0:1/q:100/plain/images/products/1/3576/748088824/250_%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B07_2_raw_url_for_retouch_cee7bf35_fe99_404b_8587_8cdce4246be6__1_.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/JUJwMd-0M7Q/rs:fit:500:0:1/q:100/plain/images/products/1/4815/927494863/16.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "657795082",
							"productId": "395059700"
						}
					},
					{
						"id": "395061088",
						"title": "Футболка \"Грёбаное зло\" mint",
						"price": "2 780 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/futbolka-gryobanoe-zlo-mint",
						"images": {
							"main": "https://static.insales-cdn.com/r/3Mhhah6GwoU/rs:fit:500:0:1/q:100/plain/images/products/1/1753/747988697/250-%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B06-6-raw-url-for-retouch-f72c57a9-759b-4742-a380-8f196f51865f.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/kTD-ltGkMXI/rs:fit:500:0:1/q:100/plain/images/products/1/3989/927494037/15.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "657796529",
							"productId": "395061088"
						}
					},
					{
						"id": "412259774",
						"title": "Плед \"Anacondaz\"",
						"price": "6 000 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/pled-anacondaz",
						"images": {
							"main": "https://static.insales-cdn.com/r/DVTyRIy6G6k/rs:fit:500:0:1/q:100/plain/images/products/1/6873/793320153/350-%D0%BF%D0%BB%D0%B5%D0%B4-2-raw-url-for-retouch-46891e42-76ca-4ce7-ae7c-fe56ef0d37de.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/KWk3jq6knNw/rs:fit:500:0:1/q:100/plain/images/products/1/6875/793320155/350-%D0%BF%D0%BB%D0%B5%D0%B4-9-raw-url-for-retouch-121704a7-12ac-455b-983f-f63b8b8c2908.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "685452871",
							"productId": "412259774"
						}
					},
					{
						"id": "412098728",
						"title": "Свеча \"Anacondaz\"",
						"price": "2 700 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/svecha-anacondaz",
						"images": {
							"main": "https://static.insales-cdn.com/r/h7812DyNNJ0/rs:fit:500:0:1/q:100/plain/images/products/1/598/792371798/348-%D1%81%D0%B2%D0%B5%D1%87%D0%B0-4-raw-url-for-retouch-693b8a45-65e3-4818-86a5-a8eb16d8f443.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/uhP8VdBUGTQ/rs:fit:500:0:1/q:100/plain/images/products/1/599/792371799/348-%D1%81%D0%B2%D0%B5%D1%87%D0%B0-5-raw-url-for-retouch-1b026da6-06c0-4ed1-ba2c-15db66da39b3.jpg@jpg"
						},
						"stickers": [
							"-13%",
							"Предзаказ"
						],
						"metadata": {
							"variantId": "685216784",
							"productId": "412098728"
						}
					},
					{
						"id": "402774518",
						"title": "Лонгслив \"Змея 2.0\"",
						"price": "6 150 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/longsliv-zmeya-20",
						"images": {
							"main": "https://static.insales-cdn.com/r/JAiygHIdTws/rs:fit:500:0:1/q:100/plain/images/products/1/6300/769300636/286-%D0%BB%D0%BE%D0%BD%D0%B3%D1%81%D0%BB%D0%B8%D0%B2-1-raw-url-for-retouch-923722ed-45ce-45ed-b721-121cbc251771.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/NXxaeeWfbOE/rs:fit:500:0:1/q:100/plain/images/products/1/6343/769300679/286-%D0%BB%D0%BE%D0%BD%D0%B3%D1%81%D0%BB%D0%B8%D0%B2-5-raw-url-for-retouch-19128ad7-07d3-4793-8658-a4612d2d72a5.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "668888856",
							"productId": "402774518"
						}
					},
					{
						"id": "395718280",
						"title": "Стикерпак \"Dracondaz\"",
						"price": "450 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/stikerpak-dracondaz",
						"images": {
							"main": "https://static.insales-cdn.com/r/5EWYZ6WPzcg/rs:fit:500:0:1/q:100/plain/images/products/1/1142/748381302/IMG_8641__2_.JPG@jpg",
							"secondary": "https://static.insales-cdn.com/r/SgaqhYh2ihg/rs:fit:500:0:1/q:100/plain/images/products/1/1144/748381304/IMG_8642.JPG@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "658653167",
							"productId": "395718280"
						}
					},
					{
						"id": "390880381",
						"title": "Стикерпак \"Deluxe\"",
						"price": "450 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/stikerpak-deluxe",
						"images": {
							"main": "https://static.insales-cdn.com/r/ZHxz1Xtaf8c/rs:fit:500:0:1/q:100/plain/images/products/1/2366/740501822/IMG_7921.JPG@jpg",
							"secondary": "https://static.insales-cdn.com/r/rGTSLpCrNCo/rs:fit:500:0:1/q:100/plain/images/products/1/5338/742429914/photo_2023-08-25_12.37.51.jpeg@jpeg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "651770768",
							"productId": "390880381"
						}
					},
					{
						"id": "390157481",
						"title": "Шоппер \"Deluxe\"",
						"price": "2 100 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/shopper-deluxe",
						"images": {
							"main": "https://static.insales-cdn.com/r/SyhbS2nDAf8/rs:fit:500:0:1/q:100/plain/images/products/1/965/747987909/250-%D1%88%D0%BE%D0%BF%D0%BF%D0%B5%D1%80-1-raw-url-for-retouch-75e945e4-5a87-43ff-b6c2-e449b1ed3bed.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/V0Q71XPded4/rs:fit:500:0:1/q:100/plain/images/products/1/7948/742432524/IMG_8553.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "650798133",
							"productId": "390157481"
						}
					},
					{
						"id": "292703292",
						"title": "Маска \"ВСЕ ХОРОШО\"",
						"price": "150 ₽",
						"available": "В наличии",
						"link": "https://invmerch.ru/product/maska-vse-horosho",
						"images": {
							"main": "https://static.insales-cdn.com/r/GEPSO94Bf34/rs:fit:500:0:1/q:100/plain/images/products/1/7033/739408761/220-%D0%BC%D0%B0%D1%81%D0%BA%D0%B02-1-raw-url-for-retouch-1dd7bcda-a652-4e9b-a269-16fad7e2c635.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/xhE7o8s4oSs/rs:fit:500:0:1/q:100/plain/images/products/1/3892/721850164/IMG_8163.jpg@jpg"
						},
						"stickers": [
							"-50%",
							"Предзаказ"
						],
						"metadata": {
							"variantId": "507895149",
							"productId": "292703292"
						}
					},
					{
						"id": "359093718",
						"title": "Футболка \"Dracondaz\"",
						"price": "2 990 ₽",
						"available": "Нет в наличии",
						"link": "https://invmerch.ru/product/futbolka-dracondaz",
						"images": {
							"main": "https://static.insales-cdn.com/r/BPhuwPnMMvE/rs:fit:500:0:1/q:100/plain/images/products/1/7124/739384276/220-%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B020-4-raw-url-for-retouch-94d0bacc-de2c-4ccb-804c-46b8dbd61550.jpg@jpg",
							"secondary": "https://static.insales-cdn.com/r/3_OXlV3NEOc/rs:fit:500:0:1/q:100/plain/images/products/1/7167/739384319/220-%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%BA%D0%B020-8-raw-url-for-retouch-933fd76a-873b-4c4b-9dcd-896629a7ca52.jpg@jpg"
						},
						"stickers": [
							"Предзаказ"
						],
						"metadata": {
							"variantId": "606731099",
							"productId": "359093718"
						}
					}
				]
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
		if (selectedSizes.length > 0) {
			result = result.filter(product =>
				selectedSizes.some(size => product.sizes.includes(size))
			)
		}

		// Фильтрация по бренду
		if (selectedBrands.length > 0) {
			result = result.filter(product => selectedBrands.includes(product.brand))
		}

		// Фильтрация по составу
		if (selectedCompositions.length > 0) {
			result = result.filter(product =>
				selectedCompositions.some(comp => product.composition.includes(comp))
			)
		}

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
