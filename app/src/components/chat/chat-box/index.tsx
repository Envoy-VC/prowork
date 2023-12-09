import React from 'react';
import { Input, Button } from 'antd';

// hooks
import { usePathname } from 'next/navigation';
import { useChatStore } from '~/stores';
import {
	isValidAddress,
	useStartConversation,
	useSendMessage,
} from '@xmtp/react-sdk';

import PaymentsModal from '../payments-modal';

// Icons
import { TbSend, TbCash } from 'react-icons/tb';
import { CgSpinner } from 'react-icons/cg';
import toast from 'react-hot-toast';

const ChatBox = () => {
	const { startConversation } = useStartConversation();
	const { sendMessage } = useSendMessage();
	const pathName = usePathname();

	const { peerAddress, setConversation, conversation } = useChatStore();

	const [paymentModalOpen, setPaymentModalOpen] = React.useState<boolean>(false);

	const [message, setMessage] = React.useState<string>('');
	const [isSending, setIsSending] = React.useState<boolean>(false);

	const handleStartConversation = React.useCallback(
		async (message: string) => {
			if (message === '') return;
			if (peerAddress && message && isValidAddress(peerAddress)) {
				setIsSending(true);
				const conversation = await startConversation(peerAddress, message);
				console.log(conversation);
				if (conversation?.cachedConversation)
					setConversation(conversation?.cachedConversation);
				setIsSending(false);
			}
		},
		[message, peerAddress, startConversation]
	);

	const handleSendMessage = React.useCallback(
		async (message: string) => {
			if (peerAddress && isValidAddress(peerAddress) && message && conversation) {
				await sendMessage(conversation, message);
			}
		},
		[message, peerAddress, sendMessage]
	);

	const handleSend = async () => {
		if (message === '') {
			toast.error('Message cannot be empty');
			return;
		}
		try {
			setIsSending(true);
			if (!conversation) {
				await handleStartConversation(message);
			} else {
				await handleSendMessage(message);
			}
			setMessage('');
		} catch (error) {
			console.error(error);
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className='flex w-full flex-col gap-2 border-t-2 border-[#F2F2F2] p-4 pt-6'>
			<div className='flex w-full flex-row items-center gap-2'>
				{pathName === '/dashboard' && (
					<Button
						type='text'
						size='large'
						icon={<TbCash size={24} className='text-slate-900' />}
						onClick={() => setPaymentModalOpen(true)}
					/>
				)}
				<div className='flex w-full flex-col items-start justify-start gap-4'>
					<Input.TextArea
						placeholder='Write Something...'
						value={message}
						bordered={false}
						disabled={isSending}
						className='items-center rounded-md bg-[#F8F8F8] p-2 py-[12px] text-[1rem] outline-none hover:bg-[#F8F8F8] focus:bg-[#F8F8F8] focus:outline-none'
						onChange={(e) => setMessage(e.target.value)}
						autoSize={{ minRows: 1 }}
					/>
				</div>
				<Button
					type='primary'
					className={`flex flex-row-reverse items-center justify-center bg-secondary !px-4 font-medium ${
						isSending ? 'opacity-60' : 'opacity-100'
					}`}
					disabled={isSending}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={handleSend}
					size='large'
					icon={
						true ? (
							<TbSend color='#fff' size={24} className='' />
						) : (
							<CgSpinner className='mr-2 inline-block animate-spin' />
						)
					}
				/>
			</div>
			<PaymentsModal
				open={paymentModalOpen}
				close={() => {
					setPaymentModalOpen(false);
				}}
			/>
		</div>
	);
};

export default ChatBox;
