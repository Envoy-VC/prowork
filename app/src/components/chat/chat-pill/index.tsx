import React from 'react';
import { useAddress } from '@thirdweb-dev/react';

import { formatTimestamp } from '~/helpers';

import type { DecodedMessage } from '@xmtp/react-sdk';

const ChatPill = ({ content, sent, senderAddress }: DecodedMessage) => {
	const address = useAddress();
	return (
		<div
			className={`flex flex-col ${
				senderAddress === address ? 'items-end self-end' : 'items-start self-start'
			}`}
		>
			<div
				className={`flex flex-col gap-1 ${
					senderAddress === address ? 'items-end' : 'items-start'
				}`}
			>
				<div
					className={`max-w-[300px] whitespace-pre-wrap break-words rounded-xl px-2 py-1 text-[1rem] font-medium sm:text-[1rem] md:px-3 lg:max-w-[500px] lg:rounded-xl lg:py-2 ${
						senderAddress === address
							? 'w-fit bg-[#2176FF] text-right text-white'
							: 'bg-[#F8F8F8]'
					}`}
				>
					{String(content)}
				</div>
			</div>
			<div className={`mt-[1px] flex items-center text-[10px] text-[#666666] `}>
				<div className='mx-[4px] font-medium'>{formatTimestamp(sent)}</div>
			</div>
		</div>
	);
};

export default ChatPill;
