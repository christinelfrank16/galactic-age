import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/tooltip';
import './styles.css';
import {Galaxy} from './galaxy.js';
import solarSystemImg from './images/solarsystem';
import planetImg from './images/planet';

$(document).ready(function(){
  let ssImg = $("#solarSystem");
  ssImg.attr("src", solarSystemImg);
  let galaxy = new Galaxy();
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
});
