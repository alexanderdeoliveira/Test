module.exports = class User {
    id;
    name;
    email;
    password;

    constructor(id, email, password, name){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}