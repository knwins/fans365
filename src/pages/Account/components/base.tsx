import type { UserParams } from '@/pages/User/data';
import { UploadOutlined } from '@ant-design/icons';
import ProForm, { ProFormFieldSet, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Input, message, Upload } from 'antd';
import React from 'react';
import { useRequest } from 'umi';
import { queryCurrent, updateUser } from '../service';

import styles from './BaseView.less';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => {
  //国际化
  const intl = useIntl();

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: any) => {
    // console.log(info);
    //上传完成处理返回数据
    if (info.file.status === 'done') {
      if (info.file.response.status) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
        location.reload();
      }
    }
  };

  return (
    <>
      <div className={styles.avatar_title}>
        {' '}
        <FormattedMessage id="pages.account.header.image" />
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload
        accept="image/png, image/jpeg"
        action="https://api.fans365.net/api/users/upload_image"
        showUploadList={false}
        beforeUpload={beforeUpload}
        name="imageFile"
        onChange={handleChange}
        headers={{
          token: localStorage.getItem('token'),
        }}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            <FormattedMessage id="pages.account.header.image.modify" />
          </Button>
        </div>
      </Upload>
    </>
  );
};

const BaseView: React.FC = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  //国际化
  const intl = useIntl();

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFinish = async (fields: any, currentRow?: UserParams) => {
    try {
      const loadingHiddle = message.loading(
        intl.formatMessage({
          id: 'pages.tip.loading',
        }),
      );

      const { status, info } = await updateUser({
        ...currentRow,
        ...fields,
      });

      loadingHiddle();
      if (status) {
        message.success(info);
        location.reload();
        return true;
      }
      return false;
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );
      return false;
    }
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: intl.formatMessage({
                    id: 'pages.modify',
                  }),
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                phones: currentUser?.phone.split('-'),
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="signature"
                label={intl.formatMessage({
                  id: 'pages.account.signature.label',
                })}
                placeholder={intl.formatMessage({
                  id: 'pages.account.signature.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.signature.required',
                    }),
                  },
                ]}
              />
              <ProFormTextArea
                name="description"
                label={intl.formatMessage({
                  id: 'pages.account.description.label',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.description.required',
                    }),
                  },
                ]}
                placeholder={intl.formatMessage({
                  id: 'pages.account.description.placeholder',
                })}
              />

              <ProFormFieldSet
                name="phones"
                label={intl.formatMessage({
                  id: 'pages.account.phones.label',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.account.phones.required',
                    }),
                  },
                  { validator: validatorPhone },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
