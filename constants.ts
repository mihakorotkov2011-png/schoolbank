import { Student } from './types';

export const STUDENTS_DB: Student[] = [
  // 7 класс
  { id: '1', name: 'Большаков Артём', grade: '7' },
  { id: '2', name: 'Быков Андрей', grade: '7' },
  { id: '3', name: 'Гриневич Матвей', grade: '7' },
  { id: '4', name: 'Гурченко Артем', grade: '7' },
  { id: '5', name: 'Дмитренко Иван', grade: '7' },
  // 8 класс
  { id: '6', name: 'Базунов Артём', grade: '8' },
  { id: '7', name: 'Богатырева Мария', grade: '8' },
  { id: '8', name: 'Борисов Максим', grade: '8' },
  { id: '9', name: 'Веденеев Матвей', grade: '8' },
  { id: '10', name: 'Галченкова Арина', grade: '8' },
  // 9 класс
  { id: '11', name: 'Абрамян Арам', grade: '9' },
  { id: '12', name: 'Андреев Иван', grade: '9' },
  { id: '13', name: 'Бережная Полина', grade: '9' },
  { id: '14', name: 'Бутько Сергей', grade: '9' },
  { id: '15', name: 'Васильева София', grade: '9' },
  // 10 класс
  { id: '16', name: 'Анисина Дарья', grade: '10' },
  { id: '17', name: 'Анкудинов Иван', grade: '10' },
  { id: '18', name: 'Архипенкова Карина', grade: '10' },
  { id: '19', name: 'Бадареу Егор', grade: '10' },
  { id: '20', name: 'Гоков Алексей', grade: '10' },
  // 11 класс
  { id: '21', name: 'Абаза Прохор', grade: '11' },
  { id: '22', name: 'Бегларян Артём', grade: '11' },
  { id: '23', name: 'Барсуков Михаил', grade: '11' },
  { id: '24', name: 'Дугинец Ярослава', grade: '11' },
  { id: '25', name: 'Козловский Иван', grade: '11' }
];

export const MOCK_HISTORY = [
  { id: 'tx1', type: 'incoming', amount: 150000, counterparty: 'Полина Артюгина', date: '2025-09-15', description: 'ЗП кураторам' },
  { id: 'tx2', type: 'incoming', amount: 40000, counterparty: 'Скугоров Матвей', date: '2025-09-30', description: 'ЗП омбудсменам' },
  { id: 'tx3', type: 'outgoing', amount: 1800, counterparty: 'Скугоров Матвей', date: '2025-09-30', description: 'Кондуит (штраф)' },
  { id: 'tx4', type: 'incoming', amount: 50000, counterparty: 'Дима Витковский', date: '2025-09-30', description: 'ЗП банкирам' }
] as const;