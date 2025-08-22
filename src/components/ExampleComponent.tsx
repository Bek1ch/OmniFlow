import React from "react";
import { Button, Modal, Input } from "./ui";
import { useModal } from "../hooks";
import { cn } from "../utils";
import "./ExampleComponent.css";

const ExampleComponent: React.FC = () => {
  const modal = useModal();

  return (
    <div className="example">
      <div className="example__header">
        <h1 className="example__title">Пример нового компонента</h1>
        <Button variant="primary" onClick={modal.open} leftIcon="➕">
          Открыть модальное окно
        </Button>
      </div>

      <div className="example__content">
        <div className="example__buttons">
          <Button variant="primary" size="sm">
            Основная кнопка
          </Button>
          <Button variant="secondary" size="md">
            Вторичная кнопка
          </Button>
          <Button variant="success" size="lg">
            Успех
          </Button>
          <Button variant="warning">Предупреждение</Button>
          <Button variant="danger">Опасность</Button>
          <Button variant="ghost">Призрачная</Button>
          <Button variant="link">Ссылка</Button>
        </div>

        <div className="example__inputs">
          <Input
            label="Обычное поле"
            placeholder="Введите текст..."
            helper="Это подсказка к полю"
          />

          <Input label="Поле с иконкой" placeholder="Поиск..." leftIcon="🔍" />

          <Input
            label="Поле с ошибкой"
            placeholder="Введите email"
            error="Неверный формат email"
            rightIcon="⚠️"
          />

          <Input label="Загрузка" placeholder="Проверяем..." isLoading />
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="Пример модального окна"
        size="md"
        footer={
          <div className={cn("modal-footer")}>
            <Button variant="ghost" onClick={modal.close}>
              Отмена
            </Button>
            <Button variant="primary" onClick={modal.close}>
              Сохранить
            </Button>
          </div>
        }
      >
        <div className="example__modal-content">
          <p>
            Это пример содержимого модального окна с новой системой дизайна.
          </p>

          <Input
            label="Поле в модальном окне"
            placeholder="Введите значение..."
            fullWidth
          />

          <div className="example__modal-buttons">
            <Button variant="primary" fullWidth>
              Кнопка во всю ширину
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExampleComponent;
