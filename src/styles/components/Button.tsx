const Button = {
	// Base style for the button
	baseStyle: {
		fontWeight: 'bold',
		fontFamily: 'Nunito Sans, sans-serif',
		borderRadius: 'md',
		boxShadow: 'md',
		transition: 'ease-in-out 0.5s all',
		_hover: {
			cursor: 'pointer',
			transform: 'scale(0.97) ',
			boxShadow: 'lg',
		},
	},
	variants: {
		green: {
			bg: '#2FDD92',
			color: 'rgb(228,248,242)',
			_hover: {
				bg: '#38E54D',
			},
		},
		blue: {
			bg: '#4E4FEB',
			color: 'white',
			_hover: {
				bg: '#068FFF',
			},
		},
		pink: {
			bg: '#FB7AFC',
			color: 'white',
			_hover: {
				bg: '#FFA3FD',
			},
		},
		red: {
			bg: '#FF0000',
			color: 'white',
			_hover: {
				bg: '#FF6F5E',
			},
		},
		highlight: {
			bg: 'linear-gradient(45deg,#8920FE,#FF0bef, #8920FE)',
			color: 'white',
			_hover: {
				bg: 'linear-gradient(45deg,#8920FE,#FF0bef,#FF0bef, #8920FE)',
			},
		},
	},
};

export default Button;
