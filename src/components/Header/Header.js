import  React  from "react";
import './Header.css';


export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header__logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png?20170904093427" alt="Netflix Logo" />
                </a>
            </div>

            <div className="header__user">
                <a href="">
                    <img src="data:image/png;base64,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" alt="Usuário" />
                </a>
            </div>
        </header>
    );

}