import { Order } from "./Order";

export interface Customer {
    CustomerID: string;
    Fullname: String,
    IDNumber: String,
    Phone: String,
    Address: String,
    History: Order[]
    Status: Status;

    AddCustomer(obj:Customer);

    UpdateCustomer(id: string, obj:Customer);

    ArchiveCustomer()
}

export enum Status{
    Active,
    Archived
}