import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card, CardContent, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function Boxing(props) {

    const [fields, setFields] = useState([]);

    useEffect(() => {
        getFields();
    }, []);

    function getFields() {
        axios
            .get('http://127.0.0.1:8000/sport/8/')
            .then((response) => {
                setFields(response.data);
                // console.log(fields)
                // console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching fields:', error);
            });
    }

    return (
        <div className="cardContainer">
            <h1 className="sportHeader">{props.header}</h1>
            <div className="cardRow">
                {fields.length === 0 ? (
                    <h2>No fields available right now!</h2>
                ) : (
                    fields.map((field) => (
                        <Card key={field.fields.id} sx={{ margin: '10px', maxWidth: 300 }}>
                            <img
                                src={field.fields.image}
                                alt={field.fields.name}
                                style={{ width: '100%' }}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {field.fields.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Location: {field.fields.address}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: {field.fields.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rating: 4.5/5 {field.fields.grades}
                                    <StarIcon />
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default Boxing;
