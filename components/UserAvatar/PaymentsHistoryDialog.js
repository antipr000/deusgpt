"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAllPaymentsForUser, updateUser } from "../../api";
import { useAtom } from "jotai";
import { loaderAtom } from "../../store";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "plan",
    headerName: "Plan Name",
    width: 150,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
  },
  {
    field: "completedAt",
    headerName: "Completed Date",
    width: 150,
  },
  {
    field: "invoiceId",
    headerName: "Invoice",
    width: 100,
    renderCell: (data) => {
      return (
        <a href={data.value} target="_blank">
          Link
        </a>
      );
    },
  },
];

const PaymentsHistoryDialog = ({ open, setOpen, user }) => {
  const handleClose = () => setOpen(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getAllPaymentsForUser().then((data) => {
      const rows = data.map((payment, index) => ({
        id: index + 1,
        plan: payment.plan,
        amount: payment.amount,
        createdAt: new Date(payment.createdAt).toLocaleDateString(),
        completedAt: new Date(payment.completedAt).toLocaleDateString(),
        invoiceId: payment.invoiceId,
      }));
      setPayments(rows);
    });
  }, []);

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="customized-dialog-title"
      >
        <span className="font-[900]">All Payments</span>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <DataGrid
          rows={payments}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentsHistoryDialog;
