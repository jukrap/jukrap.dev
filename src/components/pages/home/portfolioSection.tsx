import React from 'react';
import Image from 'next/image';
import { useIcon } from '@/hook/useIcon';

export const PortfolioSection = () => {
	const { getIcon } = useIcon();

	return (
		<section className="flex flex-col items-center gap-8 md:gap-16 px-4">
			<div className="flex flex-col items-center gap-6 md:gap-8 text-center break-keep">
				<p className="font-medium text-lg md:text-2xl leading-relaxed text-foreground">
					혹시 저의 <span className="font-bold">포트폴리오 파일</span>이
					필요하신가요?
					<br />
					그렇다면 아래의 <span className="font-bold">PDF 다운로드 버튼</span>을
					눌러주세요!
				</p>
				<a
					href="/files/Ju-cheol-Park_Frontend.pdf"
					download
					className="relative flex items-center gap-2 px-4 py-2 font-bold text-lg md:text-xl leading-5 text-center text-background bg-foreground rounded-lg hover:bg-accent transition-colors duration-300 select-none"
				>
					<div className="relative flex items-center justify-center w-6 h-6">
						<Image
							src={getIcon('downArrow')}
							alt="Download Icon"
							width={24}
							height={24}
							className="animate-downloadArrow"
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'contain',
							}}
						/>
					</div>
					<span className="ml-2">portfolio.PDF</span>
				</a>
			</div>
		</section>
	);
};
