import React from 'react';
import { useClient } from '@xmtp/react-sdk';
import { useSigner, useAddress } from '@thirdweb-dev/react';
import { Button } from 'antd';
import toast from 'react-hot-toast';

import { CgSpinner } from 'react-icons/cg';
import ReactNode from 'react';

const ProfileChat = () => {
	const { client, error, isLoading, initialize } = useClient();
	const signer = useSigner();
	const address = useAddress();

	const handleConnect = React.useCallback(async () => {
		const options = {
			persistConversations: false,
			env: 'dev' as 'dev' | 'local' | 'production' | undefined,
		};
		try {
			await initialize({ options, signer });
		} catch (error) {
			toast.error('An error occurred while initializing the client');
		}
	}, [initialize]);

	if (!address) {
		return (
			<Wrapper>
				<Button
					type='primary'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={handleConnect}
				>
					Connect Wallet
				</Button>
			</Wrapper>
		);
	} else if (address && !client && !isLoading) {
		return (
			<Wrapper>
				<Button
					size='large'
					type='primary'
					className='bg-secondary'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={handleConnect}
				>
					Start Chat
				</Button>
			</Wrapper>
		);
	} else if (address && !client && isLoading) {
		return (
			<Wrapper>
				<div className='text-center text-xl font-semibold'>
					<CgSpinner className='mr-2 inline-block animate-spin' />
					Loading...
				</div>
			</Wrapper>
		);
	} else if (address && client) {
		return (
			<Wrapper>
				<div>Connected</div>
			</Wrapper>
		);
	}
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='profileDetails flex h-full flex-col items-center justify-center rounded-xl'>
			{children}
		</div>
	);
};

export default ProfileChat;
