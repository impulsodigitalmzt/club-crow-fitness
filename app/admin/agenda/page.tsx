'use client';

import { FormEvent, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui';
import { AdminModal, AdminToast, Field, inputClass } from '@/components/admin/modal';
import { useAdminDb } from '@/hooks/use-admin-db';
import { createAgendaClass, deleteAgendaClass } from '@/lib/admin/store';

const filters = ['Todos', 'Functional', 'Fuerza', 'Cardio', 'Open Box'] as const;

export default function AgendaPage() {
  const { db, busy, toast, run } = useAdminDb();
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todos');
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState('07:00');
  const [name, setName] = useState('Functional');
  const [capacity, setCapacity] = useState(15);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    await run(
      () =>
        createAgendaClass({
          day,
          time,
          name,
          capacity,
          enrolled: 0,
        }),
      'Clase agregada',
    );
    setOpen(false);
  }

  return (
    <div>
      <PageHeader
        title="Clases"
        subtitle="Horarios de la semana y cupos disponibles"
        action={
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--admin-brand)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[var(--admin-brand-dark)]"
          >
            <Plus className="size-3.5" /> Nueva clase
          </button>
        }
      />

      <div className="space-y-6 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-zinc-700">{db.agendaWeekLabel}</p>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  filter === item
                    ? 'bg-[var(--admin-brand)] text-white'
                    : 'border border-zinc-200 bg-white text-zinc-600 hover:border-[var(--admin-brand)]/40'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 overflow-x-auto pb-2 md:grid-cols-7">
          {db.agendaDays.map((agendaDay, dayIndex) => {
            const dayClasses = db.agendaClasses.filter((c) => {
              if (c.day !== dayIndex) return false;
              if (filter === 'Todos') return true;
              return c.name.toLowerCase().includes(filter.toLowerCase());
            });

            return (
              <div
                key={agendaDay.label}
                className="min-w-[140px] rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm"
              >
                <p className="text-sm font-bold text-zinc-800">{agendaDay.label}</p>
                <p className="mt-1 text-[11px] text-zinc-500">{agendaDay.reservations} reservas</p>

                <div className="mt-3 space-y-2">
                  {dayClasses.length === 0 ? (
                    <div className="rounded-xl bg-zinc-50 px-2 py-6 text-center text-[11px] text-zinc-400">
                      Sin clases
                    </div>
                  ) : (
                    dayClasses.map((cls) => (
                      <article
                        key={cls.id}
                        className="group relative rounded-xl border border-[var(--admin-brand)]/20 bg-[var(--admin-brand)]/5 px-2.5 py-2"
                      >
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => run(() => deleteAgendaClass(cls.id), 'Clase eliminada')}
                          className="absolute right-1 top-1 rounded p-1 text-rose-400 opacity-0 transition group-hover:opacity-100 hover:bg-white"
                          aria-label="Eliminar clase"
                        >
                          <Trash2 className="size-3" />
                        </button>
                        <p className="text-xs font-bold text-zinc-800">{cls.time}</p>
                        <p className="text-[11px] font-semibold text-zinc-600">{cls.name}</p>
                        <p className="mt-1 text-[10px] text-zinc-500">
                          {cls.enrolled}/{cls.capacity} lugares
                        </p>
                      </article>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AdminModal open={open} title="Nueva clase" onClose={() => setOpen(false)}>
        <form onSubmit={onCreate}>
          <Field label="Día">
            <select className={inputClass} value={day} onChange={(e) => setDay(Number(e.target.value))}>
              {db.agendaDays.map((d, i) => (
                <option key={d.label} value={i}>
                  {d.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Hora">
            <input className={inputClass} value={time} onChange={(e) => setTime(e.target.value)} required />
          </Field>
          <Field label="Tipo">
            <select className={inputClass} value={name} onChange={(e) => setName(e.target.value)}>
              <option>Functional</option>
              <option>Fuerza</option>
              <option>Cardio</option>
              <option>Open Box</option>
            </select>
          </Field>
          <Field label="Capacidad">
            <input
              type="number"
              min={1}
              className={inputClass}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              required
            />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="mt-2 w-full rounded-xl bg-[var(--admin-brand)] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[var(--admin-brand-dark)] disabled:opacity-60"
          >
            Guardar clase
          </button>
        </form>
      </AdminModal>

      <AdminToast message={toast} />
    </div>
  );
}
