import React from 'react';
import { NavLink} from "react-router-dom";
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import '../Css/breadcrumbs.css';



const Breadcrumbs = withBreadcrumbs ([{ path: '/', breadcrumb: null }]) (({ breadcrumbs})=> {
  //console.log(breadcrumbs);
  

  return (
  
    <>
    <i className="material-icons-outlined breadcrumb-home" >home</i>
      {breadcrumbs.map(({
        match,
        breadcrumb,
        location
        
      }) => (
       
        <span key={match.url}>
          <NavLink to={match.url} className="breadcrumb-link"> {breadcrumb} 
          </NavLink><i className="material-icons breadcrumb">arrow_right</i>
        </span>
      ))}
    <br />
    </>
  );
});



export default Breadcrumbs;
