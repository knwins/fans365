import { LockOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import type { FC } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import type { UserItem, UserParams } from '../../User/data';
import styles from '../style.less';


type ModifyModalProps = {
  visible: boolean;
  done: boolean;
  current: Partial<UserItem> | undefined;
  onDone: () => void;
  onCancel: (flag?: boolean, formVals?: UserParams) => void;
  onSubmit: (values: UserItem) => void;
};

const UpdateModal: FC<ModifyModalProps> = (props) => {
  const { visible, done, current,onDone, onSubmit, children } = props;
  const intl = useIntl();
  if (!visible) {
    return null;
  }

  return (
    <ModalForm<UserItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.account.modify.password',
      })}
      className={styles.standardListForm}
      width={640}
      initialValues={current}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      submitter={{
        render: (_, dom) => (done ? null : dom),
        searchConfig: {
          submitText: <FormattedMessage id="pages.forgotpassword.subimt" />,
        },
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <ProFormText
        name="oldpassword"
        label={intl.formatMessage({
          id: 'pages.account.password.label',
        })}
        fieldProps={{
          size: 'middle',
          prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        width='md'
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.account.password.required',
            }),
          },
        ]}
        placeholder={intl.formatMessage({
          id: 'pages.account.password.placeholder',
        })}
      />

      <ProFormText
        name="newpassword"
        label={intl.formatMessage({
          id: 'pages.account.newpassword.label',
        })}
        width='md'
        fieldProps={{
          size: 'middle',
          prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.account.newpassword.required',
            }),
          },
        ]}
        placeholder={intl.formatMessage({
          id: 'pages.account.newpassword.placeholder',
        })}
      />
      <ProFormText name="id" hidden />
    </ModalForm>
  );
};

export default UpdateModal;
