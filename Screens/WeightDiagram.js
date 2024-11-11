
export default function WeightDiagram({ weightData }) {

    console.log(weightData);

    const labels = weightData.map(e => console.log(e));

    const weights = weightData.map(e => e.weight);

    // const data = {
    //     labels: labels,
    //     datasets: [
    //         {
    //             label: 'Weight',
    //             data: weights,
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //             fill: true,
    //             pointRadius: 5, // Määritä pisteiden koko
    //             pointBackgroundColor: 'rgba(75, 192, 192, 1)',
    //         }
    //     ]
    // }

}