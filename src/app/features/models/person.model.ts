export class Person {
    idPerson?: number;
    name?: string;
    lastName?: string;
    email?: string;
    courses?: any[];
    type?: string;
    username?: string;
    password?: string;

    constructor(idPerson?: number, name?: string, lastName?: string, email?: string, courses?: number[], type?: string, username?: string, password?: string) {
        this.idPerson = idPerson;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.courses = courses;
        this.type = type;
        this.username = username;
        this.password = password;
    }
}
