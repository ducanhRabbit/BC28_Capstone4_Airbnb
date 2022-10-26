import { Button, notification, Space } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

export const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    style: {
      background: '#ffccc7',
    },
    message: title,
    description: message,
  });
};
