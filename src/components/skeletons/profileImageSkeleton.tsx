import React from 'react';
import { motion } from 'framer-motion';

const ProfileImageSkeleton: React.FC = () => {
	return (
		<div className="w-40 h-40 relative">
			<div className="absolute inset-0 rounded-full bg-secondary/30 overflow-hidden">
				<motion.div
					className="absolute inset-0"
					style={{
						background:
							'linear-gradient(90deg, transparent, var(--secondary) 50%, transparent)',
						clipPath: 'circle(50% at center)',
					}}
					animate={{
						x: ['-100%', '100%'],
					}}
					transition={{
						repeat: Infinity,
						duration: 1.5,
						ease: 'linear',
					}}
				/>
			</div>
		</div>
	);
};

export default ProfileImageSkeleton;
