import { Column } from '@ant-design/plots';

interface DataItem {
  letter: string;
  frequency: number;
}

interface ChartInstance {
  getContainer: () => HTMLElement;
  on: (event: string, callback: () => void, once?: boolean) => void;
  emit: (event: string, params: { data: { data: DataItem }; offsetY: number }) => void;
}

const CertainBrandColumn = () => {
  const data: DataItem[] = [
    { letter: 'A', frequency: 8167 },
    { letter: 'B', frequency: 1492 },
  ];

  const config = {
    data,
    xField: 'letter',
    yField: 'frequency',
    onReady: ({ chart }: { chart: ChartInstance }) => {
      try {
        const { height } = chart.getContainer().getBoundingClientRect();
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

export default CertainBrandColumn;