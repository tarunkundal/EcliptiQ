import { Button, Input, Select, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import Modal from '../components/Modal';

const InviteMemberForm = () => {
	return (
		<Modal onClose={undefined}>
			<Stack p={2}>
				<Text mb={2} fontWeight="semibold">
					Invite your team
				</Text>

				<hr />
				<Stack>
					<Stack>
						<Text>Email</Text>
						<Input h={14} placeholder="example@gmail.com" type="textarea" />
					</Stack>

					<Stack>
						<Text>Add to team</Text>
						<Select placeholder="Select option">
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</Select>
					</Stack>
				</Stack>
				<Button ml="50%" mt={2} w="50%" variant="blue">
					Send Invite
				</Button>
			</Stack>
		</Modal>
	);
};

export default InviteMemberForm;
