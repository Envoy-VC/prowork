import React from 'react';
import { ConfigProvider, theme } from 'antd';

import { useIsMounted } from 'usehooks-ts';

interface Props {
	children: React.ReactNode;
}

const AntDesignConfigProvider = ({ children }: Props) => {
	const [mounted, setMounted] = React.useState<boolean>(false);

	const isMounted = useIsMounted();

	React.useEffect(() => {
		if (isMounted()) {
			setMounted(true);
		}
	}, [isMounted]);

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.defaultAlgorithm,
			}}
		>
			{mounted && children}
		</ConfigProvider>
	);
};

export default AntDesignConfigProvider;
