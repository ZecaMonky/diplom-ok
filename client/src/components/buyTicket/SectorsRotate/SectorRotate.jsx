import { Rect, Text } from 'react-konva'

function SectorRotate({ sector,COLORS,onClick }) {
	return (
		<>
			<Rect onClick={onClick}
				text={sector.name}
				x={sector.x}
				y={sector.y}
				width={sector.sectorWidth}
				height={sector.sectorHeight}
				fillLinearGradientStartPoint={{ x: 0, y: 0 }}
				fillLinearGradientEndPoint={{
					x: sector.sectorWidth,
					y: sector.sectorHeight,
				}}
				fillLinearGradientColorStops={sector.fill}
				// draggable
				cornerRadius={16}
				rotation={sector.rotation}
				stroke={COLORS.stroke}
				strokeWidth={1}
				shadowColor={COLORS.shadow}
				shadowBlur={12}
				shadowOpacity={0.3}
			/>
			<Text
				text={sector.name}
				x={sector.x}
				y={sector.y}
				width={sector.sectorWidth}
				height={sector.sectorHeight}
				align='center'
				verticalAlign='middle'
				fontSize={20}
				fontFamily="'Segoe UI', system-ui"
				fontStyle='bold'
				fill='#ffffff'
				wrap='word'
				rotation={sector.rotation}
				padding={16}
				stroke='rgba(0,0,0,0.3)'
				strokeWidth={2}
				lineJoin='round'
				listening={false}
				shadowColor='rgba(0,0,0,0.5)'
				shadowBlur={5}
				shadowOffsetX={1}
				shadowOffsetY={1}
			/>
		</>
	)
}

export default SectorRotate