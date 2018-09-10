export interface User {
    UserID: String;
    Username: String,
    Password: String,
    Role: Role,
    LastAccessed: Date
}

export enum Role {
    SuperUser,
    Guest
}