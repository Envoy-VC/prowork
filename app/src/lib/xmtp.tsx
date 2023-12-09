import { ContentTypeId } from '@xmtp/react-sdk';
import type { ContentCodec, EncodedContent } from '@xmtp/react-sdk';

export const ContentTypeZetaChainInteraction = new ContentTypeId({
	authorityId: 'prowork-one.vercel.app',
	typeId: 'zetachain-interaction',
	versionMajor: 1,
	versionMinor: 0,
});

export interface ContentProps {
	omniChainContractAddress: string;
	amount: string;
	targetToken: string;
	recipient: string;
}

export class ZetaChainTypeCodec implements ContentCodec<ContentProps> {
	get contentType() {
		return ContentTypeZetaChainInteraction;
	}

	encode({
		omniChainContractAddress,
		amount,
		targetToken,
		recipient,
	}: ContentProps): EncodedContent {
		return {
			type: ContentTypeZetaChainInteraction,
			parameters: {},
			content: new TextEncoder().encode(
				JSON.stringify({
					omniChainContractAddress,
					amount,
					targetToken,
					recipient,
				})
			),
		};
	}

	decode(encodedContent: EncodedContent): ContentProps {
		const uint8Array = encodedContent.content;
		const { omniChainContractAddress, amount, targetToken, recipient } =
			JSON.parse(new TextDecoder().decode(uint8Array)) as ContentProps;
		return {
			omniChainContractAddress,
			amount,
			targetToken,
			recipient,
		};
	}

	fallback({
		omniChainContractAddress,
		amount,
		targetToken,
		recipient,
	}: ContentProps): string {
		return `A ZetaChain Contract Interaction is requested to OmniChain Contract ${omniChainContractAddress} and ${amount}to Token ${targetToken} and recipient ${recipient}`;
	}
}
