import React from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';

// Icons
import { PiAirplaneTakeoffDuotone } from 'react-icons/pi';

const Navbar = () => {
	return (
		<div className='p-4 px-6'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<PiAirplaneTakeoffDuotone className='text-4xl text-blue-500' />
					<div className='hidden text-2xl font-bold sm:flex'>W3-Starter</div>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<ConnectWallet btnTitle='Connect' />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
