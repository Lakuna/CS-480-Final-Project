export type Order = {
	order_id: string;
	order_date: Date;
	status: string;
	total_amount: number;
	estimated_delivery_date: Date;
	customer_id: string;
	payment_info_id: string;
	address_id: string;
	actual_delivery_date?: Date;
};
