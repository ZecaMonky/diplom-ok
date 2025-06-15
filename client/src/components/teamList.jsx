import './teamList.css'
import { motion } from 'framer-motion'
import { evenMemberAnimation, oddMemberAnimation } from './Animation'



const TeamList = ({ teamMembers }) => {
	return (
		<motion.div initial='hidden' whileInView='visible' className='teamList'>
			{teamMembers.map(member => (
				<motion.div
					variants={
						member.id % 2 === 0 ? evenMemberAnimation : oddMemberAnimation
					}
					custom={3}
					key={member.name}
					className='teamMember'
				>
					<img src={member.img} alt={member.name} />
					<h3>{member.name}</h3>
					<p>{member.bandRole}</p>
				</motion.div>
			))}
		</motion.div>
	)
}

export default TeamList
