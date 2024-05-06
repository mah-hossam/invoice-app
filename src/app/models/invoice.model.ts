export interface Invoice {
    id?: number;
    items: {
        itemName: string;
        quantity: string;
        price: number;
    }[];
    paymentStatus: string;
    paymentType: string;
}