import { Skeleton } from 'antd';

const SkeletonChatPill = ({ index }: { index: number }) => {
	const sender = index % 2 === 0;
	return (
		<div
			className={`flex flex-col ${
				sender ? 'items-end self-end' : 'items-start self-start'
			}`}
		>
			<div
				className={`flex flex-col gap-1 ${sender ? 'items-end' : 'items-start'}`}
			>
				<div className='w-fit max-w-[300px] rounded-xl bg-[#F8F8F8] px-2 py-1 text-[1rem] font-medium sm:text-[1rem] md:px-3 lg:max-w-[500px] lg:rounded-xl lg:py-2'>
					<Skeleton
						active
						paragraph={{
							rows: Math.floor(Math.random() * 2),
							className: '!p-0 !m-2',
						}}
						title={{
							width: Math.floor(Math.random() * 300) + 100,
						}}
						className='!max-w-[50px]'
					/>
				</div>
			</div>
		</div>
	);
};

export default SkeletonChatPill;
