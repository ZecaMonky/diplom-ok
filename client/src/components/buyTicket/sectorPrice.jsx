import React from 'react'
import { Group, Rect, Text } from 'react-konva'

export default function SectorPrice({sector,COLORS , idx}) {
	return (
		<>
		 <Group
            y={50 + idx * 40}
            x={1040}
            opacity={0.9}
            listening={false}
          >
            <Rect
              width={265}
              height={30}
              fillLinearGradientColorStops={sector.fill}
              fillLinearGradientStartPoint={{ x: 0, y: 0 }}
              fillLinearGradientEndPoint={{ x: 300, y: 30 }}
              cornerRadius={5}
              shadowColor={COLORS.shadow}
              shadowBlur={5}
            />
            
            <Text
              text={sector.name}
              x={10}
              y={8}
              fontSize={16}
              fill='#ffffff'
              perfectDrawEnabled={false}
            />
            
            <Text
              text={sector.sectorPrices}
              x={sector.name.length > 10 ? 80 : 100}
              y={8}
              fontSize={16}
              fill='#ffffff'
              fontStyle="bold"
              align="right"
              perfectDrawEnabled={false}
            />
          </Group>
		</>
	)
}
