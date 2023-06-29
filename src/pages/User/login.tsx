import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { FormattedMessage, history, Link, SelectLang, useIntl, useModel } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';
import { getLocale  } from '@umijs/max';
import ForgotPassword from './components/ForgotPassword';

import styles from './login.less';
import { forgotPassword } from './service';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [visible, setVisible] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleDone = () => {
    setDone(false);
    setVisible(false);
  };

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
    return userInfo;
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const lang = getLocale ();
      values.lang=lang;

      const { status, token } = await login({ ...values });
      if (status) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
        });
        message.success(defaultLoginSuccessMessage);
        localStorage.setItem('token', token);
        await fetchUserInfo();
        //message.success(userInfo?.group);
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      return;
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
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
          logo={<img alt="logo" src="/logo.svg" />}
          title="Fans365.Net"
          submitter={{
            searchConfig: {
              submitText: intl.formatMessage({
                id: 'pages.login',
              }),
            },
          }}
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
          key="login"
        >
          <div
            style={{
              marginBottom: 10,
            }}
          />

          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.username.required" />,
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.password.required" />,
              },
            ]}
          />
          <div
            style={{
              marginBottom: 24,
              paddingBottom: 24,
            }}
          >
            <Link to="/user/register" style={{ float: 'left' }}>
              <FormattedMessage id="pages.register" />
            </Link>

            <a
              style={{ float: 'right' }}
              key="forgotpassword"
              onClick={() => {
                setVisible(true);
              }}
            >
              <FormattedMessage id="pages.forgotpassword" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />

      <ForgotPassword
        visible={visible}
        done={done}
        onDone={handleDone}
        onCancel={() => {
          setVisible(false);
        }}
        onSubmit={async (value) => {
          const { status, info } = await forgotPassword(value);
          if (status) {
            message.success(info);
            setVisible(false);
            return true;
          }
          return false;
        }}
      />
    </div>
  );
};

export default Login;
