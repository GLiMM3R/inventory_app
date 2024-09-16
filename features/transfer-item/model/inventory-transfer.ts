export interface InventoryTransfer {
  transfer_id: string;
  inventory_id: string;
  inventory_name: string;
  to_branch_id: string;
  to_branch: string;
  quantity: number;
  transfer_date: number;
}
