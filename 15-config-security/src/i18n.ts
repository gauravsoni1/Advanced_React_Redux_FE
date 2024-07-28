import i18next from "i18next";
import { initReactI18next } from "../node_modules/react-i18next";
import { Translations } from './const/translations';

const resources = {
    en: {
        translation: {
            [Translations.ADD_PROPERTY]: "Add Property",
            [Translations.DELETE_PROPERTY]: "Delete Property",
            "Property Name": "The {{name}}"
        }
    },
    fr: {
        translation: {
            [Translations.ADD_PROPERTY]: "Ajouter une propriété",
            [Translations.DELETE_PROPERTY]: "Supprimer la propriété",
            "Property Name": "Nom de la propriété"
        }
    }
}

i18next.use(initReactI18next)
    .init({
        resources,
        lng: 'en'
    })

export default i18next;