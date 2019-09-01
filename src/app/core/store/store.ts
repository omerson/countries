import { Country } from '../../modules/countries/models/country/country.model';
import { REPORT_FAULT, PREPARE_COUNTRIES, SEARCH_COUNTRIES, SORT_COUNTRIES } from '../actions/actions';

export interface IAppState {
    countries: Country[];
    countriesSortDesc: boolean,
    countriesSortProperty: string
};

export const INITIAL_STATE: IAppState = {
    countries: [],
    countriesSortDesc: true,
    countriesSortProperty: ''
};

export let rootReducer = (state: IAppState, action): IAppState => {
    switch(action.type) {
        case REPORT_FAULT:
            return {
                ...state,
                countries: [action.payload.bookmark, ...state.countries]
            }
        case PREPARE_COUNTRIES:
            return {
                ...state,
                countries: action.payload.countries
            }
        case SEARCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload.countries
                    .filter((c: Country) => c.name.includes(action.payload.searchParam))
            }
        case SORT_COUNTRIES:
            let sortDesc = false;
            if (action.payload.propertyToSort !== state.countriesSortProperty) {
                sortDesc = true;
            } else {
                sortDesc = state.countriesSortDesc
            }
            return {
                ...state,
                countriesSortDesc: !sortDesc,
                countriesSortProperty: action.payload.propertyToSort,
                countries: action.payload.countries
                    .sort((a, b) => {
                        if (!sortDesc) {
                            return -1;
                        }
                        if (typeof a[action.payload.propertyToSort] === 'string') {
                            return a[action.payload.propertyToSort].localeCompare(b[action.payload.propertyToSort]);
                        } else {
                            if (a[action.payload.propertyToSort] > b[action.payload.propertyToSort]) {
                                return -1;
                            }
                            if (a[action.payload.propertyToSort] < b[action.payload.propertyToSort]) {
                                return 1;
                            }
                            return 0;
                        }
                    })
            }
    }
    return state;
};