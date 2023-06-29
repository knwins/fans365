import { ModalForm, ProFormMoney, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

import type { UserParams } from '@/pages/User/data';
import { queryUserList } from '@/pages/User/service';
import { useIntl } from '@umijs/max';
import type { BillItem, BillParams } from '../data';
export type PageParams = {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
};

export type CreateFormProps = {
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: BillParams) => void;
  onDone: () => void;
  onSubmit: (values: BillItem) => Promise<void>;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { visible, onDone, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  const handleUserList = async (key?: any) => {
    if (key === '') {
      return;
    }

    const pageParams: PageParams = {
      current: 1,
      pageSize: 10,
    };
    const options: UserParams = {
      username: key,
    };
    const { data: userListData } = await queryUserList({
      ...pageParams,
      ...options,
    });
    const userListOptions = [];
    const userList = userListData || [];

    if (userList) {
      for (let i = 0; i < userList.length; i += 1) {
        const item = userList[i];
        if (item) {
          userListOptions.push({
            label: item.username,
            value: item.id,
          });
        }
      }
    }
    return userListOptions;
  };

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<BillItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.new',
      })}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
      }}
    >
      <>
        <ProFormText
          name="key"
          label={intl.formatMessage({
            id: 'pages.bill.username.search.label',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.bill.username.search.placeholder',
          })}
          width="md"
        />

        <ProFormSelect
          name="userId"
          width="lg"
          label={intl.formatMessage({
            id: 'pages.bill.username.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.bill.username.label',
              }),
            },
          ]}
          dependencies={['key']}
          request={async (params) => {
            return handleUserList(params.key);
          }}
        />

        <ProFormSelect
          name="type"
          width="lg"
          label={intl.formatMessage({
            id: 'pages.bill.type.label',
          })}
          options={[
            {
              label: intl.formatMessage({
                id: 'pages.bill.type.invest',
              }),
              value: 'Invest',
            },
            {
              label: intl.formatMessage({
                id: 'pages.bill.type.withdraw',
              }),
              value: 'Withdraw',
            },
            {
              label: intl.formatMessage({
                id: 'pages.bill.type.income',
              }),
              value: 'Income',
            },
            {
              label: intl.formatMessage({
                id: 'pages.bill.type.expense',
              }),
              value: 'Expense',
            },
          ]}
        />

        <ProFormMoney
          name="amount"
          label={intl.formatMessage({
            id: 'pages.bill.amount.label',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.bill.amount.placeholder',
          })}
        />

        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.bill.name.label',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.bill.name.placeholder',
          })}
        />
      </>
    </ModalForm>
  );
};

export default CreateForm;
