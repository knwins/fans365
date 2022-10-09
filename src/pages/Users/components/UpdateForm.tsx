import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useIntl } from '@umijs/max';
import type { FC } from 'react';
import type { UserItem, UserParams } from '../data';
import styles from '../style.less';

type UpdateModalProps = {
  visible: boolean;
  done: boolean;
  onDone: () => void;
  current: Partial<UserItem> | undefined;
  onCancel: (flag?: boolean, formVals?: UserParams) => void;
  onSubmit: (values: UserItem) => void;
};

const UpdateModal: FC<UpdateModalProps> = (props) => {
  const { visible, done, current, onDone, onSubmit, children } = props;
  //国际化
  const intl = useIntl();
  if (!visible) {
    return null;
  }

  return (
    <>
      <ModalForm<UserItem>
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
        <ProFormText
          name="username"
          label={intl.formatMessage({
            id: 'pages.user.username.label',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.user.username.required',
              }),
            },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.user.username.placeholder',
          })}
        />
        <ProFormSelect
          name="group"
          width="md"
          label={intl.formatMessage({
            id: 'pages.user.group.label',
          })}
          options={[
            {
              label: intl.formatMessage({
                id: 'pages.user.group.user',
              }),
              value: 'user',
            },
            {
              label: intl.formatMessage({
                id: 'pages.user.group.merchant',
              }),
              value: 'merchant',
            },
            {
              label: intl.formatMessage({
                id: 'pages.user.group.admin',
              }),
              value: 'admin',
            },
          ]}
        />
        <ProFormDigit name="id" hidden />
        <ProFormTextArea
          name="description"
          label={intl.formatMessage({
            id: 'pages.user.description.label',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.user.description.label',
          })}
        />
      </ModalForm>
    </>
  );
};

export default UpdateModal;
