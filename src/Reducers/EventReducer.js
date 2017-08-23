import { EVENT_CREATED, FORM_VALUE_CHANGED } from '../Actions/Types';

const EventInitialState = {
    Titulo: "",
    Descricao: "",
    Local: null,
    Tags: [],
    Data: ""
}
export default Event = (state = EventInitialState, action) => {
    console.log(state);
    switch (action.type) {
        case FORM_VALUE_CHANGED:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }

        case EVENT_CREATED:
            return {
                ...state,
                Titulo: action.payload.Titulo,
                Descricao: action.payload.Descricao,
                Local: action.payload.Local,
                Tags: action.payload.Tags,
                Data: action.payload.Data
            }
        default:
            return state
    }
}