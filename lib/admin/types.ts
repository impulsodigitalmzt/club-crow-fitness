export type MemberStatus = 'activo' | 'por_vencer' | 'vencido' | 'pendiente';

export type Member = {
  id: string;
  name: string;
  email: string;
  plan: string;
  expiresAt: string;
  status: MemberStatus;
  registeredAt?: string;
};

export type TodayPackage = {
  id: string;
  member: string;
  sessions: number;
  expiresAt: string;
};

export type TodayClass = {
  id: string;
  time: string;
  name: string;
  enrolled: number;
  capacity: number;
};

export type Birthday = {
  id: string;
  name: string;
  birthDate: string;
};

export type AgendaClass = {
  id: string;
  day: number;
  time: string;
  name: string;
  enrolled: number;
  capacity: number;
};

export type AgendaDay = {
  label: string;
  reservations: number;
};

export type Product = {
  id: string;
  name: string;
  stock: number;
  price: number;
  public: boolean;
  modifiedBy: string;
  image: string;
  active: boolean;
};

export type Wod = {
  id: string;
  date: string;
  title: string;
  exercises: string;
  marks: number;
};

export type AdminDatabase = {
  version: number;
  members: Member[];
  pendingUsers: Member[];
  todayPackages: TodayPackage[];
  todayClasses: TodayClass[];
  upcomingBirthdays: Birthday[];
  agendaDays: AgendaDay[];
  agendaClasses: AgendaClass[];
  agendaWeekLabel: string;
  products: Product[];
  wods: Wod[];
  newThisMonth: number;
  reservationsToday: number;
};

export const adminUser = {
  name: 'Admin Crow',
  initials: 'AC',
  role: 'Administrador',
};

