import React from 'react';
import { useMessages, useStreamMessages } from '@xmtp/react-sdk';
import type { DecodedMessage } from '@xmtp/react-sdk';

import { useChatStore } from '~/stores';

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
	}, [conversation, messages]);

	return (
		<div
			className='scrollbar-hide flex w-full flex-col gap-1 overflow-y-scroll p-4 px-2 sm:px-8'
			ref={chatContainer}
		>
			{messages.map((message, index) => {
				return <div key={index}>{message.content}</div>;
			})}
			{streamedMessages?.map((message, index) => {
				return <div key={index}>{message.content}</div>;
			})}
		</div>
	);
};

export default MessageList;
