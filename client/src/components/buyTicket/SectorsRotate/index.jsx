import SectorRotate from './SectorRotate'
import SectorRotateAnimation from './SectotRotateAnimation'

function SectorsRotateAnimation({ sector,COLORS,onClick }) {
	return (
		<>
			{sector.animationElement ? (
				<>
					<SectorRotateAnimation sector={sector} COLORS={COLORS} onClick={onClick}/>
				</>
			) : (
				<>
					<SectorRotate sector={sector} COLORS={COLORS} onClick={onClick}/>
				</>
			)}
		</>
	)
}

export default SectorsRotateAnimation