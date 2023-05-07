import {useContext, useEffect, useRef, useState} from "react";
import CreateModal from "./CreateModal";
import {DiagramContext} from "../../DiagramProperties/DiagramContext";
import {SvgContext} from "../../Graph/components/SvgContext";
import axios from "axios";
import FileSelect from "./FileSelect";

const FileItem = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const fileInput = useRef(null);
    const [currentSubMenu, setCurrentSubMenu] = useState(null);
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isFileSelect, setIsFileSelect] = useState(false);
    const {diagram, createDefaultDiagram, updateDiagramFull} = useContext(DiagramContext);
    const {svg} = useContext(SvgContext);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            setCurrentSubMenu(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleExportClick = (event) => {
        setCurrentSubMenu("export");
    }

    const handleCreateClick = () => {
        setCurrentSubMenu(null);
        setIsOpen(false);
        setIsCreateModal(true);
        //Спросить, уверен ли пользователь
    }

    const handleImportClick = () => {
        setCurrentSubMenu(null);
        openImportDialog();
    }

    const handleCreateCancel = () => {
        setIsCreateModal(false);
    }

    const handleCreateContinue = () => {
        setIsCreateModal(false);
        createDefaultDiagram();
    }

    const exportSvg = () => {
        const blob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = diagram.name;
        link.click();
        URL.revokeObjectURL(url);
    }

    function exportImage(format) {
        const svgString = svg;
        const img = new Image();
        const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
        const svgUrl = URL.createObjectURL(svgBlob);

        img.onload = function() {
            URL.revokeObjectURL(svgUrl);
            const canvas = document.createElement('canvas');
            const scale = 4;
            canvas.width = (img.width+2)*scale;
            canvas.height = (img.height-90)*scale;
            const ctx = canvas.getContext('2d');
            if(format === 'jpg') {
                ctx.fillStyle = '#ffffff'; // установите белый цвет
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.scale(scale,scale)
            ctx.drawImage(img, 0, 0);
            const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = diagram.name;
                link.click();
                URL.revokeObjectURL(url);
            }, mimeType, 1);
        };
        img.src = svgUrl;
    }

    const exportJson = () => {
        const jsonData = JSON.stringify(diagram, null, 2); // преобразуем объект в строку формата JSON с отступами
        const blob = new Blob([jsonData], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = diagram.name;
        link.click();
        URL.revokeObjectURL(url);
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                try {
                    const json = JSON.parse(contents);
                    updateDiagramFull(json);
                    // Здесь обрабатывайте загруженный JSON объект
                    console.log(json);
                } catch (err) {
                    alert('Ошибка при чтении файла: ' + err.message);
                }
            };
            reader.readAsText(file);
        }
    };

    const openImportDialog = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleFileOpenClose = () => {
        setIsFileSelect(false);
    }

    const handleSaveOnServerClick = () => {
        const login = sessionStorage.getItem("login");
        const token = JSON.parse(sessionStorage.getItem("tokens")).accessToken;
        const formData = new FormData();
        const json = JSON.stringify(diagram);
        const blob = new Blob([json], { type: 'application/json' });
        formData.append('file', blob);
        formData.append('login',login)
        formData.append('diagramName', diagram.name);

        axios.post("http://localhost:8080/api/storage/save", formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((resp) => {
            alert('Диаграмма ' + diagram.name + ' успешно сохранена на сервере!');
        }).catch(error => {
            alert(error);
            console.error(error);
        });
    }

    const handleOpenFromServerClick = () => {
        setCurrentSubMenu(null);
        setIsOpen(false);
        setIsFileSelect(true);
    }

    return <div ref={dropdownRef} className="cursor-pointer hover:bg-gray-300 rounded-lg px-2 py-0.5 active:shadow-inner z-10 relative">
        <button onClick={handleButtonClick}>Файл</button>
        {isOpen && (
            <div className="absolute top-8 left-0 inline-block bg-gray-100 p-1 rounded-lg">
                <ul className="flex flex-col gap-1">
                    <li onClick={handleCreateClick} className="hover:bg-gray-200 py-1 px-4 rounded-b-lg border">Создать</li>
                    <li onClick={handleOpenFromServerClick} className="hover:bg-gray-200 py-1 px-4 border">Открыть</li>
                    <li onClick={handleSaveOnServerClick} className="hover:bg-gray-200 py-1 px-4 border">Сохранить</li>
                    <li onClick={handleExportClick} className="hover:bg-gray-200 py-1 px-4 border">Экспорт</li>
                    <li onClick={handleImportClick} className="hover:bg-gray-200 py-1 px-4 rounded-b-lg border">Импорт</li>
                </ul>
            </div>
        )}
        <input
            type="file"
            id="importJson"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            ref={fileInput}
        />
        {currentSubMenu === 'export' && (
            <div className="absolute top-[69px] left-24 inline-block bg-gray-100 p-1 rounded-lg">
                <ul className="flex flex-col gap-1">
                    <li onClick={() => exportImage('jpg')} className="hover:bg-gray-200 py-1 rounded-t-lg px-4 border">jpg</li>
                    <li onClick={() => exportImage('png')} className="hover:bg-gray-200 py-1 px-4 border">png</li>
                    <li onClick={exportSvg} className="hover:bg-gray-200 py-1 px-4  border">svg</li>
                    <li onClick={exportJson} className="hover:bg-gray-200 py-1 px-4 rounded-b-lg border">json</li>
                </ul>
            </div>
            )}
        {isCreateModal && <CreateModal handleCancel={handleCreateCancel} handleContinue={handleCreateContinue}/>}
        {isFileSelect && <FileSelect handleClose={handleFileOpenClose}/>}
    </div>


}

export default FileItem