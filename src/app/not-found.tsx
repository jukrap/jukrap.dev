import Link from 'next/link'

export default async function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<h1 className="text-4xl font-bold mb-4">Error - Page Not Found</h1>
			<p className="text-xl text-gray-500 mb-8">
				죄송합니다. 찾으시는 페이지가 존재하지 않습니다.
			</p>
			<Link href="/" className="text-blue-500 hover:underline">
				홈페이지로 돌아가기
			</Link>
		</div>
	);
}
