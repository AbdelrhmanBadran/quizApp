/// <reference types="../@types/jquery" />

import { Quiz } from "./quiz.module.js";


export class Setting{
  constructor(){
    document.getElementById('start').addEventListener('click' , this.collectData.bind(this))
  }

  async collectData(){
    // *=======Data From User About Questions ======

    const category = document.getElementById('category').value;
    const difficulty = document.querySelector('input:checked').value
    const noOfQuestion = document.getElementById('amount').value

    // *=======Check  noOfQuestion != Zero ======

    if (noOfQuestion > 0) {

      $('#alertNumber').slideUp(200)      //* ===Hide Number Alert===
      $('.svg-wrapper').addClass('d-none') //?==
      $('.lds-ring').removeClass('d-none') //?====>  //*===show Loader Spinner===
      $('#startWord').addClass('d-none')   //?==
      
      const results = await this.getQuestions(noOfQuestion , category , difficulty) //?===Fetch Data===
      $('#setting').removeClass('show')   //! ===Hide Setting Section===
      $('#quiz').addClass('show')        //* ===Show Quiz Section===
      $('.svg-wrapper').removeClass('d-none') //?==
      $('.lds-ring').addClass('d-none')       //?====> //*=== Hide Loader Spinner===
      $('#startWord').removeClass('d-none')   //?==
      const quiz = new Quiz(results)
    }else{
      $('#alertNumber').slideDown(200)   //! ===Show Number Alert===
    }
  }


  async getQuestions( amount , category , difficulty  ){
      const api = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)
      const res = await api.json()
      // console.log(res.results);
      return res.results
  } 

}