
const RotateElement = ({
	name,
	colorText,
	transform,
}) => {
	return (
		<div className='rotateElement'>
			<h2
				style={{ color: colorText, transform: `translateX(-${transform}px)` }}
			>
				{name}
			</h2>
		</div>
	)
}

export default RotateElement
