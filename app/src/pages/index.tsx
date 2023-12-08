import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { Image } from 'antd';

// Components
import { Hero } from '~/components/home';

// Images
import { FreelanceGuy } from '~/assets';

const Home: NextPageWithLayout = () => {
	return (
		<div className=''>
			<Hero />
			<div className='mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-8 py-6 md:flex-row'>
				<div className='order-2 flex flex-col gap-8 md:order-1'>
					<span className='text-6xl font-black uppercase text-gray-200'>
						marketing
					</span>
					<span className='text-primary text-6xl font-black uppercase'>
						photography
					</span>
					<span className='text-6xl font-black uppercase text-gray-200'>design</span>
					<span className='text-6xl font-black uppercase text-gray-200'>
						production
					</span>
				</div>
				<div className='order-1 md:order-2'>
					<Image
						src={FreelanceGuy.src}
						alt='Freelance Wheel'
						preview={false}
						width={500}
					/>
				</div>
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
