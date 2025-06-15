import SectorAnimation from './SectorAnimation'
import Sector from './Sector'

function SectorsAnimation({ sector, COLORS ,onClick }) {
	return (
		<>
			{sector.animationElement ? (
				<>
					<SectorAnimation sector={sector} COLORS={COLORS} onClick={onClick}/> 
				</>
			) : (
				<>
					<Sector sector={sector} COLORS={COLORS} onClick={onClick}/>
				</>
			)}
		</>
	)
}

export default SectorsAnimation