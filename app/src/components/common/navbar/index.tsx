import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';
import { usePathname } from 'next/navigation';

// Icons
import { SiPaloaltonetworks } from 'react-icons/si';

const NavLinks = [
	{
		name: 'hire',
		href: '/explore',
	},
	{
		name: 'work',
		href: '/work',
	},
];

const Navbar = () => {
	const pathname = usePathname();
	return (
		<div className='mx-auto max-w-screen-2xl px-3 py-8'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2 rounded-full bg-gray-100 px-4 py-3'>
					<SiPaloaltonetworks className='text-2xl text-secondary' />
					<div className='flex text-xl font-medium'>ProWork</div>
				</div>
				<div className='hidden w-fit flex-row items-center rounded-full bg-gray-100 sm:flex'>
					{NavLinks.map((link, index) => (
						<Link href={link.href} key={index}>
							<div className='group relative overflow-x-hidden'>
								<div
									className={clsx(
										'rounded-full px-4 py-3 text-lg font-medium',
										pathname === link.href ? 'bg-gray-200 px-6' : ''
									)}
								>
									{link.name.toUpperCase()}
								</div>
							</div>
						</Link>
					))}
				</div>
				<div className='flex flex-row items-center gap-2'>
					<ConnectWallet
						btnTitle='GET STARTED'
						modalTitle={'Start using ProWork'}
						modalSize={'wide'}
						welcomeScreen={{
							title: 'Share Content Cross-Chain with ease',
							subtitle: 'Connect to get Started',
						}}
						modalTitleIconUrl={''}
					/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
