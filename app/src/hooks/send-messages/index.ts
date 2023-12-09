import React from 'react';
import { isValidAddress, useStartConversation } from '@xmtp/react-sdk';

interface StartConversationProps {
	message: string;
}

const useSendMessage = () => {
	const { startConversation } = useStartConversation();

	const startConversation = async () => {};
};

export default useSendMessage;
