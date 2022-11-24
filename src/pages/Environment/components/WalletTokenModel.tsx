import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormDigit
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';

import type { FC } from 'react';
import { useRef } from 'react';


import type { WalletTokenItem } from '../data';
import styles from '../style.less';


type WalletTokenModelProps = {
  done: boolean;
  visible: boolean;
  onDone: () => void;
  onSubmit: (values: WalletTokenItem) => void;
};

const WalletTokenModel: FC<WalletTokenModelProps> = (props) => {

  const { done, visible, onDone, onSubmit, children } = props;
  const formRef = useRef<ProFormInstance>();

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }


  return (
    <ModalForm<WalletTokenItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.new',
      })}
      formRef={formRef}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
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
        name="symbol"
        label={intl.formatMessage({
          id: 'pages.wallet.token.symbol.label',
        })}
        width="md"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.wallet.token.symbol.required',
            }),
          },
        ]}
        placeholder={intl.formatMessage({
          id: 'pages.wallet.token.symbol.placeholder',
        })}
      />


      <ProFormSelect
        name="network"
        width="md"
        label={intl.formatMessage({
          id: 'pages.wallet.token.network.label',
        })}
        options={[
          { label: 'EthereumMainNet', value: 'EthereumMainNet' },
          { label: 'EthereumGoerli', value: 'EthereumGoerli'},
          { label: 'ArbitrumMainNet', value: 'ArbitrumMainNet' },
          { label: 'ArbitrumGoerli', value: 'ArbitrumGoerli' },
          { label: 'OptimismMainNet', value: 'OptimismMainNet' },
          { label: 'OptimismGoerli', value: 'OptimismGoerli' },
          { label: 'PolygonMainNet', value: 'PolygonMainNet' },
          { label: 'PolygonMumbai', value: 'PolygonMumbai' },
          { label: 'BSC', value: 'BSC' },
          { label: 'AvalancheMainNet', value: 'AvalancheMainNet' },
          { label: 'AvalancheFuji', value: 'AvalancheFuji' },
          { label: 'StarknetMainNet', value: 'StarknetMainNet' },
          { label: 'StarknetGoerli', value: 'StarknetGoerli' },
        ]}
      />

      <ProFormText
        name="contract"
        label={intl.formatMessage({
          id: 'pages.wallet.token.contract.label',
        })}
        width="lg"
        placeholder={intl.formatMessage({
          id: 'pages.wallet.token.contract.placeholder',
        })}
      />
      <ProFormDigit name="id" hidden />
    </ModalForm>
  );
};

export default WalletTokenModel;
