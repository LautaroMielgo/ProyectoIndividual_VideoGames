import { Link } from "react-router-dom/cjs/react-router-dom.min"
import style from "./NavBar.module.css"


const NavBar = () =>{
      return(
            <div className={style.mainContainer}>
                  <Link to="/home" className={style.link}> Home</Link>
                  <Link to="/create" className={style.link}>Form</Link>
                  <Link to="/" className={style.link}> Salir</Link>
            </div>
      )
}

export default NavBar