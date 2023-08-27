import transporter from './nodemailerConfig';

interface EmailOptions {
	to: string;
	subject: string;
	text: string;
}

export const sendEmail = async (options: EmailOptions) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		...options,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent:', info.response);
		return true;
	} catch (error) {
		console.error('Error sending email:', error);
		return false;
	}
};
