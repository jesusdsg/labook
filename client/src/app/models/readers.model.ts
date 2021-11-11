export class Readers {
    id?: string;
    username: string;
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    phone: number;

    constructor(username: string, firstname: string, lastname: string, address: string, email: string, phone: number) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }
}