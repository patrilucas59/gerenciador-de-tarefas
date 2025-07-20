import React from "react";
import { useNavigate } from "react-router-dom";

export default function TaskNotFound() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Tarefa não encontrada</h1>
      <p className="mb-6">A tarefa que você tentou acessar não existe ou foi removida.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-slate-500 px-4 py-4 hover:bg-gray-700 rounded-lg"
      >
        Voltar para tela principal
      </button>
    </div>
  )
}