import { useState } from "react"

export default function Home () {
    const [tarefas, setTarefas] = useState([])
    const [novaTarefa, setNovaTarefa] = useState("")
    const [filtro, setFiltro] = useState("")
    const tarefasFiltradas = filtro?tarefas.filter((tarefa) => tarefa.toLowerCase().includes(filtro.toLowerCase())):[]

    function adicionarTarefa () {
        if (novaTarefa.trim() === "") return;
        setTarefas([...tarefas, novaTarefa])
        setNovaTarefa("")
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <div>
                <input
                type="text"
                placeholder="Nova Tarefa"
                value={novaTarefa}
                onChange={(event) => setNovaTarefa (event.target.value)}
                />
                <button onClick={adicionarTarefa}>Adicionar</button>
            </div>
            <ul>
                {
                    tarefas.map((tarefa, index) => (
                        <li key={index}>
                            {tarefa}
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
                        ):(<p>Nenhuma Tarefa Encontrada</p>)}
                    </ul>
                )
            }
        </div>
    )
}