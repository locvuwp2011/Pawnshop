export interface Order {
    OrderID: String;
    Fullname: String;
    ProductType: ProductType;
    Amount: Number;
    Rate: Number;
    DongLai: DongLai[];
    Status: Status;
    DateCreated: Date;
    Date_ThanhLy: Date;
    Audit: Audit[];
    UserID: String;
    Completed: Completed;

    Create(obj: Order);

    // Update Order Detail
    Update(orderID: String, obj: Order);

    // Set status of Order to Expired | Archived | Active
    UpdateStatus(orderID: String, status: Status);

    // DongLai, we allow end-user can do multiple DongLai 
    Do_DongLai(obj: DongLai[]);

    // Complete order 
    CompleteOrder(obj: Completed);

    // Thanh Ly product
    Do_ThanhLy(obj: ThanhLy);
}

export enum ProductType {
    Phone,
    Tablet,
    Laptop,
    Camera,
    Bike,
    Car,
    Gold,
    Other
}

export interface DongLai {
    DateCreated: Date;
    Amount: Number;
    FromDate: Date;
    ToDate: Date;
    NextDate: Date;
}

export enum Status {
    New,
    Active,
    Expired,
    ThanhLy,
    Archived
}

export interface Audit {
    DateCreated: Date,
    Info: String
}

export interface StockOut{
    TotalAmount: Number;
    DateCreated: Date;
}

export interface Completed extends StockOut {
}

export interface ThanhLy extends StockOut{
}