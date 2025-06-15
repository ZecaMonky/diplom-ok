import React from 'react'
import { Stage, Layer, Text, Rect } from 'react-konva'
import './style.scss'
import Sectors from './allSectors'

export default function TicketWidget({ concert, onClose, sectorId }) {
	return (
		<div className='ticket-widget-overlay'>
			<div className='ticket-widget'>
				<Stage width={1400} height={600} className='sectorsBox'>
					<Layer>
						<Sectors concertInfo={concert} onClose={onClose} sectorId={sectorId} />
					</Layer>
				</Stage>
			</div>
		</div>
	)
}
