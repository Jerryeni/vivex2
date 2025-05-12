import { useQuery } from '@tanstack/react-query';
import api from '../axios';


const fetchWithAuth = async (url: string, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}${queryString ? '?' + queryString : ''}`;
    const { data } = await api.get(fullUrl);
    return data;
  };

export interface Order {
  id: number;
  user: number;
  status: string;
  order_tracking_id?: string;
  total_amount: number;
  amount_paid?: number;
  payment_method: string;
  payment_status?: string;
  cancel_order: boolean;
  reasons_for_cancelling_orders?: string;
  items: any[]; // Replace with actual item type if available
  delivery_address?: number;
}

export interface OrdersResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Order[];
  sort: any;
}

export interface OrdersQueryParams {
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  vendor?: string;
  delivery_status?: string;
  payment_status?: string;
  cancel_order?: string; // boolean as string: "true"/"false"
}

const buildQueryString = (params: OrdersQueryParams) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value.toString());
    }
  });
  return query.toString();
};

export const useOrders = (params: OrdersQueryParams = {}) => {
  const queryString = buildQueryString(params);
  return useQuery<OrdersResponse>({
    queryKey: ['orders', params],
    queryFn: () =>
      fetchWithAuth(`/products/orders/?${queryString}`).then((res) => res.json()),
  });
};
