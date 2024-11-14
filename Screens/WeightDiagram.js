import { LineChart } from "react-native-chart-kit";
import { View, Text } from "react-native";

export default function WeightDiagram({ weightData }) {

    // console.log(weightData);

    const labels = weightData.map(data => {
        const shortDate = data.date.slice(0, -4);
        return shortDate;
    });
    // console.log(labels);


    const dataPoints = weightData.map(data => data.weight);
    // console.log(dataPoints);

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataPoints
            }
        ]
    }

    const chartConfig = {
        backgroundGradientFrom: "#FFE7C1",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#FFE7C1",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(57, 62, 65, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return (
        <View style={{margin: 15, alignItems: 'center'}}>
    
                    <LineChart 
                    data={data}
                    width={300}
                    height={220}
                    chartConfig={chartConfig}
                />
              
        </View>
    )
    
}