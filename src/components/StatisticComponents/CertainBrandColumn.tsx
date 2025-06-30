import { Column } from '@ant-design/plots';

const DemoDefaultTooltip = () => {
  const data = [
    { letter: 'A', frequency: 8167 },
    { letter: 'B', frequency: 1492 },
  ];
  const config = {
    data,
    xField: 'letter',
    yField: 'frequency',
    onReady: ({ chart }) => {
      try {
        const { height } = chart._container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];
        chart.on(
          'afterrender',
          () => {
            chart.emit('tooltip:show', {
              data: {
                data: tooltipItem,
              },
              offsetY: height / 2 - 60,
            });
          },
          true,
        );
      } catch (e) {
        console.error(e);
      }
    },
  };
  return <Column {...config} />;
};
export default DemoDefaultTooltip