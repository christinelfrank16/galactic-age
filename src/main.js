import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Galaxy} from './galaxy.js';
import solarSystemImg from './images/solarsystem';

$(document).ready(function(){
  let ssImg = $("#solarSystem");
  ssImg.attr("src", solarSystemImg);
  let galaxy = new Galaxy();
});
