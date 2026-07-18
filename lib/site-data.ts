export const membershipPlans = [
  {
    id: 'visita',
    title: 'Visita',
    price: 140,
    period: '/día',
    popular: false,
    description: 'Entrena un día completo y conoce la experiencia Crow.',
    features: ['Acceso por un día', 'Área de cardio y peso libre', 'Vestidores', 'Asesoría básica en piso'],
  },
  {
    id: 'mensual',
    title: 'Mensualidad Crow',
    price: 1200,
    period: '/mes',
    popular: true,
    description: 'Entrenamiento híbrido con rutina diaria y atención del instructor incluidas.',
    features: ['Acceso ilimitado', 'Rutina diaria incluida', 'Entrenamiento funcional, fuerza y cardio', 'Atención del instructor en turno', 'Libertad para seguir tu propia rutina'],
  },
  {
    id: 'trimestral',
    title: 'Plan 3 meses',
    price: 3000,
    period: '/3 meses',
    popular: false,
    description: 'Comprométete con tu objetivo y obtén una tarifa preferencial.',
    features: ['Todo lo incluido en mensualidad', 'Ahorro frente al pago mensual', 'Seguimiento de progreso', 'Acceso a retos Crow'],
  },
] as const;

/** Inscripción única al activar plan (excepto visita). */
export const enrollmentFee = 250;

/** Otros servicios y periodos cortos pagables en línea. */
export const otherRates = [
  { id: 'semana', label: 'Semana', price: 450 },
  { id: 'quincenal', label: 'Quincenal', price: 800 },
  { id: 'tarjeta-visitas', label: 'Tarjeta de visitas', price: 1700 },
  { id: 'inscripcion', label: 'Inscripción', price: 250 },
] as const;

export const classes = [
  { name: 'Crow Cross-Training', type: 'Fuerza + cardio', coach: 'Coach Valeria', day: 'Lunes', time: '07:00', duration: '60 min' },
  { name: 'Powerlifting Base', type: 'Fuerza', coach: 'Coach Brandon', day: 'Lunes', time: '08:30', duration: '75 min' },
  { name: 'HIIT & Abs', type: 'Alta intensidad', coach: 'Coach Sofía', day: 'Lunes', time: '18:00', duration: '45 min' },
  { name: 'Glúteo & Pierna', type: 'Hipertrofia', coach: 'Coach Valeria', day: 'Martes', time: '19:15', duration: '60 min' },
  { name: 'Boxeo', type: 'Acondicionamiento', coach: 'Coach Arturo', day: 'Martes', time: '07:00', duration: '60 min' },
  { name: 'Funcional Crow', type: 'Resistencia', coach: 'Coach Sofía', day: 'Miércoles', time: '09:00', duration: '60 min' },
  { name: 'Yoga Recovery', type: 'Movilidad', coach: 'Coach Elena', day: 'Miércoles', time: '19:00', duration: '60 min' },
  { name: 'Calistenia', type: 'Control corporal', coach: 'Coach Brandon', day: 'Sábado', time: '08:00', duration: '60 min' },
] as const;

export const reviews = [
  {
    name: 'Marel Morales',
    initials: 'MM',
    text: 'Excelente instalaciones, instructores siempre apoyando, atención, grandiosa comunidad. Los mejores.',
  },
  {
    name: 'Cesar Meza',
    initials: 'CM',
    text: 'Muy completo en equipamiento y también en sus rutinas. La combinación del funcional y pesas dan bastante opción de adaptabilidad para cualquier persona. Los coaches bien capacitados y el ambiente se nota la familiaridad y confianza. En resultados se nota. Súper recomendado.',
  },
  {
    name: 'Karla Rivas',
    initials: 'KR',
    text: 'Excelente espacio para ejercitarte. Máquinas en excelente estado, los coach son muy profesionales, están al pendiente en cada momento para resolver dudas y tienen un horario muy extenso. 100% recomendado.',
  },
  {
    name: 'Jose Felix',
    initials: 'JF',
    text: 'Excelente lugar para entrenar. Tienes una rutina semipersonalizada ya establecida y entrenador que va guiando todo el tiempo. La atención es algo que destaca de este gym. Además la comunidad de este gym es top.',
  },
  {
    name: 'Divany Ontiveros',
    initials: 'DO',
    text: 'Mejor gym, mucho estacionamiento e instalaciones impecables.',
  },
  {
    name: 'Salvador Garcia Ortega',
    initials: 'SG',
    text: 'Te dan entrenamiento personalizado, asesoría nutricional, los aparatos son nuevos, tanto el área de pesas, cardio y funcional. 10/10. Todo el equipo de coaches súper capacitados.',
  },
  {
    name: 'Vanessa Segura',
    initials: 'VS',
    text: 'Sin duda la mejor opción en Mazatlán. Encontrarás un concepto a tu medida, horarios, instalaciones, entrenadores, rutinas y servicio personalizado que en ningún otro lugar tendrás.',
  },
  {
    name: 'Kim Osuna',
    initials: 'KO',
    text: 'Excelente gimnasio y entrenadores. Te ponen rutinas todos los días y aparte está bien ubicado. Recomiendo 10/10.',
  },
  {
    name: 'Ana Correa',
    initials: 'AC',
    text: 'El mejor gym de todo Mazatlán, excelentes instalaciones, los coaches son de lo mejor.',
  },
] as const;

