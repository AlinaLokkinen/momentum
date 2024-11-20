import { LineChart } from "react-native-chart-kit";
import { View, Text } from "react-native";

export default function WeightDiagram({ weightData }) {

    // talteen pelkät päivämäärät
    const dates = weightData.map(data => {
        return data.date;
    })
    
    // päivämäärien järjestäminen päivämäärinä ei onnistunut, 
    // järjestetään ne String -muodossa
    // https://stackoverflow.com/questions/30691066/sort-a-string-date-array
    const sortStringDates = dates.sort(function(a,b) {

        // erotetaan pp kk vvvv toisistaan, käännetään ne toiseen järjestykseen ja liitetään taas yhteen
        a = a.split(".").reverse().join('');
        b = b.split(".").reverse().join('');

        // järjestetään kasvavaan järjestykseen
        return a > b ? 1 : a < b ? -1 : 0;
    })

    // koko päivämäärä on liian pitkä, lyhennetään sitä
    const shortenedStringDates = sortStringDates.map(item => {
        return item.slice(0, 6);
    })

    console.log('Sortstringdates: ' + sortStringDates);

    const dataPoints = weightData.map(data => data.weight);

    const data = {
        labels: shortenedStringDates,
        datasets: [
            {
                data: dataPoints
            }
        ]
    }

    const chartConfig = {
        backgroundGradientFrom: "#E7E8EC",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#E7E8EC",
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
                    width={390}
                    height={220}
                    chartConfig={chartConfig}
                />
              
        </View>
    )
    
}