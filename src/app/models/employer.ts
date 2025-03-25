export class Employer {
    id?: number;
    name: string;
    email: string;
    password: string;
    companyName: string;
  
    constructor(name: string, email: string, password: string, companyName: string) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.companyName = companyName;
    }
  }
  