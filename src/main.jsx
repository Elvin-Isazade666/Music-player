import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import App from './App';
import './index.css';


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en','az','ru'],
    fallbackLng: "en",
    detection: {
      order:['path','cookie','htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

  const loadingMarkup = (
    <div style={{textAlign:"center", padding:"10px"}}>
      <h2>Loading...</h2>
    </div>
  )

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback= {loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Suspense>
)
