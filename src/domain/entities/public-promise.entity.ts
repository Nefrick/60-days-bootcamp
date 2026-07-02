import { PromiseStatus } from '../enums/promise-status.enum';
import { PromiseType } from '../enums/promise-type.enum';

export class PublicPromise {
  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public title: string,
    public description: string,
    public type: PromiseType = PromiseType.Personal,
    public status: PromiseStatus = PromiseStatus.Pending,
    public dueDate: Date,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
