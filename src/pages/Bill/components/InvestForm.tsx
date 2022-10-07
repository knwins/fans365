import { ModalForm } from '@ant-design/pro-form';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Tabs } from 'antd';
import React from 'react';

import type { BillItem, BillParams } from '../data';

export type InvestFormProps = {
  done: boolean;
  visible: boolean;
  onCancel: (flag?: boolean, formVals?: BillParams) => void;
  onDone: () => void;
};

const InvestForm: React.FC<InvestFormProps> = (props) => {
  const { visible, done, onDone, children } = props;

  //国际化
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<BillItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.invest',
      })}
      width={440}
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
      <Tabs>
        <Tabs.TabPane
          tab={intl.formatMessage({
            id: 'pages.bind.invest.trcusdt',
          })}
          key="trc20"
        >
          <div style={{ padding: 30, maxWidth: 440, textAlign: 'center' }}>
            <p><FormattedMessage id='pages.bind.invest.trcusdt.tip1'/></p>
            <img src="/trc20.png" alt="trc20" style={{ padding: 20, maxWidth: '80%' }} />
            <p style={{ fontSize: 12, color: '#999999' }}><FormattedMessage id='pages.bind.invest.trcusdt.tip2'/></p>
            <p style={{ fontSize: 14 }}>TFRDQH3AkwHw9PhmmqPFHZhxhpxqiMAMWS</p>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={intl.formatMessage({
            id: 'pages.bind.invest.alipay',
          })}
          key="alipay"
        >
          <div style={{ padding: 30, maxWidth: 440, textAlign: 'center' }}>
            <img src="/alipay.png" alt="trc20" style={{ padding: 20, maxWidth: '80%' }} />
            <p style={{ fontSize: 12, color: '#999999' }}><FormattedMessage id='pages.bind.invest.tip1'/></p>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={intl.formatMessage({
            id: 'pages.bind.invest.wechatpay',
          })}
          key="weixin"
        >
          <div style={{ padding: 30, maxWidth: 440, textAlign: 'center' }}>
            <img src="/weixin.png" alt="trc20" style={{ padding: 20, maxWidth: '80%' }} />
            <p style={{ fontSize: 12, color: '#999999' }}><FormattedMessage id='pages.bind.invest.tip1'/></p>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </ModalForm>
  );
};

export default InvestForm;
