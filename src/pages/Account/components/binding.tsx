import { payBinding } from '@/pages/User/service';
import { AlipayOutlined, WechatOutlined } from '@ant-design/icons';
import { FormattedMessage, useRequest } from '@umijs/max';
import { List, message } from 'antd';
import React, { Fragment, useState } from 'react';
import { queryCurrent } from '../service';
import BindPay from './BindPay';

const BindingView: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [payname, setPayname] = useState<string>('');

  const handleDone = () => {
    setDone(false);
    setVisible(false);
  };

  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

 

  const getData = () => [
    {
      title: <FormattedMessage id="pages.account.binding.trcusdt" />,
      description: <FormattedMessage id="pages.account.binding.trcusdt.description" />,
      actions: [
        <a key="usdt" 
        onClick={() => {
          setVisible(true);
          setPayname('TRC-USDT Pay');
        }}
        >
          <FormattedMessage id="pages.binding" />
        </a>,
      ],
      avatar: <img src="/usdt.svg" alt="usdt" className="usdt" />,
    },
    {
      title: <FormattedMessage id="pages.account.binding.alipay" />,
      description: <FormattedMessage id="pages.account.binding.alipay.description" />,
      actions: [
        <a key="alipay"
        onClick={() => {
          setVisible(true);
          setPayname('Alipay');
        }}>
          <FormattedMessage id="pages.binding" />
        </a>,
      ],
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: <FormattedMessage id="pages.account.binding.wechatpay" />,
      description: <FormattedMessage id="pages.account.binding.wechatpay.description" />,
      actions: [
        <a key="wechatpay"
        onClick={() => {
          setVisible(true);
          setPayname('WeChat Pay');
        }}>
          <FormattedMessage id="pages.binding" />
        </a>,
      ],
      avatar: <WechatOutlined className="wechatpay" />,
    },
  ];

  return (
    <>
      {loading ? null : (
        <Fragment>
          <List
            itemLayout="horizontal"
            dataSource={getData()}
            renderItem={(item) => (
              <List.Item actions={item.actions}>
                <List.Item.Meta
                  avatar={item.avatar}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Fragment>
      )}
      <BindPay
        visible={visible}
        done={done}
        current={currentUser}
        payname={payname}
        onDone={handleDone}
        key="modify password"
        onCancel={() => {
          setVisible(false);
        }}
        onSubmit={async (value) => {
          const { status, info } = await payBinding(value);
          if (status) {
            message.success(info);
            setVisible(false);
            return true;
          }  
            return false;
          
        }}
      />
    </>
  );
};

export default BindingView;
