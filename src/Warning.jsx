import React from 'react';
import { Modal } from 'antd';

// const warningImage = "https://image.anninhthudo.vn/h600/Uploaded/2024/urkxrreiox/2023_12_07/nguoi-tu-xung-su-thay-thich-tam-phuc-dinh-lum-xum-gi-truoc-khi-bi-bat-hinh-10-725-2479.jpg";
const warningImage = "https://media.istockphoto.com/id/1221750570/vector/exclamation-mark-sign-warning-about-an-emergency.jpg?s=612x612&w=0&k=20&c=EsKL2jyoS_T06mQuX6_mbhPF6qqkrO48v9L9YsOe-Eo=";

const Warning = ({ open, onClose }) => {
  return (
    <Modal
      visible={open}
      title="Warning"
      onOk={onClose}
      onCancel={onClose}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          src={warningImage}
          alt="Warning Image"
          style={{ maxWidth: '100%', maxHeight: '200px' }}
        />
        <p style={{ marginTop: '10px' }}>Cannot add this item to cart. Please add Diamonds or Bridal first.</p>
      </div>
    </Modal>
  );
};

export default Warning;
