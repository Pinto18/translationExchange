const INITIAL_STATE = {
  chapters: [],
  loading: false,
  updatePage: false,
  uploadingComment: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'FETCHING_CHAPTERS':
      return {
        ...state,
        loading: true,
      };

    case 'GET_CHAPTERS_SUCCESS':
      return {
        ...state,
        chapters: action.chapters,
        loading: false,
      };


    default: return state;
  }
};
