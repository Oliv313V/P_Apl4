import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './ProductionChart.css';
import PropTypes from "prop-types";

const ProductionChart = ({ data }) => {
    let chartData;
    chartData = data.map(report => ({
        equipment: report.equipment,
        planejado: report.planQuantity,
        real: report.realQuantity,
    }));

    return (
        <div className="production-chart">
            <h3 className="chart-title"></h3>
            <BarChart width={ 800 } height={ 400 } data={chartData}>
                <CartesianGrid strokeDasharray="3, 3" />
                <XAxis dataKey="equipment" />
                <YAxis />
                <Tooltip  wraperClassName="tooltip" />
                <Legend />
                <Bar dataKey="planejado" name = "Planejado" fill="#82ca9d" />
                <Bar dataKey="real" name = "Real"  fill="#8884d8" />
            </ BarChart >
        </div>
    );
};

ProductionChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            equipment: PropTypes.string.isRequired,
            planQuantity: PropTypes.number.isRequired,
            realQuantity: PropTypes.number.isRequired,
        })
    ).isRequired,
};
export default ProductionChart;