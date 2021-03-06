import React from 'react';


const MarkerButton = ({onClick}) => (

  <button onClick={onClick} style={styles.buttonStyle} >
    <svg width="40px" height="40px" viewBox="0 0 29 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <desc>Created with Sketch.</desc>
          <defs>
              <path d="M14.5,2.22034441e-16 L41.8715047,2.22034441e-16 L41.8715047,3.33066907e-16 C42.147647,-1.67976798e-15 42.3715047,0.223857625 42.3715047,0.5 L42.3715047,28.6575595 L42.3715047,28.6575595 C42.3715047,28.9337018 42.147647,29.1575595 41.8715047,29.1575595 C41.7505276,29.1575595 41.6336532,29.1136977 41.5425465,29.034105 L28.1857523,17.3653262 L14.8289582,29.034105 L14.8289582,29.034105 C14.6209978,29.2157835 14.3051331,29.194478 14.1234545,28.9865176 C14.0438617,28.8954109 14,28.7785365 14,28.6575595 L14,0.5 L14,0.5 C14,0.223857625 14.2238576,5.07271091e-17 14.5,0 Z" id="path-0"></path>
          </defs>
          <g id="Page-0" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Group" transform="translate(-14.000000, 0.000000)">
                  <g id="Rectangle">
                      <use fill="#F0FF36" fillRule="evenodd" xlinkHref="#path-0"></use>
                      <path stroke="#979797" strokeWidth="0.5" d="M14.5,0.25 C14.3619288,0.25 14.25,0.361928813 14.25,0.5 L14.25,28.6575595 C14.25,28.718048 14.2719309,28.7764852 14.3117272,28.8220385 C14.4025665,28.9260187 14.5604989,28.9366715 14.6644791,28.8458322 L28.1857523,17.033361 L41.7070256,28.8458322 C41.752579,28.8856286 41.8110162,28.9075595 41.8715047,28.9075595 C42.0095759,28.9075595 42.1215047,28.7956306 42.1215047,28.6575595 L42.1215047,0.5 C42.1215047,0.361928813 42.0095759,0.25 41.8715047,0.25 L14.5,0.25 Z"></path>
                  </g>
              </g>
          </g>
      </svg>
  </button>

);


const styles = {
  buttonStyle: {
    width: 70,
    height: 70,
    backgroundColor: "#000",
    cursor: 'pointer',
    border:'none',
    outline: 'none'

  }


}

export {MarkerButton};
