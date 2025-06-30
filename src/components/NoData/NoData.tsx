import { Empty, Typography } from 'antd';

export const NoData = () => (
  <Empty
    style={{margin:'auto',alignSelf:'center'}}
    styles={{ image: { height: 200 } }}
    description={
      <Typography.Text>
        Ничего не найдено
      </Typography.Text>
    }
  >
  </Empty>
);
