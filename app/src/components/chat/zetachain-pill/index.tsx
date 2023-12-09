import React from 'react';

import type { DecodedMessage, CachedMessageWithId } from '@xmtp/react-sdk';
import { reactionContentTypeConfig, useSendMessage } from '@xmtp/react-sdk';
import type { ContentProps } from '~/lib/xmtp';
import { Avatar, Button } from 'antd';

import { useAddress } from '@thirdweb-dev/react';

import PayModal from '../pay-modal';

import { getTargetChainAndTss } from '~/helpers';
import { useChatStore } from '~/stores';

import type { Reaction } from '@xmtp/content-type-reaction';
import { ContentTypeReaction } from '@xmtp/content-type-reaction';

import { useReactions } from '@xmtp/react-sdk';

interface Props {
	message: DecodedMessage | CachedMessageWithId;
}

const ZetaChainPill = ({ message }: Props) => {
	const reactions = useReactions(message as CachedMessageWithId);

	const address = useAddress();
	const { conversation } = useChatStore();

	const [payModalOpen, setPayModalOpen] = React.useState<boolean>(false);
	const sentAt =
		(message as CachedMessageWithId).sentAt ?? (message as DecodedMessage).sent;
	const content = message.content as ContentProps;
	const { amount } = content;
	const xmtpId = (message as CachedMessageWithId).xmtpID;
	const { icon, tss, name } = getTargetChainAndTss(content.targetToken);

	const { sendMessage } = useSendMessage();

	const hasApproved = reactions.find(
		(r) => r.senderAddress === content.recipient
	);

	const markAsPaid = async () => {
		if (hasApproved) return;
		try {
			const res = await sendMessage(
				conversation!,
				{
					content: '👍',
					schema: 'unicode',
					reference: xmtpId,
					action: 'added',
				} as Reaction,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				ContentTypeReaction
			);
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className='my-4 max-w-[256px] rounded-3xl bg-gray-100 p-4'>
			<div className='flex flex-col gap-4'>
				<span className='text-center text-sm font-medium'>
					Payment Request from
				</span>
				<div className='flex flex-row items-center justify-center gap-2 text-xl font-medium'>
					{/*<Avatar
						size={36}
						src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
	/>*/}
					<span>
						{content?.recipient?.slice(0, 5) + '...' + content?.recipient?.slice(-5)}
					</span>
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
				{address !== content.recipient ? (
					<Button
						className='my-4 w-full !bg-secondary hover:bg-secondary'
						type='primary'
						size='large'
						shape='round'
						onClick={() => {
							if (hasApproved) return;
							setPayModalOpen(true);
						}}
					>
						{hasApproved ? 'Paid' : 'Pay Now'}
					</Button>
				) : (
					<Button
						className='my-4 w-full !bg-secondary hover:bg-secondary'
						type='primary'
						size='large'
						shape='round'
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={markAsPaid}
					>
						{hasApproved ? 'Paid' : 'Mark as Paid'}
					</Button>
				)}
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
