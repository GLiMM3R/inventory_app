export interface Inventory {
  inventory_id: string;
  fk_branch_id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  status: string;
  created_at: number;
  updated_at: number;
  deleted_at: null;
}
