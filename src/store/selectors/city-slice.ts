import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getSelectedCity = (state: Pick<State, NameSpace.City>): string => state[NameSpace.City].selectedCity; // (state: State): string => state[NameSpace.City].selectedCity;
