import { useEffect, useState } from "react";
import productionService from "../../services/productionService.jsx";
import reportService from "../../services/reportService.jsx";
import ProductionChart from "../../components/ProductionChart";
import * as console from "react-dom/test-utils";
import Message from "../../components/Message.jsx";

import "./Production.css";



const Production = () => {
    const [productionData, setProductionData] = useState({
        planQuantity: '',
        realQuantity: '',
        unit: '',
        finishTime: '',
        downtime: '',
        packageType: '',
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
                const reportData = await fetchReports(); // Chama a função para buscar relatórios
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

    const fetchReports = async () => {
        try {
            const reportData = await reportService.getReports();
            return (reportData);
        } catch (error) {
            console.error("Erro ao buscar relatórios", error);
            throw error;
        }
    };

    const handleRecordProduction = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await productionService.updateProductionData(editingId, productionData);
            } else {
                await productionService.recordProduction(productionData);
            }

            // Limpa os dados do formulário e ID
            setProductionData({
                planQuantity: '',
                realQuantity: '',
                unit: '',
                finishTime: '',
                downtime: '',
                packageType: '',
                labelType: '',
                bestBefore: '',
                notes: ''
            });
            await fetchReports();
        } catch (error) {
            console.error("Erro ao registrar ou atualizar produção:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductionData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEdit = (report) => {
        setProductionData(report); // Define os dados do registro no formulário
        setEditingId(report.id); // Armazena o ID do registro em edição
    };

    const handleDelete = async (id) => {
        try {
            await productionService.deleteProduction(id);
            await fetchReports();
        } catch (error) {
            console.error("Erro ao excluir produção:", error);
            setError(error.message);
        }
    };

    return (
        <div id="manage-production">
            <div className="production-container">
                <h2>Painel de Apontamentos de Produção</h2>

                <p className="production-subtitle">Insira os dados da nova produção</p>

                <form onSubmit={handleRecordProduction}>
                    <label htmlFor="planQuantity">Quantidade planejada:</label>
                    <input
                        type="number"
                        id="planQuantity"
                        name="planQuantity"
                        value={productionData.planQuantity}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="realQuantity">Quantidade real:</label>
                    <input
                        type="number"
                        id="realQuantity"
                        name="realQuantity"
                        value={productionData.realQuantity}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="unit">Unidade:</label>
                    <input
                        type="text"
                        id="unit"
                        name="unit"
                        value={productionData.unit}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="finishTime">Fim de produção:</label>
                    <input
                        type="datetime-local"
                        id="finishTime"
                        name="finishTime"
                        value={productionData.finishTime}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="downtime">Tempo de parada:</label>
                    <input
                        type="number"
                        id="downtime"
                        name="downtime"
                        value={productionData.downtime}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="packageType">Embalagem:</label>
                    <input
                        type="text"
                        id="packageType"
                        name="packageType"
                        value={productionData.packageType}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="labelType">Tipo de etiqueta:</label>
                    <input
                        type="text"
                        id="labelType"
                        name="labelType"
                        value={productionData.labelType}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="bestBefore">Data de validade:</label>
                    <input
                        type="date"
                        id="bestBefore"
                        name="bestBefore"
                        value={productionData.bestBefore}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="notes">Observações:</label>
                    <input
                        type="text"
                        id="notes"
                        name="notes"
                        value={productionData.notes}
                        onChange={handleChange}
                        required
                    /><br />

                    <button type="submit">{editingId ? 'Atualizar' : 'Cadastrar'}</button>
                    {loading && <p>Processando...</p>}
                    {error && <Message msg={error} type="error" />}
                </form>

                <div className="reportsIn-container">
                    <h3>Relatório de Produção</h3>
                    {reports.length > 0 ? (
                        <ul>
                            {reports.map((report) => (
                                <li key={report.id}>
                                    {`${report.planQuantity} - ${report.realQuantity} - ${report.unit} - ${report.finishTime} - ${report.downtime} - ${report.packageType} - ${report.labelType} - ${report.bestBefore} - ${report.notes}`}
                                    <button onClick={() => handleEdit(report)}>Editar</button>
                                    <button onClick={() => handleDelete(report.id)}>Excluir</button>
                                </li>
                            ))}
                        </ul>
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

export default Production;