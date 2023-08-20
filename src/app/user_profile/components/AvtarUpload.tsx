import { Button, Spinner, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useCustomToast from '../../../hooks/useToastHook';
import { useAppDispatch } from '../../store';
import supabase from '../../supabase';
import { _updateAvatar } from '../services';
import { userProfileActions } from '../slice';

interface UserProfileAvatarUploadProps {
	userId: string | undefined; // Pass the user ID as a prop
}

const UserProfileAvatarUpload: React.FC<UserProfileAvatarUploadProps> = ({
	userId,
}) => {
	// eslint-disable-next-line no-undef
	const [selectedAvatar, setSelectedAvatar] = useState<File | null | undefined>(
		null
	);
	const [isUpdating, setIsUpdating] = useState(false);
	const customToast = useCustomToast();
	const dispatch = useAppDispatch();

	// eslint-disable-next-line no-undef
	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setSelectedAvatar(file);
	};

	const handleUpload = async () => {
		if (!selectedAvatar) {
			customToast({ title: 'Please Select File.', status: 'info' });
			return;
		}
		try {
			// Upload the avatar image to storage
			setIsUpdating(true);
			const { data, error } = await supabase.storage
				.from('avatars') // Use your storage bucket name here
				.upload(userId + '/' + uuidv4(), selectedAvatar);

			setIsUpdating(false);
			if (error) {
				customToast({
					title: 'Error while uploading avatar.',
					description: error.message,
					status: 'error',
				});
				return;
			} else {
				customToast({
					title: 'Sucessfully uploaded Avatar.',
					status: 'success',
				});
			}
			const avatarUrl = `${data.path}`; // The key returned from storage

			// Update the user_profile record with the avatar URL
			const { data: updateData, error: updateError } = await _updateAvatar({
				avatarUrl: avatarUrl,
				userId: userId,
			});

			if (updateError) {
				customToast({ title: 'Error updating avatar URL', status: 'error' });
				return;
			} else if (updateData) {
				customToast({
					title: 'Avatar uploaded and profile updated successfully',
					status: 'success',
				});
				dispatch(
					userProfileActions.updateUserAvatar({ updatedData: updateData[0] })
				);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<Stack my={4}>
			<input
				style={{ cursor: 'pointer' }}
				type="file"
				accept="image/*"
				onChange={handleAvatarChange}
			/>
			<Button
				width="max-content"
				size="sm"
				onClick={handleUpload}
				variant="highlight"
			>
				{isUpdating ? <Spinner /> : 'Upload Avatar'}
			</Button>
		</Stack>
	);
};

export default UserProfileAvatarUpload;
