const API_KEY = '0d8ab7cff2692bd014bb25fca16d7158';

export const requests = {
    netflixOriginals: `discover/tv?api_key=${API_KEY}&with_networks=213`,
    getPopular: (type)=>{return `/${type}/popular?api_key=${API_KEY}&language=en-US&page=1`},    
    getTopRated: (type)=>{return `/${type}/top_rated?api_key=${API_KEY}&language=en-US&page=1`},
    getDetails: (req)=>{return `/${req.type}/${req.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`},
    discoverByRating: (type)=>{return `/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_networks=213`},
    getSimilar: (id, type)=>{return `/${type}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`},
    getRecommended: (id, type)=>{return `/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`},
    getCredits: (id, type)=>{return `/${type}/${id}/credits?api_key=${API_KEY}&language=en-US&page=1`},
    getByGenre: (id, type)=>{return `/discover/${type}?api_key=${API_KEY}&language=en-US&page=1&with_genres=${id}&adult=false`},
    getGenre: (type)=>{return `/genre/${type}/list?api_key=${API_KEY}`},    
    searchVideo: (query)=>{return `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`},
    getSesaonDetails: (tvId, seasonNumber)=>{return `/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`}
}


export const key= {
    tv: "tv",
    movie: "movie"
}