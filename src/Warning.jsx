// import React from 'react';
// import { Modal } from 'antd';

// const Warning = ({ open, onClose }) => {
//   return (
//     <Modal
//       visible={open}
//       title="Warning"
//       onOk={onClose}
//       onCancel={onClose}
//     >
//       <div style={{ textAlign: 'center' }}>
//         <img
//           src={warningImage}
//           alt="Warning Image"
//           style={{ maxWidth: '100%', maxHeight: '200px' }}
//         />
//         <p style={{ marginTop: '10px' }}>Cannot add this item to cart, because the item already have in your cart!</p>
//       </div>
//     </Modal>
//   );
// };

// export default Warning;


import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
const warningImage = "https://media.istockphoto.com/id/1221750570/vector/exclamation-mark-sign-warning-about-an-emergency.jpg?s=612x612&w=0&k=20&c=EsKL2jyoS_T06mQuX6_mbhPF6qqkrO48v9L9YsOe-Eo=";

function Warning({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <div style={{ textAlign: 'center' }}>
          <img
            src={warningImage}
            alt="Warning Image"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
          <p style={{ marginTop: '10px' }}>Cannot add this item to cart, because the item already have in your cart!</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Warning;
