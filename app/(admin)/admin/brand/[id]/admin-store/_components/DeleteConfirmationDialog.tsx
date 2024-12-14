import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <p>Are you sure you want to delete {itemName}?</p>
      <DialogFooter>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="destructive">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteConfirmationDialog;
