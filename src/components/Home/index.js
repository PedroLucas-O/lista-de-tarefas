import { useEffect, useState } from "react"
import "./lista-de-tarefas.css"
import { FaTrash } from "react-icons/fa"

export default function Home () {
    const [tarefas, setTarefas] = useState([])
    const [novaTarefa, setNovaTarefa] = useState("")
    const [filtro, setFiltro] = useState("")
    
    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [] 
        if (Array.isArray(tarefasSalvas)) {
            setTarefas(tarefasSalvas)
        }        
    }, [])

    useEffect(() => {
        if (tarefas.length>0) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
        }
    }, [tarefas])

    const tarefasFiltradas = filtro?tarefas.filter((tarefa) => tarefa.toLowerCase().includes(filtro.toLowerCase())):[]

    function adicionarTarefa () {
        if (novaTarefa.trim() === "") return;
        setTarefas([...tarefas, novaTarefa])
        setNovaTarefa("")
    }

    function removerTarefa (index) {
        const novasTarefas = tarefas.filter((_, i) => i !== index)
        setTarefas(novasTarefas)
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
    }

    return (
        <div className="container">
            <h1>Lista de Tarefas</h1>
            <div className="input-group">
                <input
                type="text"
                placeholder="Nova Tarefa"
                value={novaTarefa}
                onChange={(event) => setNovaTarefa (event.target.value)}
                />
                <button className="add-button" onClick={adicionarTarefa}>Adicionar</button>
            </div>
            <ul className="task-list">
                {
                    tarefas.map((tarefa, index) => (
                        <li key={index}>
                            {tarefa}
                            <button className="remove-button" onClick={() => removerTarefa(index)}>
                            <FaTrash/>
                            </button>
                        </li>
                    ))
                }
            </ul>
            <div>
                <input
                type="text"
                value={filtro}
                placeholder="Buscar Tarefa"
                onChange={(event) => setFiltro (event.target.value)}
                />
            </div>
            {
                filtro && (
                    <ul>
                        {tarefasFiltradas.length>0?(
                            tarefasFiltradas.map((tarefa, index) => (
                                <li>{tarefa}</li>
                            ))
                        ):(<p className="empty-message" >Nenhuma Tarefa Encontrada</p>)}
                    </ul>
                )
            }
        </div>
    )
}