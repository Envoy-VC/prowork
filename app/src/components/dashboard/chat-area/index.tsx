import React from 'react';

import { ChatBox, MessageList } from '~/components/chat';

const ChatArea = () => {
	return (
		<div className='scrollbar-hide flex h-full w-full flex-col justify-end overflow-y-scroll p-2'>
			<MessageList />
			<ChatBox />
		</div>
	);
};

export default ChatArea;
