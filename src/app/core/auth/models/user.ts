export class User {
    idUser?: number;
    username?: string;
    password?: string;
    type?: string;
    logged?: boolean;
    
    constructor(idUser?: number, username?:string, password?: string, type?: string, logged?: boolean) {
        this.idUser = idUser;
        this.username = username;
        this.password = password;
        this.type = type;
        this.logged = logged;        
    }
}
