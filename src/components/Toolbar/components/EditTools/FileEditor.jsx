import {useContext, useState} from "react";
import {DiagramContext} from "../../../DiagramProperties/DiagramContext";

const FileEditor = ({handleClose}) => {
    const {diagram, updateDiagram} = useContext(DiagramContext);
    const [jsonString, setJsonString] = useState(JSON.stringify(diagram, null, 4));

    const handleSaveClick = () => {
        try {
            const newDiagram = JSON.parse(jsonString);
            updateDiagram(newDiagram);
        } catch (e) {
            alert("Ошибка в формате!");
            console.log(e);
        }
        handleClose();
    }

    const handleCancelClick = () => {
        handleClose();
    }

    const handleStringChange = (event) => {
        setJsonString(event.target.value);
    }

    return (
        <div className="hover:cursor-default fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-xl mb-4 text-center">Файл диаграммы</h2>
                <div>
                    <textarea className={"border w-96 h-96"}
                              value={jsonString}
                              onChange={handleStringChange}
                    />
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleCancelClick}
                    >
                        Отмена
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleSaveClick}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}
export default FileEditor;