import { CheckOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { Form, message, Popover, Progress } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import { FormattedMessage, history, SelectLang, useIntl } from 'umi';
import styles from './register.less';

import Footer from '@/components/Footer';
import { Link } from '@umijs/max';
import type { UserRegisterParams } from './data';
import { getFakeCaptcha, registerUser } from './service';

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>
        <FormattedMessage id="pages.password.strength.strong" />
      </span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>
        <FormattedMessage id="pages.password.strength.medium" />
      </span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>
        <FormattedMessage id="pages.password.strength.weak" />
      </span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register: FC = () => {
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [popover, setPopover]: [boolean, any] = useState(false);
  const intl = useIntl();
  const confirmDirty = false;
  const [form] = Form.useForm();
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(
        <FormattedMessage
          id="pages.password.two.error"
          defaultMessage="Two times to enter the password does not match"
        />,
      );
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject(
        <FormattedMessage
          id="pages.register.password.required"
          defaultMessage="Please enter password"
        />,
      );
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirmPassword']);
    }

    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  //提交注册
  const handleSubmit = async (values: UserRegisterParams) => {
    try {
      // 登录
      const { status } = await registerUser({ ...values });
      if (status) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.register.success',
        });
        message.success(defaultLoginSuccessMessage);
        history.push('/user/login');
        return;
      }
      return;
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.register.failure',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>

      <div className={styles.content}>
        <LoginForm
          form={form}
          name="UserRegister"
          logo={<img alt="logo" src="/logo.svg" />}
          title="Fans365.Net"
          submitter={{
            searchConfig: {
              submitText: intl.formatMessage({
                id: 'pages.register',
              }),
            },
          }}
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as UserRegisterParams);
          }}
        >
          <div
            style={{
              marginBottom: 10,
            }}
          />

          <ProFormText
            name="username"
            width="lg"
            style={{ float: 'left' }}
            label={intl.formatMessage({
              id: 'pages.register.username.lable',
            })}
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.register.username.placeholder',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'pages.register.please.username',
                }),
              },
              {
                type: 'email',
                message: intl.formatMessage({
                  id: 'pages.register.please.username.error',
                }),
              },
            ]}
          />

          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <CheckOutlined className={styles.prefixIcon} />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={intl.formatMessage({
              id: 'pages.register.captcha.placeholder',
            })}
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
            phoneName="username"
            name="captcha"
            countDown={600}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.register.captcha.required" />,
              },
            ]}
            onGetCaptcha={async (username) => {
              const { status, info } = await getFakeCaptcha({
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

          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            content={
              visible && (
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <span>
                      <FormattedMessage id="pages.password.tip" />
                    </span>
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <ProFormText.Password
              name="password"
              label={intl.formatMessage({
                id: 'pages.register.password.lable',
              })}
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.register.password.placeholder',
              })}
              className={
                form.getFieldValue('password') &&
                form.getFieldValue('password').length > 0 &&
                styles.password
              }
              rules={[
                {
                  required: true,
                  validator: checkPassword,
                },
              ]}
            />
          </Popover>
          <ProFormText.Password
            label={intl.formatMessage({
              id: 'pages.register.confirm.password.lable',
            })}
            name="confirmPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.register.confirm.password.placeholder',
            })}
            rules={[
              {
                required: true,
                validator: checkConfirm,
              },
            ]}
          />

          <div
            style={{
              marginBottom: 24,
              paddingBottom: 24,
            }}
          >
            <Link to="/user/login" style={{ float: 'right' }} key="forgotpassword">
              <FormattedMessage id="pages.register.accountLogin" />
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
