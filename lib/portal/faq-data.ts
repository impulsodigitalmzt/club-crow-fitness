import type { HelpContent } from '@/lib/help/types';

/**
 * Centro de conocimiento — Portal del Socio.
 * Agrega pasos o FAQs aquí; el drawer los muestra automáticamente.
 */
export const portalHelpContent: HelpContent = {
  title: 'Ayuda Crow App',
  subtitle: 'Todo lo que necesitas para entrenar y pagar sin fricción.',
  stepsHeading: 'Primeros pasos',
  steps: [
    {
      id: 'revisar-cuenta',
      title: '1. Revisa tu cuenta',
      description:
        'En Inicio o Cuenta verás si tu membresía está Activa o Vencida, y hasta cuándo vence tu Pase Libre.',
    },
    {
      id: 'clase-del-dia',
      title: '2. Mira la clase del día',
      description:
        'En Inicio o Clases encuentras horario, coach y el WOD. Llega listo; si está reservada, ya tienes tu lugar.',
    },
    {
      id: 'unirte-reto',
      title: '3. Únete a un reto',
      description:
        'En Retos elige el que te motive, toca “Aceptar y Pagar” y confirma el monto. Queda activo al instante en el demo.',
    },
  ],
  faqHeading: 'Preguntas frecuentes',
  faqs: [
    {
      id: 'pagar-membresia',
      question: '¿Cómo pago o renuevo mi membresía?',
      answer:
        'Toca “Pagar ahora” en Estado de cuenta. Te lleva a Pagar con el monto de renovación. Confirma y tu pase queda Activo.',
    },
    {
      id: 'vencido',
      question: '¿Qué pasa si mi pase está Vencido?',
      answer:
        'Puedes ver la app, pero debes renovar para seguir entrenando con acceso completo. Usa “Pagar ahora” o acércate a recepción en el gym.',
    },
    {
      id: 'aceptar-reto',
      question: '¿Cómo acepto y pago un reto?',
      answer:
        'Abre Retos, elige uno y toca “Aceptar y Pagar”. Se abre la pantalla de pago con el precio del reto. Al confirmar, aparece como Inscrito.',
    },
    {
      id: 'wod',
      question: '¿Dónde veo el WOD del día?',
      answer:
        'En Inicio, dentro de “Clase del día”, o en la pestaña Clases. Ahí está el formato (AMRAP, etc.) y los bloques de la rutina.',
    },
    {
      id: 'acceso',
      question: '¿Cómo entro al Portal?',
      answer:
        'Desde el sitio web en “Acceso a socios”, o directo en /app/login. Demo: socio@crowfitness.mx / crowsocio.',
    },
  ],
  footerNote: '¿Dudas del gym? Escríbenos por WhatsApp desde el sitio o pásate por recepción.',
};
