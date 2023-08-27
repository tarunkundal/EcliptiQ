// nodemailerConfig.ts
import { createTransport } from 'nodemailer';

const transporter = createTransport({
	service: 'Gmail',
	auth: {
		user: import.meta.env.EMAIL_USER,
		pass: import.meta.env.EMAIL_PASSWORD,
	},
});

export default transporter;
