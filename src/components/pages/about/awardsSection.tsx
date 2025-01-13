'use client';

import React from 'react';
import { Award } from '@/types/profile';
import WebViewModal from '@/components/common/webViewModal';

const awards: Award[] = [
	{
		title: 'DIVE 2024 해커톤',
		period: '2024.10',
		award: '부산테크노파크원장상 수상',
		details: [
			'출품 작품 : 동해선장',
			{ text: '발제사 3위', link: '/images/captain-donghae/award.png' },
		],
	},
	{
		title: '경상대학교 인공지능 미술전',
		period: '2022.11',
		award: '장려상 수상',
		details: ['출품 작품 : 석양', 'Stable Diffusion 사용'],
	},
	{
		title: '코딩역량강화 교내대회',
		period: '2021.10 ~ 2021.11',
		award: '개척상 수상',
		details: ['출품 작품 : ESD HotDeal'],
	},
	{
		title: '경남소프트웨어 경진대회',
		period: '2021.08 ~ 2021.10',
		award: '최우수상 수상',
		details: [
			'출품 작품 : ESD HotDeal',
			{
				text: '[경남일보] "도내 소프트업계 이끌 인재들입니다"',
				link: 'https://www.knnews.co.kr/news/articleView.php?idxno=1362660',
			},
		],
	},
];

const AwardsSection: React.FC = () => {
	const [modalIsOpen, setModalIsOpen] = React.useState(false);
	const [selectedLink, setSelectedLink] = React.useState('');
	const [selectedLinkText, setSelectedLinkText] = React.useState('');

	selectedLinkText;

	const openModal = (link: string, text: string) => {
		setSelectedLink(link);
		setSelectedLinkText(text);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<section className="w-full max-w-[670px] flex flex-col items-start gap-6 md:gap-8">
			<h2 className="font-bold text-2xl md:text-4xl leading-relaxed tracking-tight text-foreground border-b border-border pb-2 w-full md:w-[153px] md:border-none md:pb-0 md:text-right">
				Awards
			</h2>

			<div className="w-full flex flex-col gap-6">
				{awards.map((award, index) => (
					<div
						key={index}
						className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-12 bg-secondary/30 md:bg-transparent p-4 md:p-0 rounded-lg"
					>
						{/* 수상 정보 */}
						<div className="flex md:w-[153px] flex-col items-start md:items-end gap-0.5">
							<p className="font-medium text-lg md:text-xl leading-6 text-left md:text-right text-foreground break-keep">
								{award.title}
							</p>
							<p className="font-medium text-sm leading-6 text-left md:text-right text-muted-foreground">
								{award.period}
							</p>
						</div>

						{/* 수상 세부사항 */}
						<div className="md:w-[460px] flex flex-col items-start gap-1">
							<p className="text-base md:text-lg leading-6 tracking-tight text-left text-foreground break-keep">
								<strong>{award.award}</strong>
							</p>
							<div className="flex flex-col gap-1">
								{award.details.map((detail, detailIndex) => (
									<div
										key={detailIndex}
										className="grid grid-cols-[auto,1fr] items-start gap-3"
									>
										<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
										{typeof detail !== 'string' ? (
											<button
												onClick={() =>
													openModal(detail.link as string, detail.text as string)
												}
												className="text-sm md:text-base leading-6 text-left text-foreground hover:text-accent transition-colors duration-300 underline break-keep"
											>
												{detail.text}
											</button>
										) : (
											<span className="text-sm md:text-base leading-6 text-left text-foreground">
												{detail}
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
			<WebViewModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				selectedLink={selectedLink}
				linkText={selectedLinkText}
			/>
		</section>
	);
};

export default AwardsSection;
