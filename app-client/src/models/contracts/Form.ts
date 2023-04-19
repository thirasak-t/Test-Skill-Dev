export type RegisterProfileForm = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    profileImage: string;
};

export type EditProfileForm = {
    firstname: string;
    lastname: string;
    profileImage: string;
};

export type ChangePasswordForm = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};
