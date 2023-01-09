export interface CreateUserDto {
    name: string;
    email: string;
    username: string;
    password: string;
    enum_access_level?: 'normal' | 'admin';
}

