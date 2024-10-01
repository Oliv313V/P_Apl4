import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './ProductionChart.css';
import PropTypes from "prop-types";

const ProductionChart = ({ data }) => {
    let chartData;
    chartData = data.map(report => ({
        labelType: report.labelType,
        planQuantity: report.planQuantity,
        realQuantity: report.realQuantity,
    }));

    return (
        <div className="production-chart">
            <h3 className="chart-title">Relatório de Produção</h3>
            <BarChart width={ 600 } height={ 300 } data={chartData}>
                <CartesianGrid strokeDasharray="3, 3" />
                <XAxis dataKey="labelType" />
                <YAxis />
                <Tooltip  wraperClassName="tooltip" />
                <Legend />
                <Bar dataKey="planQuantity" fill="#82ca9d" />
                <Bar dataKey="realQuantity" fill="#8884d8" />
            </ BarChart >
        < /div>
    );
};

ProductionChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            labelType: PropTypes.string.isRequired,
            planQuantity: PropTypes.number.isRequired,
            realQuantity: PropTypes.number.isRequired,
        })
    ).isRequired,
};
export default ProductionChart;