"use client"
import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell
} from 'recharts';

export default function PersonasPage() {
    const [personas, setPersonas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [personaEditando, setPersonaEditando] = useState<any>(null);

    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [filtroCategoria, setFiltroCategoria] = useState('Todas');

    const [ultimoRegistrado, setUltimoRegistrado] = useState<any>(null);
    const [ultimoModificado, setUltimoModificado] = useState<any>(null);

    const cargarDatos = async () => {
        try {
            const url = `http://localhost:8080/api/personas/buscar?estado=${filtroEstado}&categoria=${filtroCategoria}`;
            const res = await fetch(url);

            if (res.ok) {
                const data = await res.json();
                setPersonas(data);

                if (data.length > 0) {
                    setUltimoRegistrado(data[data.length - 1]);
                }
            }
        } catch (err) {
            console.error("Error en la lógica del backend:", err);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, [filtroEstado, filtroCategoria]);

    useEffect(() => {
        cargarDatos();
    }, []);

    const personasFiltradas = personas.filter((p: any) => {
        const cumpleEstado = filtroEstado === 'Todos' || p.estado === filtroEstado;
        const cumpleCategoria = filtroCategoria === 'Todas' || p.categoria === filtroCategoria;
        return cumpleEstado && cumpleCategoria;
    });

    const handleEditar = (p: any) => {
        setPersonaEditando(p);
        setMostrarModal(true);
    };

    const handleEliminar = async (id: number) => {
        if (confirm("¿Estás seguro de eliminar este registro?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/personas/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    cargarDatos();
                    alert("Registro eliminado con éxito");
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const datos = Object.fromEntries(formData.entries());

        const id = personaEditando?.id || personaEditando?.id_persona;
        const url = personaEditando ? `http://localhost:8080/api/personas/${id}` : 'http://localhost:8080/api/personas';
        const metodo = personaEditando ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos),
            });

            if (res.ok) {
                if (personaEditando) {
                    const ahora = new Date();
                    setUltimoModificado({
                        ...datos,
                        fechaMod: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    });
                }
                setMostrarModal(false);
                setPersonaEditando(null);
                cargarDatos();
            } else {
                alert("Error al guardar. Revisa la consola de IntelliJ.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    const dataGraficoBarras = [
        {
            name: 'Activos',
            total: personas.filter((p: any) => p.estado?.toUpperCase() === 'ACTIVO').length
        },
        {
            name: 'Inactivos',
            total: personas.filter((p: any) => p.estado?.toUpperCase() === 'INACTIVO').length
        },
        {
            name: 'Retirados',
            total: personas.filter((p: any) => p.estado?.toUpperCase() === 'RETIRADO' || p.estado?.toUpperCase() === 'EGRESADO').length
        },
    ];

    const dataCategoria = [
        { name: 'Estudiante', value: personasFiltradas.filter((p: any) => p.categoria === 'Estudiante').length },
        { name: 'Docente', value: personasFiltradas.filter((p: any) => p.categoria === 'Docente').length },
        { name: 'Egresado', value: personasFiltradas.filter((p: any) => p.categoria === 'Egresado').length },
        { name: 'Admin', value: personasFiltradas.filter((p: any) => p.categoria === 'Administrativo').length },
    ];

    const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="space-y-6 pb-12">
            {/* Cabecera */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Panel de Gestión de Usuarios</h1>
                </div>
                <button
                    onClick={() => { setPersonaEditando(null); setMostrarModal(true); }}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Nuevo Registro
                </button>
            </div>

            {/* Contenedor de Tarjetas KPI*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                {/*Tarjeta Total de Registros */}
                <div className="bg-[#FFFDF5] border border-[#E3DCC3] p-5 rounded-[2rem] shadow-sm flex flex-col justify-between h-40 group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                        <h3 className="text-[#8C8673] text-[10px] font-black uppercase tracking-widest">Total Global</h3>
                        <div className="bg-[#F5F1E3] p-2.5 rounded-2xl text-[#8C8673]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-[#4A473E] tracking-tighter">{personas.length}</p>
                        <p className="text-[9px] font-bold text-[#A69F88] uppercase mt-1">Registros en MySQL</p>
                    </div>
                </div>

                {/*Tarjeta Activos */}
                <div className="bg-[#F7FFF9] border border-[#D1EAD8] p-5 rounded-[2rem] shadow-sm flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <h3 className="text-[#558B64] text-[10px] font-black uppercase tracking-widest">Activos</h3>
                        <div className="bg-[#E8F5EC] p-2.5 rounded-2xl text-[#558B64]">
                            <div className="h-3 w-3 rounded-full bg-[#558B64] animate-pulse"></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-[#2D4A35] tracking-tighter">
                            {personas.filter((p: any) => p.estado?.toUpperCase() === 'ACTIVO').length}
                        </p>
                        <p className="text-[9px] font-bold text-[#558B64]/60 uppercase mt-1">En curso actual</p>
                    </div>
                </div>

                {/*Tarjeta Inactivos */}
                <div className="bg-[#FFF9F9] border border-[#EAD1D1] p-5 rounded-[2rem] shadow-sm flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <h3 className="text-[#8B5555] text-[10px] font-black uppercase tracking-widest">Inactivos</h3>
                        <div className="bg-[#F5E8E8] p-2.5 rounded-2xl text-[#8B5555]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        </div>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-[#4A2D2D] tracking-tighter">
                            {personas.filter((p: any) => p.estado?.toUpperCase() === 'INACTIVO').length}
                        </p>
                        <p className="text-[9px] font-bold text-[#8B5555]/60 uppercase mt-1">Temporalmente fuera</p>
                    </div>
                </div>

                {/* Tarjeta Retirados*/}
                <div className="bg-[#F9FAFF] border border-[#D1D5EA] p-5 rounded-[2rem] shadow-sm flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <h3 className="text-[#55608B] text-[10px] font-black uppercase tracking-widest">Retirados</h3>
                        <div className="bg-[#E8EBF5] p-2.5 rounded-2xl text-[#55608B]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        </div>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-[#2D334A] tracking-tighter">
                            {personas.filter((p: any) =>
                                p.estado?.toUpperCase() === 'RETIRADO' ||
                                p.estado?.toUpperCase() === 'EGRESADO'
                            ).length}
                        </p>
                        <p className="text-[9px] font-bold text-[#55608B]/60 uppercase mt-1">Baja o Finalizado</p>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 border-l-8 border-l-indigo-600">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Última Persona Registrada</p>
                    <h3 className="text-2xl font-black text-gray-800 truncate">
                        {ultimoRegistrado ? `${ultimoRegistrado.nombre} ${ultimoRegistrado.apellidos}` : "Sin datos"}
                    </h3>
                    <div className="flex gap-4 text-xs font-bold text-gray-400 mt-2 uppercase">
                        <span>DNI: {ultimoRegistrado?.dni || "---"}</span>
                        <span>•</span>
                        <span>{ultimoRegistrado?.categoria || "---"}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 border-l-8 border-l-orange-500">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Última Modificación</p>
                    <h3 className="text-2xl font-black text-gray-800 truncate">
                        {ultimoModificado ? `${ultimoModificado.nombre} ${ultimoModificado.apellidos}` : "Ninguna edición"}
                    </h3>
                    <div className="flex gap-4 text-xs font-bold text-gray-400 mt-2 uppercase">
                        <span className="text-orange-600">Hora: {ultimoModificado?.fechaMod || "---"}</span>
                        <span>•</span>
                        <span>DNI: {ultimoModificado?.dni || "---"}</span>
                    </div>
                </div>
            </div>

            {/* Panel de Filtros*/}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Estado</label>
                        <select
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                            className="w-full p-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-gray-700 font-bold text-sm"
                        >
                            <option value="Todos">Todos los estados</option>
                            <option value="Activo">Activos</option>
                            <option value="Inactivo">Inactivos</option>
                        </select>
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Categoría</label>
                        <select
                            value={filtroCategoria}
                            onChange={(e) => setFiltroCategoria(e.target.value)}
                            className="w-full p-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-gray-700 font-bold text-sm"
                        >
                            <option value="Todas">Todas las categorías</option>
                            <option value="Estudiante">Estudiantes</option>
                            <option value="Docente">Docentes</option>
                            <option value="Egresado">Egresados</option>
                            <option value="Administrativo">Administrativos</option>
                        </select>
                    </div>
                    <button
                        onClick={() => { setFiltroEstado('Todos'); setFiltroCategoria('Todas'); }}
                        className="px-8 py-3.5 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all text-sm w-full md:w-auto"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            {/* Gráficos*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[300px]">
                    <h3 className="font-bold text-gray-400 mb-4 text-[10px] uppercase tracking-widest text-center">Resumen de Estados</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dataGraficoBarras}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: '#f8fafc'}} />
                            <Bar dataKey="total" fill="#4f46e5" radius={[8, 8, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[300px]">
                    <h3 className="font-bold text-gray-400 mb-4 text-[10px] uppercase tracking-widest text-center">Personal por Categoría</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={dataCategoria.filter(d => d.value > 0)} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={8}>
                                {dataCategoria.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Tabla*/}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-[10px] uppercase font-black text-gray-400 tracking-widest">
                    <tr>
                        <th className="p-5 text-center w-16">ID</th>
                        <th className="p-5">DNI</th>
                        <th className="p-5">Nombre</th>
                        <th className="p-5">Apellidos</th>
                        <th className="p-5">Categoría</th>
                        <th className="p-5 text-center">Estado</th>
                        <th className="p-5 text-center">Editar o Eliminar</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                    {personasFiltradas.length > 0 ? (
                        personasFiltradas.map((p: any) => (
                            <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors">
                                <td className="p-5 text-xs font-bold text-indigo-400 text-center bg-indigo-50/10">
                                    {p.id}
                                </td>
                                <td className="p-5 text-sm font-mono text-gray-400">{p.dni}</td>
                                <td className="p-5 text-sm font-bold text-gray-800">{p.nombre}</td>
                                <td className="p-5 text-sm font-bold text-gray-800">{p.apellidos || "---"}</td>
                                <td className="p-5">
                            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                {p.categoria}
                            </span>
                                </td>

                                <td className="p-5">
                                    <div className="flex justify-center items-center">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter w-24 text-center ${
                                    p.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {p.estado}
                                </span>
                                    </div>
                                </td>

                                <td className="p-5">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEditar(p)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                            ✏️
                                        </button>
                                        <button onClick={() => handleEliminar(p.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="p-16 text-center text-gray-400 text-sm font-bold italic tracking-widest">
                                No se encontraron registros.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {mostrarModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-black mb-6 text-gray-800">{personaEditando ? '✏️ Editar Datos' : '🚀 Nuevo Usuario'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input name="dni" defaultValue={personaEditando?.dni} placeholder="DNI del usuario" className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all" required />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="nombre" defaultValue={personaEditando?.nombre} placeholder="Nombres" className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none" required />
                                <input name="apellidos" defaultValue={personaEditando?.apellidos} placeholder="Apellidos" className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <select name="estado" defaultValue={personaEditando?.estado || 'Activo'} className="p-4 border-2 border-gray-100 rounded-2xl outline-none bg-white font-bold text-sm text-gray-600">
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="RETIRADO">Retirado</option>
                                </select>
                                <select name="categoria" defaultValue={personaEditando?.categoria || 'Estudiante'} className="p-4 border-2 border-gray-100 rounded-2xl outline-none bg-white font-bold text-sm text-gray-600">
                                    <option value="Estudiante">Estudiante</option>
                                    <option value="Docente">Docente</option>
                                    <option value="Egresado">Egresado</option>
                                    <option value="Administrativo">Administrativo</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4 pt-6">
                                <button type="button" onClick={() => setMostrarModal(false)} className="px-6 py-3 text-gray-400 font-bold hover:text-gray-600">Cancelar</button>
                                <button type="submit" className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black shadow-xl shadow-indigo-200 active:scale-95 transition-all">
                                    {personaEditando ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}