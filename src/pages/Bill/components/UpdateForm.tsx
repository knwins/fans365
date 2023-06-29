import ProDescriptions from '@ant-design/pro-descriptions';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';

import type { BillItem, BillParams } from '../data';
export type PageParams = {
  current?: number;
  pageSize?: number;
};

export type UpdateFormProps = {
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: BillParams) => void;
  current: Partial<BillItem>;
  onDone: () => void;
  onSubmit: (values: BillItem) => Promise<boolean>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { visible, onDone, current, onSubmit, children } = props;

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<BillItem>
      visible={visible}
      title="处理提现"
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
      <ProDescriptions column={1}>
        <ProDescriptions.Item valueType="dateTime" label="提现时间">
          {current.createTime}
        </ProDescriptions.Item>

        <ProDescriptions.Item valueType="text" label="所属用户">
          {current.user?.username}
        </ProDescriptions.Item>

        <ProDescriptions.Item valueType="money" label="提现金额">
          {current.amount}
        </ProDescriptions.Item>
      </ProDescriptions>
      <ProFormSelect
        name="type"
        width="lg"
        label="选择类型"
        options={[{ label: '提现', value: 'Withdraw' }]}
      />
      <ProFormText name="id" hidden={true} initialValue={current.id} />
      <ProFormTextArea name="name" label="请转账记录" width="lg" initialValue={current.name} />
    </ModalForm>
  );
};

export default UpdateForm;
