export class Candidate {
  id?: number;
  name: string;
  email: string;
  password: string;
  profileId?: number;

  constructor(name: string, email: string, password: string, profileId?: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.profileId = profileId;
  }
}
