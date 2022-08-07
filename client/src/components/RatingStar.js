import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Input, Box } from '@mui/material';

const classes = {
    root: {
        padding: '2rem',
    },
    title: {
        margin: '1rem 0',
    },
    radioGroup: {
        display: 'flex',
    },
    star: {
        cursor: 'pointer',
        transition: 'color 200ms',
        padding: '0 5px',
    },
    input: {
        display: 'none',
        margin: "0 2rem"
    },
};

const RatingStar = ({ setRating, setHover, rating, hover }) => {

    return (
        <Box >
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label >
                        <Input
                            sx={{ ...classes.input }}
                            type='radio'
                            name='rating'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                        <FaStar
                            sx={{ ...classes.star }}
                            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            size={25}
                        />
                    </label>
                );
            })}
        </Box>
    );
};

export default RatingStar;
