import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import clsx from 'clsx';

import { ExploreProfiles } from '~/sections';

// Fonts
import { Dela_Gothic_One } from 'next/font/google';
const delaOne = Dela_Gothic_One({ weight: '400', subsets: ['latin'] });

const Explore: NextPageWithLayout = () => {
	return (
		<div className='mx-auto my-16 max-w-screen-2xl px-4'>
			<div
				className={clsx(
					'flex flex-col text-4xl uppercase leading-[1.15] text-slate-900 md:text-[5rem]',
					delaOne.className
				)}
			>
				<div className=''>Find a job</div>
				<div className=''>that&lsquo;s just right.</div>
			</div>
			<ExploreProfiles />
		</div>
	);
};

Explore.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Explore;
