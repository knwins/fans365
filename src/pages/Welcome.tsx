import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage } from '@umijs/max';
import { Divider, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph,Text } = Typography;

const Welcome: React.FC = () => {
  return (


    
    <PageContainer>
      <Typography>
        
        <Title level={4}><FormattedMessage id="pages.welcome.title"/></Title>
        <Divider />
        <Paragraph strong> Twitter 推特</Paragraph>
        <Paragraph>
          <ul>
            <li>推特普通粉丝 0.1元</li>
            <li>推特优质粉丝0.2元(带资料有推文)</li>
            <li>点赞0.1元，转发0.2元，自定义评论1元</li>
          </ul>
        </Paragraph>

        <Paragraph strong> 电报 Telegram</Paragraph>
        <Paragraph>
          <ul>
            <li>电报普通粉丝0.1元</li>
            <li>电报指定群拉人0.2元</li>
          </ul>
        </Paragraph>

        <Paragraph strong> Discord</Paragraph>
        <Paragraph>
          <ul>
            <li>discord粉丝0.15元</li>
            <li>discord在线粉丝2元</li>
            <li>discord中英水军1w/月（8个号，一个号一天150条）</li>
            <li>discord机器人水军4K/月</li>
          </ul>
        </Paragraph>

        <Paragraph strong> 其他</Paragraph>
        <Paragraph>
          <ul>
            <li>youtube粉丝0.5元</li>
            <li>tiktok粉丝0.1元</li>
            <li>ins粉丝0.01元</li>
            <li>抖音粉丝0.25元</li>
          </ul>
        </Paragraph>
        <Divider />
        <Text><FormattedMessage id="pages.welcome.title5"/></Text>
        
      </Typography>

    </PageContainer>
  );
};

export default Welcome;
