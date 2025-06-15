const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Consert = sequelize.define(
	'consert',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		city: { type: DataTypes.STRING },
		date: { type: DataTypes.DATEONLY },
		place: { type: DataTypes.STRING },
	},
	{ timestamps: false }
)

const Sector = sequelize.define('sector', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	type: { type: DataTypes.STRING, defaultValue: ' ' },
	x: DataTypes.INTEGER,
	y: DataTypes.INTEGER,
	sectorWidth: { type: DataTypes.INTEGER },
	sectorHeight: { type: DataTypes.INTEGER },
	fill: DataTypes.JSONB,
	rotation: DataTypes.INTEGER,
	sectorPrices: { type: DataTypes.STRING },
	animationElement: { type: DataTypes.BOOLEAN },
	price: DataTypes.INTEGER,
	totalTickets: { type: DataTypes.INTEGER },
  seats: DataTypes.JSONB,
},{ timestamps: false })


const BookedSeat = sequelize.define('bookedSeat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  seatId: { type: DataTypes.STRING }, // ID места в формате "сектор-ряд-место"
  isBooked: { type: DataTypes.BOOLEAN, defaultValue: true },
  bookingTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  userId: { type: DataTypes.INTEGER }, // Кто забронировал
  consertId: { type: DataTypes.INTEGER }, // Для какого концерта
  sectorId: { type: DataTypes.INTEGER }, // В каком секторе
  price: { type: DataTypes.INTEGER }, // Цена места
  paymentStatus: { 
      type: DataTypes.ENUM('pending', 'paid', 'cancelled'), 
      defaultValue: 'pending' 
  }
}, { timestamps: true })

// Связи между моделями
Consert.hasMany(Sector, { foreignKey: 'cityId' })
Sector.belongsTo(Consert, { foreignKey: 'cityId' })

User.hasMany(BookedSeat, { foreignKey: 'userId' })
BookedSeat.belongsTo(User, { foreignKey: 'userId' })

Consert.hasMany(BookedSeat, { foreignKey: 'consertId' })
BookedSeat.belongsTo(Consert, { foreignKey: 'consertId' })

Sector.hasMany(BookedSeat, { foreignKey: 'sectorId' })
BookedSeat.belongsTo(Sector, { foreignKey: 'sectorId' })

module.exports = {
	User,
	Consert,
	Sector,
  BookedSeat
}
