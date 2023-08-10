import { useToast, UseToastOptions } from '@chakra-ui/react';

type CustomToastOptions = {
	title: string;
	description?: string;
	status: 'info' | 'warning' | 'success' | 'error';
	duration?: number;
	isClosable?: boolean;
};

type ToastFunction = (options: CustomToastOptions) => void;

const useCustomToast = (): ToastFunction => {
	const toast = useToast();

	const customToast: ToastFunction = (options) => {
		const toastOptions: UseToastOptions = {
			title: options.title,
			description: options.description || '',
			status: options.status,
			duration: options.duration || 3000,
			isClosable: options.isClosable || true,
		};

		toast(toastOptions);
	};

	return customToast;
};

export default useCustomToast;
