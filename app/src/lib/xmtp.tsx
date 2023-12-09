import { ContentTypeId } from '@xmtp/react-sdk';
import type { ContentCodec, EncodedContent } from '@xmtp/react-sdk';

const ContentTypeZetaChainInteraction = new ContentTypeId({
	authorityId: 'prowork-one.vercel.app',
	typeId: 'zetachain-interaction',
	versionMajor: 1,
	versionMinor: 0,
});

interface ContentProps {
	omniChainContractAddress: string;
	sourceTssAddress: string;
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
		sourceTssAddress,
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
					sourceTssAddress,
					amount,
					targetToken,
					recipient,
				})
			),
		};
	}

	decode(encodedContent: EncodedContent): ContentProps {
		const uint8Array = encodedContent.content;
		const {
			omniChainContractAddress,
			sourceTssAddress,
			amount,
			targetToken,
			recipient,
		} = JSON.parse(new TextDecoder().decode(uint8Array)) as ContentProps;
		return {
			omniChainContractAddress,
			sourceTssAddress,
			amount,
			targetToken,
			recipient,
		};
	}

	fallback({
		omniChainContractAddress,
		sourceTssAddress,
		amount,
		targetToken,
		recipient,
	}: ContentProps): string {
		return `A ZetaChain Contract Interaction is requested to OmniChain Contract ${omniChainContractAddress} and ${amount}on TSS ${sourceTssAddress} to Token ${targetToken} and recipient ${recipient}`;
	}
}
