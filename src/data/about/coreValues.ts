import { CoreValue } from '@/types/profile';

export const coreValues: CoreValue[] = [
	{
		title: '업무의 흐름을 생각하며 화면을 만듭니다.',
		content:
			'React와 TypeScript로 조회·예약·Excel 등록·라벨 출력 기능을 개발했습니다. 여러 화면에서 쓰는 표와 입력 폼은 공통 컴포넌트로 만들고, API 응답을 화면 표시와 출력에 연결했습니다.',
	},
	{
		title: '서버 데이터와 화면의 편집 상태를 구분합니다.',
		content:
			'물류·주식 업무 웹에서는 TanStack Query로 데이터 조회와 저장 후 목록 갱신을 처리하고, 선택 항목과 모달 상태는 따로 관리했습니다. 정산 ERP에서는 저장된 값과 편집 중인 초안을 구분했습니다. 저장에 실패하거나 다시 시도하더라도 입력한 내용을 잃지 않도록 처리하였습니다.',
	},
	{
		title: '화면과 연결된 시스템까지 살펴봅니다.',
		content:
			'Spring Boot API 개발과 Android 출력 연동도 맡았습니다. Bluetooth 프린터 연동에서는 WebView의 출력 요청, Android 권한, 장비 SDK 호출을 차례로 확인했습니다. 마지막으로 실기기에서 라벨이 출력되는지 점검했습니다.',
	},
] as const;
