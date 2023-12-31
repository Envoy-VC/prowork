import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { TbArrowRight } from 'react-icons/tb';

// Components
import { Hero } from '~/components/home';

const Home: NextPageWithLayout = () => {
	return (
		<div className=''>
			<Hero />
			<div className='px-4'>
				<div className='mx-auto my-12 flex max-w-screen-2xl flex-col gap-8 rounded-lg bg-[#6eb9d48b] py-5 pl-12 text-slate-700'>
					{ProfessionList.map((profession, index) => (
						<div className='group flex flex-col gap-2 md:gap-4' key={index}>
							<div className='flex cursor-pointer flex-row justify-between py-4 text-2xl font-medium md:text-5xl'>
								{profession.name}
								<TbArrowRight className='mr-12 translate-x-[-48px] opacity-0 transition-all duration-500 ease-out group-hover:flex group-hover:translate-x-0 group-hover:text-black group-hover:opacity-100' />
							</div>
							{index !== ProfessionList.length - 1 && (
								<div className='border-b-[3px] border-gray-100 transition-all duration-500 ease-out group-hover:border-black'></div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export const ProfessionList = [
	{
		name: 'Product Management',
	},
	{
		name: 'Web and Mobile Development',
	},
	{
		name: 'Product Design',
	},
	{
		name: 'Digital Marketing',
	},
	{
		name: 'Sales and Marketing',
	},
	{
		name: 'Writing and Translation',
	},
	{
		name: 'Finance and Accounting',
	},
];

export default Home;
