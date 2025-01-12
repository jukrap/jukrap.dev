import React from 'react';
import { motion } from 'framer-motion';

const ProjectCardSkeleton: React.FC = () => {
	return (
		<div className="relative overflow-hidden rounded-xl bg-card border border-border/40">
			{/* 썸네일 섹션 스켈레톤 */}
			<div className="aspect-[6/5] relative w-full overflow-hidden bg-secondary/30">
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
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

			{/* 콘텐츠 섹션 스켈레톤 */}
			<div className="p-6 space-y-4">
				{/* 제목 & 부제목 스켈레톤 */}
				<div className="space-y-2">
					<div className="h-6 bg-secondary/30 rounded-md w-3/4" />
					<div className="h-4 bg-secondary/30 rounded-md w-1/2" />
				</div>

				{/* 플랫폼 태그 스켈레톤 */}
				<div className="flex gap-2">
					<div className="h-6 bg-secondary/30 rounded-full w-16" />
					<div className="h-6 bg-secondary/30 rounded-full w-20" />
				</div>

				{/* 설명 스켈레톤 */}
				<div className="space-y-2">
					<div className="h-4 bg-secondary/30 rounded-md w-full" />
					<div className="h-4 bg-secondary/30 rounded-md w-11/12" />
					<div className="h-4 bg-secondary/30 rounded-md w-4/5" />
				</div>

				{/* 기술 스택 스켈레톤 */}
				<div className="pt-4 flex flex-wrap gap-2">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="w-8 h-8 bg-secondary/30 rounded-lg" />
					))}
				</div>

				{/* 구분선 */}
				<hr className="border-border/60" />

				{/* 링크 아이콘 스켈레톤 */}
				<div className="flex gap-3">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="w-6 h-6 bg-secondary/30 rounded-full" />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectCardSkeleton;
