import { Box, CloseButton } from '@chakra-ui/react';
import {
	MouseEventHandler,
	ReactElement,
	JSXElementConstructor,
	ReactNode,
	ReactPortal,
} from 'react';

const Modal = (props: {
	onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> | undefined;
	children:
		| string
		| number
		| boolean
		| ReactElement<any, string | JSXElementConstructor<any>>
		| Iterable<ReactNode>
		| ReactPortal
		| null
		| undefined;
}) => {
	return (
		<>
			<Box
				position={'fixed'}
				top={0}
				left={0}
				w="100%"
				h="100vh"
				zIndex={10}
				backgroundColor={'rgba(0, 0, 0,0.2)'}
				onClick={props.onClose}
			/>
			<Box
				position={'fixed'}
				top="10%"
				left={{ base: '8%', md: '35%' }}
				boxShadow={'xl'}
				minWidth={{ base: '80%', md: '30%' }}
				zIndex={50}
				p={4}
				bg="white"
				rounded="2xl"
			>
				<CloseButton
					onClick={props.onClose}
					color="red"
					border="1px"
					position="absolute"
					right={5}
					_hover={{ bg: 'red', color: 'white' }}
				/>

				{props.children}
			</Box>
		</>
	);
};

export default Modal;
