import {
	Avatar,
	Button,
	Flex,
	Heading,
	Icon,
	Input,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

import useCustomToast from '../../../hooks/useToastHook';
import Logout from '../../../Routes/auth/Logout';
import { useAppDispatch, useAppSelector } from '../../store';
import { _updateUserProfile } from '../services';
import { userProfileActions } from '../slice';
import UserProfileAvatarUpload from './AvtarUpload';

const UserSetting = () => {
	const user = useAppSelector((state) => state.user.user);
	const userProfileData = useAppSelector(
		(state) => state.userProfile.userProfile
	);
	const [isOpenLogout, setIsOpenLogout] = useState(false);
	const [userName, setUserName] = useState(userProfileData?.userName || '');
	const [userBio, setUserBio] = useState(userProfileData?.bio || '');
	// const [avtarUrl, setAvtarUrl] = useState(userProfileData?.avtar_url);

	const closeLogout = () => setIsOpenLogout(false);
	const dispatch = useAppDispatch();
	const customToast = useCustomToast();

	// update handler
	const updateUserProfileHandler = async (e: {
		preventDefault: () => void;
	}) => {
		e.preventDefault();
		const updatedData = {
			userName: userName,
			bio: userBio,
		};

		const { data, error } = await _updateUserProfile({
			user_id: userProfileData?.user_id,
			updatedData: updatedData,
		});
		if (!error && data) {
			customToast({ title: 'Profile Updated.', status: 'success' });
			dispatch(
				userProfileActions.updateUserProfile({ updatedData: updatedData })
			);
		} else if (error) {
			customToast({ title: 'Error while updating profile.', status: 'error' });
		}
	};

	return (
		<>
			{isOpenLogout && <Logout onClose={closeLogout} />}
			<Stack p={2} w={{ base: '90%', md: '70%' }} m="auto">
				<Flex my={4} alignItems="center" justifyContent="space-between">
					<Stack>
						<Heading fontWeight="400" fontSize="24px">
							Profile
						</Heading>
						<Text fontSize="14px">Manage your EcliptiQ Profile</Text>
					</Stack>
					<Stack>
						<Text fontWeight="bold">
							{user?.username ? user.username : user?.email}
						</Text>
						<Flex
							alignItems="center"
							rounded="md"
							color="red"
							cursor="pointer"
							_hover={{ color: 'red.400', fontWeight: 'bold' }}
							justifyContent="center"
							onClick={() => setIsOpenLogout(true)}
						>
							<Icon as={FiLogOut} mr="1" />
							<Text>Logout</Text>
						</Flex>
					</Stack>
				</Flex>
				<hr />

				<Stack gap={{ base: 2, md: 4 }} my={4} w={{ base: 'full', md: '50%' }}>
					<Stack gap={4}>
						<Text>Profile Avatar</Text>
						<Avatar
							name={user?.username ? user.username : user?.email}
							boxSize={{ base: 150, md: 200 }}
							src={`https://kiiokeyfnlqufvpdyhap.supabase.co/storage/v1/object/public/avatars/${userProfileData?.avtar_url}`}
						/>
					</Stack>
					{!userProfileData?.avtar_url ? (
						''
					) : (
						<Stack>
							<UserProfileAvatarUpload userId={user?.id} />
						</Stack>
					)}
					<Stack gap={-2}>
						<Text>Email</Text>
						<Text fontSize="14px" fontWeight="bold">
							{user?.email}
						</Text>
					</Stack>

					<Stack>
						<Text>User Name</Text>
						<Input
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							placeholder="nick@"
							type="text"
						/>
					</Stack>
					<Stack>
						<Text>Bio</Text>
						<Textarea
							value={userBio}
							maxLength={150}
							onChange={(e) => setUserBio(e.target.value)}
							placeholder="Your bio not more than 150char..."
						/>
					</Stack>
					<Button
						onClick={updateUserProfileHandler}
						mb={4}
						size="sm"
						variant="blue"
						w="fit-content"
					>
						Update Account
					</Button>
				</Stack>
				<hr />
				<Stack my={4} gap={4}>
					<Text fontWeight="black">Connected accounts</Text>
					<Text fontSize="14px">
						Log in to EcliptiQ with your Google, or Email Password.
					</Text>
					<Text fontSize="14px">
						You can log in to EcliptiQ with your Google account
						<b> tschauhan271@gmail.com.</b>
					</Text>
				</Stack>
				<hr />
				<Stack gap={4} my={4}>
					<Text fontWeight="bold">Delete account</Text>
					<Text fontSize="14px">
						This will immediately delete all of your data including tasks,
						projects, comments, and more. This can’t be undone.
					</Text>

					<Button size="sm" variant="red" w="fit-content">
						Delete Account
					</Button>
				</Stack>
			</Stack>
		</>
	);
};

export default UserSetting;
