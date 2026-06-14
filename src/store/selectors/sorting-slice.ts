import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getSelectedSorting = (state: Pick<State, NameSpace.Sorting>): string => state[NameSpace.Sorting].selectedSorting;
