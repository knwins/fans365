import { GridContent } from '@ant-design/pro-layout';
import { FormattedMessage, Link } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import { Fragment } from 'react';

const extra = (
  <Fragment>
    <Link to="/" key="index">
      <Button type="primary">
        <FormattedMessage id="pages.index" />
      </Button>
    </Link>
  </Fragment>
);

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title={<FormattedMessage id="pages.result.success.twitter.title" />}
        subTitle={<FormattedMessage id="pages.result.success.twitter.subTitle" />}
        extra={extra}
        style={{ marginBottom: 16 }}
      />
    </Card>
  </GridContent>
);
