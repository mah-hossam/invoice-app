export interface Invoice {
    id?: number;
    items: {
        name: string;
        quantity: string;
        price: number;
    }[];
    paymentStatus: string;
    paymentType: string;
}