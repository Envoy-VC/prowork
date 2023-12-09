import React from 'react';
import { useMessages, useStreamMessages } from '@xmtp/react-sdk';
import type { DecodedMessage } from '@xmtp/react-sdk';

import { useChatStore } from '~/stores';

import ChatPill from '../chat-pill';
import SkeletonChatPill from '../chat-pill/skeleton';

const MessageList = () => {
	const { conversation } = useChatStore();
	const chatContainer = React.useRef<HTMLDivElement>(null);
	const { messages, isLoading, error } = useMessages(conversation!);

	const [streamedMessages, setStreamedMessages] = React.useState<
		DecodedMessage[]
	>([]);

	const onMessage = React.useCallback(
		(message: DecodedMessage) => {
			setStreamedMessages((prev) => [...prev, message]);
		},
		[streamedMessages]
	);

	useStreamMessages(conversation!, {
		onMessage,
	});

	React.useEffect(() => {
		setStreamedMessages([]);
	}, [conversation]);

	const Scroll = () => {
		const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current!;
		chatContainer.current?.scrollTo(0, scrollHeight);
	};

	React.useEffect(() => {
		Scroll();
	}, [streamedMessages]);

	return (
		<div
			className='scrollbar-hide flex h-full w-full flex-col gap-1 overflow-y-scroll p-4 px-2 sm:px-8'
			ref={chatContainer}
		>
			{!isLoading && !error ? (
				streamedMessages.map((message, index) => {
					if (message.contentType.typeId === 'text') {
						return (
							<div className='w-full' key={index}>
								<ChatPill {...message} toBytes={() => message.toBytes()} />
							</div>
						);
					} else if (message.contentType.typeId === 'custom') {
						return (
							<div className='w-full' key={index}>
								todo
							</div>
						);
					}
				})
			) : (
				<>
					{error ? (
						<div className='mt-2 text-[1rem] text-[#FF4D4F]'>
							Error fetching Messages
						</div>
					) : (
						Array(8)
							.fill(1)
							.map((_, index) => <SkeletonChatPill key={index} index={index} />)
					)}
				</>
			)}
		</div>
	);
};

export default MessageList;
