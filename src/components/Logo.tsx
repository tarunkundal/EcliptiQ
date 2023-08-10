import { Box, Image, ResponsiveValue, Text } from '@chakra-ui/react';

import logo from '../assets/logoQ.png';

const Logo = (props: {
	size:
		| ResponsiveValue<
				| number
				| 'sm'
				| 'md'
				| 'lg'
				| 'xl'
				| '2xl'
				| (string & object)
				| 'small'
				| 'inherit'
				| '-moz-initial'
				| 'initial'
				| 'revert'
				| 'revert-layer'
				| 'unset'
				| '3xs'
				| '2xs'
				| 'xs'
				| '3xl'
				| '4xl'
				| '5xl'
				| '6xl'
				| '7xl'
				| '8xl'
				| 'medium'
				| 'large'
				| 'x-large'
				| 'x-small'
				| 'xx-large'
				| 'xx-small'
				| 'xxx-large'
				| 'larger'
				| 'smaller'
				| '9xl'
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  >
		| undefined;
}) => {
	return (
		<Box
			display="flex"
			alignItems="center"
			onClick={() => (window.location.href = 'https://ecliptiq.vercel.app/')}
			cursor="pointer"
			boxSize={props.size}
		>
			<Image src={logo} alt="logo" />

			<Text fontWeight="extrabold" fontSize={`${props.size}px`} mt={2}>
				EcliptiQ
			</Text>
		</Box>
	);
};

export default Logo;
