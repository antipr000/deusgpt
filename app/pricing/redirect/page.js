"use client";
import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { idTokenAtom } from "../../../store";
import { useEffect, useState } from "react";
import { getPaymentStatus } from "../../../api";
import { Modal, Typography, Box, Button, Icon } from "@mui/material";
import { ThreeDots } from "react-loading-icons";
import { Done, Info } from "@mui/icons-material";

const PaymentRedirection = () => {
  const idToken = useAtomValue(idTokenAtom);
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const searchParams = useSearchParams();
  const signal = searchParams.get("status");
  const paymentId = searchParams.get("pid");
  useEffect(() => {
    let handler;
    async function fetchPaymentInfo() {
      const payment = await getPaymentStatus(signal, paymentId);
      if (payment.status === "success") {
        setPaymentStatus("success");
        clearInterval(handler);
      } else if (payment.status === "pending") {
        setPaymentStatus("pending");
      } else {
        setPaymentStatus("failure");
        clearInterval(handler);
      }
    }

    handler = setInterval(fetchPaymentInfo, 3000);
    return () => clearInterval(handler);
  }, []);

  return (
    <div>
      <Modal
        open={true}
        sx={{
          alignSelf: "center",
          justifySelf: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.paper",
            width: "500px",
            padding: "30px",
            gap: "30px",
          }}
        >
          {paymentStatus === "pending" && (
            <>
              <ThreeDots fill="black" />
              <Typography>
                Please wait while we confirm your payment.
              </Typography>
            </>
          )}

          {paymentStatus === "success" && (
            <>
              <Done color="success" fontSize="large" />
              <Typography>Your payment was successful</Typography>

              <Button onClick={() => router.push("/")}>Go back</Button>
            </>
          )}

          {paymentStatus === "failure" && (
            <>
              <Info color="error" fontSize="large" />
              <Typography> Sorry, your payment failed! </Typography>
              <Button onClick={() => router.push("/")}> Go back </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentRedirection;
