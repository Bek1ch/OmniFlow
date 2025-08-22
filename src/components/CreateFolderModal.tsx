import React, { useState } from "react";
import { Modal, Button, Input } from "./ui";
import "./CreateFolderModal.css";

interface FolderData {
  name: string;
  hrEmployee: string;
  selectedFiles: File[];
  accessUsers: string[];
  readingUsers: string[];
  functionalAutoBlocking: boolean;
}

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (folderData: FolderData) => void;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    hrEmployee: "",
    selectedFiles: [] as File[],
    accessUsers: [] as string[],
    readingUsers: [] as string[],
    functionalAutoBlocking: false,
  });

  const [employees] = useState([
    "Этика",
    "Добавить сотрудника",
    "Удалить сотрудника",
    "Создать группу",
    "Назначить группу",
    "Удалить группу",
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData((prev) => ({ ...prev, selectedFiles: files }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      name: "",
      hrEmployee: "",
      selectedFiles: [],
      accessUsers: [],
      readingUsers: [],
      functionalAutoBlocking: false,
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form
    setFormData({
      name: "",
      hrEmployee: "",
      selectedFiles: [],
      accessUsers: [],
      readingUsers: [],
      functionalAutoBlocking: false,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создать папку"
      size="lg"
      className="create-folder-modal"
    >
      <div className="create-folder-form">
        {/* Основные настройки папки */}
        <div className="form-section">
          <h3 className="form-section-title">Основные настройки папки</h3>

          <div className="form-group">
            <label className="form-label">HR - прием сотрудника</label>
            <Input
              type="text"
              placeholder="Введите название..."
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Выберите файл:</label>
            <div className="file-upload-area">
              <div className="file-upload-button">
                <div className="file-upload-icon">+</div>
                <span className="file-upload-text">Добавить файл</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="file-upload-input"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.functionalAutoBlocking}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    functionalAutoBlocking: e.target.checked,
                  }))
                }
                className="checkbox-input"
              />
              <span className="checkbox-text">
                Включить функциональный автоблокировщик элементов при
                редактировании
              </span>
            </label>
          </div>
        </div>

        {/* Подписи */}
        <div className="form-section">
          <h3 className="form-section-title">Подписи</h3>

          <div className="employees-grid">
            {employees.map((employee, index) => (
              <div key={index} className="employee-tag">
                {employee}
              </div>
            ))}
          </div>
        </div>

        {/* Доступ */}
        <div className="form-section">
          <h3 className="form-section-title">Доступ</h3>
          <div className="access-button">
            <Button variant="secondary" size="sm">
              + Добавить
            </Button>
          </div>
        </div>

        {/* Доступы к чтению */}
        <div className="form-section">
          <h3 className="form-section-title">Доступы к чтению</h3>
          <div className="access-button">
            <Button variant="secondary" size="sm">
              + Добавить
            </Button>
          </div>
        </div>
      </div>

      {/* Footer with buttons */}
      <div className="modal-footer-buttons">
        <Button variant="primary" onClick={handleSave}>
          Сохранить
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Применить
        </Button>
      </div>
    </Modal>
  );
};

export default CreateFolderModal;
