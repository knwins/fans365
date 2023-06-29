import {
  ModalForm,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import type { AccountTypeItem } from '../data.d';
import styles from '../style.less';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<AccountTypeItem> | undefined;
  onDone: () => void;
  onSubmit: (values: AccountTypeItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<AccountTypeItem>
      visible={visible}
      title={
        done
          ? null
          : `${
              current
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
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.account.type.name.label',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.account.type.name.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.account.type.name.placeholder',
          })}
        />
        <ProFormText
          name="icon"
          label={intl.formatMessage({
            id: 'pages.account.type.icon.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.account.type.icon.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.account.type.icon.placeholder',
          })}
        />
        <ProFormText
          name="link"
          label={intl.formatMessage({
            id: 'pages.account.type.link.label',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.account.type.link.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.account.type.link.placeholder',
          })}
        />
        
        <ProFormDigit name="id" hidden />
      </>
    </ModalForm>
  );
};

export default OperationModal;
