import React from 'react';
import { Modal, Button, Input, Tooltip } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import {
  adminUpdateAction,
  currentUserAction,
} from '../../store/actions/userActions';

import { EditOutlined } from '@ant-design/icons';

const Profile = ({ isAnonymous }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const dispatch = useDispatch();

  const showModal = () => {
    if (isAnonymous) {
      alert('Sign out and Sign in with google to be a user ');
    } else {
      setVisible(true);
      dispatch(currentUserAction());
    }
  };
  console.log(isAnonymous);
  const data = useSelector((state) => state.updateAdmin);
  const { loading, error, success } = data;

  const currentUser = useSelector((state) => state.currentUser);
  const { user } = currentUser;

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(adminUpdateAction(modalText, user.uid));
    setVisible(false);
  };

  // console.log(success);

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  console.log(modalText);

  return (
    <>
      <Tooltip title="Update Status">
        <Button
          style={{ marginRight: '10px' }}
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
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>
          <Input
            onChange={(e) => setModalText(e.target.value)}
            placeholder="Hi there I am using this app"
          />
        </p>
      </Modal>
    </>
  );
};

export default Profile;
