
import { useEffect, useState } from "react";
import productionService from "../../services/productionService.jsx";
import ProductionChart from "../../components/ProductionChart";
import * as console from "react-dom/test-utils";
import Message from "../../components/Message.jsx";

import "./Production.css";

const Production = () => {
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

    const handleCreateProduction = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            if (editingId) {
                await productionService.updateProduction(editingId, productionData);
                Production();
            } else {
                await productionService.createProduction(productionData);
                setReports(reports);
            }

            await productionService.fetchProduction();
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
                <h2>Painel de Apontamentos de Produção</h2>

                <p className="production-subtitle">Insira os dados da nova produção</p>

                <form onSubmit={handleCreateProduction}>
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

                    <label htmlFor="startTime">Inicio da produção:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={productionData.startTime}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="finishTime">Fim da produção:</label>
                    <input
                        type="datetime-local"
                        id="finishTime"
                        name="finishTime"
                        value={productionData.finishTime}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="startDowntime">Inicio tempo de parada:</label>
                    <input
                        type="datetime-local"
                        id="startDowntime"
                        name="startDowntime"
                        value={productionData.startDowntime}
                        onChange={handleChange}
                    /><br />

                    <label htmlFor="finishDowntime">Fim do tempo de parada:</label>
                    <input
                        type="datetime-local"
                        id="finishDowntime"
                        name="finishDowntime"
                        value={productionData.finishDowntime}
                        onChange={handleChange}
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

                    <label htmlFor="equipment">Equipamento:</label>
                    <input
                        type="number"
                        id="equipment"
                        name="equipment"
                        value={productionData.equipment}
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
                    /><br />

                    <button type="submit">{editingId ? 'Atualizar' : 'Cadastrar'}</button>
                    {loading && <p>Processando...</p>}
                    {error && <Message msg={error} type="error" />}
                </form>

                <div id="report">
                    <button type="button" onClick={handleReport}>Gerar Relatório</button>
                </div>

                <div className="reportsIn-container">
                    {reports.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Qtd. Planejada</th>
                                    <th>Qtd. Real</th>
                                    <th>Uni.</th>
                                    <th>Inicio</th>
                                    <th>Fim</th>
                                    <th>Inicio Parada</th>
                                    <th>Fim Parada</th>
                                    <th>Total Parada</th>
                                    <th>Embalagem</th>
                                    <th>Equipamento</th>
                                    <th>Turno</th>
                                    <th>Etiqueta</th>
                                    <th>Lote</th>
                                    <th>Validade</th>
                                    <th>Obs.</th>                                    
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

export default Production;