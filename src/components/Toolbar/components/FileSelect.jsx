import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";

const FileSelect = ({handleClose}) => {
    const [files, setFiles] = useState([]);
    const {updateDiagramFull} = useContext(DiagramContext);
    const api = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

    useEffect(() => {
        const login = sessionStorage.getItem("login");
        const token = JSON.parse(sessionStorage.getItem("tokens")).accessToken;

        axios.post(`${api}/api/storage/getList`, {
            login: login
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((resp) => {
            setFiles(resp.data);
        }).catch(error => {
            alert(error);
            console.error(error);
        });
    },[])

    function setDiagram(diagramName) {
        const login = sessionStorage.getItem("login");
        const token = JSON.parse(sessionStorage.getItem("tokens")).accessToken;
        axios.post(`${api}/api/storage/getDiagram`, {
            login: login,
            diagramName: diagramName
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((resp) => {
             updateDiagramFull(resp.data);
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="hover:cursor-default fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white p-8 rounded shadow-lg space-y-3 items-center justify-items-center self-center flex flex-col max-h-52 w-60 overflow-auto">
                <h2 className={"font-bold"}>Список файлов</h2>
                {files.length === 0 ? <label>Пусто</label> :
                    <ul>
                        {files.map(file => (
                            <li onClick={()=>setDiagram(file)} className={"cursor-pointer hover:underline decoration-dotted"} key={file}>{file}</li>
                        ))}
                    </ul>
                }
                <button className={"bg-red-500 text-white px-4 py-2 rounded mr-2 self-center"} onClick={handleClose}>Закрыть</button>
            </div>
        </div>
    );
}

export default FileSelect;