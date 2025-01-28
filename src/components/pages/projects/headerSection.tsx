import React from 'react';

export function HeaderSection() {
	return (
		<section className="w-full max-w-[1200px] flex flex-col items-start gap-8">
			<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
				Projects
			</h1>
			<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
				웹과 모바일 플랫폼에서 다양한 프로젝트를 진행했습니다. 각 프로젝트를
				클릭하면 상세 내용을 확인하실 수 있습니다.
			</p>
		</section>
	);
}
