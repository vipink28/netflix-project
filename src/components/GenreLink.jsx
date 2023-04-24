import React from 'react';
import { Link } from 'react-router-dom';

function GenreLink(props) {
    const {genre, type, isBadge, isLast} = props;
    return (
        <Link to={`/browsebygenre/${type}/${genre.name}/${genre.id}`} className={`fs-6  fw-normal text-decoration-none text-white ${isBadge && 'badge text-bg-danger p-2 me-2'}`}>{genre.name}{!isLast && ', '}</Link>
    );
}

export default GenreLink;