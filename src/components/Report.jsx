{/*} no back-end : O endpoint REST que consulta o banco de dados Postgres precisa estar configurado.
    Utilizar o Spring Data JPA para facilitar as operações no banco de dados.

    no front-end : Faz chamadas ao endpoint usando axios  - requisições HTTP para obter os dados do relatório. */}
import './Report.css';

import PropTypes from "prop-types";


const Report = ({ data }) => {

    if (!data || data.length === 0) {
        return<div className="no-data"> Nenhum dado disponível para o relatório.</div>
    }
    return (
        <div className={"report-container"}>
            <h1>Relatório</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Quantidade Planejada</th>
                    <th>Quantidade real</th>
                    <th>Unidade</th>
                    <th>Hora de Início</th>
                    <th>Hora de Término</th>
                    <th>Tempo de Parada</th>
                    <th>Embalagem</th>
                    <th>Etiqueta</th>
                    <th>Equipamento</th>
                    <th>Validade</th>
                    <th>Anotação</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.planQuantity}</td>
                        <td>{item.realQuantity}</td>
                        <td>{item.unit}</td>
                        <td>{new Date(item.startTime).toLocaleString()}</td>
                        <td>{new Date(item.endTime).toLocaleString()}</td>
                        <td>{item.downTime}</td>
                        <td>{item["packageType"]}</td>
                        <td>{item["labelType"]}</td>
                        <td>{item["equipment"]}</td>
                        <td>{item["bestBefore"]}</td>
                        <td>{item.notes}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

Report.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            planQuantity: PropTypes.string.isRequired,
            realQuantity: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
            startTime: PropTypes.string.isRequired,
            finishTime: PropTypes.string.isRequired,
            downTime: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Report;
