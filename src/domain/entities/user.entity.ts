export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
