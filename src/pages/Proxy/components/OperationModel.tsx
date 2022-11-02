import {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import type { ProxyItem } from '../data';
import styles from '../style.less';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ProxyItem> | undefined;
  onDone: () => void;
  onSubmit: (values: ProxyItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<ProxyItem>
      visible={visible}
      title={
        done
          ? null
          : `${current
            ? intl.formatMessage({
              id: 'pages.edit',
            })
            : intl.formatMessage({
              id: 'pages.new',
            })
          }`
      }
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
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
      <>


        <ProFormSelect
          name="provider"

          label={intl.formatMessage({
            id: 'pages.proxy.provider.label',
          })}
          options={[
            { label: 'Proxy6.net', value: 'Proxy6.net' },
            { label: 'Proxyline.net', value: 'Proxyline.net' },
          ]}
        />


        <ProFormText
          name="ip"
          label={intl.formatMessage({
            id: 'pages.proxy.ip.label',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.proxy.ip.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.proxy.ip.placeholder',
          })}
        />
        <ProFormText
          name="port"
          label={intl.formatMessage({
            id: 'pages.proxy.port.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.proxy.port.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.proxy.port.placeholder',
          })}
        />
        <ProFormText
          name="username"
          label={intl.formatMessage({
            id: 'pages.proxy.username.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.proxy.username.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.proxy.username.placeholder',
          })}
        />

        <ProFormText
          name="password"
          label={intl.formatMessage({
            id: 'pages.proxy.password.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.proxy.password.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.proxy.password.placeholder',
          })}
        />

        <ProFormDigit name="id" hidden />
      </>
    </ModalForm>
  );
};

export default OperationModal;
