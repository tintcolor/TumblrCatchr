const initialState = {
    redditTitles: [],
    submittedElements:[],
    albumPhotos:[]
}

export default function Reddit(state = initialState, action) {
    switch (action.type) {
       
        case 'SET_REDDIT_TITLES':
        
            return {
                ...state,
                redditTitles: action.redditTitles
            }

        case 'SET_SUBMITTED_ELEMENTS':

            return {
                ...state,
                submittedElements: action.submittedElements
            }

        case 'SET_ALBUM_PHOTOS':

            return {
                ...state,
                albumPhotos: action.albumPhotos
            }
        

        default:
            return state
    }
}