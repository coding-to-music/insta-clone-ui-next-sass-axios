import { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import Modal from "../../../components/shared/UIElements/Modal";
import classes from "./verify.module.scss";
import Button from "../../../components/shared/FormElements/Button";

//http://localhost:5000/api/users/62773742d256d3b0a4abb749/verify/
//107799f275637d314e71d65c5d4995bac766bd495f770ad7e1f3f0d433703283
const Verify: NextPage<{ data: any; myerror: any }> = (props) => {
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(true);
  const router = useRouter();

  function closeEmailVerificationModal() {
    setShowEmailVerificationModal(false);
    router.push("/auth");
  }

  return (
    <React.Fragment>
      <Modal
        show={showEmailVerificationModal}
        onCancel={closeEmailVerificationModal}
        header='Email Verification'
        footerClass={classes.modalActions}
        contentClass={classes.modalContent}
        footer={<Button onClick={closeEmailVerificationModal}>OK</Button>}
      >
        <p>{props.data?.message || props.myerror}</p>
      </Modal>
    </React.Fragment>
  );
};

export default Verify;

export async function getServerSideProps(context: any) {
  const userID = context.params.userID;
  const token = context.params.token;

  let data = null;
  let myerror = null;

  try {
    const response = await axios({
      url: `${process.env.SERVER}/api/users/${userID}/verify/${token}`,
      method: "GET",
    });
    data = await response.data;
  } catch (err) {
    const error = err as AxiosError;
    myerror = error.response?.data.message;
  }
  return { props: { data, myerror } };
}
