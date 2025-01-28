import { CoreValue } from '@/types/profile';

export const coreValues: CoreValue[] = [
	{
		title: '1. 과정과 결과, 둘 모두 중요하다고 생각합니다.',
		content:
			'DIVE 2024 해커톤에서 72시간이라는 짧은 시간 내에 완성도 높은 서비스를 구현하며 이를 입증했습니다. 구글 맵스 플랫폼 선정부터 기술 검증, 구현까지의 과정을 거치면서 수상이라는 결과를 이끌어냈습니다. 이렇듯 개발에 임할 때 항상 과정과 결과 모두를 중시하는 태도로 임하고 있습니다.',
	},
	{
		title: '2. 재사용성이 높은 유연한 코드를 작성하고자 노력합니다.',
		content:
			'잇집 프로젝트에서 합성 패턴을 적용한 공통 컴포넌트 설계와 Storybook을 활용한 컴포넌트 주도 개발로 재사용성과 유지보수성을 높였습니다. 이는 15명 규모 팀에서 일관된 UI/UX를 제공하는 핵심이 되었습니다.',
	},
	{
		title: '3. 커뮤니케이션의 중요성을 높게 봅니다.',
		content:
			'여러 프로젝트에서 디자이너, 백엔드 개발자들과 적극적으로 소통하며 협업했습니다. 특히 잇집에서는 15명 팀의 커뮤니케이션 체계를 구축해 업무 효율을 크게 향상시켰습니다. 개발이란 결국 사람과 사람 간의 상호작용임을 알기에, 소통을 최우선으로 여기고 있습니다.',
	},
	{
		title: '4. 마지막으로, 문제 해결 과정을 즐깁니다.',
		content:
			'자세선생 프로젝트에서 OpenCV에서 Mediapipe로의 전환을 통해 성능을 5~10배 개선했고, 동해선장 프로젝트에서는 다양한 외부 API 통합 과정의 난관을 돌파해나갔습니다. 개발 과정의 도전들은 저에게 언제나 새로운 배움의 기회였고, 이를 통해 한 단계 성장할 수 있었습니다.',
	},
] as const;
