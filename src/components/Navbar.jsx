import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FcMusic } from "react-icons/fc";
import { useTranslation } from 'react-i18next';
import "../../node_modules/flag-icon-css/css/flag-icons.min.css";
import { BsGlobe } from "react-icons/bs";
import i18next from 'i18next';
import Cookies from 'js-cookie';

const languages = [
    {
        code: "en",
        name: "english",
        country_code: "gb"
    },
    {
        code: "az",
        name: "azerbaycan",
        country_code: "az"
    },
    {
        code: "ru",
        name: "русский",
        country_code: "ru"
    }
]

const Navbar = ({ libraryStatus, setLibraryStatus }) => {
    const [isActive, setIsActive] = useState(false);
    const [selected,setSelected] = useState(`Select language`);
    const currentLanguageCode = Cookies.get("i18next") || "en";
    const currentLanguage = languages.find(language => language.code === currentLanguageCode);
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t("app_title");
    }, [t])

    const handleLibrary = () => {
        setLibraryStatus((prevState) => !prevState);
    }

    const handleLanguage = (code,name) => {
        i18next.changeLanguage(code);
        setSelected(name);
        setIsActive(!isActive)
    }

    return (
        <NavContainer>
            <H1 libraryStatus={libraryStatus}>{t("react_music_player")}</H1>
            <Button onClick={handleLibrary}>
                {t("music_library")}
                <FcMusic size={20} />
            </Button>
            <Dropdown>
                <button onClick={() => setIsActive(!isActive)}>{selected}{<BsGlobe style={{ paddingLeft: "3px" }} />}</button>
                {
                    isActive && (
                        <DropdownMenu>
                            {
                                languages.map(({ name, code, country_code }) => (
                                    <li key={country_code}>
                                        <button onClick={() => handleLanguage(code,name)} disabled={code === currentLanguageCode}>
                                            <span className={`flag-icon flag-icon-${country_code}`}
                                                style={{ opacity: code === currentLanguageCode ? "0.5" : "1" }}></span>
                                            {name}
                                        </button>
                                    </li>
                                ))
                            }
                        </DropdownMenu>
                    )
                }
            </Dropdown>
        </NavContainer>
    )
}

const NavContainer = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 10vh;
    @media screen and (max-width: 768px) {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
	}
`;

const H1 = styled.h1`
	transition: all 0.5s ease;
    @media screen and (max-width: 768px) {
        transition: all 0.5s ease;
        visibility: ${(props) => props.libraryStatus ? "hidden" : "visible"};
        opacity: ${(props) => props.libraryStatus ? "0" : "100"};
    }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    background: transparent;
	border: none;
	cursor: pointer;
	border: 2px solid rgb(65, 65, 65);
	padding: 0.5rem;
	transition: all 0.3s ease;
	&:hover {
		background: rgb(65, 65, 65);
		color: white;
	}
`;

const Dropdown = styled.div`
    position: relative;
    transition: all 0.5s;
    user-select: none;
    width: 200px;
    button{
        padding: 0.5rem;
        display: flex;
        align-items: center;
        box-shadow: 3px 3px 10px -3px rgba(0,0,0,0.6);
        background-color: #fff;
        transition: all 0.3s ease;
        width: 100%;
        cursor: pointer;
        justify-content: space-between;
        &:hover{
            background: rgb(65, 65, 65);
	        color: white;
        }
    }
`;

const DropdownMenu = styled.ul`
    position: absolute;
    background-color: #fff;
    box-shadow: 3px 3px 10px -3px rgba(0,0,0,0.6);
    width: 100%;
    top: 110%;
    list-style: none;
    li{
        button{
            width: 100%;
        }
    }

`

export default Navbar