import { ModalForm, ProFormMoney, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import React, { useState } from 'react';
import { useRequest } from 'umi';

import type { BillItem, BillParams } from '../data';
import { latestBill } from '../service';
export type WithdrawFormProps = {
  done: boolean;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: BillParams) => void;
  onDone: () => void;
  onSubmit: (values: BillItem) => Promise<void>;
};

const WithdrawForm: React.FC<WithdrawFormProps> = (props) => {
  const { visible, done, onDone, onSubmit, children } = props;
  const [current, setCurrent] = useState<BillItem | undefined>();

  /** 国际化配置 */
  const intl = useIntl();

  const result = useRequest(async () => {
    const { data: latest, status } = await latestBill();
    if (status) {
      //message.success('success');
      setCurrent(latest);
      return;
    }
    return;
  });

  if (!visible) {
    return null;
  }
  console.log(result);

  return (
    <ModalForm<BillItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.withdraw',
      })}
      width={640}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
      onFinish={async (values) => {
        onSubmit(values);
      }}
    >
      <ProFormText hidden={true} name="type" initialValue="Withdrawing" />
      <ProFormMoney
        name="amount"
        label={intl.formatMessage({
          id: 'pages.bill.withdraw.amount.label',
        })}
        width="md"
        min={100}
        max={current?.blance}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.bill.withdraw.amount.required',
            }),
          },
        ]}
      />
      {intl.formatMessage({
        id: 'pages.bill.blance.label',
      })}
      : {current?.blance}
    </ModalForm>
  );
};

export default WithdrawForm;
