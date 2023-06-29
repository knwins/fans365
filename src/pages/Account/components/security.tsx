import { modifyPassword } from '@/pages/User/service';
import { FormattedMessage, useRequest } from '@umijs/max';
import { List, message } from 'antd';
import React, { useState } from 'react';
import { queryCurrent } from '../service';
import ModifyPassword from './ModifyPassword';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="pages.password.strength.strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="pages.password.strength.medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="pages.password.strength.weak" />
    </span>
  ),
};

const SecurityView: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleDone = () => {
    setDone(false);
    setVisible(false);
  };

  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getData = () => [
    {
      title: <FormattedMessage id="pages.account.password.title" />,
      description: (
        <FormattedMessage id="pages.account.password.description" />
      ),
      actions: [
        <a
          key="Modify"
          onClick={() => {
            setVisible(true);
          }}
        >
          <FormattedMessage id="pages.modify" />{' '}
        </a>,
      ],
    },
  ];

  const data = getData();
  return (
    <>
      {loading ? null : (
        <List<Unpacked<typeof data>>
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      )}

      <ModifyPassword
        visible={visible}
        done={done}
        current={currentUser}
        onDone={handleDone}
        key="modify password"
        onCancel={() => {
          setVisible(false);
        }}
        onSubmit={async (value) => {
          const { status, info } = await modifyPassword(value);
          if (status) {
            console.log('asdfadfadfsdaf');
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

export default SecurityView;
