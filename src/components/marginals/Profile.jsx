import React from 'react';
import { Modal, Button, Input, Tooltip } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { adminUpdateAction } from '../../store/actions/userActions';

import { EditOutlined } from '@ant-design/icons';

const Profile = () => {
  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
  };

  const data = useSelector((state) => state.updateAdmin);
  const { loading, error, success } = data;

  const handleOk = () => {
    dispatch(adminUpdateAction(modalText, localStorage.getItem('id')));
    localStorage.setItem('status', modalText);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Tooltip title="Update Status">
        <Button
          style={{
            marginRight: '10px',
            backgroundColor: '#b67473',
            color: '#fff',
            border: 'none',
          }}
          onClick={showModal}
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          size="large"
        />
      </Tooltip>
      <Modal
        title="Update Your Status"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          <Input
            onChange={(e) => setModalText(e.target.value)}
            placeholder={localStorage.getItem('status')}
          />
        </p>
      </Modal>
    </>
  );
};

export default Profile;
