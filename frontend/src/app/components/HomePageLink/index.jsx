import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import "./homepagelink.css"

const HomePageLink = (props) => {
  let cls = props.index % 2 == 0 ? "container even" : "container odd"
  return (
    <Card className="container" sx={{ borderRadius: '5%' }} component={Link} to={props.to}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.linkImage}
          alt={props.name}
          // className="cardMedia"
        />
        <CardContent className="cardContent">
          <Typography gutterBottom variant="h6" component="div" fontWeight= 'bold'>
            {props.name}
          </Typography>
          <Typography variant="body2">
          {props.info}
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HomePageLink;