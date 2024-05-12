export enum Role {
    USER = "USER",
    OWNER = "OWNER"
}

export interface IUser {
    id: string,
    name: string,
    doc: string,
    email: string,
    password: string,
    role: Role
}