import clsx from 'clsx';
import React from 'react';
import { Button } from 'antd';

// Fonts
import { adieuFont } from '~/components/layout';

const Hero = () => {
	return (
		<div className='mx-auto my-8 max-w-screen-2xl'>
			<div
				className={clsx(
					'text-center text-[5rem] font-black uppercase tracking-wide md:text-[8rem]',
					adieuFont.className
				)}
			>
				Find & Hire
			</div>
			<div className='my-4 flex flex-col items-center justify-center gap-4 sm:flex-row'>
				<Button
					className='bg-primary flex min-w-[160px] items-center justify-center !px-6 !py-6 !text-xl font-medium text-black hover:!text-black'
					type='primary'
					size='large'
				>
					Hire
				</Button>
				<Button
					className='flex min-w-[160px] items-center justify-center bg-black !px-6 !py-6 !text-xl font-medium text-white hover:!bg-black hover:!text-white'
					type='primary'
					size='large'
				>
					Find work
				</Button>
			</div>
		</div>
	);
};

export default Hero;
