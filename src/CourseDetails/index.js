import React from 'react';
import Container from '@material-ui/core/Container';

export default ({courseData, courseText, editing}) => {
    const image = courseData && courseData.headerImage && courseData.headerImage !== ''
        ? (<img src={courseData.headerImage} loading="lazy" alt="Course Header"/>)
        : "";

    return (
        <Container maxWidth="md">
            {image}
            <h1>{courseData.name}</h1>
            <div>Holes: {courseData.holeCount}</div>
            <div>Distance: {courseData.distance}</div>
        </Container>
    )
}