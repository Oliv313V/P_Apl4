
import { useEffect, useState } from "react";
import productionService from "../../services/productionService.jsx";
import ProductionChart from "../../components/ProductionChart";
import * as console from "react-dom/test-utils";
import Message from "../../components/Message.jsx";

import "./Report.css";

const Report = () => {
    const [productionData, setProductionData] = useState({
        planQuantity: '',
        realQuantity: '',
        unit: '',
        startTime: '',
        finishTime: '',
        startDowntime: '',
        finishDowntime: '',
        packageType: '',
        equipment: '',
        labelType: '',
        bestBefore: '',
        notes: ''
    });

    const [reports, setReports] = useState([]);
    const [editingId, setEditingId] = useState("");
    const [loading, setLoading] = useState(false); // Estado de loading
    const [error, setError] = useState(null); // Estado de erro

    useEffect(() => {
        const loadReports = async () => {
            setLoading(true);
            try {
                const reportData = await productionService.fetchProduction(); // Chama a função para buscar relatórios                
                setReports(reportData); // Atualiza o estado
            } catch (error) {
                console.error("Erro ao carregar relatórios:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadReports(); // Chama a função para buscar relatórios
    }, []);

    const handleEdit = (productionData) => {
        setProductionData(productionData); // Define os dados do registro no formulário
        setEditingId(productionData.idProduction); // Armazena o ID do registro em edição
    };

    const handleDelete = async (id) => {
        try {
            productionService.deleteProduction(id);
            setReports(reports.filter((report) => report.idProduction !== id));
        } catch (error) {
            console.error("Erro ao excluir produção:", error);
            setError(error.message);
        }
    };

    const handleReport = async () => {
        const reportData = await productionService.fetchProductionPDF();
    }


    return (
        <div id="manage-production">
            <div className="production-container">
                <h2>Relatório de Produção</h2>
                <div id="report">
                    <button type="button" onClick={handleReport}>Gerar Relatório</button>
                </div>
                <div className="reportsIn-container">
                    {reports.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Plan Quantity</th>
                                    <th>Real Quantity</th>
                                    <th>Unit</th>
                                    <th>Start Time</th>
                                    <th>Finish Time</th>
                                    <th>Start Downtime</th>
                                    <th>Finish Downtime</th>
                                    <th>Downtime</th>
                                    <th>Package Type</th>
                                    <th>Equipment</th>
                                    <th>Work Shift</th>
                                    <th>Label Type</th>
                                    <th>Production Batch</th>
                                    <th>Best Before</th>
                                    <th>Notes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((productionData, index) => (
                                    <tr
                                        key={productionData.length - productionData.length - 1}
                                        className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
                                    >
                                        <td>{productionData.idProduction}</td>
                                        <td>{productionData.planQuantity}</td>
                                        <td>{productionData.realQuantity}</td>
                                        <td>{productionData.unit}</td>
                                        <td>{productionData.startTime}</td>
                                        <td>{productionData.finishTime}</td>
                                        <td>{productionData.startDowntime}</td>
                                        <td>{productionData.finishDowntime}</td>
                                        <td>{productionData.downtime}</td>
                                        <td>{productionData.packageType}</td>
                                        <td>{productionData.equipment}</td>
                                        <td>{productionData.workShift}</td>
                                        <td>{productionData.labelType}</td>
                                        <td>{productionData.productionBatch}</td>
                                        <td>{productionData.bestBefore}</td>
                                        <td>{productionData.notes}</td>
                                        <td>
                                            <button onClick={() => handleEdit(productionData)}>Editar</button>
                                            <button onClick={() => handleDelete(productionData.idProduction)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Não há dados de produção disponíveis!</p>
                    )}
                </div>

                <div className="production-chart-container">
                    <h3>Gráfico de Produção</h3>
                    {reports.length > 0 ? (
                        <ProductionChart data={reports} />
                    ) : (
                        <p>Não há dados de produção disponíveis!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Report;