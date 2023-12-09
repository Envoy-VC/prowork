import React from 'react';

import type { DecodedMessage, CachedMessageWithId } from '@xmtp/react-sdk';
import type { ContentProps } from '~/lib/xmtp';
import { Avatar, Button } from 'antd';

import PayModal from '../pay-modal';

import { getTargetChainAndTss } from '~/helpers';

interface Props {
	message: DecodedMessage | CachedMessageWithId;
}

const ZetaChainPill = ({ message }: Props) => {
	const [payModalOpen, setPayModalOpen] = React.useState<boolean>(false);
	const sentAt =
		(message as CachedMessageWithId).sentAt ?? (message as DecodedMessage).sent;
	const content = message.content as ContentProps;
	const { amount } = content;
	const { icon, tss, name } = getTargetChainAndTss(content.targetToken);
	return (
		<div className='my-4 max-w-[256px] rounded-3xl bg-gray-100 p-4'>
			<div className='flex flex-col gap-4'>
				<span className='text-center text-sm font-medium'>
					Payment Request from
				</span>
				<div className='flex flex-row items-center justify-center gap-2 text-xl font-medium'>
					<Avatar
						size={36}
						src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
					/>
					<span>envoy1084.eth</span>
				</div>
				<span className='font-gray-500 text-center text-xs font-semibold'>
					{' '}
					for
				</span>
				<div className='flex flex-row items-center justify-center gap-2 text-xl font-medium'>
					<Avatar size={36} src={icon} />
					<span>
						{amount} {name}
					</span>
				</div>
				<Button
					className='my-4 w-full !bg-secondary hover:bg-secondary'
					type='primary'
					size='large'
					shape='round'
					onClick={() => setPayModalOpen(true)}
				>
					Pay Now
				</Button>
			</div>
			<PayModal
				content={content}
				open={payModalOpen}
				close={() => setPayModalOpen(false)}
			/>
		</div>
	);
};

export default ZetaChainPill;
