import { View } from "react-native"
import { Calendar } from "react-native-calendars"

export default function WorkoutCalendar({ workoutData }) {

    // käydään läpi workoutdata
    const workoutDates = workoutData.reduce((accumulator, data) => {
        // päivämäärät väärässä muodossa (dd-mm-yyy), muutetaan yyyy-mm-dd:
        const dateSplits = data.date.split(".");
        let date = '';
        // jos päivä on 1-9, muutetaan se 01-09
        // muuten kalenterissa ei näy 'pallo' treenipäivän kohdalla
        if (dateSplits[0].length < 2) {
            date = `${dateSplits[2]}-${dateSplits[1]}-0${dateSplits[0]}`;
        } else {
            date = `${dateSplits[2]}-${dateSplits[1]}-${dateSplits[0]}`;
        }
        
        // esim. '2024-11-14' = { kalenterin asetuksia }
        // accumulator säilöö tiedot koodin ajon ajaksi
        accumulator[date] = {
            customStyles: {
                container: {
                    backgroundColor: 'rgb(1, 40, 57)'
                },
                text: {
                    color: 'white'
                }
            },
            marked: true,
            dotColor: 'rgb(70, 78, 18)',
            selectedColor: 'red',
        };
        return accumulator;
    }, {});

    
    return (
        <View>
            <Calendar 
                markingType='custom'
                firstDay={1}
                markedDates={workoutDates}
                style={{
                    borderWidth: 1,
                    borderColor: 'rgb(70, 78, 18)',
                    height: 400,
                    width: 300,
                  }}
            />
        </View>
    )
}