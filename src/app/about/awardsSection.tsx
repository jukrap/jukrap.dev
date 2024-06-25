import React from 'react';

const AwardsSection: React.FC = () => {
	return (
		<section className="w-[670px] flex flex-col items-start gap-8 h-fit">
			<h2 className="font-bold text-4xl leading-10 tracking-tight text-right text-foreground w-[153px] h-fit">
				Awards
			</h2>
			<div className="flex justify-between gap-12">
				<div className="w-[153px] flex flex-col items-end gap-2">
					<p className="font-medium text-xl leading-6 text-right text-foreground">
						경남소프트웨어
						<br />
						경진대회
					</p>
					<p className="font-medium text-sm leading-6 text-right text-muted-foreground">
						2021.08 ~ 2021.10
					</p>
				</div>
				<div className="w-[460px] flex flex-col items-start gap-3">
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						<strong>최우수상</strong>
					</p>
					<div className="flex flex-col gap-1">
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<span className="text-base leading-6 text-left text-foreground">
								출품 작품 : ESD HotDeal
							</span>
						</div>
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<a
								href="https://www.knnews.co.kr/news/articleView.php?idxno=1362660"
								target="_blank"
								rel="noopener noreferrer"
								className="text-base leading-6 text-left text-foreground hover:text-accent transition-colors duration-300"
							>
								[경남일보] "도내 소프트업계 이끌 인재들입니다"
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AwardsSection;
