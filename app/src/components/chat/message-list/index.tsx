import React from 'react';
import { useMessages, useStreamMessages } from '@xmtp/react-sdk';
import type { DecodedMessage } from '@xmtp/react-sdk';

import { useChatStore } from '~/stores';

import ChatPill, { CachedMessagePill } from '../chat-pill';
import SkeletonChatPill from '../chat-pill/skeleton';

import ZetaChainPill from '../zetachain-pill';

const MessageList = () => {
	const { conversation } = useChatStore();
	const chatContainer = React.useRef<HTMLDivElement>(null);
	const { messages, isLoading, error, isLoaded } = useMessages(conversation!);

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
			className='scrollbar-hide flex w-full flex-col gap-1 overflow-y-scroll p-4 px-2 sm:px-8'
			ref={chatContainer}
		>
			{isLoaded &&
				messages.map((message, index) => {
					if (message.contentType === 'xmtp.org/text:1.0') {
						return (
							<div className='w-full' key={index}>
								<CachedMessagePill {...message} />
							</div>
						);
					} else if (
						message.contentType === 'prowork-one.vercel.app/zetachain-interaction:1.0'
					) {
						return (
							<div className='w-full' key={index}>
								<ZetaChainPill message={message} />
							</div>
						);
					}
				})}
			{!isLoading && !error ? (
				streamedMessages.map((message, index) => {
					if (message.contentType.typeId === 'text') {
						return (
							<div className='w-full' key={index}>
								<ChatPill {...message} toBytes={() => message.toBytes()} />
							</div>
						);
					} else if (message.contentType.typeId === 'zetachain-interaction') {
						return (
							<div className='w-full' key={index}>
								<ZetaChainPill message={message} />
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
