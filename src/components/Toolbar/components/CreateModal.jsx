import Modal from "react-modal";

const CreateModal = ({handleCancel, handleContinue}) => {
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-xl mb-4">Вы уверены?</h2>
                <p>Все изменения будут сброшены.</p>
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleCancel}
                    >
                        Отмена
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleContinue}
                    >
                        Продолжить
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CreateModal