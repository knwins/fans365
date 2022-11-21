import { UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import { Button, message, Upload } from 'antd';
import type { FC } from 'react';
import type { UserItem, UserParams } from '../../User/data';
import styles from '../style.less';

type PayBindProps = {
  visible: boolean;
  done: boolean;
  current: UserItem | undefined;
  payname: string;
  onDone: () => void;
  onCancel: (flag?: boolean, formVals?: UserParams) => void;
  onSubmit: (values: UserItem) => void;
};

type AvatarPayItem = {
  payname: string;
  payurl: string;
};

const AvatarView = ({ avatar }: { avatar: any }) => {
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
    if (info.file.status === 'done') {
      if (info.file.response.status) {
        message.success(
          intl.formatMessage({
            id: 'pages.tip.success',
          }),
        );
        location.reload();
        return;
      }
    }
  };

  return (
    <>
      <div className={styles.avatar_title}>{avatar.payname} </div>

      <div className={styles.avatar_image}>
        <img src={avatar.payurl} title={avatar.payname} />
      </div>

      <Upload
        accept="image/png, image/jpeg"
        action={'https://api.fans365.net/api/users/upload_image?payname=' + avatar.payname}
        showUploadList={false}
        beforeUpload={beforeUpload}
        name="imageFile"
        onChange={handleChange}
        headers={{
          'token': localStorage.getItem('token'),
        }}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            <FormattedMessage id="pages.account.payimage.upload" />
          </Button>
        </div>
      </Upload>
    </>
  );
};

const UpdateModal: FC<PayBindProps> = (props) => {
  const { visible, payname, done, current, onDone, onSubmit, children } = props;

  //国际化
  const intl = useIntl();

  const getAvatarURL = () => {
    if (current) {
      const url="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png";
      if (payname == 'Alipay') {
        return current.alipay?current.alipay:url;
      } else if (payname == 'WeChat Pay') {
        return current.wechatpay?current.wechatpay:url;
      } else if (payname == 'TRC-USDT Pay') {
        return current.usdtpay?current.usdtpay:url;
      }
    }
    return '';
  };

  //创建PayItem
  const payItem: AvatarPayItem = {
    payname: payname,
    payurl: getAvatarURL(),
  };

  if (!visible) {
    return null;
  }
  return (
    <ModalForm<UserItem>
      visible={visible}
      title={intl.formatMessage({
        id: 'pages.account.paybinding',
      })}
      className={styles.standardListForm}
      width={640}
      initialValues={current}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      submitter={false}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <div className={styles.right}>
        <AvatarView avatar={payItem} />
      </div>
      <ProFormText name="id" hidden />
    </ModalForm>
  );
};

export default UpdateModal;
