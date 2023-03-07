import React from "react";
import { Button, Modal } from "antd";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  return (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(!showModal)}
      onOk={() => setShowModal(!showModal)}
      title="Order details"
    >
      <p>Payment intent: {session.payment_intent}</p>
      <p>Payment status: {session.payment_status}</p>
      <p>
        Total amount:{" "}
        {`${session.currency.toUpperCase()}
         ${session.amount_total / 100}`}
      </p>
      <p>Stripe customer id: {session.customer}</p>
      <p>Customer: {orderedBy.name}</p>
    </Modal>
  );
};

export default OrderModal;
