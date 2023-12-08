import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';
import { usePathname } from 'next/navigation';

const NavLinks = [
	{
		name: 'for customers',
		href: '/',
	},
	{
		name: 'for constructors',
		href: '/work',
	},
];

const Navbar = () => {
	const pathname = usePathname();
	return (
		<div className='p-4 px-6'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<div className='hidden text-xl font-semibold sm:flex'>ProWork</div>
				</div>
				<div className='flex flex-row items-center gap-4'>
					{NavLinks.map((link, index) => (
						<Link href={link.href} key={index}>
							<div className='group relative overflow-x-hidden'>
								<span
									className={clsx(
										'text-xl',
										pathname === link.href ? 'font-bold' : 'font-normal'
									)}
								>
									{link.name}
								</span>
								<div
									className={clsx(
										'absolute bottom-0 h-[3px] w-full bg-black duration-500 ease-out group-hover:translate-x-0',
										pathname === link.href ? 'translate-x-0' : 'translate-x-[-102%]'
									)}
								></div>
							</div>
						</Link>
					))}
				</div>
				<div className='flex flex-row items-center gap-2'>
					<ConnectWallet
						btnTitle='get started'
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
