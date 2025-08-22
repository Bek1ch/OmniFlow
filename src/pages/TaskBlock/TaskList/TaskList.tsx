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
        avatar: "👤",
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤",
        additionalCount: 3,
      },
      project: "Команда разработки",
      completed: false,
    },
    {
      id: 2,
      title: "Входящая заявка в IT-отдел",
      activity: "14 декабрь 15:10",
      deadline: "18 декабрь 18:30",
      createdDate: "14 декабрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤",
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤",
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false,
    },
    {
      id: 3,
      title: "Входящая заявка в IT-отдел",
      activity: "14 ноябрь 15:10",
      deadline: "18 ноябрь 18:30",
      createdDate: "14 ноябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤",
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤",
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false,
    },
    {
      id: 4,
      title: "Входящая заявка в IT-отдел",
      activity: "14 ноябрь 15:10",
      deadline: "18 ноябрь 18:30",
      createdDate: "14 ноябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤",
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤",
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false,
    },
    {
      id: 5,
      title: "Входящая заявка в IT-отдел",
      activity: "14 ноябрь 15:10",
      deadline: "18 ноябрь 18:30",
      createdDate: "14 ноябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤",
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤",
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false,
    },
    {
      id: 6,
      title: "Входящая заявка в IT-отдел",
      activity: "14 ноябрь 15:10",
      deadline: "18 ноябрь 18:30",
      createdDate: "14 ноябрь 15:10",
      assignee: {
        name: "Константин Б.",
        avatar: "👤",
      },
      executor: {
        name: "Константин Б.",
        avatar: "👤",
      },
      project: "Платформа OmniFlow. Команда разработки",
      completed: false,
    },
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
    customFields: [] as { name: string; value: string }[],
  });

  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: "id", label: "ID", visible: false, category: "basic" },
    { id: "name", label: "Название", visible: true, category: "basic" },
    { id: "activity", label: "Активность", visible: true, category: "basic" },
    {
      id: "created",
      label: "Дата создания",
      visible: false,
      category: "dates",
    },
    {
      id: "changed",
      label: "Дата изменения",
      visible: false,
      category: "dates",
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
      category: "advanced",
    },
    {
      id: "taskCompletion",
      label: "Завершение задачи",
      visible: false,
      category: "advanced",
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
      category: "advanced",
    },
    { id: "estimate", label: "Оценка", visible: false, category: "advanced" },
    {
      id: "allowExecutorChangeDeadline",
      label: "Разрешить исполнителю менять крайний срок",
      visible: false,
      category: "advanced",
    },
    {
      id: "crmElements",
      label: "Элементы CRM",
      visible: false,
      category: "advanced",
    },
    { id: "comments", label: "Комментарий", visible: false, category: "basic" },
  ]);

  const handleTaskSelect = (taskId: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  const handleSelectAll = () => {
    setSelectedTasks(
      selectedTasks.length === tasks.length ? [] : tasks.map((t) => t.id),
    );
  };

  const handleColumnToggle = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col,
      ),
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
          "company",
        ].includes(col.id),
      })),
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
      customFields: [],
    });
  };

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isBulkMenuOpen && !target.closest(".task-list__bulk-dropdown")) {
        setIsBulkMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
          avatar: "👤",
        },
        executor: {
          name: newTaskForm.assignee || "Не назначен",
          avatar: "👤",
        },
        project: "Новый проект",
        completed: false,
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
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque odit, vel
      optio molestias reprehenderit repudiandae voluptatum? Dolorum alias esse
      veritatis nisi amet nihil provident dolores modi sint eaque. Suscipit,
      culpa perspiciatis dolore consequatur velit non, similique in odit
      assumenda facere, fugiat deleniti accusantium dolores quis excepturi
      impedit officiis aspernatur quae ex id saepe laudantium neque quas!
      Repudiandae, dolore nesciunt? Molestias mollitia soluta aliquam earum in
      ea suscipit praesentium quasi itaque neque, ut perspiciatis nihil, unde
      atque quisquam harum voluptatem adipisci ducimus veniam eum dicta? Maiores
      saepe dolores voluptates non vero hic corrupti cumque molestias, deserunt
      voluptatem modi placeat, quis debitis neque illo sit aut. Nobis cumque
      quis illo delectus. Aspernatur nam, nulla suscipit, tempore error,
      perferendis eos et delectus id fugiat maiores? Officiis fuga ea aliquam
      voluptas iste sequi ad totam dolorum, perspiciatis recusandae error quasi.
      Hic atque dicta fuga praesentium illo nobis cum at cumque incidunt beatae
      distinctio harum totam dignissimos blanditiis qui fugit ipsa aliquam
      doloremque facilis, quis assumenda voluptatum enim, aspernatur rem! Hic
      voluptatibus rem officiis esse voluptatum sit sequi quas, officia illum
      aspernatur alias id corrupti voluptas quaerat soluta praesentium! Esse
      repellat, quas cum vel quam dolorem sunt aliquid enim est laborum nobis
      odio sed sit animi harum eius, incidunt accusamus nesciunt delectus rerum
      porro nihil! Illum consectetur ea rem similique tempora in quae magnam
      voluptatibus, eum dolore sequi velit, cumque, maxime tenetur. Molestias
      dicta aperiam minus iste eaque numquam nemo dignissimos magni tempora
      corrupti quasi, pariatur nulla in, qui ipsum fugit ullam! Omnis
      dignissimos tenetur reprehenderit totam quibusdam est voluptates fuga esse
      quod assumenda praesentium nulla consectetur alias, neque vero sunt
      laboriosam molestias! Eaque atque ut nesciunt temporibus qui! Distinctio
      voluptatibus, sunt nemo iste minima quam! Error ducimus accusantium modi,
      animi similique maxime nisi soluta facere? A ad necessitatibus, magnam
      nulla aliquam nobis blanditiis laudantium dolorem temporibus deserunt
      voluptatibus. Fuga harum, itaque sed quo pariatur libero. Fugit veritatis
      ullam, odit fugiat quibusdam dolore obcaecati corporis! Fugiat nulla vitae
      ab. Doloribus vitae ab placeat? Magni excepturi ducimus tempora delectus
      vero voluptatibus illum cumque itaque consequuntur velit expedita
      molestiae a dicta consectetur asperiores iusto architecto, inventore
      omnis. Ex maiores veniam facere harum est assumenda. Aut sint, culpa
      corporis porro blanditiis explicabo repudiandae distinctio dolor rem optio
      minima aperiam in cum facilis officia placeat pariatur magni reprehenderit
      libero quisquam, non odio alias eligendi dolores. Perferendis numquam
      magni dignissimos praesentium incidunt excepturi enim vitae distinctio
      quae facere ea, saepe aspernatur, aut accusantium cumque nesciunt dolorem
      sint alias in deserunt. Inventore, explicabo enim! Possimus suscipit
      consectetur quaerat, reprehenderit laborum odit sit illum reiciendis ex,
      voluptatibus assumenda nostrum aliquam voluptate? Tempore reiciendis
      quaerat, veniam voluptate voluptates eos blanditiis officia temporibus
      autem! Expedita id sapiente fugiat iste? Quis tenetur quia officiis
      laborum repellat ipsam accusamus autem praesentium provident ullam
      consequuntur, debitis illo deserunt dolorem quod, odio culpa distinctio
      qui accusantium ab harum perferendis magni. Cum saepe nulla repudiandae
      nihil. Nemo reiciendis sunt cupiditate quis voluptatem id dolorem laborum
      accusamus? Vel tenetur consectetur ipsa ullam minus quasi omnis, error
      provident modi! Praesentium necessitatibus mollitia amet animi accusamus
      cupiditate sunt nemo explicabo non exercitationem illo blanditiis qui
      iste, nulla molestias sit consequuntur magni quibusdam, sed dolorum
      quisquam alias. Eum, a. Expedita rerum provident cupiditate consectetur,
      et dicta. Beatae repellendus tempore asperiores accusamus, iusto ratione.
      Est quaerat aliquam quia harum sapiente cupiditate culpa ut et? Inventore
      eius voluptatem error doloremque veniam. Ex enim est cupiditate,
      reprehenderit ad deleniti mollitia suscipit expedita porro dolor quasi
      quidem ut tenetur sed sint quisquam! Itaque suscipit accusamus nulla in
      dignissimos cum voluptatum, doloremque, harum blanditiis nihil praesentium
      quo necessitatibus, impedit libero! Reiciendis, modi possimus! Facilis
      nobis, adipisci nihil unde quaerat itaque veritatis aliquam cumque
      tenetur, reprehenderit numquam, nemo consequatur ea in quos laboriosam
      aspernatur tempora eos asperiores earum! Nulla omnis similique cupiditate
      quaerat ipsa molestiae molestias reprehenderit aspernatur at maiores
      accusantium repudiandae sint cum sit sunt nostrum, harum incidunt facilis!
      Ipsam cum quidem vitae voluptate? Voluptates, voluptate? Neque officiis
      iure alias repudiandae veritatis, natus eos at magnam quia illum, eius
      beatae delectus commodi fugit. Aspernatur cumque fugiat earum explicabo
      atque nostrum, iure aperiam nam minima dignissimos error molestias nisi
      magni harum voluptas hic fuga voluptates iste maiores aliquid soluta quis,
      eligendi praesentium odio! Modi consequatur similique sed enim eveniet
      debitis deleniti, nisi minima, corporis suscipit ut asperiores ipsum
      recusandae fugiat quidem vel libero incidunt. Ipsam assumenda quod quia
      eius fugit perferendis neque placeat exercitationem! Harum error
      voluptates quasi dolorem, placeat expedita suscipit nam amet aut nobis
      recusandae qui fugiat commodi ipsum similique, hic quaerat optio laborum
      cumque eos dignissimos ea earum impedit architecto. Quasi, incidunt quae.
      Molestiae ipsum dolor architecto odio nihil possimus doloremque velit
      officia animi alias pariatur ratione aperiam magnam earum sit praesentium
      non a, doloribus dignissimos asperiores in sed. Aliquid dignissimos
      officia temporibus ipsum deserunt dolor ea nobis quam assumenda, debitis
      vel repudiandae repellendus libero illum, amet odit provident dicta natus!
      Quos eius nulla, quo eaque repudiandae molestiae exercitationem ut iusto
      tempora ratione maiores. Aliquam, ducimus assumenda dignissimos placeat
      eius quam tempora itaque minus iusto, nisi in suscipit cum quidem fugit
      eos blanditiis quas! Voluptatem, magnam alias quisquam facere ratione,
      voluptate in, itaque praesentium explicabo obcaecati atque vero molestiae
      accusantium eum qui sapiente asperiores ipsa consequuntur quas esse
      similique dolores? Iusto laudantium veritatis necessitatibus architecto,
      ad omnis. Doloremque maiores similique aperiam soluta distinctio quis
      itaque laudantium nostrum ipsa, nesciunt reprehenderit, explicabo nihil
      dolorum consequatur commodi assumenda cupiditate odit repellat. Dolores
      saepe rem odio molestiae voluptatibus dignissimos est, aliquid deleniti
      fugiat vitae temporibus tempore veniam cum et in vero dolore suscipit
      corrupti deserunt fuga ut. Praesentium veritatis ipsam ullam alias porro.
      Nihil nesciunt quis, et, recusandae vero deserunt id officia maxime atque
      eius dolores alias? Consectetur deleniti voluptatibus temporibus officia
      eveniet delectus deserunt quaerat nulla veritatis neque nihil ea commodi
      laudantium tempora veniam, porro odio aut maxime praesentium doloremque?
      Deleniti rem molestiae dignissimos hic maxime eaque suscipit, maiores
      expedita asperiores vel placeat nemo facilis obcaecati. Velit nemo ducimus
      optio odio est neque rem quo vero blanditiis natus inventore sequi
      aspernatur et, veniam quia eius nobis quasi, reiciendis voluptates,
      laboriosam dolorem architecto dolores eligendi. Odio, repellendus! Commodi
      ipsam quasi totam quibusdam quia voluptatem, earum, unde quas maiores
      doloremque enim incidunt, suscipit cumque cupiditate. Maxime, modi iusto
      magnam sint quod quidem. Quis et corrupti at voluptas tempore magnam
      dolorum ut omnis, nisi, repellat corporis amet. Repudiandae saepe sit
      autem odio itaque? Eaque odit sint eligendi, dolore iste necessitatibus
      cupiditate esse quibusdam tenetur facere expedita cumque doloribus
      inventore et a similique veritatis dignissimos alias sunt praesentium nemo
      velit ab. Ab perferendis vel ipsa et harum atque sequi ratione cupiditate
      dolorum sunt nobis, ex incidunt optio earum? Voluptatem corrupti impedit
      eaque, nulla quod ex eveniet aperiam ea quae sequi accusantium neque ab
      vel possimus pariatur, magni omnis suscipit? Asperiores qui necessitatibus
      amet? Iusto, deserunt inventore accusamus harum rem itaque. Debitis porro
      similique dolorem hic aspernatur et error ad iste velit eos praesentium
      odit cum quasi vitae, recusandae perspiciatis consequatur fugit eaque
      fugiat, harum animi beatae aut voluptatum laborum. Aut totam ipsam
      asperiores maiores repellat dolorum hic voluptates, perferendis veniam?
      Harum blanditiis et repudiandae commodi molestiae eum, illo numquam id
      impedit cum quam vel amet ducimus repellendus adipisci temporibus possimus
      cumque voluptate perferendis delectus sequi. Id, sequi? Ipsam, facilis. Ex
      numquam natus, consectetur eum saepe dolor error, in ipsum ullam eligendi
      beatae enim officiis necessitatibus quisquam corporis ipsa sequi minima,
      facere sed repellendus eius ab? Nemo ipsa officia enim ab delectus, nobis
      vitae dolore eaque odit tenetur corporis laudantium reprehenderit quis
      aliquid iusto debitis quia. Harum sequi nobis quis reprehenderit nemo,
      accusamus amet delectus labore quibusdam earum quaerat totam, natus vero
      id enim dolor ex inventore in fugit ad. Repudiandae fuga dolorem
      cupiditate ratione. Rerum voluptas nobis quasi exercitationem quisquam
      eaque deserunt quos. Molestiae, omnis magnam quam totam officiis atque
      explicabo a accusantium possimus veritatis ex sunt quas similique quod
      odit placeat, quae ad rem voluptate amet cum! Esse earum reiciendis
      maiores quaerat, cum adipisci. Explicabo, necessitatibus quam similique
      quisquam quasi odio, sequi iure laudantium odit modi voluptates maxime in
      obcaecati laborum. Minus dolorem necessitatibus illo dignissimos sit
      asperiores itaque pariatur vel. Ipsa magni voluptate est atque illum
      fugit, aspernatur odit. Est sequi expedita ipsa, quidem unde impedit
      praesentium laborum quae itaque debitis mollitia eos dolore reprehenderit
      sapiente omnis facilis culpa assumenda. Dolore, quae, nesciunt placeat
      necessitatibus ullam natus nemo provident deleniti ipsa cupiditate fuga
      quaerat saepe excepturi minus non voluptate! Est quisquam aut, inventore
      placeat repellat eum harum similique ipsum iure veritatis sit
      exercitationem autem deleniti odio illo, aliquam fugit sint distinctio
      ipsa facilis rerum rem consectetur in nam? Excepturi, dicta consectetur
      recusandae architecto praesentium cupiditate, omnis impedit ut laudantium
      nesciunt et a optio unde! Quibusdam laudantium dolor excepturi dolorem vel
      perspiciatis ratione non quae nihil minima est iure, doloremque saepe
      voluptas asperiores iusto, illo libero alias hic ducimus. Dicta excepturi
      tempora libero. Dolores libero amet magnam corporis harum vitae cum, esse
      adipisci aliquid maxime eum voluptatem neque laudantium quisquam id dolore
      expedita nulla sint, quia maiores! Animi praesentium earum ea tempore
      incidunt odit similique maxime laudantium possimus blanditiis sapiente, ut
      saepe, nam, dolore molestias? Blanditiis cupiditate, beatae, explicabo id
      inventore eligendi placeat eius delectus ea ut consectetur non quasi
      doloribus qui iusto totam debitis nobis enim maiores, neque assumenda
      maxime. Corporis eaque sequi vero est nam dolores tenetur ab labore ad
      modi id doloremque, dicta ut harum debitis sapiente quisquam quod nemo eum
      expedita distinctio repellendus autem? Necessitatibus quisquam omnis
      saepe! Quam, totam non! Et quae pariatur doloribus iure ratione nulla sunt
      voluptate ullam eius voluptas aut natus qui itaque laborum labore dolores
      quia neque possimus sint ducimus, exercitationem commodi. Debitis, eaque
      temporibus? Blanditiis quibusdam nam velit. Quibusdam dolor harum iure,
      fuga recusandae aliquam non cum asperiores magnam nisi quia ipsum quas
      mollitia praesentium! Expedita laudantium aspernatur quaerat, assumenda
      velit quod illum eveniet ad rem provident, maxime at beatae asperiores quo
      labore saepe? Sapiente laborum sit beatae iusto ducimus architecto sunt
      enim dolorum facilis nam. Dignissimos totam, aliquid ullam minima,
      explicabo labore amet assumenda expedita inventore dolorem quam distinctio
      dicta dolore nostrum rerum esse tempore harum doloremque soluta officiis
      ratione maxime praesentium asperiores! Nihil reprehenderit quis rem
      dolorem porro facere nulla corrupti. Error aut ab dolore, necessitatibus
      molestias atque velit laborum, harum aliquam minima, sapiente doloribus
      nemo inventore. Saepe incidunt reiciendis doloribus voluptatum nam
      obcaecati repellat. Quibusdam, dolores. Cupiditate, tempora, officiis
      inventore voluptatum fuga reprehenderit voluptatibus numquam eius officia
      accusamus quis architecto, in iste. Ratione perferendis repellat neque
      molestiae dolores sequi, reprehenderit dignissimos! Nam minus voluptatibus
      doloremque quos nobis, debitis nemo officia vitae maxime facere reiciendis
      dolor aliquid pariatur, dolores ullam beatae consectetur perspiciatis
      possimus impedit nulla sint cum dolore. Eaque repudiandae assumenda
      veritatis veniam quae vitae perspiciatis voluptatibus. Explicabo, omnis
      illo? Placeat exercitationem quod deserunt quo cumque labore sit molestiae
      aperiam expedita ex voluptatem, et, recusandae reprehenderit cupiditate
      quia! Blanditiis ad sunt, magnam obcaecati eum quod magni illum assumenda
      atque nihil odit consequuntur similique sed, ipsam animi totam eligendi,
      beatae adipisci numquam aliquid quae fuga. Tenetur minima recusandae
      corporis debitis assumenda perferendis maiores quia optio omnis ea. Quis
      voluptate saepe magnam quia dolorum ad inventore, nesciunt ipsa?
      Architecto laudantium neque debitis suscipit fugiat voluptate aspernatur,
      vitae nisi culpa animi assumenda iure. Enim praesentium odio ea iste
      consequatur aspernatur beatae nobis ad necessitatibus molestias quod
      deserunt, reiciendis dolorum ut aut vero aperiam dolore adipisci alias?
      Dolore, error? Placeat quae magnam blanditiis praesentium porro explicabo
      iure animi laborum sint, illo sit odio facere, impedit tenetur beatae
      nostrum consequatur facilis accusantium? Est architecto eligendi, in, non
      consectetur ad facere vero eveniet eum soluta ipsum suscipit, rerum ea
      laborum repudiandae rem sint nisi voluptate delectus ipsam ullam inventore
      magni amet? Aliquid eligendi esse, sequi sit repellendus illo expedita
      sapiente ducimus iure at provident atque officia quaerat eveniet. Maiores
      exercitationem molestias ratione rem sed fugiat nam saepe? Tenetur nobis
      doloribus, sapiente nihil placeat minima aliquam corporis voluptates ipsa
      quidem aspernatur voluptate quae nam nostrum beatae molestias. Optio
      possimus a architecto molestias recusandae deleniti perferendis porro
      tempore quo id odit, consequatur rem sequi temporibus quis. Placeat est,
      reprehenderit a rerum accusantium ex iste sunt temporibus fuga facere
      dolores explicabo modi, atque rem aperiam ipsum facilis repellendus
      repellat doloremque voluptatibus consequuntur dicta soluta. Suscipit velit
      ipsam minima natus nam, vitae recusandae odit sequi facilis praesentium
      molestiae, laborum numquam ex, sit vero animi. Deserunt illum facilis
      possimus ea temporibus sunt corrupti. Necessitatibus blanditiis voluptas
      natus voluptate laborum tempore neque adipisci assumenda accusantium rem
      at officia non dicta, delectus, aliquid deserunt eligendi quasi. In eaque
      omnis velit minus perspiciatis corporis, adipisci ut nobis voluptates illo
      voluptatum itaque quidem laudantium quod ratione aspernatur accusantium
      reprehenderit quaerat perferendis asperiores neque atque cumque commodi.
      Illum officia iusto neque veniam soluta dicta numquam, ipsa quibusdam
      cumque illo aspernatur dolorum possimus laboriosam perferendis. Nisi nobis
      quis facere? Suscipit alias consectetur veritatis, quas maxime quia labore
      veniam! Pariatur itaque perspiciatis, dolor iste quasi corporis. Saepe
      minus asperiores magnam accusamus voluptas alias tempore, deserunt
      obcaecati enim est quas ipsa. Illo molestiae, commodi eius soluta corrupti
      nihil explicabo! Dolorum nihil tempora enim laborum fugiat inventore
      nostrum quas ipsum? Ipsam debitis ipsa architecto a ab. Neque optio vel
      sapiente. Vero eum obcaecati suscipit debitis fugit cum dignissimos quidem
      porro dicta, provident, nihil esse, fugiat corrupti quae repellat.
      Voluptatum sequi quam qui sit facilis expedita ipsam, blanditiis nihil
      ullam repellat natus excepturi explicabo, rerum dolorum nemo quod eveniet
      eaque beatae quasi labore eligendi quae distinctio! Et aliquam consequatur
      ipsa magni. Voluptas quaerat ipsam dolorem fugit illo harum laudantium
      dicta doloremque molestias doloribus esse repudiandae recusandae, iusto
      nulla quod tempore ipsum vero velit explicabo perferendis quis.
      Cupiditate, eaque optio maiores, quia nisi voluptatum consequatur eius
      dolores temporibus sunt, quaerat ullam perspiciatis earum rerum explicabo
      nobis voluptatibus nostrum non. Provident nisi fugit est error facere nemo
      recusandae necessitatibus possimus minima praesentium, aliquam, quisquam
      hic inventore quibusdam animi dolorem dicta quis obcaecati temporibus ipsa
      perspiciatis. Consequatur nostrum voluptatem repellendus accusantium illo
      deserunt fugit eum consectetur ipsam fuga? Fuga quos, voluptate quod
      maxime corrupti laborum impedit ratione eligendi quae maiores labore
      temporibus dignissimos nulla ad facilis, mollitia sit pariatur, magnam
      sapiente quas expedita vel? Expedita numquam voluptates qui iste cum.
      Expedita perspiciatis vel tempora omnis amet voluptate possimus
      architecto. Voluptatum fugit nulla aliquam ipsum porro numquam distinctio
      alias blanditiis esse nisi consequatur harum modi inventore sed, error
      architecto, magni corporis reiciendis! Mollitia impedit delectus,
      quibusdam praesentium adipisci modi veniam deserunt natus pariatur
      laboriosam facilis exercitationem ducimus autem sint doloribus amet vel
      cumque, magnam voluptas voluptatem id neque a. Animi nesciunt ipsum quo
      temporibus exercitationem laborum dolores eveniet assumenda eius provident
      ipsam ipsa est et, vel excepturi, eaque cupiditate fuga dolorem illo esse
      reprehenderit dignissimos incidunt ab. Nobis eveniet incidunt magni
      aliquam molestias? Voluptates soluta odio illum cumque dolorum id
      explicabo perferendis voluptate recusandae officia inventore maxime
      voluptas sapiente quo, et, eius impedit eum dolorem numquam ut pariatur
      quidem ea? Beatae dolorem maxime quibusdam reprehenderit placeat deserunt
      minus ullam accusamus recusandae quas iure ab temporibus consectetur
      neque, consequatur alias harum totam nihil est officia laborum, omnis
      nulla. Voluptatum, odit beatae illo amet sint neque, ipsam atque doloribus
      eos corporis aliquam. Inventore mollitia atque et dolore neque quod libero
      amet exercitationem animi reiciendis totam unde nesciunt eum iste sit
      earum eveniet tempore possimus quos, ratione quis similique, facere eius?
      Iste reiciendis voluptatem iure aut commodi repellendus blanditiis optio
      expedita corporis totam eos quod animi est, enim perferendis. Inventore
      doloremque assumenda error recusandae voluptatem. Quam, quasi! Hic
      voluptate enim delectus, doloremque similique repudiandae quae commodi
      veniam sed consequuntur id dolorum sit et excepturi nisi beatae, omnis
      perferendis. Modi necessitatibus esse repudiandae explicabo aperiam
      eveniet delectus accusamus voluptatem culpa ut possimus reprehenderit
      rerum in ex at commodi recusandae hic, doloremque sed inventore fugiat
      repellat sit tenetur! Omnis distinctio cupiditate ea, sed dolorem nisi
      incidunt eos excepturi totam nostrum hic temporibus ratione ipsa assumenda
      nulla exercitationem! Illum exercitationem officia fugiat necessitatibus
      dolorum deleniti ut perspiciatis, quaerat deserunt repellendus labore
      eveniet saepe quis molestias voluptatibus amet? Aspernatur asperiores iste
      numquam rerum consectetur illo quas neque libero at modi est natus cumque
      expedita adipisci nemo consequatur beatae maxime magni quia nostrum, harum
      placeat cum dolore. Nihil illo sequi enim eveniet inventore animi placeat
      nisi vel, omnis, impedit accusamus, quo tempora vitae amet eius facilis
      consequatur reiciendis nesciunt minima architecto. Rem repellendus
      veritatis, eaque nesciunt rerum minus! Non aspernatur quod distinctio odit
      dicta necessitatibus sequi debitis nisi id ullam, provident ipsa neque qui
      accusamus dolore voluptates dignissimos cum corporis similique iusto
      illum. Dolore, doloremque voluptatum iure error excepturi optio nam earum
      quod ipsa dolor est. Vero eaque, at illum eos aliquam expedita minus error
      labore? Ducimus praesentium reprehenderit, quas ipsam, doloremque commodi
      pariatur quam assumenda illo, qui sit error ratione! Sit, molestiae.
      Perferendis, esse atque facilis non error consectetur soluta, eum, quis
      harum odio accusantium commodi doloremque dicta totam libero at velit
      placeat ipsam reiciendis voluptas facere? Debitis, culpa! Non minima ex
      expedita perferendis reprehenderit, earum natus delectus at porro numquam
      quisquam laboriosam exercitationem impedit ullam ab recusandae
      perspiciatis? Labore hic exercitationem saepe placeat repellendus dolorem
      explicabo illum eius perspiciatis inventore est corrupti libero neque
      doloribus nihil adipisci, natus quasi sint culpa voluptate error? Iure
      ipsam tenetur laboriosam at sapiente, repellendus laudantium. Eos
      molestias consectetur possimus voluptatum cumque ea voluptas fugit maiores
      assumenda, nisi, eaque, quos nobis aut fugiat necessitatibus aliquid
      distinctio? Impedit quia, dolore esse, laboriosam nemo fugit voluptatum
      quis a illo ipsa officiis incidunt reiciendis? At perspiciatis, mollitia
      in ipsam odit est rerum laborum ipsa amet dolorum aspernatur, autem ut ea
      tenetur numquam eveniet praesentium possimus! Similique labore, assumenda
      placeat ut vero maiores, nihil minus ipsum excepturi aliquid cum alias nam
      totam tempore rem voluptatum aut quis distinctio modi sed iusto enim
      dicta? Culpa quibusdam laudantium id veritatis perspiciatis ullam esse
      nulla neque ipsa optio hic, dolorum corrupti a illo nobis sequi, voluptas
      asperiores tenetur ab aperiam ut consectetur enim eveniet! Cupiditate
      distinctio eum temporibus veritatis molestiae beatae cum debitis optio
      facere libero reprehenderit nemo consequatur labore accusamus, sunt
      quisquam repellendus incidunt! Minus harum quia, culpa beatae impedit vel
      quae quod quidem soluta quasi nihil illum dicta, architecto cum expedita.
      Nesciunt fugit illo nulla qui inventore iusto eveniet rem, optio ratione
      nemo repellat minus culpa accusantium error consectetur adipisci corrupti.
      Inventore, qui neque nihil labore et quis tenetur assumenda atque optio
      dicta accusamus adipisci facilis ea ut, odio ad, asperiores rem libero
      nesciunt id omnis sunt. Possimus illum, dignissimos corporis maxime
      exercitationem quas vitae repellat molestias minima quis. Facilis numquam
      mollitia nulla. Ex error ea nam ab animi possimus accusantium eveniet eum
      dolores natus odio voluptates ipsam nihil suscipit quos nulla iste,
      praesentium neque? Sed culpa, alias necessitatibus qui ut deserunt dolores
      voluptates delectus beatae ab doloribus laborum atque repudiandae minima
      in molestiae, nisi, nam excepturi omnis animi. Sed, voluptatum incidunt
      eligendi natus voluptas dignissimos voluptate deserunt blanditiis ducimus
      ex sint iusto aliquam facilis vero fuga consequuntur quam? Ipsa
      repudiandae voluptatibus nostrum possimus voluptatum nisi illum? Repellat
      repudiandae, iure perspiciatis nihil dolore et sed asperiores rem rerum
      explicabo hic. Veniam praesentium quisquam unde veritatis quas harum
      explicabo, aliquam vel reprehenderit aliquid dolorem nulla commodi minima
      quia nihil. Id ut cumque fugit quis vitae praesentium repudiandae, dicta
      eum odio maxime eos explicabo qui ipsa in maiores, asperiores blanditiis
      consectetur? Et minus amet exercitationem vel soluta saepe velit ipsam ex
      qui reprehenderit? Deleniti repellendus culpa iste vitae, veritatis
      impedit alias neque odit dolores aliquam, architecto consequatur totam,
      deserunt fuga. Maiores aut modi, eveniet non quidem facilis magnam
      accusantium voluptate aliquid corrupti eum velit ipsa perferendis fuga
      amet odio soluta temporibus? Ad, assumenda sit quo amet magni enim.
      Accusamus similique temporibus amet aperiam nobis! Quo recusandae laborum
      perspiciatis similique velit. Quos beatae pariatur ratione vitae laborum
      obcaecati amet natus sint rem autem corrupti distinctio ducimus ea
      tenetur, similique, nostrum, placeat inventore sit eius itaque omnis sed.
      Distinctio sunt ab optio ut nobis? Voluptate sint eligendi dolore incidunt
      exercitationem esse, accusamus repellendus. Incidunt corporis sit, modi
      hic, vero nam quod harum officiis odit molestias laboriosam consequatur
      quis accusamus repudiandae eligendi est, eveniet sequi inventore enim!
      Dolore nobis eum possimus dolores optio alias, qui, veniam dicta rem ut
      quod molestias fugiat praesentium odit quae velit adipisci facere
      dignissimos molestiae iure? Est, sit perspiciatis rerum debitis dolorem
      perferendis recusandae vero quas minus? Impedit enim eligendi accusamus
      distinctio praesentium? Quisquam praesentium tempore id quae delectus unde
      dignissimos maxime illum nostrum perspiciatis eos, aut odio quidem ipsa
      dolor impedit ea quibusdam consequuntur atque maiores! Ipsam, ab. Quisquam
      beatae repellendus, et officia, quasi dolores eveniet alias culpa quos rem
      laudantium deleniti obcaecati? Maxime unde sapiente eius corrupti
      asperiores. Veritatis ad cum adipisci quam temporibus amet placeat,
      accusantium et voluptatibus distinctio sint tenetur reiciendis atque
      perspiciatis saepe consequuntur quis libero asperiores. Asperiores
      architecto earum culpa neque. Laboriosam perferendis distinctio iste
      repellendus totam quidem quis suscipit officia neque cumque similique
      possimus voluptate necessitatibus et explicabo autem commodi magnam,
      beatae consequuntur ullam sunt alias? Natus enim repudiandae id maiores,
      quidem recusandae hic quos culpa itaque perspiciatis, quas dolores odit
      molestiae inventore facilis nemo autem consequatur consectetur iure
      assumenda ipsum numquam! Eveniet dolores eius ipsam neque libero ducimus
      placeat asperiores sint aspernatur totam amet, aut inventore enim fugiat,
      pariatur veritatis repellendus sunt nostrum modi, reiciendis at. Pariatur
      molestiae doloribus repellat et? Eveniet, sapiente eligendi, sint ab
      ratione maiores amet hic in nihil nam modi nostrum provident dignissimos
      dolor praesentium ipsa, cum at asperiores. Doloremque libero eveniet in
      dolorem voluptate, temporibus magni minima recusandae dolor asperiores
      fugit at rem id ea enim pariatur. Impedit enim, minima consequatur,
      deserunt eveniet reprehenderit quod perferendis repudiandae nulla cumque
      in! Inventore repellat earum aperiam reiciendis, quis dolor molestias
      veniam eligendi repudiandae corrupti ratione possimus id nobis magnam
      explicabo corporis esse eaque ducimus dolorem provident atque libero non!
      Tempore error exercitationem aspernatur voluptas eos fuga. Quo in ipsam
      repudiandae recusandae deleniti reprehenderit omnis placeat, qui,
      similique voluptas modi! Dolorem sint consequuntur quibusdam
      reprehenderit? Nesciunt recusandae earum velit alias autem soluta facere
      eligendi dolorem doloremque sit repellendus tempora, officia animi neque
      impedit, culpa vero at temporibus, non consequuntur ea tempore eum dolor?
      Inventore veritatis itaque, assumenda facere at libero omnis quo quaerat
      hic ut, veniam dolorem iusto officia ullam cumque beatae. Voluptas numquam
      labore accusantium maiores. Enim quibusdam repudiandae ab velit numquam et
      nemo iste, dicta a unde itaque quo assumenda, est laboriosam perferendis
      autem at cupiditate earum odio. Ducimus accusantium ratione placeat unde
      incidunt aperiam dolorem veniam. Molestiae asperiores rem esse molestias
      quis? Quibusdam, expedita, officia nulla unde ut debitis delectus quas
      veritatis, soluta fugit dolor? Est iste cupiditate totam assumenda, qui
      odit quam commodi, temporibus repellendus, suscipit saepe fuga cumque.
      Est, veritatis sapiente recusandae ut iste amet doloremque ipsam nostrum
      alias harum, dignissimos et debitis corrupti rem corporis asperiores
      officia enim, ab ad vel aliquam. Maxime, placeat. Est maxime inventore
      magnam enim, odit quibusdam non necessitatibus nam dolore suscipit, quasi
      quos fugiat earum perferendis amet facilis voluptates sapiente impedit
      officia veritatis reiciendis sed. Saepe molestias in explicabo dolore quas
      consequuntur debitis ea. Quibusdam unde sit doloribus, culpa excepturi,
      voluptas eos magni, quos delectus voluptate exercitationem placeat commodi
      a neque voluptates deserunt tempore? Inventore consequuntur quibusdam
      nesciunt quo, ex aliquid delectus modi officiis laudantium magnam minima
      possimus, accusantium voluptatibus aspernatur nisi? Porro blanditiis aut
      libero eligendi at voluptatum, corrupti magni inventore possimus pariatur
      sapiente non molestias delectus. Blanditiis dignissimos expedita nisi
      delectus eligendi minus voluptate quia, magni non ut eum fugit voluptatem
      sit consectetur praesentium id iusto! Ab adipisci provident aut qui
      corrupti facere neque cupiditate consequatur nisi, et earum odit similique
      quo asperiores excepturi autem ut numquam dicta! Tenetur cupiditate, nam
      reiciendis possimus dolorem perspiciatis quia voluptas. Ipsa tempora
      deleniti recusandae quibusdam totam quisquam distinctio exercitationem,
      facere sunt, nulla dolor amet vel incidunt? Provident velit enim quas
      ducimus nobis nostrum debitis, non temporibus? Fugit ut possimus, deserunt
      non, eum inventore harum veniam aut expedita veritatis sed recusandae.
      Iusto ut voluptatem voluptas facere nobis tenetur, repudiandae eum tempora
      sunt necessitatibus earum molestiae adipisci temporibus harum in tempore
      magnam expedita, saepe, sit perferendis culpa deserunt reiciendis nemo
      fugiat! Laudantium nostrum vero dolores eligendi eos sit nobis, expedita
      optio eius. Quasi id repudiandae quam! Itaque neque, voluptatem quis,
      magnam, sit error reiciendis odio eligendi nobis totam commodi iste omnis
      numquam deserunt nulla nemo? Blanditiis enim veritatis sequi officia
      maxime at minima mollitia rerum, eaque esse modi dolorum accusantium
      eligendi! Quis molestiae vitae incidunt voluptate unde quae hic non,
      quisquam eum odio iure voluptatibus explicabo provident nam, animi quas
      eaque, repellat facilis. Reprehenderit enim expedita qui officia quis
      tempora repellendus veritatis eos ad, excepturi ipsum rem quisquam
      distinctio ut et voluptatum corporis recusandae doloremque accusantium
      optio vero sit aliquam quidem voluptatibus? Eveniet, doloremque officia
      est laboriosam et tenetur nemo rerum perspiciatis saepe cupiditate
      similique voluptatibus repellendus quia incidunt repudiandae autem tempora
      enim! Voluptates quos illo rerum iure, deleniti accusantium! Vel nemo odio
      consectetur voluptatibus, ipsam facilis beatae possimus tempore voluptas
      error qui ex. Neque ipsam adipisci temporibus provident. Excepturi alias
      deserunt autem similique harum, dicta recusandae odit voluptate adipisci
      minima illo nostrum est et dolor accusantium! Mollitia libero neque labore
      placeat veritatis recusandae quo perspiciatis, minima numquam quisquam. Ut
      laboriosam saepe dolorum fuga modi beatae quibusdam voluptate a est harum
      nemo totam, aliquam, laborum velit. Tenetur eaque reprehenderit, cumque
      consequuntur illo quo accusamus quas ullam, perspiciatis minima veritatis,
      cum ab hic eos esse recusandae quaerat dolore voluptatum natus inventore
      velit aperiam vel debitis? Repellat doloremque praesentium unde molestiae
      quos sit vitae nobis expedita, et deleniti ea nostrum corrupti cum
      deserunt impedit ut enim fuga labore? Quos, odit nostrum! Magnam error
      sint in quidem aliquam ex dolorum omnis itaque provident maiores dicta,
      architecto molestiae mollitia? Iste quae facilis, maxime unde natus beatae
      explicabo tempore excepturi, laborum veritatis, recusandae molestias vero
      modi ad totam similique id laudantium quisquam enim ipsam! Consectetur est
      dicta maiores eius rem corporis, deleniti ea illo provident cum aspernatur
      vitae nesciunt mollitia voluptatum deserunt facere. Aliquid accusamus
      minima velit quas consequatur aperiam porro, quidem nulla, itaque impedit
      aut modi, qui voluptates magni vel distinctio! Obcaecati explicabo
      consequatur magnam dolor perferendis quibusdam molestiae id possimus sit
      expedita adipisci, quisquam quia facilis eum laborum ducimus beatae, in
      similique! Perferendis repudiandae, illo amet nam nobis et explicabo esse
      quasi ut eos neque libero minima quis delectus consectetur blanditiis
      veniam eveniet harum iste consequuntur sapiente obcaecati hic vitae. Rem
      cum consequatur quos, quibusdam provident optio expedita ea. Harum cumque
      temporibus sit quos ea, quasi possimus ex dolorem assumenda, quisquam
      distinctio? Fugiat similique molestiae quia quisquam deleniti voluptatibus
      alias quam, enim iusto nisi eum. Incidunt ad aliquid eveniet dolorem neque
      possimus tempore! Veniam vitae possimus ut repellendus tempora illum
      repellat dolore ex ad velit officia saepe ab, similique quos voluptatum
      quam aliquam fugiat accusamus perspiciatis consequuntur veritatis. Iusto,
      voluptates voluptatum. Architecto commodi porro, ex facilis reiciendis
      possimus officia adipisci eveniet quas dolore sapiente vero. Eligendi iure
      quae facere nemo illo, impedit totam voluptas ipsum earum dignissimos
      suscipit officiis officia fugit! Nemo, voluptate id. Tempora quia
      asperiores doloribus, nihil reiciendis veniam deserunt iste facere, amet
      consequatur illo, officiis quidem? Qui reiciendis aperiam recusandae aut!
      Culpa reprehenderit ea, iste facere architecto neque rem. Molestiae
      commodi aperiam atque ut incidunt repellendus earum. Dolor eaque omnis
      dolore excepturi, tempore velit ullam aspernatur similique veritatis in!
      Ut rem corrupti mollitia et, cumque quisquam qui repellat, dicta
      voluptates architecto explicabo ipsam atque est minima dolor fugit
      obcaecati voluptate ullam! Minima alias animi numquam quo sunt et? At
      laudantium facilis esse inventore voluptatum culpa eaque quas error
      dolorum consectetur, amet accusamus iusto minima aut quia labore deleniti
      adipisci ex minus harum necessitatibus dignissimos! Qui, illo, blanditiis
      aspernatur doloribus enim natus molestias consequatur at laborum
      dignissimos minima. Porro necessitatibus voluptas similique corrupti
      asperiores, quos beatae recusandae! Ipsum dolores itaque, accusamus nihil
      sed rem facere omnis veniam adipisci iusto molestias. A at eius, iure
      tempora, ad optio dolore odit dolorem, cum omnis eligendi hic? Odio
      quibusdam in dolorem error doloremque vitae, doloribus quaerat iusto
      assumenda, harum sapiente omnis perspiciatis repellendus ea amet nemo
      consectetur vero adipisci eaque a aliquam deserunt. Assumenda dignissimos
      voluptas, id, explicabo eos quis nesciunt quisquam laboriosam obcaecati
      eligendi nihil fugit, maxime consectetur accusantium ipsa quod doloremque
      eius ducimus! Cum sequi assumenda deleniti nulla aperiam vel alias quaerat
      unde voluptate non eos minus amet, eveniet totam autem debitis et itaque?
      Doloremque deserunt non sint laboriosam minus dicta eaque distinctio
      perferendis debitis nihil. Mollitia nostrum similique velit debitis esse
      alias doloremque vero quos, molestias ullam reprehenderit vitae doloribus
      eveniet temporibus aut! Atque, repudiandae beatae cupiditate quisquam
      officia asperiores autem assumenda sequi mollitia temporibus tenetur
      veritatis voluptates quo nemo, inventore provident quidem, reiciendis
      quaerat consectetur. Illum exercitationem quae iste placeat repudiandae
      ullam natus eum recusandae labore, tenetur impedit. A voluptates ipsa
      deleniti, tenetur minus neque ea officia numquam! Consectetur a totam
      officia recusandae nostrum perferendis cumque inventore, nesciunt, libero
      obcaecati cum, optio eos ratione facilis ipsum quas necessitatibus
      architecto? Facilis et voluptatum nisi dolorum, iure odio recusandae.
      Debitis deleniti nulla provident quam impedit est necessitatibus
      laudantium blanditiis nam natus facere voluptatum, obcaecati beatae,
      quidem laboriosam dignissimos nobis accusamus praesentium eos! Ad ipsam
      totam quae eveniet nemo assumenda voluptas doloribus tempora, omnis ea.
      Amet corrupti ad accusamus! Pariatur recusandae nostrum aliquam veniam,
      eos molestias magni iusto consequatur dolor ab ex modi vel laboriosam
      ullam ea ducimus ut asperiores libero architecto inventore cum ad? Natus
      illo numquam eius. Voluptas, optio nostrum commodi neque expedita, non
      pariatur at, rerum aliquid odio dolore consequatur. Hic, quae ducimus.
      Doloremque, eum perspiciatis nesciunt sapiente iste aut aliquid enim
      molestias, illo sint veniam porro qui. Doloremque repellendus in beatae
      velit quo eveniet natus! Similique ipsa quisquam consequatur vitae
      delectus quod illo eius soluta, minus non adipisci est velit voluptatum
      error consequuntur accusantium nesciunt autem aliquam, ex voluptas sunt!
      Soluta tempora corporis earum officiis velit! Omnis quae aliquid ex totam
      tenetur perspiciatis labore nisi, enim assumenda nemo amet vel quo ea
      delectus blanditiis voluptatum rem magni cum culpa suscipit quis pariatur
      a! Nostrum officia aliquid at aspernatur aliquam reiciendis? Doloremque,
      ullam sunt distinctio, sequi cupiditate expedita vitae quis omnis, nostrum
      doloribus ex asperiores totam obcaecati iure in soluta laboriosam. Vero
      eveniet aliquam illum corporis deserunt pariatur tempora, animi iusto
      velit iste non quaerat dolores eos at molestiae rerum saepe aliquid amet
      architecto! Sit sapiente deleniti tenetur maiores ut facilis!
    </>
  );

  // return (
  //   <div className="task-list">
  //     <div className="task-list__header">
  //       <div className="task-list__tabs">
  //         <button className="task-list__tab task-list__tab--active">
  //           📋 Список
  //         </button>
  //         <button className="task-list__tab">📊 Канбан</button>
  //         <button className="task-list__tab">📈 Гант</button>
  //       </div>
  //     </div>

  //     <div className="task-list__content">
  //       <div className="task-list__title-section">
  //         <h1 className="task-list__title">Мои задачи</h1>
  //       </div>

  //       <div className="task-list__toolbar">
  //         <div className="task-list__search">
  //           <div className="task-list__search-icon">🔍</div>
  //           <input
  //             type="text"
  //             placeholder="Поиск по задачам"
  //             className="task-list__search-input"
  //           />
  //         </div>
  //         <div className="task-list__toolbar-actions">
  //           <button className="task-list__settings-button">⚙️</button>
  //           <button
  //             className="task-list__add-button"
  //             onClick={() => setIsNewTaskOpen(true)}
  //           >
  //             + Новая задача
  //           </button>
  //         </div>
  //       </div>

  //       <div className="task-list__table">
  //         <div className="task-list__table-header">
  //           <div className="task-list__header-cell task-list__header-cell--checkbox">
  //             <input
  //               type="checkbox"
  //               checked={selectedTasks.length === tasks.length}
  //               onChange={handleSelectAll}
  //               className="task-list__checkbox"
  //             />
  //             <button
  //               className="task-list__settings-btn"
  //               onClick={() => setIsColumnSettingsOpen(true)}
  //             >
  //               ⚙️
  //             </button>
  //           </div>
  //           <div className="task-list__header-cell task-list__header-cell--name">
  //             Наименование
  //           </div>
  //           <div className="task-list__header-cell">Активность</div>
  //           <div className="task-list__header-cell">Крайний срок</div>
  //           <div className="task-list__header-cell">Заказчик</div>
  //           <div className="task-list__header-cell">Исполнитель</div>
  //           <div className="task-list__header-cell">Проект</div>
  //         </div>

  //         <div className="task-list__table-body">
  //           {tasks.map((task) => (
  //             <div
  //               key={task.id}
  //               className="task-list__row"
  //               onClick={() => handleTaskRowClick(task)}
  //             >
  //               <div className="task-list__cell task-list__cell--checkbox">
  //                 <input
  //                   type="checkbox"
  //                   checked={selectedTasks.includes(task.id)}
  //                   onChange={() => handleTaskSelect(task.id)}
  //                   onClick={(e) => e.stopPropagation()}
  //                   className="task-list__checkbox"
  //                 />
  //                 <button className="task-list__row-menu">⚙️</button>
  //               </div>{" "}
  //               <div className="task-list__cell task-list__cell--name">
  //                 <span className="task-list__task-title">{task.title}</span>
  //               </div>
  //               <div className="task-list__cell">
  //                 <span className="task-list__date">{task.activity}</span>
  //               </div>
  //               <div className="task-list__cell">
  //                 <span className="task-list__date">{task.deadline}</span>
  //               </div>
  //               <div className="task-list__cell">
  //                 <div className="task-list__user">
  //                   <div className="task-list__avatar">
  //                     {task.assignee.avatar}
  //                   </div>
  //                   <span className="task-list__user-name">
  //                     {task.assignee.name}
  //                   </span>
  //                 </div>
  //               </div>
  //               <div className="task-list__cell">
  //                 <div className="task-list__user">
  //                   <div className="task-list__avatar">
  //                     {task.executor.avatar}
  //                   </div>
  //                   <span className="task-list__user-name">
  //                     {task.executor.name}
  //                   </span>
  //                   {task.executor.additionalCount && (
  //                     <span className="task-list__additional-count">
  //                       +{task.executor.additionalCount}
  //                     </span>
  //                   )}
  //                 </div>
  //               </div>
  //               <div className="task-list__cell">
  //                 <span className="task-list__project">{task.project}</span>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>

  //       <div className="task-list__footer">
  //         <div className="task-list__bulk-actions">
  //           <div className="task-list__bulk-dropdown">
  //             <button
  //               className="task-list__bulk-select"
  //               onClick={() => setIsBulkMenuOpen(!isBulkMenuOpen)}
  //             >
  //               Выберите действие ⌄
  //             </button>
  //             {isBulkMenuOpen && (
  //               <div className="task-list__bulk-menu">
  //                 <button
  //                   className="task-list__bulk-option"
  //                   onClick={() => handleBulkAction("ping")}
  //                 >
  //                   Пинг
  //                 </button>
  //                 <button
  //                   className="task-list__bulk-option"
  //                   onClick={() => handleBulkAction("complete")}
  //                 >
  //                   Завершить
  //                 </button>
  //                 <button
  //                   className="task-list__bulk-option"
  //                   onClick={() => handleBulkAction("set-deadline")}
  //                 >
  //                   Указать крайний срок
  //                 </button>
  //                 <button
  //                   className="task-list__bulk-option"
  //                   onClick={() => handleBulkAction("move-deadline-forward")}
  //                 >
  //                   Перенести крайний срок вперёд
  //                 </button>
  //                 <button
  //                   className="task-list__bulk-option"
  //                   onClick={() => handleBulkAction("move-deadline-back")}
  //                 >
  //                   Перенести крайний срок назад
  //                 </button>
  //                 <button
  //                   className="task-list__bulk-option"
  //                   onClick={() => handleBulkAction("control-after-completion")}
  //                 >
  //                   Контроль после завершения
  //                 </button>
  //                 <button className="task-list__bulk-option task-list__bulk-option--dotted">
  //                   Контроль после
  //                 </button>
  //                 <button
  //                   className="task-list__bulk-option task-list__bulk-option--expandable"
  //                   onClick={() => setIsBulkMenuOpen(false)}
  //                 >
  //                   Выберите действие ⌃
  //                 </button>
  //               </div>
  //             )}
  //           </div>
  //           <span className="task-list__selected-count">
  //             Отмечено: {selectedTasks.length}
  //           </span>
  //           <span className="task-list__total-count">
  //             Всего: {tasks.length}
  //           </span>
  //         </div>

  //         <div className="task-list__pagination">
  //           <button className="task-list__pagination-btn">‹</button>
  //           <span className="task-list__pagination-info">На странице</span>
  //           <select className="task-list__pagination-select">
  //             <option>1</option>
  //             <option>2</option>
  //             <option>3</option>
  //           </select>
  //           <button className="task-list__pagination-btn">›</button>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Модальное окно новой задачи */}
  //     {isNewTaskOpen && (
  //       <div className="new-task-modal">
  //         <div
  //           className="new-task-modal__overlay"
  //           onClick={handleNewTaskCancel}
  //         />
  //         <div className="new-task-modal__content">
  //           <div className="new-task-modal__header">
  //             <h3 className="new-task-modal__title">Новая задача</h3>
  //             <button
  //               className="new-task-modal__close"
  //               onClick={handleNewTaskCancel}
  //             >
  //               ✕
  //             </button>
  //           </div>

  //           <div className="new-task-modal__body">
  //             <div className="new-task-form">
  //               <div className="new-task-field">
  //                 <input
  //                   type="text"
  //                   placeholder="Название задачи"
  //                   value={newTaskForm.title}
  //                   onChange={(e) =>
  //                     setNewTaskForm((prev) => ({
  //                       ...prev,
  //                       title: e.target.value,
  //                     }))
  //                   }
  //                   className="new-task-input new-task-input--title"
  //                 />
  //               </div>

  //               <div className="new-task-field">
  //                 <textarea
  //                   placeholder="Описание"
  //                   value={newTaskForm.description}
  //                   onChange={(e) =>
  //                     setNewTaskForm((prev) => ({
  //                       ...prev,
  //                       description: e.target.value,
  //                     }))
  //                   }
  //                   className="new-task-textarea"
  //                   rows={4}
  //                 />
  //               </div>

  //               <div className="new-task-field">
  //                 <button className="new-task-file-btn">
  //                   📎 Добавить файл
  //                 </button>
  //               </div>

  //               <div className="new-task-field">
  //                 <label className="new-task-checkbox-label">
  //                   <input
  //                     type="checkbox"
  //                     checked={newTaskForm.isImportant}
  //                     onChange={(e) =>
  //                       setNewTaskForm((prev) => ({
  //                         ...prev,
  //                         isImportant: e.target.checked,
  //                       }))
  //                     }
  //                     className="new-task-checkbox"
  //                   />
  //                   <span>Важная задача</span>
  //                 </label>
  //               </div>

  //               <div className="new-task-field">
  //                 <button className="new-task-add-btn new-task-add-btn--executor">
  //                   + Исполнитель
  //                 </button>
  //               </div>

  //               <div className="new-task-row">
  //                 <button className="new-task-add-btn new-task-add-btn--coexecutor">
  //                   + Добавить постановщика
  //                 </button>
  //                 <button className="new-task-add-btn new-task-add-btn--coexecutor">
  //                   + Добавить соисполнителей
  //                 </button>
  //                 <button className="new-task-add-btn new-task-add-btn--observer">
  //                   + Добавить наблюдателей
  //                 </button>
  //               </div>

  //               <div className="new-task-row">
  //                 <div className="new-task-date-field">
  //                   <input
  //                     type="date"
  //                     value={newTaskForm.startDate}
  //                     onChange={(e) =>
  //                       setNewTaskForm((prev) => ({
  //                         ...prev,
  //                         startDate: e.target.value,
  //                       }))
  //                     }
  //                     className="new-task-date-input"
  //                   />
  //                   <span className="new-task-date-label">Начало</span>
  //                 </div>
  //                 <div className="new-task-date-field">
  //                   <input
  //                     type="date"
  //                     value={newTaskForm.deadline}
  //                     onChange={(e) =>
  //                       setNewTaskForm((prev) => ({
  //                         ...prev,
  //                         deadline: e.target.value,
  //                       }))
  //                     }
  //                     className="new-task-date-input"
  //                   />
  //                   <span className="new-task-date-label">Крайний срок</span>
  //                 </div>
  //                 <div className="new-task-duration-field">
  //                   <select
  //                     value={newTaskForm.duration}
  //                     onChange={(e) =>
  //                       setNewTaskForm((prev) => ({
  //                         ...prev,
  //                         duration: e.target.value,
  //                       }))
  //                     }
  //                     className="new-task-duration-select"
  //                   >
  //                     <option value="">Длительность</option>
  //                     <option value="1">1 день</option>
  //                     <option value="7">1 неделя</option>
  //                     <option value="30">1 месяц</option>
  //                   </select>
  //                   <button
  //                     className="new-task-more-btn"
  //                     onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
  //                   >
  //                     ⋯ Ещё
  //                   </button>
  //                 </div>
  //               </div>

  //               <div className="new-task-field">
  //                 <label className="new-task-checkbox-label">
  //                   <input
  //                     type="checkbox"
  //                     checked={newTaskForm.shouldNotCompleteWithoutResult}
  //                     onChange={(e) =>
  //                       setNewTaskForm((prev) => ({
  //                         ...prev,
  //                         shouldNotCompleteWithoutResult: e.target.checked,
  //                       }))
  //                     }
  //                     className="new-task-checkbox"
  //                   />
  //                   <span>Не завершать задачу без результата</span>
  //                 </label>
  //               </div>

  //               <div className="new-task-additional">
  //                 <button
  //                   className="new-task-additional-toggle"
  //                   onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
  //                 >
  //                   Дополнительно Проект, учёт времени, напомнить, повторять,
  //                   гант, CRM, подзадача, теги, поля{" "}
  //                   {isAdditionalOpen ? "⌃" : "⌄"}
  //                 </button>
  //               </div>

  //               {/* Дополнительные поля */}
  //               {isAdditionalOpen && (
  //                 <div className="new-task-additional-fields">
  //                   <div className="new-task-field">
  //                     <button className="new-task-add-btn">
  //                       + Создать проект
  //                     </button>
  //                   </div>

  //                   <div className="new-task-field">
  //                     <label className="new-task-checkbox-label">
  //                       <input
  //                         type="checkbox"
  //                         checked={newTaskForm.timeTracking}
  //                         onChange={(e) =>
  //                           setNewTaskForm((prev) => ({
  //                             ...prev,
  //                             timeTracking: e.target.checked,
  //                           }))
  //                         }
  //                         className="new-task-checkbox"
  //                       />
  //                       <span>Вести для выполнения задач</span>
  //                     </label>
  //                   </div>

  //                   <div className="new-task-field">
  //                     <input
  //                       type="text"
  //                       placeholder="Выбрать участников"
  //                       className="new-task-input"
  //                     />
  //                   </div>

  //                   <div className="new-task-field">
  //                     <label className="new-task-checkbox-label">
  //                       <input
  //                         type="checkbox"
  //                         checked={newTaskForm.isRecurring}
  //                         onChange={(e) =>
  //                           setNewTaskForm((prev) => ({
  //                             ...prev,
  //                             isRecurring: e.target.checked,
  //                           }))
  //                         }
  //                         className="new-task-checkbox"
  //                       />
  //                       <span>Сделать задачу регулярной</span>
  //                     </label>
  //                   </div>

  //                   {newTaskForm.isRecurring && (
  //                     <div className="new-task-recurring-options">
  //                       <div className="new-task-recurring-header">
  //                         <span>Повторяемость</span>
  //                         <select
  //                           value={newTaskForm.recurringType}
  //                           onChange={(e) =>
  //                             setNewTaskForm((prev) => ({
  //                               ...prev,
  //                               recurringType: e.target.value,
  //                             }))
  //                           }
  //                           className="new-task-recurring-type"
  //                         >
  //                           <option value="daily">День</option>
  //                           <option value="weekly">Неделя</option>
  //                           <option value="monthly">Месяц</option>
  //                         </select>
  //                         <span>Каждый</span>
  //                         <input
  //                           type="number"
  //                           value={newTaskForm.repeatEveryDays}
  //                           onChange={(e) =>
  //                             setNewTaskForm((prev) => ({
  //                               ...prev,
  //                               repeatEveryDays: parseInt(e.target.value) || 1,
  //                             }))
  //                           }
  //                           className="new-task-recurring-number"
  //                           min="1"
  //                         />
  //                         <span>день с перерывом</span>
  //                       </div>

  //                       <div className="new-task-field">
  //                         <button className="new-task-reminder-btn">
  //                           🔔 Включить календарь
  //                         </button>
  //                       </div>

  //                       <div className="new-task-field">
  //                         <label className="new-task-checkbox-label">
  //                           <input
  //                             type="checkbox"
  //                             checked={!newTaskForm.hasEndDate}
  //                             onChange={(e) =>
  //                               setNewTaskForm((prev) => ({
  //                                 ...prev,
  //                                 hasEndDate: !e.target.checked,
  //                               }))
  //                             }
  //                             className="new-task-checkbox"
  //                           />
  //                           <span>Нет даты окончания</span>
  //                         </label>
  //                       </div>

  //                       <div className="new-task-field">
  //                         <label className="new-task-checkbox-label">
  //                           <input
  //                             type="checkbox"
  //                             checked={newTaskForm.hasEndDate}
  //                             onChange={(e) =>
  //                               setNewTaskForm((prev) => ({
  //                                 ...prev,
  //                                 hasEndDate: e.target.checked,
  //                               }))
  //                             }
  //                             className="new-task-checkbox"
  //                           />
  //                           <span>Дата окончания</span>
  //                         </label>
  //                         {newTaskForm.hasEndDate && (
  //                           <input
  //                             type="date"
  //                             value={newTaskForm.endDate}
  //                             onChange={(e) =>
  //                               setNewTaskForm((prev) => ({
  //                                 ...prev,
  //                                 endDate: e.target.value,
  //                               }))
  //                             }
  //                             className="new-task-date-input"
  //                           />
  //                         )}
  //                       </div>

  //                       <div className="new-task-field">
  //                         <label className="new-task-checkbox-label">
  //                           <input
  //                             type="checkbox"
  //                             checked={newTaskForm.repeatAfterCompletion}
  //                             onChange={(e) =>
  //                               setNewTaskForm((prev) => ({
  //                                 ...prev,
  //                                 repeatAfterCompletion: e.target.checked,
  //                               }))
  //                             }
  //                             className="new-task-checkbox"
  //                           />
  //                           <span>Завершать после повторной</span>
  //                         </label>
  //                       </div>

  //                       <div className="new-task-info">
  //                         📋 Задача повторится в 06:00 (UTC +05:00) каждый день
  //                         с момента окончания, без даты окончания
  //                       </div>

  //                       <div className="new-task-info">
  //                         ⓘ Заметок по условиям задач будет создан новый автомат
  //                       </div>

  //                       <div className="new-task-buttons-row">
  //                         <button className="new-task-add-btn">
  //                           + Добавить в проект
  //                         </button>
  //                         <button className="new-task-add-btn">+ CRM</button>
  //                       </div>

  //                       <div className="new-task-field">
  //                         <button className="new-task-add-btn">
  //                           + Создать файл
  //                         </button>
  //                       </div>
  //                     </div>
  //                   )}
  //                 </div>
  //               )}
  //             </div>
  //           </div>

  //           <div className="new-task-modal__footer">
  //             <button
  //               className="new-task-btn new-task-btn--secondary"
  //               onClick={handleNewTaskCancel}
  //             >
  //               Отмена
  //             </button>
  //             <button
  //               className="new-task-btn new-task-btn--primary"
  //               onClick={handleNewTaskSubmit}
  //             >
  //               Создать задачу
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     {/* Модальное окно настройки столбцов */}
  //     {isColumnSettingsOpen && (
  //       <div className="column-settings-modal">
  //         <div
  //           className="column-settings-modal__overlay"
  //           onClick={() => setIsColumnSettingsOpen(false)}
  //         />
  //         <div className="column-settings-modal__content">
  //           <div className="column-settings-modal__header">
  //             <h3 className="column-settings-modal__title">
  //               Настройка столбцов
  //             </h3>
  //             <button
  //               className="column-settings-modal__close"
  //               onClick={() => setIsColumnSettingsOpen(false)}
  //             >
  //               ✕
  //             </button>
  //           </div>

  //           <div className="column-settings-modal__body">
  //             <div className="column-settings-grid">
  //               {/* Левая колонка */}
  //               <div className="column-settings-column">
  //                 {columns
  //                   .slice(0, Math.ceil(columns.length / 3))
  //                   .map((column) => (
  //                     <label key={column.id} className="column-settings-item">
  //                       <input
  //                         type="checkbox"
  //                         checked={column.visible}
  //                         onChange={() => handleColumnToggle(column.id)}
  //                         className="column-settings-checkbox"
  //                       />
  //                       <span className="column-settings-label">
  //                         {column.label}
  //                       </span>
  //                     </label>
  //                   ))}
  //               </div>

  //               {/* Средняя колонка */}
  //               <div className="column-settings-column">
  //                 {columns
  //                   .slice(
  //                     Math.ceil(columns.length / 3),
  //                     Math.ceil((columns.length * 2) / 3),
  //                   )
  //                   .map((column) => (
  //                     <label key={column.id} className="column-settings-item">
  //                       <input
  //                         type="checkbox"
  //                         checked={column.visible}
  //                         onChange={() => handleColumnToggle(column.id)}
  //                         className="column-settings-checkbox"
  //                       />
  //                       <span className="column-settings-label">
  //                         {column.label}
  //                       </span>
  //                     </label>
  //                   ))}
  //               </div>

  //               {/* Правая колонка */}
  //               <div className="column-settings-column">
  //                 {columns
  //                   .slice(Math.ceil((columns.length * 2) / 3))
  //                   .map((column) => (
  //                     <label key={column.id} className="column-settings-item">
  //                       <input
  //                         type="checkbox"
  //                         checked={column.visible}
  //                         onChange={() => handleColumnToggle(column.id)}
  //                         className="column-settings-checkbox"
  //                       />
  //                       <span className="column-settings-label">
  //                         {column.label}
  //                       </span>
  //                     </label>
  //                   ))}
  //               </div>
  //             </div>
  //           </div>

  //           <div className="column-settings-modal__footer">
  //             <div className="column-settings-footer-left">
  //               <button
  //                 className="column-settings-btn column-settings-btn--secondary"
  //                 onClick={handleResetToDefault}
  //               >
  //                 ⚙️ По умолчанию
  //               </button>
  //             </div>

  //             <div className="column-settings-footer-center">
  //               <button
  //                 className="column-settings-btn column-settings-btn--link"
  //                 onClick={handleSelectAllColumns}
  //               >
  //                 Выбрать все
  //               </button>
  //               <button
  //                 className="column-settings-btn column-settings-btn--link"
  //                 onClick={handleCancelAllColumns}
  //               >
  //                 Отменить всё
  //               </button>
  //             </div>

  //             <div className="column-settings-footer-right">
  //               <button
  //                 className="column-settings-btn column-settings-btn--primary"
  //                 onClick={handleApplyColumns}
  //               >
  //                 Применить
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     {/* Модальное окно детального просмотра задачи */}
  //     {isTaskDetailOpen && selectedTask && (
  //       <div className="task-detail-modal">
  //         <div
  //           className="task-detail-modal__overlay"
  //           onClick={handleTaskDetailClose}
  //         />
  //         <div className="task-detail-modal__content">
  //           <div className="task-detail-modal__header">
  //             <div className="task-detail-header-left">
  //               <h3 className="task-detail-modal__title">
  //                 Задача № {selectedTask.id} - ждёт выполнения
  //               </h3>
  //               <span className="task-detail-modal__subtitle">
  //                 {selectedTask.title}
  //               </span>
  //             </div>
  //             <div className="task-detail-header-right">
  //               <button className="task-detail-action-btn task-detail-action-btn--primary">
  //                 Ждёт выполнения с 24.01.2025 19:00
  //               </button>
  //               <button
  //                 className="task-detail-modal__close"
  //                 onClick={handleTaskDetailClose}
  //               >
  //                 ✕
  //               </button>
  //             </div>
  //           </div>

  //           <div className="task-detail-modal__body">
  //             <div className="task-detail-main">
  //               <div className="task-detail-left">
  //                 <div className="task-detail-description">
  //                   <h4>Описание</h4>
  //                   <p>
  //                     Провести анализ BRD_V.3.docx от Игоря, дополнить FR и NFR
  //                   </p>
  //                 </div>

  //                 <div className="task-detail-actions">
  //                   <button className="task-detail-add-btn">
  //                     📎 Добавить чек-лист
  //                   </button>
  //                 </div>

  //                 <div className="task-detail-progress">
  //                   <div className="task-detail-progress-buttons">
  //                     <button className="task-detail-btn task-detail-btn--start">
  //                       Начать
  //                     </button>
  //                     <button className="task-detail-btn task-detail-btn--complete">
  //                       Завершить
  //                     </button>
  //                     <button className="task-detail-btn task-detail-btn--favorite">
  //                       ♡
  //                     </button>
  //                     <button className="task-detail-btn task-detail-btn--link">
  //                       🔗
  //                     </button>
  //                     <button className="task-detail-btn task-detail-btn--comment">
  //                       💬
  //                     </button>
  //                     <button className="task-detail-btn task-detail-btn--more">
  //                       ⋯
  //                     </button>
  //                   </div>
  //                   <span className="task-detail-views">👁 19</span>
  //                 </div>

  //                 <div className="task-detail-tabs">
  //                   <button className="task-detail-tab task-detail-tab--active">
  //                     Комментарии 00+
  //                   </button>
  //                   <button className="task-detail-tab">История 00+</button>
  //                   <button className="task-detail-tab">Время 00:00:00</button>
  //                   <button className="task-detail-tab">Заметки 00+</button>
  //                   <button className="task-detail-tab">Файлы 00+</button>
  //                 </div>

  //                 <div className="task-detail-comments">
  //                   <div className="task-detail-comment">
  //                     <div className="task-detail-comment-header">
  //                       <img
  //                         src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                         alt="Avatar"
  //                         className="task-detail-avatar"
  //                       />
  //                       <div className="task-detail-comment-info">
  //                         <span className="task-detail-username">
  //                           Константин Константинопольский
  //                         </span>
  //                         <span className="task-detail-timestamp">
  //                           1 августа
  //                         </span>
  //                       </div>
  //                       <button className="task-detail-comment-menu">⋯</button>
  //                     </div>
  //                     <div className="task-detail-comment-content">
  //                       <p>Типа данных v.2.0.</p>
  //                       <a href="#" className="task-detail-file-link">
  //                         Типа данных (1).xlsx 11.30 КБ
  //                       </a>
  //                       <div className="task-detail-comment-actions">
  //                         <button>Реакция</button>
  //                         <button>Ответить</button>
  //                       </div>
  //                     </div>
  //                   </div>

  //                   <div className="task-detail-comment">
  //                     <div className="task-detail-comment-header">
  //                       <img
  //                         src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                         alt="Avatar"
  //                         className="task-detail-avatar"
  //                       />
  //                       <div className="task-detail-comment-info">
  //                         <span className="task-detail-username">
  //                           Рената Литвинова
  //                         </span>
  //                         <span className="task-detail-timestamp">
  //                           5 августа
  //                         </span>
  //                       </div>
  //                       <button className="task-detail-comment-menu">⋯</button>
  //                     </div>
  //                     <div className="task-detail-comment-content">
  //                       <p>Типа активити (согласованные)</p>
  //                       <a href="#" className="task-detail-file-link">
  //                         Активити.xlsx 10.85 КБ +2 файла
  //                       </a>
  //                       <div className="task-detail-comment-actions">
  //                         <button>Реакция</button>
  //                         <button>Ответить</button>
  //                       </div>
  //                     </div>
  //                   </div>

  //                   <div className="task-detail-comment">
  //                     <div className="task-detail-comment-header">
  //                       <img
  //                         src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                         alt="Avatar"
  //                         className="task-detail-avatar"
  //                       />
  //                       <div className="task-detail-comment-info">
  //                         <span className="task-detail-username">
  //                           Рената Литвинова
  //                         </span>
  //                         <span className="task-detail-timestamp">
  //                           5 августа
  //                         </span>
  //                       </div>
  //                       <button className="task-detail-comment-menu">⋯</button>
  //                     </div>
  //                     <div className="task-detail-comment-content">
  //                       <p>Типа данных v.3.0.1</p>
  //                       <a href="#" className="task-detail-file-link">
  //                         Типа данных (2).xlsx 18.04 КБ +30 файлов
  //                       </a>
  //                       <div className="task-detail-comment-actions">
  //                         <button>Реакция</button>
  //                         <button>Ответить</button>
  //                       </div>
  //                     </div>
  //                   </div>

  //                   <div className="task-detail-comment-input">
  //                     <img
  //                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                       alt="Avatar"
  //                       className="task-detail-avatar"
  //                     />
  //                     <div className="task-detail-input-container">
  //                       <input
  //                         type="text"
  //                         placeholder="Добавить комментарий..."
  //                         className="task-detail-comment-field"
  //                       />
  //                       <button className="task-detail-send-btn">➤</button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className="task-detail-right">
  //                 <div className="task-detail-info">
  //                   <div className="task-detail-info-item">
  //                     <span className="task-detail-info-label">
  //                       Крайний срок
  //                     </span>
  //                     <span className="task-detail-info-value">
  //                       08.08.2025 19:00
  //                     </span>
  //                   </div>
  //                   <div className="task-detail-info-item">
  //                     <span className="task-detail-info-label">
  //                       Напоминание
  //                     </span>
  //                     <span className="task-detail-info-value">-</span>
  //                   </div>
  //                   <div className="task-detail-info-item">
  //                     <span className="task-detail-info-label">
  //                       Автоматизация
  //                     </span>
  //                     <button className="task-detail-info-arrow">➤</button>
  //                   </div>
  //                   <div className="task-detail-info-item">
  //                     <span className="task-detail-info-label">Поставлено</span>
  //                     <span className="task-detail-info-value">
  //                       24.06.2025 13:02
  //                     </span>
  //                   </div>
  //                   <div className="task-detail-info-item">
  //                     <span className="task-detail-info-label">Оценка</span>
  //                     <span className="task-detail-info-value">Нет</span>
  //                     <a href="#" className="task-detail-info-link">
  //                       Требуется отчёт о работе
  //                     </a>
  //                   </div>
  //                 </div>

  //                 <div className="task-detail-participants">
  //                   <h4>Постановщик(и)</h4>
  //                   <div className="task-detail-participant">
  //                     <img
  //                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                       alt="Avatar"
  //                       className="task-detail-participant-avatar"
  //                     />
  //                     <span>Константин К</span>
  //                   </div>

  //                   <h4>Исполнитель(и)</h4>
  //                   <div className="task-detail-participant">
  //                     <img
  //                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                       alt="Avatar"
  //                       className="task-detail-participant-avatar"
  //                     />
  //                     <span>Микки Ш.</span>
  //                   </div>

  //                   <div className="task-detail-participant">
  //                     <img
  //                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                       alt="Avatar"
  //                       className="task-detail-participant-avatar"
  //                     />
  //                     <span>Серёза А.</span>
  //                   </div>

  //                   <h4>Соисполнитель(и)</h4>
  //                   <div className="task-detail-participant">
  //                     <img
  //                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                       alt="Avatar"
  //                       className="task-detail-participant-avatar"
  //                     />
  //                     <span>Роберт П.</span>
  //                   </div>

  //                   <div className="task-detail-participant">
  //                     <img
  //                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                       alt="Avatar"
  //                       className="task-detail-participant-avatar"
  //                     />
  //                     <span>Виталий К.</span>
  //                   </div>

  //                   <div className="task-detail-participant">
  //                     <img
  //                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ccc'/%3E%3C/svg%3E"
  //                       alt="Avatar"
  //                       className="task-detail-participant-avatar"
  //                     />
  //                     <span>Николай Б.</span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default TaskList;
