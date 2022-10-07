import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import type { BindItem } from '../data.d';
import styles from '../style.less';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<BindItem> | undefined;
  onDone: () => void;
  onSubmit: (values: BindItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  /** 国际化配置 */
  const intl = useIntl();

  if (!visible) {
    return null;
  }
  return (
    <ModalForm<BindItem>
      visible={visible}
      title={done ? null : `${current ? intl.formatMessage({
        id: 'pages.edit',
      }) : intl.formatMessage({
        id: 'pages.new',
      })}`}
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
          name="type"
          width="lg"
          label={intl.formatMessage({
            id: 'pages.bind.type.label',
          })}
          options={[
            { label: 'Twitter', value: 'Twitter' },
            { label: 'Telegram', value: 'Telegram' },
            { label: 'Discord', value: 'Discord' },
          ]}
        />
        <ProFormText
          name="username"
          label={intl.formatMessage({
            id: 'pages.bind.username.label',
          })}
          width="lg"
          rules={[{ required: true, message: intl.formatMessage({
            id: 'pages.bind.username.required',
          }) }]}
          placeholder={intl.formatMessage({
            id: 'pages.bind.username.placeholder',
          })}
        />
        <ProFormText
          name="account"
          label={intl.formatMessage({
            id: 'pages.bind.account.label',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.bind.account.placeholder',
          })}
        />
        <ProFormText
          name="password"
          label={intl.formatMessage({
            id: 'pages.bind.password.label',
          })}
          width="lg"
          placeholder={intl.formatMessage({
            id: 'pages.bind.password.placeholder',
          })}
        />
        <ProFormSelect
          name="status"
          width="lg"
          label={intl.formatMessage({
            id: 'pages.bind.status.label',
          })}
          options={[
            { label: 'Normal', value: 'Normal' },
            { label: 'Abnormality', value: 'Abnormality' },
          ]}
        />
        <ProFormSelect
          name="level"
          width="lg"
          label={intl.formatMessage({
            id: 'pages.bind.level.label',
          })}
          options={[
            { label: 'VIP0', value: 'VIP0' },
            { label: 'VIP1', value: 'VIP1' },
            { label: 'VIP2', value: 'VIP2' },
            { label: 'VIP3', value: 'VIP3' },
          ]}
        />
        <ProFormDigit name="id" hidden />　 　
      </>
    </ModalForm>
  );
};

export default OperationModal;
