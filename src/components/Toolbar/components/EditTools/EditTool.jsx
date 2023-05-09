import CreateModal from "../CreateModal";
import FileSelect from "../FileSelect";
import {useEffect, useRef, useState} from "react";
import FileEditor from "./FileEditor";

const EditTool = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showFileEditor, setShowFileEditor] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleEditButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleDiagramFileClick = () => {
        setShowFileEditor(true);
    }

    const handleEditorClose = () => {
        setShowFileEditor(false);
    }

    return <div ref={dropdownRef} className="cursor-pointer hover:bg-gray-300 rounded-lg px-2 py-0.5 active:shadow-inner z-10 relative">
        <button onClick={handleEditButtonClick}>Редактирование</button>
        {isOpen && (
            <div className="absolute top-8 left-0 inline-block bg-gray-100 p-1 rounded-lg">
                <ul className="flex flex-col gap-1">
                    <li onClick={handleDiagramFileClick} className="hover:bg-gray-200 py-1 px-4 rounded-b-lg border">JSON</li>
                </ul>
            </div>
        )}
        {showFileEditor && <FileEditor handleClose={handleEditorClose}/>}
    </div>
}

export default EditTool