export function createSeedDatabase(): AdminDatabase {
  return {
    version: 1,
    newThisMonth: 12,
    reservationsToday: 34,
    agendaWeekLabel: 'Semana del lunes 6 de abril',
    pendingUsers: [
      {
        id: 'p1',
        name: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        plan: 'Mensual',
        expiresAt: '—',
        status: 'pendiente',
        registeredAt: '15/04/2026',
      },
      {
        id: 'p2',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@email.com',
        plan: 'Visita',
        expiresAt: '—',
        status: 'pendiente',
        registeredAt: '16/04/2026',
      },
      {
        id: 'p3',
        name: 'Diana López',
        email: 'diana.lopez@email.com',
        plan: 'Trimestral',
        expiresAt: '—',
        status: 'pendiente',
        registeredAt: '17/04/2026',
      },
    ],
    todayPackages: [
      { id: 'pk1', member: 'Luciana Gomez', sessions: 12, expiresAt: '30/04/2026' },
      { id: 'pk2', member: 'Martin Rodriguez', sessions: 8, expiresAt: '28/04/2026' },
      { id: 'pk3', member: 'Sofía Herrera', sessions: 16, expiresAt: '05/05/2026' },
      { id: 'pk4', member: 'Diego Vargas', sessions: 4, expiresAt: '22/04/2026' },
      { id: 'pk5', member: 'Valentina Cruz', sessions: 12, expiresAt: '02/05/2026' },
    ],
    todayClasses: [
      { id: 'c1', time: '06:00', name: 'Functional', enrolled: 15, capacity: 15 },
      { id: 'c2', time: '07:00', name: 'Fuerza', enrolled: 12, capacity: 15 },
      { id: 'c3', time: '08:30', name: 'Cardio', enrolled: 8, capacity: 12 },
      { id: 'c4', time: '18:00', name: 'Functional', enrolled: 14, capacity: 15 },
      { id: 'c5', time: '19:30', name: 'Open Box', enrolled: 6, capacity: 20 },
    ],
    upcomingBirthdays: [
      { id: 'b1', name: 'Luciana Gomez', birthDate: '18/04' },
      { id: 'b2', name: 'Pedro Sánchez', birthDate: '21/04' },
      { id: 'b3', name: 'María Fernanda', birthDate: '25/04' },
    ],
    members: [
      {
        id: 'm1',
        name: 'Luciana Gomez',
        email: 'luciana.gomez@email.com',
        plan: 'Pase Libre',
        expiresAt: '30/05/2026',
        status: 'activo',
      },
      {
        id: 'm2',
        name: 'Martin Rodriguez',
        email: 'martin.rodriguez@email.com',
        plan: '3x semana',
        expiresAt: '22/04/2026',
        status: 'por_vencer',
      },
      {
        id: 'm3',
        name: 'Sofía Herrera',
        email: 'sofia.herrera@email.com',
        plan: 'Pase Libre',
        expiresAt: '12/06/2026',
        status: 'activo',
      },
      {
        id: 'm4',
        name: 'Diego Vargas',
        email: 'diego.vargas@email.com',
        plan: '2x semana',
        expiresAt: '10/04/2026',
        status: 'vencido',
      },
      {
        id: 'm5',
        name: 'Valentina Cruz',
        email: 'valentina.cruz@email.com',
        plan: 'Pilates 2x',
        expiresAt: '08/05/2026',
        status: 'activo',
      },
      {
        id: 'm6',
        name: 'Andrés Morales',
        email: 'andres.morales@email.com',
        plan: '3x semana',
        expiresAt: '19/04/2026',
        status: 'por_vencer',
      },
      {
        id: 'm7',
        name: 'Camila Torres',
        email: 'camila.torres@email.com',
        plan: 'Pase Libre',
        expiresAt: '01/07/2026',
        status: 'activo',
      },
      {
        id: 'm8',
        name: 'Javier Peña',
        email: 'javier.pena@email.com',
        plan: '2x semana',
        expiresAt: '05/03/2026',
        status: 'vencido',
      },
    ],
    agendaDays: [
      { label: 'Lunes 6', reservations: 42 },
      { label: 'Martes 7', reservations: 38 },
      { label: 'Miércoles 8', reservations: 45 },
      { label: 'Jueves 9', reservations: 36 },
      { label: 'Viernes 10', reservations: 40 },
      { label: 'Sábado 11', reservations: 28 },
      { label: 'Domingo 12', reservations: 0 },
    ],
    agendaClasses: [
      { id: 'a1', day: 0, time: '07:00', name: 'Functional', enrolled: 15, capacity: 15 },
      { id: 'a2', day: 0, time: '18:00', name: 'Fuerza', enrolled: 12, capacity: 15 },
      { id: 'a3', day: 1, time: '07:00', name: 'Functional', enrolled: 14, capacity: 15 },
      { id: 'a4', day: 1, time: '09:00', name: 'Cardio', enrolled: 10, capacity: 12 },
      { id: 'a5', day: 2, time: '07:00', name: 'Functional', enrolled: 15, capacity: 15 },
      { id: 'a6', day: 2, time: '19:00', name: 'Open Box', enrolled: 8, capacity: 20 },
      { id: 'a7', day: 3, time: '07:00', name: 'Fuerza', enrolled: 13, capacity: 15 },
      { id: 'a8', day: 3, time: '18:00', name: 'Functional', enrolled: 11, capacity: 15 },
      { id: 'a9', day: 4, time: '07:00', name: 'Functional', enrolled: 15, capacity: 15 },
      { id: 'a10', day: 4, time: '09:00', name: 'Cardio', enrolled: 9, capacity: 12 },
      { id: 'a11', day: 5, time: '09:00', name: 'Open Box', enrolled: 12, capacity: 15 },
    ],
    products: [
      {
        id: 'pr1',
        name: 'Remera Crow Fitness',
        stock: 24,
        price: 399,
        public: true,
        modifiedBy: 'Admin Crow',
        image: '/logo_negro.png',
        active: true,
      },
      {
        id: 'pr2',
        name: 'Shaker 750ml',
        stock: 15,
        price: 249,
        public: true,
        modifiedBy: 'Admin Crow',
        image: '/logo_negro.png',
        active: true,
      },
      {
        id: 'pr3',
        name: 'Toalla Crow',
        stock: 30,
        price: 189,
        public: true,
        modifiedBy: 'Admin Crow',
        image: '/logo_negro.png',
        active: true,
      },
      {
        id: 'pr4',
        name: 'Gorra Crow',
        stock: 18,
        price: 279,
        public: false,
        modifiedBy: 'Admin Crow',
        image: '/logo_negro.png',
        active: true,
      },
      {
        id: 'pr5',
        name: 'Proteína Crow (1kg)',
        stock: 8,
        price: 899,
        public: true,
        modifiedBy: 'Admin Crow',
        image: '/logo_negro.png',
        active: true,
      },
      {
        id: 'pr6',
        name: 'Bandas elásticas (set)',
        stock: 0,
        price: 349,
        public: false,
        modifiedBy: 'Admin Crow',
        image: '/logo_negro.png',
        active: false,
      },
    ],
    wods: [
      {
        id: 'w1',
        date: '08/04',
        title: 'Día híbrido A',
        exercises: 'Funcional 20 min + fuerza empujes + cardio 10 min',
        marks: 14,
      },
      {
        id: 'w2',
        date: '07/04',
        title: 'Fuerza inferior',
        exercises: 'Sentadilla 5x5 · Peso muerto rumano · Core',
        marks: 22,
      },
      {
        id: 'w3',
        date: '06/04',
        title: 'Cardio + movilidad',
        exercises: 'Circuito de intervalos + estiramiento guiado',
        marks: 18,
      },
      {
        id: 'w4',
        date: '05/04',
        title: 'Día híbrido B',
        exercises: 'Remo · Empujes · Zancadas · Finalizador',
        marks: 31,
      },
      {
        id: 'w5',
        date: '03/04',
        title: 'Full body',
        exercises: 'Circuito de 4 estaciones · 4 rondas',
        marks: 16,
      },
    ],
  };
}
