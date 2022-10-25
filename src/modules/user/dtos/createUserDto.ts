export interface CreateUserDto {
    name: string;
    email: string;
    username: string;
    password: string;
    phone?: string;
    enum_access_level?: 'normal' | 'admin';
}

