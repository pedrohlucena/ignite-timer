import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import * as S from './styles'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import _ from 'lodash'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => {
              const {
                id,
                task,
                minutesAmount,
                startDate,
                finishedDate,
                interruptedDate,
              } = cycle

              return (
                <tr key={id}>
                  <td>{task}</td>
                  <td>{minutesAmount} minutos</td>
                  <td>
                    {_.capitalize(
                      formatDistanceToNow(startDate, {
                        addSuffix: true,
                        locale: ptBR,
                      }),
                    )}
                  </td>
                  <td>
                    {finishedDate && (
                      <S.Status statusColor="green">Concluído</S.Status>
                    )}

                    {interruptedDate && (
                      <S.Status statusColor="red">Interrompido</S.Status>
                    )}

                    {!finishedDate && !interruptedDate && (
                      <S.Status statusColor="yellow">Em andamento</S.Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
