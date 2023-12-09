import { create } from 'zustand';
import type { CachedConversation, ContentTypeMetadata } from '@xmtp/react-sdk';

interface State {
	peerAddress: string;
	conversation: CachedConversation<ContentTypeMetadata> | null;
}

interface Actions {
	setPeerAddress: (peerAddress: string) => void;
	setConversation: (
		conversation: CachedConversation<ContentTypeMetadata>
	) => void;
}

export const useChatStore = create<State & Actions>((set) => ({
	peerAddress: '',
	conversation: null,
	setPeerAddress: (peerAddress: string) => set({ peerAddress }),
	setConversation: (conversation: CachedConversation<ContentTypeMetadata>) =>
		set({ conversation }),
}));
