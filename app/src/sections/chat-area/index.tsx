import React from 'react';
import { useConversations } from '@xmtp/react-sdk';
import { useChatStore } from '~/stores';

import { ChatBox, MessageList } from '~/components/chat';

const ChatArea = () => {
	const { conversations, error, isLoading } = useConversations();
	const { peerAddress, setConversation, conversation } = useChatStore();

	React.useEffect(() => {
		if (!isLoading && conversations && peerAddress) {
			const conversation = conversations.find(
				(conversation) => conversation.peerAddress === peerAddress
			);
			if (conversation) {
				setConversation(conversation);
			}
		}
	}, [isLoading]);

	return (
		<div className='scrollbar-hide profileDetails flex h-[80vh] w-full flex-col justify-end overflow-y-scroll rounded-md'>
			{!conversation && (
				<div className='flex h-full w-full items-center justify-center'>
					Start a new Conversation
				</div>
			)}
			{conversation && <MessageList />}
			<ChatBox />
		</div>
	);
};

export default ChatArea;
