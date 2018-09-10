export interface Order {
    _id: string,
    OrderID: string,
    Fullname: string,
    Identify: string,
    Address: string,
    PhoneNumber: string,
    ProductType: string,
    Amount: number,
    Status: string,
    ExtraFee: string,
    Rate1: number,
    Rate2: number,
    Rate3: number,
    Rate4: number,
    Description: string,
    Note: string,
    DongLai: [Renewal],
    UserID: String;
}

export interface Renewal{
    Amount: number;
    FromDate: string;
    ToDate: string;    
}

export interface User{
    _id: string
    Fullname: string;
    Identify: string;
    PhoneNumber: string;
    Address: string;
    Email: string;
    PictureUrl: string;
}