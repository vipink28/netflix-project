import React from 'react';
import { Link } from 'react-router-dom';

function GenreLink(props) {
    const {genre, type} = props;
    return (
        <Link to={`/browsebygenre/${type}/${genre.name}/${genre.id}`} className="badge text-bg-danger fs-6 p-2 me-2 fw-normal text-decoration-none">
                {genre.name}
        </Link>
    );
}

export default GenreLink;