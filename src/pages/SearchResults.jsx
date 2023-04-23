import React, { useState } from 'react';
import { useEffect } from 'react';
import { requests } from '../helper/requests';
import axios from '../helper/axios';
import Card from '../components/Card';
import { selectSearchText } from '../features/common/commonSlice';
import { useSelector } from 'react-redux';

function SearchResults(props) {
    const [videoList, setVideoList] = useState([]);
    const searchText = useSelector(selectSearchText);
    useEffect(()=>{
        const getSearchResults = async()=>{
            const response =await axios.get(requests.searchVideo(searchText));
            setVideoList(response.data.results);
        }
        getSearchResults();
    }, [searchText])

    return (
        <div className='container-fluid'>
            <div className="row">
                {
                    videoList.map((item)=>{
                        return (
                            <div className='col-lg-3'>
                                <Card key={item.id} video={item} type="movie"/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SearchResults;