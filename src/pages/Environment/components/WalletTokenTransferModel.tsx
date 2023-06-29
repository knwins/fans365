import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormText,
  ProFormDigit
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';

import type { FC } from 'react';
import { useRef } from 'react';


import type { WalletTokenItem, WalletTokenTransferItem } from '../data';
import styles from '../style.less';


type WalletTokenTransferModelProps = {
  done: boolean;
  visible: boolean;
  current: Partial<WalletTokenItem> | undefined;
  onDone: () => void;
  onSubmit: (values: WalletTokenTransferItem) => void;
};

const WalletTokenTransferModel: FC<WalletTokenTransferModelProps> = (props) => {

  const { done, visible, current, onDone, onSubmit, children } = props;
  const formRef = useRef<ProFormInstance>();

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }


  return (
    <>
      <ModalForm<WalletTokenTransferItem>
        visible={visible}
        title={current?.network + " " + current?.symbol + " " + intl.formatMessage({ id: 'pages.withdraw', })}
        formRef={formRef}
        className={styles.standardListForm}
        width={640}
        onFinish={async (values) => {
          values.walletTokenId=current?.id;
          onSubmit(values);
        }}
        submitter={{
          render: (_, dom) => (done ? null : dom),
        }}
        trigger={<>{children}</>}
        modalProps={{
          onCancel: () => onDone(),
          destroyOnClose: true,
          bodyStyle: done ? { padding: '72px 0' } : {},
        }}
      >

        <ProFormText
          name="receive"
          label={intl.formatMessage({
            id: 'pages.wallet.token.transfer.receive.label',
          })}
          width="lg"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.wallet.token.transfer.receive.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.wallet.token.transfer.receive.placeholder',
          })}
        />

        <ProFormDigit
          name="value"
          label={intl.formatMessage({
            id: 'pages.wallet.token.transfer.value.label',
          })}
          min={0.0001}
          max={current?.balance}
          width="md"
          addonAfter={current?.balance + " " + current?.symbol}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.wallet.token.transfer.value.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.wallet.token.transfer.value.placeholder',
          })}
        />

        <ProFormDigit
          name="slippage"
          label={intl.formatMessage({
            id: 'pages.wallet.token.transfer.slippage.label',
          })}
          min={0.05}
          max={0.20}
          initialValue={0.10}
          width="xs"
          addonAfter="%"
          fieldProps={{ precision: 2 }}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.wallet.token.transfer.slippage.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.wallet.token.transfer.slippage.placeholder',
          })}

        />
      </ModalForm>
    </>
  );
};

export default WalletTokenTransferModel;
