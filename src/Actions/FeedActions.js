import firebase, { database } from 'firebase';
import geolib from 'geolib';
import { FEED_EVENTS_FETCH_SUCCESS, REFRESHING_FEED } from './Types';


export const eventsFetch = (order) => dispatch => {
  dispatch({ type: REFRESHING_FEED });
  firebase
    .database()
    .ref('/eventos')
    .once('value', data => {
      var vetor = data.val();
      eliminarPassado(vetor);
      sortVetorData(vetor);
      if(order == 1){
        sortVetorTitulo(vetor);
      }
      else if(order == 2){
        sortVetorData(vetor);
      }
      else if(order == 3){
        let options = {
          enableHighAccuracy: true,
          timeout: 500000,
          maximumAge: 0
        };
      
        navigator.geolocation.getCurrentPosition(
          pos => {
            let crd = pos.coords;
            sortVetorProx(vetor, crd.latitude, crd.longitude);
            const temp = vetor;
            vetor = [];
            dispatch({ type: FEED_EVENTS_FETCH_SUCCESS, payload: vetor });
            dispatch({ type: FEED_EVENTS_FETCH_SUCCESS, payload: temp });
          }
          , error, options);
        
      }
      if(order != 3){
        const temp = vetor;
        vetor = [];
        dispatch({ type: FEED_EVENTS_FETCH_SUCCESS, payload: vetor });
        dispatch({ type: FEED_EVENTS_FETCH_SUCCESS, payload: temp });
        
      }
      //console.log(snapshot.val();
    })
    .catch(error => console.log(error));
};

function sortVetorTitulo(vetor) {
  let swapped;
  let keys = Object.keys(vetor);
  do {
      swapped = false;

      for (let i=0; i < keys.length-1; i++) {
          if (vetor[keys[i]].Titulo > vetor[keys[i+1]].Titulo) {
              let temp = vetor[keys[i]];
              vetor[keys[i]] = vetor[keys[i+1]];
              vetor[keys[i+1]] = temp;
              swapped = true;
          }
      }
  } while (swapped);
}

function eliminarPassado(vetor){
  //Remover todos os eventos passados
  let keys = Object.keys(vetor);
  let today = new Date();
  data_Atual = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ (today.getFullYear()-2000);

  for(let x = 0; x < keys.length; x++){
    //console.log(data_Atual + " é maior que " + vetor[keys[x]].Data + " ?");
    if(comparaDataMaior(data_Atual, vetor[keys[x]].Data)){
      vetor[keys[x]].Titulo = "";
    }
  }
}

function comparaDataMaior(a, b){
  //Recebe uma data A e uma data B em padrão BR
  //transforma em padrão US e compara se A > B
  let newA = "";
  let newB = "";

  let Adia = a.substring(0,2);
  let Ames = a.substring(3,5);
  let Aano = (20 + a.substring(6));

  newA = new Date(parseInt(Aano), (parseInt(Ames)-1), parseInt(Adia));
  
  let Bdia = b.substring(0,2);
  let Bmes = b.substring(3,5);
  let Bano = (20 + b.substring(6));

  newB = new Date(parseInt(Bano), (parseInt(Bmes)-1), parseInt(Bdia));

  if(newA > newB){
    return true;
  }else{
    return false;
  }

}

function sortVetorData(vetor) {
  eliminarPassado(vetor);
  let swapped;
  let keys = Object.keys(vetor);
  do {
      swapped = false;
      for (let i=0; i < keys.length-1; i++) {
        if (comparaDataMaior(vetor[keys[i]].Data, vetor[keys[i+1]].Data) ){
            let temp = vetor[keys[i]];
            vetor[keys[i]] = vetor[keys[i+1]];
            vetor[keys[i+1]] = temp;
            swapped = true;
        }
      }
  } while (swapped);
}

function sortVetorProx(vetor, latitude, longitude) {
  let swapped;
  let keys = Object.keys(vetor);
  do {
      swapped = false;

      for (let i=0; i < keys.length-1; i++) {
          let evento = vetor[keys[i]];
          let latitude_evento = evento.Local.latitude;
          let longitude_evento = evento.Local.longitude;

          let evento_1 = vetor[keys[i+1]];
          let latitude_evento_1 = evento_1.Local.latitude;
          let longitude_evento_1 = evento_1.Local.longitude;


          let dist_evento = geolib.getDistance(
            {latitude: latitude, longitude: longitude},
            {latitude: latitude_evento, longitude: longitude_evento}
          );

          let dist_evento_1 = geolib.getDistance(
            {latitude: latitude, longitude: longitude},
            {latitude: latitude_evento_1, longitude: longitude_evento_1}
          );

          if (dist_evento > dist_evento_1) {
              console.log('troca pois ' + dist_evento + ' > ' + dist_evento_1);
              let temp = vetor[keys[i]];
              vetor[keys[i]] = vetor[keys[i+1]];
              vetor[keys[i+1]] = temp;
              swapped = true;
          }
      }
  } while (swapped);
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

