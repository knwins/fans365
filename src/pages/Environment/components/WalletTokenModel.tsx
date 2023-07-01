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
    <>
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




        <ProFormSelect
          name="network"
          width="md"
          label={intl.formatMessage({
            id: 'pages.wallet.token.network.label',
          })}
          options={[
            { label: 'EthereumMainnet', value: 'EthereumMainnet' },
            { label: 'EthereumGoerli', value: 'EthereumGoerli' },
            { label: 'ArbitrumMainnet', value: 'ArbitrumMainnet' },
            { label: 'ArbitrumGoerli', value: 'ArbitrumGoerli' },
            { label: 'OptimismMainnet', value: 'OptimismMainnet' },
            { label: 'OptimismGoerli', value: 'OptimismGoerli' },
            { label: 'PolygonMainnet', value: 'PolygonMainnet' },
            { label: 'PolygonMumbai', value: 'PolygonMumbai' },
            { label: 'BSCMainnet', value: 'BSCMainnet' },
            { label: 'AvalancheMainnet', value: 'AvalancheMainnet' },
            { label: 'AvalancheFuji', value: 'AvalancheFuji' },
            { label: 'StarknetMainnet', value: 'StarknetMainnet' },
            { label: 'StarknetGoerli', value: 'StarknetGoerli' },
            { label: 'ZKSyncMainnet', value: 'ZKSyncMainnet' },
            { label: 'ZKSyncDevNet', value: 'ZKSyncDevNet' },
          ]}
        />

        <ProFormText
          name="symbol"
          label={intl.formatMessage({
            id: 'pages.wallet.token.symbol.label',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.wallet.token.symbol.placeholder',
          })}
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


    </>
  );
};

export default WalletTokenModel;
