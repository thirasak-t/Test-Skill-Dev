export interface RequestUpdatePassword {
    currentPassword: string;
    newPassword: string;
}

export interface RequestUpdateProfile {
    userId: string;
    firstname: string;
    lastname: string;
    profileImage: string;
}
