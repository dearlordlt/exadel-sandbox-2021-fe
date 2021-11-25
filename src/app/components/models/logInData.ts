export class LogInData{
    //private email: string;
    private username: string;
    private password: string;

    constructor(
        //email: string,
        username: string,
        password: string){
        //this.email = email;
        this.username = username;
        this.password = password;
    }
    // getEmail(): string{
    //     return this.email;
    // }
    getUsername(): string{
        return this.username;
    }
    getPassword(): string{
        return this.password;
    }
}