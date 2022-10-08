import { CheckOutlined, UserOutlined } from '@ant-design/icons';
import { ModalForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import type { FC } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import type { UserItem, UserParams } from '../../User/data';
import { getFakeCaptchaUser } from '../../User/service';
import styles from '../style.less';
type UpdateModalProps = {
  visible: boolean;
  done: boolean;
  onDone: () => void;
  onCancel: (flag?: boolean, formVals?: UserParams) => void;
  onSubmit: (values: UserItem) => void;
};

const UpdateModal: FC<UpdateModalProps> = (props) => {
  const { visible, done, onDone, onSubmit, children } = props;

  const intl = useIntl();

  if (!visible) {
    return null;
  }

  return (
    <ModalForm<UserItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.forgotPassword.title',
      })}
      className={styles.standardListForm}
      width={540}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      submitter={{
        render: (_, dom) => (done ? null : dom),
        searchConfig: {
          submitText: <FormattedMessage id="pages.forgotPassword.subimt"/>,
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
        name="username"
        label={intl.formatMessage({
          id: 'pages.forgotPassword.username',
        })}
        fieldProps={{
          size: 'middle',
          prefix: <UserOutlined className={styles.prefixIcon} />,
        }}
        rules={[{ required: true, message: 'please enter Email' }]}
        placeholder={intl.formatMessage({
          id: 'pages.forgotPassword.placeholder',
        })}
      />

      <ProFormCaptcha
        fieldProps={{
          size: 'middle',
          prefix: <CheckOutlined className={styles.prefixIcon} />,
        }}
        captchaProps={{
          size: 'middle',
        }}
        placeholder={intl.formatMessage({
          id: 'pages.forgotPassword.captcha.placeholder',
        })}
        phoneName="username"
        name="captcha"

        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${intl.formatMessage({
              id: 'pages.getCaptchaSecondText',
            })}`;
          }
          return intl.formatMessage({
            id: 'pages.register.captcha.get',
          });
        }}
        countDown={600}
        rules={[
          {
            required: true,
            message: <FormattedMessage id="pages.forgotPassword.captcha.required" />,
          },
        ]}
        onGetCaptcha={async (username) => {
          const { status, info } = await getFakeCaptchaUser({
            username,
          });
          if (status === true) {
            message.success(
              intl.formatMessage({
                id: 'pages.register.captcha.get.success',
              }),
            );
            return;
          } else {
            message.error(info);
            throw new Error(info);
          }
        }}
      />
    </ModalForm>
  );
};

export default UpdateModal;
