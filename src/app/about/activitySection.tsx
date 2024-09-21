import React from 'react';
const ActivitySection: React.FC = () => {
	return (
		<section className="w-[670px] flex flex-col items-start gap-8 h-fit">
			<h2 className="font-bold text-4xl leading-10 tracking-tight text-right text-foreground w-[153px] h-fit">
				Activity
			</h2>
			<div className="flex justify-between gap-12">
				<div className="w-[153px] flex flex-col items-end gap-2">
					<p className="font-medium text-xl leading-6 text-right text-foreground">
						스터디 운영
					</p>
					<p className="font-medium text-sm leading-6 text-right text-muted-foreground">
						2024.05 ~ Current
					</p>
				</div>
				<div className="w-[460px] flex flex-col items-start gap-3">
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						<strong>코딩 테스트 및 개발 지식 스터디</strong>
					</p>
					<div className="flex flex-col gap-1">
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<span className="text-base leading-6 text-left text-foreground">
								총 2개 스터디(코딩 테스트, 개발 지식)를 운영하고 있습니다.
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between gap-12">
				<div className="w-[153px] flex flex-col items-end gap-2">
					<p className="font-medium text-xl leading-6 text-right text-foreground">
						프로그래머스
						<br />
						데브코스
					</p>
					<p className="font-medium text-sm leading-6 text-right text-muted-foreground">
						2024.05 ~ 2024.09
					</p>
				</div>
				<div className="w-[460px] flex flex-col items-start gap-3">
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						<strong>Cloud Application Engineering 과정 - 서브멘토</strong>
					</p>
					<div className="flex flex-col gap-1">
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<span className="text-base leading-6 text-left text-foreground">
								이전 데브코스 기수에서 우수 수료자로 선정되어, 해당 과정 2기
								수강생들에게 멘토링을 해주는 서브멘토로 활동하였습니다.
							</span>
						</div>
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<span className="text-base leading-6 text-left text-foreground">
								멘토링 분야 : 매주 개발 정보 공유, 수료생 고민 상담, 데일리 스크럼 참여,
								개발 문제 해결, 개발 프로젝트 점검 등
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-between gap-12">
				<div className="w-[153px] flex flex-col items-end gap-2">
					<p className="font-medium text-xl leading-6 text-right text-foreground">
						프로그래머스
						<br />
						데브코스
					</p>
					<p className="font-medium text-sm leading-6 text-right text-muted-foreground">
						2023.12 ~ 2024.05
					</p>
				</div>
				<div className="w-[460px] flex flex-col items-start gap-3">
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						<strong>Cloud Application Engineering 과정 - 수강생</strong>
					</p>

					<div className="flex flex-col gap-1">
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<span className="text-base leading-6 text-left text-foreground">
								React와 React Native 개발을 목표로 하는 Cloud Application Engineering
								데브코스 과정을 수료하였습니다.
							</span>
						</div>
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<span className="text-base leading-6 text-left text-foreground">
								훈련 분야 : React & React Native
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between gap-12">
				<div className="w-[153px] flex flex-col items-end gap-2">
					<p className="font-medium text-xl leading-6 text-right text-foreground">
						스터디 멘토
					</p>
					<p className="font-medium text-sm leading-6 text-right text-muted-foreground">
						2021.09 ~ 2022.02
					</p>
				</div>
				<div className="w-[460px] flex flex-col items-start gap-3">
					<p className="text-lg leading-6 tracking-tight text-left text-foreground">
						<strong>멘토-멘티 코딩 멘토링</strong>
					</p>

					<div className="flex flex-col gap-1">
						<div className="grid grid-cols-[auto,1fr] items-start gap-4">
							<span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"></span>
							<span className="text-base leading-6 text-left text-foreground">
								멘토로서 멘티에게 프로그래밍 및 개발 분야를 지도해주는 스터디에 참여하였습니다.
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default ActivitySection;
