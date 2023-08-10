import { Box } from '@chakra-ui/react';
import {
	JSXElementConstructor,
	MouseEventHandler,
	ReactElement,
	ReactNode,
	ReactPortal,
} from 'react';

const Modal = (props: {
	onClose: MouseEventHandler<HTMLDivElement> | undefined;
	children:
		| string
		| number
		| boolean
		| ReactElement<unknown, string | JSXElementConstructor<unknown>>
		| Iterable<ReactNode>
		| ReactPortal
		| null
		| undefined;
}) => {
	return (
		<>
			<Box
				position="fixed"
				top={0}
				left={0}
				w="100%"
				h="100vh"
				zIndex={10}
				backgroundColor="gray.50"
				onClick={props.onClose}
			/>
			<Box mt="20%" mx="auto" zIndex={50}>
				{props.children}
			</Box>
		</>
	);
};

export default Modal;
