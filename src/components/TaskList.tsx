import React, { useState, useEffect } from "react";
import "./TaskList.css";

interface Task {
  id: number;
  title: string;
  activity: string;
  deadline: string;
  createdDate: string;
  assignee: {
    name: string;
    avatar: string;
  };
  executor: {
    name: string;
    avatar: string;
    additionalCount?: number;
  };
  project: string;
  completed: boolean;
}

interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  category?: "basic" | "dates" | "users" | "project" | "advanced";
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Входящая заявка в IT-отдел",
      activity: "14 сентябрь 15:10",
      deadline: "18 сентябрь 18:30",
      createdDate: "14 сентябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤"
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤",
        additionalCount: 3
      },
      project: "Команда разработки",
      completed: false
    },
    {
      id: 2,
      title: "Входящая заявка в IT-отдел",
      activity: "14 декабрь 15:10",
      deadline: "18 декабрь 18:30",
      createdDate: "14 декабрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤"
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤"
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false
    },
    {
      id: 3,
      title: "Входящая заявка в IT-отдел",
      activity: "14 ноябрь 15:10",
      deadline: "18 ноябрь 18:30",
      createdDate: "14 ноябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤"
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤"
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false
    },
    {
      id: 4,
      title: "Входящая заявка в IT-отдел",
      activity: "14 ноябрь 15:10",
      deadline: "18 ноябрь 18:30",
      createdDate: "14 ноябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤"
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤"
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false
    },
    {
      id: 5,
      title: "Входящая заявка в IT-отдел",
      activity: "14 ноябрь 15:10",
      deadline: "18 ноябрь 18:30",
      createdDate: "14 ноябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤"
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤"
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false
    },
    {
      id: 6,
      title: "Входящая заявка в IT-отдел",
      activity: "14 ноябрь 15:10",
      deadline: "18 ноябрь 18:30",
      createdDate: "14 ноябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤"
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤"
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false
    }
  ]);

  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isColumnSettingsOpen, setIsColumnSettingsOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTaskForm, setNewTaskForm] = useState({
    title: "",
    description: "",
    isImportant: false,
    assignee: "",
    coExecutors: [] as string[],
    observers: [] as string[],
    startDate: "",
    deadline: "",
    duration: "",
    shouldNotCompleteWithoutResult: false,
    // Дополнительные поля
    project: "",
    timeTracking: false,
    isRecurring: false,
    recurringType: "daily",
    repeatEveryDays: 1,
    hasEndDate: false,
    endDate: "",
    repeatAfterCompletion: false,
    reminder: false,
    reminderTime: "",
    tags: [] as string[],
    customFields: [] as { name: string; value: string }[]
  });

  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: "id", label: "ID", visible: false, category: "basic" },
    { id: "name", label: "Название", visible: true, category: "basic" },
    { id: "activity", label: "Активность", visible: true, category: "basic" },
    {
      id: "created",
      label: "Дата создания",
      visible: false,
      category: "dates"
    },
    {
      id: "changed",
      label: "Дата изменения",
      visible: false,
      category: "dates"
    },
    { id: "closed", label: "Дата закрытия", visible: false, category: "dates" },
    { id: "deadline", label: "Крайний срок", visible: true, category: "dates" },
    { id: "assignee", label: "Постановщик", visible: false, category: "users" },
    { id: "executor", label: "Исполнитель", visible: true, category: "users" },
    { id: "status", label: "Статус", visible: false, category: "basic" },
    { id: "project", label: "Проект", visible: true, category: "project" },
    { id: "stream", label: "Поток", visible: true, category: "project" },
    {
      id: "spentTime",
      label: "Затраченное время",
      visible: false,
      category: "advanced"
    },
    {
      id: "taskCompletion",
      label: "Завершение задачи",
      visible: false,
      category: "advanced"
    },
    { id: "tags", label: "Теги", visible: false, category: "basic" },
    { id: "leader", label: "Лид", visible: false, category: "users" },
    { id: "contact", label: "Контакт", visible: false, category: "users" },
    { id: "company", label: "Компания", visible: true, category: "project" },
    { id: "deal", label: "Сделка", visible: false, category: "advanced" },
    {
      id: "trackTime",
      label: "Учитывать время",
      visible: false,
      category: "advanced"
    },
    { id: "estimate", label: "Оценка", visible: false, category: "advanced" },
    {
      id: "allowExecutorChangeDeadline",
      label: "Разрешить исполнителю менять крайний срок",
      visible: false,
      category: "advanced"
    },
    {
      id: "crmElements",
      label: "Элементы CRM",
      visible: false,
      category: "advanced"
    },
    { id: "comments", label: "Комментарий", visible: false, category: "basic" }
  ]);

  const handleTaskSelect = (taskId: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTasks(
      selectedTasks.length === tasks.length ? [] : tasks.map((t) => t.id)
    );
  };

  const handleColumnToggle = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSelectAllColumns = () => {
    const allVisible = columns.every((col) => col.visible);
    setColumns((prev) => prev.map((col) => ({ ...col, visible: !allVisible })));
  };

  const handleCancelAllColumns = () => {
    setColumns((prev) => prev.map((col) => ({ ...col, visible: false })));
  };

  const handleApplyColumns = () => {
    setIsColumnSettingsOpen(false);
  };

  const handleResetToDefault = () => {
    // Сброс к настройкам по умолчанию
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        visible: [
          "name",
          "activity",
          "deadline",
          "executor",
          "project",
          "stream",
          "company"
        ].includes(col.id)
      }))
    );
  };

  const resetTaskForm = () => {
    setNewTaskForm({
      title: "",
      description: "",
      isImportant: false,
      assignee: "",
      coExecutors: [],
      observers: [],
      startDate: "",
      deadline: "",
      duration: "",
      shouldNotCompleteWithoutResult: false,
      project: "",
      timeTracking: false,
      isRecurring: false,
      recurringType: "daily",
      repeatEveryDays: 1,
      hasEndDate: false,
      endDate: "",
      repeatAfterCompletion: false,
      reminder: false,
      reminderTime: "",
      tags: [],
      customFields: []
    });
  };

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isBulkMenuOpen && !target.closest('.task-list__bulk-dropdown')) {
        setIsBulkMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBulkMenuOpen]);

  const handleNewTaskSubmit = () => {
    if (newTaskForm.title.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskForm.title,
        activity: new Date().toLocaleDateString("ru-RU"),
        deadline: newTaskForm.deadline || "Не указано",
        createdDate: new Date().toLocaleDateString("ru-RU"),
        assignee: {
          name: newTaskForm.assignee || "Не назначен",
          avatar: "👤"
        },
        executor: {
          name: newTaskForm.assignee || "Не назначен",
          avatar: "👤"
        },
        project: "Новый проект",
        completed: false
      };

      setTasks((prev) => [newTask, ...prev]);
      setIsNewTaskOpen(false);
      setIsAdditionalOpen(false);
      resetTaskForm();
    }
  };

  const handleNewTaskCancel = () => {
    setIsNewTaskOpen(false);
    setIsAdditionalOpen(false);
    resetTaskForm();
  };

  const handleBulkAction = (action: string) => {
    console.log(`Выполняется действие: ${action} для задач:`, selectedTasks);
    setIsBulkMenuOpen(false);
    // Здесь можно добавить логику для каждого действия
  };

  const handleTaskRowClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const handleTaskDetailClose = () => {
    setIsTaskDetailOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="task-list">
      <div className="task-list__header">
        <div className="task-list__tabs">
          <button className="task-list__tab task-list__tab--active">
            📋 Список
          </button>
          <button className="task-list__tab">📊 Канбан</button>
          <button className="task-list__tab">📈 Гант</button>
        </div>
      </div>

      <div className="task-list__content">
        <div className="task-list__title-section">
          <h1 className="task-list__title">Мои задачи</h1>
        </div>

        <div className="task-list__toolbar">
          <div className="task-list__search">
            <div className="task-list__search-icon">🔍</div>
            <input
              type="text"
              placeholder="Поиск по задачам"
              className="task-list__search-input"
            />
          </div>
          <div className="task-list__toolbar-actions">
            <button className="task-list__settings-button">⚙️</button>
            <button
              className="task-list__add-button"
              onClick={() => setIsNewTaskOpen(true)}>
              + Новая задача
            </button>
          </div>
        </div>

        <div className="task-list__table">
          <div className="task-list__table-header">
            <div className="task-list__header-cell task-list__header-cell--checkbox">
              <input
                type="checkbox"
                checked={selectedTasks.length === tasks.length}
                onChange={handleSelectAll}
                className="task-list__checkbox"
              />
              <button
                className="task-list__settings-btn"
                onClick={() => setIsColumnSettingsOpen(true)}>
                ⚙️
              </button>
            </div>
            <div className="task-list__header-cell task-list__header-cell--name">
              Наименование
            </div>
            <div className="task-list__header-cell">Активность</div>
            <div className="task-list__header-cell">Крайний срок</div>
            <div className="task-list__header-cell">Заказчик</div>
            <div className="task-list__header-cell">Исполнитель</div>
            <div className="task-list__header-cell">Проект</div>
          </div>

          <div className="task-list__table-body">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="task-list__row"
                onClick={() => handleTaskRowClick(task)}
              >
                <div className="task-list__cell task-list__cell--checkbox">
                  <input 
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleTaskSelect(task.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="task-list__checkbox"
                  />
                  <button className="task-list__row-menu">⚙️</button>
                </div>                <div className="task-list__cell task-list__cell--name">
                  <span className="task-list__task-title">{task.title}</span>
                </div>

                <div className="task-list__cell">
                  <span className="task-list__date">{task.activity}</span>
                </div>

                <div className="task-list__cell">
                  <span className="task-list__date">{task.deadline}</span>
                </div>

                <div className="task-list__cell">
                  <div className="task-list__user">
                    <div className="task-list__avatar">
                      {task.assignee.avatar}
                    </div>
                    <span className="task-list__user-name">
                      {task.assignee.name}
                    </span>
                  </div>
                </div>

                <div className="task-list__cell">
                  <div className="task-list__user">
                    <div className="task-list__avatar">
                      {task.executor.avatar}
                    </div>
                    <span className="task-list__user-name">
                      {task.executor.name}
                    </span>
                    {task.executor.additionalCount && (
                      <span className="task-list__additional-count">
                        +{task.executor.additionalCount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="task-list__cell">
                  <span className="task-list__project">{task.project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="task-list__footer">
          <div className="task-list__bulk-actions">
            <div className="task-list__bulk-dropdown">
              <button 
                className="task-list__bulk-select"
                onClick={() => setIsBulkMenuOpen(!isBulkMenuOpen)}
              >
                Выберите действие ⌄
              </button>
              {isBulkMenuOpen && (
                <div className="task-list__bulk-menu">
                  <button 
                    className="task-list__bulk-option"
                    onClick={() => handleBulkAction('ping')}
                  >
                    Пинг
                  </button>
                  <button 
                    className="task-list__bulk-option"
                    onClick={() => handleBulkAction('complete')}
                  >
                    Завершить
                  </button>
                  <button 
                    className="task-list__bulk-option"
                    onClick={() => handleBulkAction('set-deadline')}
                  >
                    Указать крайний срок
                  </button>
                  <button 
                    className="task-list__bulk-option"
                    onClick={() => handleBulkAction('move-deadline-forward')}
                  >
                    Перенести крайний срок вперёд
                  </button>
                  <button 
                    className="task-list__bulk-option"
                    onClick={() => handleBulkAction('move-deadline-back')}
                  >
                    Перенести крайний срок назад
                  </button>
                  <button 
                    className="task-list__bulk-option"
                    onClick={() => handleBulkAction('control-after-completion')}
                  >
                    Контроль после завершения
                  </button>
                  <button className="task-list__bulk-option task-list__bulk-option--dotted">
                    Контроль после
                  </button>
                  <button 
                    className="task-list__bulk-option task-list__bulk-option--expandable"
                    onClick={() => setIsBulkMenuOpen(false)}
                  >
                    Выберите действие ⌃
                  </button>
                </div>
              )}
            </div>
            <span className="task-list__selected-count">
              Отмечено: {selectedTasks.length}
            </span>
            <span className="task-list__total-count">
              Всего: {tasks.length}
            </span>
          </div>

          <div className="task-list__pagination">
            <button className="task-list__pagination-btn">‹</button>
            <span className="task-list__pagination-info">На странице</span>
            <select className="task-list__pagination-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <button className="task-list__pagination-btn">›</button>
          </div>
        </div>
      </div>

      {/* Модальное окно новой задачи */}
      {isNewTaskOpen && (
        <div className="new-task-modal">
          <div
            className="new-task-modal__overlay"
            onClick={handleNewTaskCancel}
          />
          <div className="new-task-modal__content">
            <div className="new-task-modal__header">
              <h3 className="new-task-modal__title">Новая задача</h3>
              <button
                className="new-task-modal__close"
                onClick={handleNewTaskCancel}>
                ✕
              </button>
            </div>

            <div className="new-task-modal__body">
              <div className="new-task-form">
                <div className="new-task-field">
                  <input
                    type="text"
                    placeholder="Название задачи"
                    value={newTaskForm.title}
                    onChange={(e) =>
                      setNewTaskForm((prev) => ({
                        ...prev,
                        title: e.target.value
                      }))
                    }
                    className="new-task-input new-task-input--title"
                  />
                </div>

                <div className="new-task-field">
                  <textarea
                    placeholder="Описание"
                    value={newTaskForm.description}
                    onChange={(e) =>
                      setNewTaskForm((prev) => ({
                        ...prev,
                        description: e.target.value
                      }))
                    }
                    className="new-task-textarea"
                    rows={4}
                  />
                </div>

                <div className="new-task-field">
                  <button className="new-task-file-btn">
                    📎 Добавить файл
                  </button>
                </div>

                <div className="new-task-field">
                  <label className="new-task-checkbox-label">
                    <input
                      type="checkbox"
                      checked={newTaskForm.isImportant}
                      onChange={(e) =>
                        setNewTaskForm((prev) => ({
                          ...prev,
                          isImportant: e.target.checked
                        }))
                      }
                      className="new-task-checkbox"
                    />
                    <span>Важная задача</span>
                  </label>
                </div>

                <div className="new-task-field">
                  <button className="new-task-add-btn new-task-add-btn--executor">
                    + Исполнитель
                  </button>
                </div>

                <div className="new-task-row">
                  <button className="new-task-add-btn new-task-add-btn--coexecutor">
                    + Добавить постановщика
                  </button>
                  <button className="new-task-add-btn new-task-add-btn--coexecutor">
                    + Добавить соисполнителей
                  </button>
                  <button className="new-task-add-btn new-task-add-btn--observer">
                    + Добавить наблюдателей
                  </button>
                </div>

                <div className="new-task-row">
                  <div className="new-task-date-field">
                    <input
                      type="date"
                      value={newTaskForm.startDate}
                      onChange={(e) =>
                        setNewTaskForm((prev) => ({
                          ...prev,
                          startDate: e.target.value
                        }))
                      }
                      className="new-task-date-input"
                    />
                    <span className="new-task-date-label">Начало</span>
                  </div>
                  <div className="new-task-date-field">
                    <input
                      type="date"
                      value={newTaskForm.deadline}
                      onChange={(e) =>
                        setNewTaskForm((prev) => ({
                          ...prev,
                          deadline: e.target.value
                        }))
                      }
                      className="new-task-date-input"
                    />
                    <span className="new-task-date-label">Крайний срок</span>
                  </div>
                  <div className="new-task-duration-field">
                    <select
                      value={newTaskForm.duration}
                      onChange={(e) =>
                        setNewTaskForm((prev) => ({
                          ...prev,
                          duration: e.target.value
                        }))
                      }
                      className="new-task-duration-select">
                      <option value="">Длительность</option>
                      <option value="1">1 день</option>
                      <option value="7">1 неделя</option>
                      <option value="30">1 месяц</option>
                    </select>
                    <button
                      className="new-task-more-btn"
                      onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}>
                      ⋯ Ещё
                    </button>
                  </div>
                </div>

                <div className="new-task-field">
                  <label className="new-task-checkbox-label">
                    <input
                      type="checkbox"
                      checked={newTaskForm.shouldNotCompleteWithoutResult}
                      onChange={(e) =>
                        setNewTaskForm((prev) => ({
                          ...prev,
                          shouldNotCompleteWithoutResult: e.target.checked
                        }))
                      }
                      className="new-task-checkbox"
                    />
                    <span>Не завершать задачу без результата</span>
                  </label>
                </div>

                <div className="new-task-additional">
                  <button
                    className="new-task-additional-toggle"
                    onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}>
                    Дополнительно Проект, учёт времени, напомнить, повторять,
                    гант, CRM, подзадача, теги, поля{" "}
                    {isAdditionalOpen ? "⌃" : "⌄"}
                  </button>
                </div>

                {/* Дополнительные поля */}
                {isAdditionalOpen && (
                  <div className="new-task-additional-fields">
                    <div className="new-task-field">
                      <button className="new-task-add-btn">
                        + Создать проект
                      </button>
                    </div>

                    <div className="new-task-field">
                      <label className="new-task-checkbox-label">
                        <input
                          type="checkbox"
                          checked={newTaskForm.timeTracking}
                          onChange={(e) =>
                            setNewTaskForm((prev) => ({
                              ...prev,
                              timeTracking: e.target.checked
                            }))
                          }
                          className="new-task-checkbox"
                        />
                        <span>Вести для выполнения задач</span>
                      </label>
                    </div>

                    <div className="new-task-field">
                      <input
                        type="text"
                        placeholder="Выбрать участников"
                        className="new-task-input"
                      />
                    </div>

                    <div className="new-task-field">
                      <label className="new-task-checkbox-label">
                        <input
                          type="checkbox"
                          checked={newTaskForm.isRecurring}
                          onChange={(e) =>
                            setNewTaskForm((prev) => ({
                              ...prev,
                              isRecurring: e.target.checked
                            }))
                          }
                          className="new-task-checkbox"
                        />
                        <span>Сделать задачу регулярной</span>
                      </label>
                    </div>

                    {newTaskForm.isRecurring && (
                      <div className="new-task-recurring-options">
                        <div className="new-task-recurring-header">
                          <span>Повторяемость</span>
                          <select
                            value={newTaskForm.recurringType}
                            onChange={(e) =>
                              setNewTaskForm((prev) => ({
                                ...prev,
                                recurringType: e.target.value
                              }))
                            }
                            className="new-task-recurring-type">
                            <option value="daily">День</option>
                            <option value="weekly">Неделя</option>
                            <option value="monthly">Месяц</option>
                          </select>
                          <span>Каждый</span>
                          <input
                            type="number"
                            value={newTaskForm.repeatEveryDays}
                            onChange={(e) =>
                              setNewTaskForm((prev) => ({
                                ...prev,
                                repeatEveryDays: parseInt(e.target.value) || 1
                              }))
                            }
                            className="new-task-recurring-number"
                            min="1"
                          />
                          <span>день с перерывом</span>
                        </div>

                        <div className="new-task-field">
                          <button className="new-task-reminder-btn">
                            🔔 Включить календарь
                          </button>
                        </div>

                        <div className="new-task-field">
                          <label className="new-task-checkbox-label">
                            <input
                              type="checkbox"
                              checked={!newTaskForm.hasEndDate}
                              onChange={(e) =>
                                setNewTaskForm((prev) => ({
                                  ...prev,
                                  hasEndDate: !e.target.checked
                                }))
                              }
                              className="new-task-checkbox"
                            />
                            <span>Нет даты окончания</span>
                          </label>
                        </div>

                        <div className="new-task-field">
                          <label className="new-task-checkbox-label">
                            <input
                              type="checkbox"
                              checked={newTaskForm.hasEndDate}
                              onChange={(e) =>
                                setNewTaskForm((prev) => ({
                                  ...prev,
                                  hasEndDate: e.target.checked
                                }))
                              }
                              className="new-task-checkbox"
                            />
                            <span>Дата окончания</span>
                          </label>
                          {newTaskForm.hasEndDate && (
                            <input
                              type="date"
                              value={newTaskForm.endDate}
                              onChange={(e) =>
                                setNewTaskForm((prev) => ({
                                  ...prev,
                                  endDate: e.target.value
                                }))
                              }
                              className="new-task-date-input"
                            />
                          )}
                        </div>

                        <div className="new-task-field">
                          <label className="new-task-checkbox-label">
                            <input
                              type="checkbox"
                              checked={newTaskForm.repeatAfterCompletion}
                              onChange={(e) =>
                                setNewTaskForm((prev) => ({
                                  ...prev,
                                  repeatAfterCompletion: e.target.checked
                                }))
                              }
                              className="new-task-checkbox"
                            />
                            <span>Завершать после повторной</span>
                          </label>
                        </div>

                        <div className="new-task-info">
                          📋 Задача повторится в 06:00 (UTC +05:00) каждый день
                          с момента окончания, без даты окончания
                        </div>

                        <div className="new-task-info">
                          ⓘ Заметок по условиям задач будет создан новый автомат
                        </div>

                        <div className="new-task-buttons-row">
                          <button className="new-task-add-btn">
                            + Добавить в проект
                          </button>
                          <button className="new-task-add-btn">+ CRM</button>
                        </div>

                        <div className="new-task-field">
                          <button className="new-task-add-btn">
                            + Создать файл
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="new-task-modal__footer">
              <button
                className="new-task-btn new-task-btn--secondary"
                onClick={handleNewTaskCancel}>
                Отмена
              </button>
              <button
                className="new-task-btn new-task-btn--primary"
                onClick={handleNewTaskSubmit}>
                Создать задачу
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно настройки столбцов */}
      {isColumnSettingsOpen && (
        <div className="column-settings-modal">
          <div
            className="column-settings-modal__overlay"
            onClick={() => setIsColumnSettingsOpen(false)}
          />
          <div className="column-settings-modal__content">
            <div className="column-settings-modal__header">
              <h3 className="column-settings-modal__title">
                Настройка столбцов
              </h3>
              <button
                className="column-settings-modal__close"
                onClick={() => setIsColumnSettingsOpen(false)}>
                ✕
              </button>
            </div>

            <div className="column-settings-modal__body">
              <div className="column-settings-grid">
                {/* Левая колонка */}
                <div className="column-settings-column">
                  {columns
                    .slice(0, Math.ceil(columns.length / 3))
                    .map((column) => (
                      <label key={column.id} className="column-settings-item">
                        <input
                          type="checkbox"
                          checked={column.visible}
                          onChange={() => handleColumnToggle(column.id)}
                          className="column-settings-checkbox"
                        />
                        <span className="column-settings-label">
                          {column.label}
                        </span>
                      </label>
                    ))}
                </div>

                {/* Средняя колонка */}
                <div className="column-settings-column">
                  {columns
                    .slice(
                      Math.ceil(columns.length / 3),
                      Math.ceil((columns.length * 2) / 3)
                    )
                    .map((column) => (
                      <label key={column.id} className="column-settings-item">
                        <input
                          type="checkbox"
                          checked={column.visible}
                          onChange={() => handleColumnToggle(column.id)}
                          className="column-settings-checkbox"
                        />
                        <span className="column-settings-label">
                          {column.label}
                        </span>
                      </label>
                    ))}
                </div>

                {/* Правая колонка */}
                <div className="column-settings-column">
                  {columns
                    .slice(Math.ceil((columns.length * 2) / 3))
                    .map((column) => (
                      <label key={column.id} className="column-settings-item">
                        <input
                          type="checkbox"
                          checked={column.visible}
                          onChange={() => handleColumnToggle(column.id)}
                          className="column-settings-checkbox"
                        />
                        <span className="column-settings-label">
                          {column.label}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            </div>

            <div className="column-settings-modal__footer">
              <div className="column-settings-footer-left">
                <button
                  className="column-settings-btn column-settings-btn--secondary"
                  onClick={handleResetToDefault}>
                  ⚙️ По умолчанию
                </button>
              </div>

              <div className="column-settings-footer-center">
                <button
                  className="column-settings-btn column-settings-btn--link"
                  onClick={handleSelectAllColumns}>
                  Выбрать все
                </button>
                <button
                  className="column-settings-btn column-settings-btn--link"
                  onClick={handleCancelAllColumns}>
                  Отменить всё
                </button>
              </div>

              <div className="column-settings-footer-right">
                <button
                  className="column-settings-btn column-settings-btn--primary"
                  onClick={handleApplyColumns}>
                  Применить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно детального просмотра задачи */}
      {isTaskDetailOpen && selectedTask && (
        <div className="task-detail-modal">
          <div className="task-detail-modal__overlay" onClick={handleTaskDetailClose} />
          <div className="task-detail-modal__content">
            <div className="task-detail-modal__header">
              <div className="task-detail-header-left">
                <h3 className="task-detail-modal__title">
                  Задача № {selectedTask.id} - ждёт выполнения
                </h3>
                <span className="task-detail-modal__subtitle">
                  {selectedTask.title}
                </span>
              </div>
              <div className="task-detail-header-right">
                <button className="task-detail-action-btn task-detail-action-btn--primary">
                  Ждёт выполнения с 24.01.2025 19:00
                </button>
                <button 
                  className="task-detail-modal__close"
                  onClick={handleTaskDetailClose}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="task-detail-modal__body">
              <div className="task-detail-main">
                <div className="task-detail-left">
                  <div className="task-detail-description">
                    <h4>Описание</h4>
                    <p>Провести анализ BRD_V.3.docx от Игоря, дополнить FR и NFR</p>
                  </div>

                  <div className="task-detail-actions">
                    <button className="task-detail-add-btn">
                      📎 Добавить чек-лист
                    </button>
                  </div>

                  <div className="task-detail-progress">
                    <div className="task-detail-progress-buttons">
                      <button className="task-detail-btn task-detail-btn--start">Начать</button>
                      <button className="task-detail-btn task-detail-btn--complete">Завершить</button>
                      <button className="task-detail-btn task-detail-btn--favorite">♡</button>
                      <button className="task-detail-btn task-detail-btn--link">🔗</button>
                      <button className="task-detail-btn task-detail-btn--comment">💬</button>
                      <button className="task-detail-btn task-detail-btn--more">⋯</button>
                    </div>
                    <span className="task-detail-views">👁 19</span>
                  </div>

                  <div className="task-detail-tabs">
                    <button className="task-detail-tab task-detail-tab--active">
                      Комментарии 00+
                    </button>
                    <button className="task-detail-tab">История 00+</button>
                    <button className="task-detail-tab">Время 00:00:00</button>
                    <button className="task-detail-tab">Заметки 00+</button>
                    <button className="task-detail-tab">Файлы 00+</button>
                  </div>

                  <div className="task-detail-comments">
                    <div className="task-detail-comment">
                      <div className="task-detail-comment-header">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-avatar" />
                        <div className="task-detail-comment-info">
                          <span className="task-detail-username">Константин Константинопольский</span>
                          <span className="task-detail-timestamp">1 августа</span>
                        </div>
                        <button className="task-detail-comment-menu">⋯</button>
                      </div>
                      <div className="task-detail-comment-content">
                        <p>Типа данных v.2.0.</p>
                        <a href="#" className="task-detail-file-link">Типа данных (1).xlsx 11.30 КБ</a>
                        <div className="task-detail-comment-actions">
                          <button>Реакция</button>
                          <button>Ответить</button>
                        </div>
                      </div>
                    </div>

                    <div className="task-detail-comment">
                      <div className="task-detail-comment-header">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-avatar" />
                        <div className="task-detail-comment-info">
                          <span className="task-detail-username">Рената Литвинова</span>
                          <span className="task-detail-timestamp">5 августа</span>
                        </div>
                        <button className="task-detail-comment-menu">⋯</button>
                      </div>
                      <div className="task-detail-comment-content">
                        <p>Типа активити (согласованные)</p>
                        <a href="#" className="task-detail-file-link">Активити.xlsx 10.85 КБ +2 файла</a>
                        <div className="task-detail-comment-actions">
                          <button>Реакция</button>
                          <button>Ответить</button>
                        </div>
                      </div>
                    </div>

                    <div className="task-detail-comment">
                      <div className="task-detail-comment-header">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-avatar" />
                        <div className="task-detail-comment-info">
                          <span className="task-detail-username">Рената Литвинова</span>
                          <span className="task-detail-timestamp">5 августа</span>
                        </div>
                        <button className="task-detail-comment-menu">⋯</button>
                      </div>
                      <div className="task-detail-comment-content">
                        <p>Типа данных v.3.0.1</p>
                        <a href="#" className="task-detail-file-link">Типа данных (2).xlsx 18.04 КБ +30 файлов</a>
                        <div className="task-detail-comment-actions">
                          <button>Реакция</button>
                          <button>Ответить</button>
                        </div>
                      </div>
                    </div>

                    <div className="task-detail-comment-input">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-avatar" />
                      <div className="task-detail-input-container">
                        <input 
                          type="text" 
                          placeholder="Добавить комментарий..." 
                          className="task-detail-comment-field"
                        />
                        <button className="task-detail-send-btn">➤</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="task-detail-right">
                  <div className="task-detail-info">
                    <div className="task-detail-info-item">
                      <span className="task-detail-info-label">Крайний срок</span>
                      <span className="task-detail-info-value">08.08.2025 19:00</span>
                    </div>
                    <div className="task-detail-info-item">
                      <span className="task-detail-info-label">Напоминание</span>
                      <span className="task-detail-info-value">-</span>
                    </div>
                    <div className="task-detail-info-item">
                      <span className="task-detail-info-label">Автоматизация</span>
                      <button className="task-detail-info-arrow">➤</button>
                    </div>
                    <div className="task-detail-info-item">
                      <span className="task-detail-info-label">Поставлено</span>
                      <span className="task-detail-info-value">24.06.2025 13:02</span>
                    </div>
                    <div className="task-detail-info-item">
                      <span className="task-detail-info-label">Оценка</span>
                      <span className="task-detail-info-value">Нет</span>
                      <a href="#" className="task-detail-info-link">Требуется отчёт о работе</a>
                    </div>
                  </div>

                  <div className="task-detail-participants">
                    <h4>Постановщик(и)</h4>
                    <div className="task-detail-participant">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-participant-avatar" />
                      <span>Константин К</span>
                    </div>

                    <h4>Исполнитель(и)</h4>
                    <div className="task-detail-participant">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-participant-avatar" />
                      <span>Микки Ш.</span>
                    </div>

                    <div className="task-detail-participant">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-participant-avatar" />
                      <span>Серёза А.</span>
                    </div>

                    <h4>Соисполнитель(и)</h4>
                    <div className="task-detail-participant">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-participant-avatar" />
                      <span>Роберт П.</span>
                    </div>

                    <div className="task-detail-participant">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-participant-avatar" />
                      <span>Виталий К.</span>
                    </div>

                    <div className="task-detail-participant">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E" alt="Avatar" className="task-detail-participant-avatar" />
                      <span>Николай Б.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
