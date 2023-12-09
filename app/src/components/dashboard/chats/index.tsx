import React from 'react';
import {
	useConversations,
	useMessages,
	SortDirection,
	ContentTypeId,
} from '@xmtp/react-sdk';
import type {
	CachedConversation,
	ContentTypeMetadata,
	DecodedMessage,
} from '@xmtp/react-sdk';

import { useChatStore } from '~/stores';

// Icon
import { PiUserBold } from 'react-icons/pi';
import { CgSpinner } from 'react-icons/cg';

const Chats = () => {
	const { conversations, error, isLoading } = useConversations();
	if (!isLoading)
		return (
			<div className='profileDetails flex h-[80vh] flex-col rounded-md p-4'>
				<div className='flex flex-col gap-1'>
					{conversations.map((conversation) => (
						<ConversationPill
							key={conversation.peerAddress}
							conversation={conversation}
						/>
					))}
				</div>
			</div>
		);
	else
		return (
			<div className='flex w-full items-center justify-center py-8'>
				<CgSpinner className='mr-2 inline-block animate-spin text-3xl' />
			</div>
		);
};

const ConversationPill = ({
	conversation,
}: {
	conversation: CachedConversation<ContentTypeMetadata>;
}) => {
	const { setConversation, setPeerAddress } = useChatStore();
	const [lastMessage, setLastMessage] = React.useState<DecodedMessage | null>();

	const {} = useMessages(conversation, {
		onMessages: (messages) => setLastMessage(messages[messages.length - 1]),
	});

	return (
		<div
			className={`animate-all flex w-full select-none flex-row items-center justify-between gap-4 rounded-xl p-2 duration-200 ease-in-out hover:bg-[#5a99ff2f]`}
			onClick={() => {
				setConversation(conversation);
				setPeerAddress(conversation.peerAddress);
			}}
		>
			<div
				className='flex cursor-pointer flex-row gap-4'
				onClick={() => {
					setConversation(conversation);
				}}
			>
				<div className='h-12 w-12 rounded-full'>
					<PiUserBold size={32} color='#666666' className='m-auto mt-1' />
				</div>
				<div className='flex flex-col'>
					<div className='w-fit'>
						<p className={`!max-w-[200px] text-[1rem] font-semibold`}>
							{conversation?.peerAddress.slice(0, 6) +
								'...' +
								conversation?.peerAddress.slice(-4)}
						</p>
					</div>

					<div className='flex flex-row items-center text-[0.75rem] font-medium text-[#A4A8AE]'>
						<div>
							{lastMessage?.contentType?.typeId === 'text' ? (
								<p className='!max-w-[200px] text-[1rem] font-semibold'>
									{lastMessage?.content}
								</p>
							) : (
								''
							)}
						</div>
						<div className='text=[1rem]'>
							• {lastMessage?.sent.toLocaleTimeString()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chats;
