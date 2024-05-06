export interface Invoice {
    id?: number;
    item: {
        name: string;
        quantity: string;
        price: number;
    }[];
    paymentStatus: string;
    paymentType: string;
}