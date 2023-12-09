import React from 'react';
import { useConversations } from '@xmtp/react-sdk';
import { useChatStore } from '~/stores';

const ChatArea = () => {
	const { conversations, error, isLoading } = useConversations();
	const { peerAddress, setConversation } = useChatStore();
	const chatContainer = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		console.log(peerAddress);
		if (!isLoading && conversations && peerAddress) {
			console.log(conversations);
			const conversation = conversations.find(
				(conversation) => conversation.peerAddress === peerAddress
			);
			if (conversation) {
				console.log(conversation);
				setConversation(conversation);
			}
		}
	}, [conversations, isLoading]);

	return (
		<div className='scrollbar-hide flex h-full w-full flex-col justify-end overflow-y-scroll p-2'>
			ChatArea
		</div>
	);
};

export default ChatArea;
