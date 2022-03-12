import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const intialState = {
    units: {
        units: { data: [], meta: {} },
        fetchingUnits: false,
        errorFetchingUnits: false,
        deletingUnit: false,
        deletingUnitSuccess: false,
        deletingUnitMessage: null,
        updatingUnit: false,
        updatingUnitSuccess: false,
        updatingUnitMessage: null,
        searchingUnits: false,
        searchingUnitsSuccess: false,
        addingUnit: false,
        addingUnitSuccess: false,
        addingUnitFailed: false,
        addingUnitMessage: null,
    },
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_UNITS_START):
            return updateObject(state, {
                units: {
                    ...state.units,
                    fetchingUnits: true,
                    errorFetchingUnits: false,
                },
            });
        case (actionTypes.FETCH_UNITS_SUCCESS):
            return updateObject(state, {
                units: {
                    ...state.units,
                    units: action.units,
                    fetchingUnits: false,
                }
            });
        case (actionTypes.FETCH_UNITS_FAILED):
            return updateObject(state, {
                units: {
                    ...state.units,
                    fetchingUnits: false,
                    errorFetchingUnits: true,
                }
            });
        case (actionTypes.SEARCH_UNITS_START):
            return updateObject(state, {
                units: {
                    ...state.units,
                    fetchingUnits: true,
                    errorFetchingUnits: false,
                    searchingUnits: true,
                    searchingUnitsSuccess: false,
                },
            });
        case (actionTypes.SEARCH_UNITS_SUCCESS):
            return updateObject(state, {
                units: {
                    ...state.units,
                    units: action.units,
                    fetchingUnits: false,
                    searchingUnits: false,
                    searchingUnitsSuccess: true,
                }
            });
        case (actionTypes.SEARCH_UNITS_FAILED):
            return updateObject(state, {
                units: {
                    ...state.units,
                    fetchingUnits: false,
                    errorFetchingUnits: true,
                    searchingUnits: false,
                    searchingUnitsSuccess: false,
                }
            });
        case (actionTypes.DELETE_UNIT_START):
            return updateObject(state, {
                units: {
                    ...state.units,
                    deletingUnit: true,
                    deletingUnitSuccess: false,
                    deletingUnitMessage: null,
                }
            });
        case (actionTypes.DELETE_UNIT_SUCCESS):
            const updatedUnits = state.units.units.data.filter(unit => unit.id !== action.unitId);
            return updateObject(state, {
                units: {
                    ...state.units,
                    units: {
                        ...state.units.units,
                        data: updatedUnits,
                        meta: {
                            ...state.units.units.meta,
                            total: state.units.units.meta.total - 1,
                        }
                    },
                    deletingUnit: false,
                    deletingUnitSuccess: true,
                    deletingUnitMessage: action.message,
                }
            });
        case (actionTypes.ADD_UNIT_START):
            return updateObject(state, {
                units: {
                    ...state.units,
                    addingUnit: true,
                    addingUnitSuccess: false,
                    addingUnitFailed: false,
                    addingUnitMessage: null,
                }
            });
        case (actionTypes.ADD_UNIT_SUCCESS):
            const updatedUnitsData = [...state.units.units.data];
            updatedUnitsData.push(action.unitData);
            return updateObject(state, {
                units: {
                    ...state.units,
                    addingUnit: false,
                    addingUnitSuccess: true,
                },
            });
        case (actionTypes.RESET_ADD_UNIT_SUCCESS):
            return updateObject(state, {
                units: {
                    ...state.units,
                    addingUnitSuccess: false,
                }
            });
        case (actionTypes.ADD_UNIT_FAILED):
            return updateObject(state, {
                units: {
                    ...state.units,
                    addingUnit: false,
                    addingUnitFailed: true,
                    addingUnitMessage: action.message,
                }
            });
        case (actionTypes.UPDATE_UNIT_START):
            return updateObject(state, {
                units: {
                    ...state.units,
                    updatingUnit: true,
                    updatingUnitSuccess: false,
                    updatingUnitMessage: null,
                }
            });
        case (actionTypes.UPDATE_UNIT_SUCCESS):
            const updatedUnitsInfos = [...state.units.units.data];
            const updatedUnitIndex = updatedUnitsInfos.findIndex(unit => unit.id === action.unitData.id);
            updatedUnitsInfos[updatedUnitIndex] = action.unitData;
            return updateObject(state, {
                units: {
                    ...state.units,
                    units: {
                        ...state.units.units,
                        data: updatedUnitsInfos,
                    },
                    updatingUnit: false,
                    updatingUnitSuccess: true,
                    updatingUnitMessage: action.message,
                }
            });
        case (actionTypes.RESET_UPDATE_UNIT_SUCCESS):
            return updateObject(state, {
                units: {
                    ...state.units,
                    updatingUnitSuccess: false,
                    updatingUnitMessage: null,
                }
            });
        case (actionTypes.UPDATE_UNIT_FAILED):
            return updateObject(state, {
                units: {
                    ...state.units,
                    updatingUnit: false,
                    updatingUnitSuccess: false,
                    updatingUnitMessage: action.message,
                }
            });
        default:
            return state;
    }
}

export default reducer;