"use client";
import { useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { idTokenAtom } from "../../../store";
import { useEffect, useState } from "react";
import { getPaymentStatus } from "../../../api";
import { Modal, Typography, Box, Button, Icon } from "@mui/material";
import { ThreeDots } from "react-loading-icons";
import { Done, Info } from "@mui/icons-material";

const PaymentRedirection = () => {
  const idToken = useAtomValue(idTokenAtom);
  const [paymentStatus, setPaymentStatus] = useState("failure");

  //   useEffect(() => {
  //     getPaymentStatus(
  //       "cs_test_a1cFNKwTv9AvsMSFgCQEoFJyhoYH577CVDzbs8Pso7rtBpWFORWTrm4RzQ"
  //     );
  //   }, []);

  console.log("Received new id token value", idToken);
  const searchParams = useSearchParams();
  console.log("Search params", searchParams.get("status"));
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

              <Button>Go back</Button>
            </>
          )}

          {paymentStatus === "failure" && (
            <>
              <Info color="error" fontSize="large" />
              <Typography> Sorry, your payment failed! </Typography>
              <Button> Go back </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentRedirection;
