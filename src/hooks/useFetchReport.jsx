import { useEffect, useState } from "react";
import { fetchReport} from "../services/reportService.jsx";

const useFetchReport = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReport = async () => {
            try {
                const data = await fetchReport();
                setReport(data);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };

        loadReport().then(r => {
            //escrever mensagem ou importar do componente mensagem
        });
    }, []);
                return {report, loading, error};
};

export default useFetchReport;