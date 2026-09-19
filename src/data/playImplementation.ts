import type { ProjectImplementation } from '@/types/project';
import type { Locale } from '@/types/locale';

export const playImplementation: Record<Locale, ProjectImplementation> = {
	ko: {
		title: '숨겨 둔 기능의 구현',
		summary: '궁금하다면 펼쳐 보세요. 구현 방식과 사용한 기술을 정리했습니다.',
		demo: { label: '3D 놀이터 열기', path: '/play' },
		sections: [
			{
				title: '화면과 3D 루프를 분리',
				details: [
					'React는 버튼, 로딩 안내, 테마와 전체화면 상태를 담당합니다. Play 페이지에 들어가면 scene.ts를 동적으로 불러와 Three.js 렌더러와 카메라, 장면을 만듭니다.',
					'키보드와 터치 입력은 장면의 제어 함수로 전달합니다. 매 프레임 바뀌는 위치는 React 상태에 넣지 않고, 물리 계산과 카메라 갱신을 거쳐 캔버스에 그립니다.',
				],
			},
			{
				title: '열기구 모델과 코드로 만든 풍경',
				details: [
					'열기구는 OscarWW의 “To The Moon Doge Hot Air Balloon” GLB 모델을 사용했습니다. 직접 만든 모델이 아니며, CC BY 4.0에 따라 출처를 표시하고 장면에 맞게 크기, 방향, 재질을 조정했습니다.',
					'언덕, 나무, 바위, 구름과 집은 Three.js의 기하 도형으로 구성했습니다. 반복되는 나무와 집의 부품은 InstancedMesh로 묶어 그립니다.',
				],
			},
			{
				title: '이동해도 이어지는 랜덤 지형',
				details: [
					'마인크래프트의 지형 생성 방식에서 아이디어를 얻었습니다.',
					'풍경마다 하나의 seed를 만들고, 좌표와 seed를 함께 계산해 지형 높이와 사물 배치를 정합니다. 같은 좌표로 돌아오면 같은 풍경이 나타나고, “새로운 풍경”을 누르면 seed가 바뀝니다.',
					'땅은 48m 단위의 구역으로 나눕니다. 열기구 주변 7×7개 구역을 유지하며, 멀어진 구역은 해제하고 새로 필요한 구역은 렌더 프레임당 최대 한 개씩 준비합니다.',
				],
			},
			{
				title: '강과 마을을 지형에 맞춰 배치',
				details: [
					'강은 seed에 따라 방향과 간격을 정하고, 구간별로 폭과 굽이가 달라지는 연속된 곡선으로 만듭니다. 곡선 주변의 땅을 낮추고 수면을 배치해 구역 경계에서도 물길이 끊기지 않게 했습니다.',
					'마을은 물과 급경사를 피한 곳에 집 3~6채와 길을 배치합니다. 집 모서리의 지면 높이를 비교해 기초 높이를 정하고, 주변의 나무와 바위는 비워 둡니다. 집은 탐색 중 만나는 배경 요소로 구성했습니다.',
				],
			},
			{
				title: '비행 계산과 카메라 추적',
				details: [
					'WASD 이동은 카메라가 바라보는 방향을 기준으로 계산하고, 상승·하강 입력과 속도 감쇠를 더해 관성을 표현합니다. 물리 상태는 초당 60번 갱신하고, 지형의 실제 삼각형 높이를 이용해 지면과 수면 아래로 내려가지 않게 합니다.',
					'화면에는 직전과 현재 물리 상태 사이를 보간한 위치를 표시합니다. 열기구와 카메라가 이 위치를 함께 사용하고, 카메라의 회전·거리 변화만 부드럽게 따라가게 해 서로 다른 갱신 타이밍에서 생기던 떨림을 줄였습니다.',
				],
			},
			{
				title: '로딩과 렌더링 비용 관리',
				details: [
					'Three.js와 열기구 모델은 Play에서 불러옵니다. 일반 페이지나 이 설명을 열 때는 3D 장면을 실행하지 않습니다. 데스크톱은 requestAnimationFrame에 맞춰 표시하고 작은 화면은 30fps와 낮춘 렌더링 해상도를 사용합니다.',
					'화면 밖이나 숨긴 탭에서는 실행을 멈추고, 페이지를 떠나면 이벤트와 GPU 자원을 정리합니다. 모델 또는 WebGL 로딩이 실패하면 안내와 재시도를 제공하며, 동작 줄이기 설정에서는 정지 상태로 시작합니다.',
				],
			},
			{
				title: '화면 크기에 맞춘 조작',
				details: [
					'마우스 드래그로 시점을 돌리고 휠이나 버튼으로 거리를 조절합니다. 터치에서는 “탐색 시작”을 눌렀을 때만 화면 드래그를 사용해 평소 페이지 스크롤을 유지합니다.',
					'전체화면에서는 이동 버튼을 왼쪽 아래, 상승·하강 버튼을 오른쪽 아래에 배치합니다. 브라우저 전체화면을 사용할 수 없을 때는 화면을 채우는 대체 레이아웃을 사용하고, 종료하면 페이지 스크롤을 복원합니다.',
				],
			},
		],
	},
	en: {
		title: 'How a hidden feature works',
		summary:
			'Curious? Open this section to explore the implementation and tools.',
		demo: { label: 'Open the 3D playground', path: '/play' },
		sections: [
			{
				title: 'Separate the interface from the 3D loop',
				details: [
					'React handles the controls, loading messages, theme and fullscreen state. Entering Play dynamically imports scene.ts, which creates the Three.js renderer, camera and scene.',
					'Keyboard and touch events call the scene controller. Per-frame positions stay outside React state: the loop updates physics and the camera, then draws to the canvas.',
				],
			},
			{
				title: 'An existing balloon model and a landscape built in code',
				details: [
					'The balloon uses OscarWW’s “To The Moon Doge Hot Air Balloon” GLB model, rather than a model I created. The page credits the CC BY 4.0 asset and notes the adjustments to its scale, orientation and material.',
					'Hills, trees, rocks, clouds and houses use Three.js geometry. Repeated trees and house parts are grouped with InstancedMesh.',
				],
			},
			{
				title: 'Terrain that continues as you travel',
				details: [
					'The approach was inspired by Minecraft’s terrain generation.',
					'Each landscape gets a seed. Coordinates and the seed determine terrain height and object placement, so returning to a location produces the same scenery. “New landscape” changes the seed.',
					'The ground is split into 48-metre chunks. A 7×7 area stays around the balloon; distant chunks are released and newly needed chunks are prepared at most one per rendered frame.',
				],
			},
			{
				title: 'Place rivers and villages on suitable ground',
				details: [
					'The seed sets river direction and spacing, while continuous curves vary their width and bends. Lowering the ground around these curves and adding a water surface keeps the channels connected across chunk boundaries.',
					'Villages place three to six houses and paths away from water and steep slopes. Ground heights at each house’s corners determine its foundation, and nearby trees and rocks are excluded. Houses are scenery encountered during exploration.',
				],
			},
			{
				title: 'Flight simulation and camera tracking',
				details: [
					'WASD movement is relative to the camera. Rise and descend inputs apply acceleration, while velocity damping provides inertia. Physics updates 60 times per second; heights sampled from the terrain triangles keep the balloon above ground and water.',
					'The displayed pose interpolates between the previous and current physics states. Both the balloon and camera use that pose, with smoothing applied to the camera’s orbit and distance offset. This reduces shaking caused by updating them at different times.',
				],
			},
			{
				title: 'Manage loading and rendering work',
				details: [
					'Three.js and the balloon model load on Play. Opening a regular page or this explanation does not run the 3D scene. Desktop rendering follows requestAnimationFrame; small screens use a 30fps limit and a lower rendering resolution.',
					'Execution stops outside the viewport or in a hidden tab. Leaving the page releases event handlers and GPU resources. Model or WebGL failures show a retry option, and reduced-motion preferences start the scene paused.',
				],
			},
			{
				title: 'Controls for different screen sizes',
				details: [
					'Dragging orbits the camera, while the wheel and zoom buttons adjust distance. Touch dragging is enabled only after “Start exploring”, preserving ordinary page scrolling otherwise.',
					'Fullscreen places movement controls at the lower left and altitude controls at the lower right. When the Fullscreen API is unavailable, a viewport-filling layout takes over; exiting restores page scrolling.',
				],
			},
		],
	},
};
