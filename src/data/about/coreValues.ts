import { CoreValue } from '@/types/profile';

export const coreValues: CoreValue[] = [
	{
		title: '업무의 흐름을 생각하며 화면을 만듭니다.',
		content:
			'React와 TypeScript로 조회 / 예약 / Excel 등록 / 라벨 출력 화면을 개발해 왔습니다. 여러 화면이 같은 표와 입력 폼을 사용하도록 만들고, 사용자의 입력이 API 요청과 결과 확인으로 이어지는 과정을 함께 살폈습니다.',
	},
	{
		title: '서버 데이터와 화면의 편집 상태를 구분합니다.',
		content:
			'물류 / 주식 업무 웹의 조회와 저장 후 목록 갱신은 TanStack Query로 처리하고, 선택 항목과 모달 상태는 따로 관리했습니다. 정산 ERP에서도 저장된 값과 편집 중인 초안을 구분해, 저장에 실패한 입력을 고친 뒤 다시 시도할 수 있도록 했습니다.',
	},
	{
		title: '화면과 연결된 시스템까지 살펴봅니다.',
		content:
			'Spring Boot API와 Android 출력 연동을 맡으며 화면에서 시작한 요청이 실제 결과로 이어지는지 확인했습니다. Bluetooth 프린터의 연결 오류는 WebView 요청 / Android 권한 / 장비 SDK 호출을 따라가며 해결했고, 실물 라벨을 보며 긴 주소의 줄바꿈과 배치를 조정했습니다.',
	},
] as const;
