import React, { useState } from "react";
import "./ProcessList.css";
import CreateFolderModal from "./CreateFolderModal";

interface ProcessCard {
  id: number;
  title: string;
  icon: string;
  type: "department" | "process" | "action";
}

const ProcessList: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [processCards] = useState<ProcessCard[]>([
    { id: 1, title: "HR", icon: "📁", type: "department" },
    { id: 2, title: "Документы", icon: "📄", type: "department" },
    { id: 3, title: "Бухгалтерия", icon: "🏢", type: "department" },
    { id: 4, title: "АПП", icon: "📊", type: "department" },
    { id: 5, title: "Реселлинг", icon: "👥", type: "department" },
    { id: 6, title: "Юридический отдел", icon: "⚖️", type: "department" },
    { id: 7, title: "ЮРО - АРХИВ", icon: "📋", type: "process" },
    { id: 8, title: "Сметный отдел", icon: "💰", type: "department" },
    { id: 9, title: "Справочник", icon: "📖", type: "department" },
    { id: 10, title: "Создать", icon: "+", type: "action" },
  ]);

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSaveFolder = (folderData: {
    name: string;
    hrEmployee: string;
    selectedFiles: File[];
    accessUsers: string[];
    readingUsers: string[];
    functionalAutoBlocking: boolean;
  }) => {
    console.log("Создание папки:", folderData);
    // Здесь будет логика сохранения папки
  };

  return (
    <div className="process-list">
      <div className="process-list__content">
        <div className="process-list__title-section">
          <h1 className="process-list__title">Процессы</h1>
        </div>

        <div className="process-list__toolbar">
          <div className="process-list__search">
            <div className="process-list__search-icon">🔍</div>
            <input
              type="text"
              placeholder="Поиск по процессам"
              className="process-list__search-input"
            />
          </div>
          <div className="process-list__toolbar-actions">
            <button className="process-list__add-button">
              + Добавить новый процесс
            </button>
          </div>
        </div>

        <div className="process-list__grid">
          {processCards.map((card) => (
            <div
              key={card.id}
              className={`process-card ${card.type === "action" ? "process-card--action" : ""}`}
              onClick={card.type === "action" ? handleCreateClick : undefined}
              style={card.type === "action" ? { cursor: "pointer" } : {}}
            >
              <div className="process-card__icon">{card.icon}</div>
              <div className="process-card__title">{card.title}</div>
            </div>
          ))}
        </div>

        <div className="process-list__footer">
          <div className="process-list__pagination">
            <button className="process-list__pagination-btn">‹</button>
            <span className="process-list__pagination-info">На странице</span>
            <select className="process-list__pagination-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <button className="process-list__pagination-btn">›</button>
          </div>
        </div>
      </div>

      <CreateFolderModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveFolder}
      />
    </div>
  );
};

export default ProcessList;
