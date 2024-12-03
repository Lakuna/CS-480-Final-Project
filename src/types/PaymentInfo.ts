export interface PaymentInfo {
	payment_info_id: string;
	customer_id: string;
	method: string;
	card_number: string;
	card_holder_name: string;
	expiration_date: Date;
	address_id: string;
}
