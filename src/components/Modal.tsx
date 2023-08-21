import { Box, CloseButton } from '@chakra-ui/react';
import {
	JSXElementConstructor,
	MouseEventHandler,
	ReactElement,
	ReactNode,
	ReactPortal,
} from 'react';

const Modal = (props: {
	// eslint-disable-next-line no-undef
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
				position="fixed"
				top={0}
				left={0}
				w="100%"
				h="100vh"
				zIndex={10}
				backgroundColor="rgba(0, 0, 0,0.2)"
				onClick={props.onClose}
			/>
			<Box
				position="fixed"
				top="10%"
				left={{ base: '5%', md: '35%' }}
				right={{ base: '5%', md: '35%' }}
				boxShadow="xl"
				minW={{ base: '90%', md: '30%' }}
				zIndex={50}
				bg="white"
				rounded="2xl"
				pt={2}
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
