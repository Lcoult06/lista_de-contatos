import { useSelector } from 'react-redux'

import Lista from '../../components/Lista'
import { MainContainer, Titulo } from '../../styles'

import { RootReducer } from '../../store'

const ListaContatos = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltradas = itens
    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.nome.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }
      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? ` e "${termo}"` : ''
    if (criterio === 'todas') {
      mensagem = `${quantidade} contato(s) encontrada(s) como: todas ${complementacao}`
    } else {
      mensagem = `${quantidade} contato(s) encontrada(s) como: "${`${criterio}=${valor}`}" ${complementacao}`
    }

    return mensagem
  }

  const tarefas = filtraTarefas()
  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {tarefas.map((t) => (
          <li key={t.nome}>
            <Lista
              id={t.id}
              telefone={t.telefone}
              email={t.email}
              nome={t.nome}
              status={t.status}
              prioridade={t.prioridade}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaContatos
