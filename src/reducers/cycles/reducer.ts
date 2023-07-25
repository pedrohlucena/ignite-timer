import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  const { cycles, activeCycleId } = state
  const { type, payload } = action

  switch (type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(payload.newCycle)
        draft.activeCycleId = payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      document.title = 'Ignite Timer'

      const currentCycleIndex = cycles.findIndex(
        (cycle) => cycle.id === activeCycleId,
      )

      const currentCycleDoesNotExists = currentCycleIndex < 0

      if (currentCycleDoesNotExists) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      document.title = 'Ignite Timer'

      const currentCycleIndex = cycles.findIndex(
        (cycle) => cycle.id === activeCycleId,
      )

      const currentCycleDoesNotExists = currentCycleIndex < 0

      if (currentCycleDoesNotExists) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }

    default:
      return state
  }
}
